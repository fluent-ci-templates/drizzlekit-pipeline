import { client } from "./dagger.ts";
import { pushCommand } from "./lib.ts";

export enum Job {
  push = "push",
}

const DATABASE_URL = Deno.env.get("DATABASE_URL");

export const exclude = [".git", "node_modules", ".fluentci"];

export const push = async (src = ".", databaseUrl?: string) => {
  if (!DATABASE_URL && !databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const postgres = client
    .container()
    .from("postgres:15-alpine")
    .withEnvVariable("POSTGRES_PASSWORD", "pass")
    .withEnvVariable("POSTGRES_DB", "example")
    .withExposedPort(5432);

  const context = client.host().directory(src);
  const ctr = client
    .pipeline(Job.push)
    .container()
    .from("ghcr.io/fluent-ci-templates/bun:latest")
    .withServiceBinding("postgres", postgres)
    .withMountedCache(
      "/app/node_modules",
      client.cacheVolume("drizzle_node_modules")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withEnvVariable("DATABASE_URL", DATABASE_URL || databaseUrl!)
    .withExec(["sh", "-c", 'eval "$(devbox global shellenv)" && bun install'])
    .withExec([
      "sh",
      "-c",
      `eval "$(devbox global shellenv)" && bun x drizzle-kit ${pushCommand(
        databaseUrl
      )}`,
    ]);

  const result = await ctr.stdout();

  console.log(result);

  return "All changes applied.";
};

export type JobExec = (src?: string) =>
  | Promise<string>
  | ((
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.push]: push,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.push]: "Apply schema changes",
};
