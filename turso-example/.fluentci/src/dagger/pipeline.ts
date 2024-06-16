import { env } from "../../deps.ts";
import * as jobs from "./jobs.ts";

const { push, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[]);
    return;
  }

  await push(src, env.get("DATABASE_URL")!, env.get("TURSO_AUTH_TOKEN"));
}

async function runSpecificJobs(args: jobs.Job[]) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(".", env.get("DATABASE_URL")!, env.get("TURSO_AUTH_TOKEN"));
  }
}
