import Client from "../../deps.ts";

const sessionToken = Deno.env.get("DAGGER_SESSION_TOKEN");
const host = `127.0.0.1:${Deno.env.get("DAGGER_SESSION_PORT")}`;

export const client = new Client({
  host,
  sessionToken,
});
