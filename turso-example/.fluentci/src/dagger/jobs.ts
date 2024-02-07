import { Directory, Secret, dag } from "../../deps.ts";
import {
  pushCommand,
  getDirectory,
  getDatabaseUrl,
  getTursoAuthToken,
} from "./lib.ts";

export enum Job {
  push = "push",
}

export const exclude = [".git", "node_modules", ".fluentci"];

/**
 * @function
 * @description Apply schema changes
 * @param {string | Directory} src
 * @param {string | Secret} databaseUrl
 * @param {string | Secret} tursoAuthToken
 * @returns {string}
 */
export async function push(
  src: string | Directory | undefined = ".",
  databaseUrl: string | Secret,
  tursoAuthToken?: string | Secret
): Promise<string> {
  const context = await getDirectory(dag, src);
  const secret = await getDatabaseUrl(dag, databaseUrl);
  if (!secret) {
    console.error("No database url provided");
    Deno.exit(1);
  }

  const token = await getTursoAuthToken(dag, tursoAuthToken);

  let baseCtr = dag
    .pipeline(Job.push)
    .container()
    .from("ghcr.io/fluentci-io/pkgx:latest")
    .withExec(["pkgx", "install", "node@18", "bun"])
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "libatomic1"])
    .withMountedCache(
      "/app/node_modules",
      dag.cacheVolume("drizzle_node_modules")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withSecretVariable("DATABASE_URL", secret);

  if (token) {
    baseCtr = baseCtr.withSecretVariable("TURSO_AUTH_TOKEN", token);
  }

  const ctr = baseCtr
    .withExec(["bun", "install"])
    .withExec(["bunx", "drizzle-kit", pushCommand(await secret.plaintext())]);

  const result = await ctr.stdout();
  return result;
}

export type JobExec = (
  src: string | Directory | undefined,
  databaseUrl: string | Secret,
  tursoAuthToken?: string | Secret
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.push]: push,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.push]: "Apply schema changes",
};
