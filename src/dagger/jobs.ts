import Client, { Directory, Secret } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { pushCommand, getDirectory, getDatabaseUrl } from "./lib.ts";

export enum Job {
  push = "push",
}

export const exclude = [".git", "node_modules", ".fluentci"];

/**
 * @function
 * @description Apply schema changes
 * @param {string | Directory} src
 * @param {string | Secret} databaseUrl
 * @returns {string}
 */
export async function push(
  src: string | Directory,
  databaseUrl: string | Secret
): Promise<string> {
  await connect(async (client: Client) => {
    const postgres = client
      .container()
      .from("postgres:15-alpine")
      .withEnvVariable("POSTGRES_PASSWORD", "pass")
      .withEnvVariable("POSTGRES_DB", "example")
      .withExposedPort(5432)
      .asService();

    const context = getDirectory(client, src);
    const secret = getDatabaseUrl(client, databaseUrl);
    if (!secret) {
      console.error("No database url provided");
      Deno.exit(1);
    }

    const ctr = client
      .pipeline(Job.push)
      .container()
      .from("ghcr.io/fluentci-io/pkgx:latest")
      .withExec(["pkgx", "install", "node@18", "bun"])
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "libatomic1"])
      .withServiceBinding("postgres", postgres)
      .withMountedCache(
        "/app/node_modules",
        client.cacheVolume("drizzle_node_modules")
      )
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withSecretVariable("DATABASE_URL", secret)
      .withExec(["bun", "install"])
      .withExec(["bunx", "drizzle-kit", pushCommand(await secret.plaintext())]);

    const result = await ctr.stdout();

    console.log(result);
  });

  return "All changes applied.";
}

export type JobExec = (
  src: string | Directory,
  databaseUrl: string | Secret
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.push]: push,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.push]: "Apply schema changes",
};
