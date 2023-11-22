import Client, {
  Directory,
  DirectoryID,
  Secret,
  SecretID,
} from "../../deps.ts";

export const getDirectory = (
  client: Client,
  src: string | Directory | undefined = "."
) => {
  if (typeof src === "string" && src.startsWith("core.Directory")) {
    return client.directory({
      id: src as DirectoryID,
    });
  }
  return src instanceof Directory ? src : client.host().directory(src);
};

export const pushCommand = (databaseUrl?: string) => {
  const DATABASE_URL = Deno.env.get("DATABASE_URL") || databaseUrl;

  if (DATABASE_URL?.startsWith("postgres://")) {
    return "push:pg";
  }

  if (DATABASE_URL?.startsWith("mysql://")) {
    return "push:mysql";
  }

  if (DATABASE_URL?.startsWith("sqlite://")) {
    return "push:sqlite";
  }

  throw new Error("Unsupported database");
};

export const getDatabaseUrl = (client: Client, token?: string | Secret) => {
  if (Deno.env.get("DATABASE_URL")) {
    return client.setSecret("DATABASE_URL", Deno.env.get("DATABASE_URL")!);
  }
  if (token && typeof token === "string") {
    if (token.startsWith("core.Secret")) {
      return client.loadSecretFromID(token as SecretID);
    }
    return client.setSecret("DATABASE_URL", token);
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};
