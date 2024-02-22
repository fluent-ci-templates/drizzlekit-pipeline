import { Client } from "../../sdk/client.gen.ts";
import { Directory, DirectoryID, Secret, SecretID } from "../../deps.ts";

export const getDirectory = async (
  client: Client,
  src: string | Directory | undefined = "."
) => {
  if (src instanceof Directory) {
    return src;
  }
  if (typeof src === "string") {
    try {
      const directory = client.loadDirectoryFromID(src as DirectoryID);
      await directory.id();
      return directory;
    } catch (_) {
      return client.host
        ? client.host().directory(src)
        : client.currentModule().source().directory(src);
    }
  }
  return client.host
    ? client.host().directory(src)
    : client.currentModule().source().directory(src);
};

export const pushCommand = (databaseUrl?: string) => {
  const DATABASE_URL = Deno.env.get("DATABASE_URL") || databaseUrl;

  if (DATABASE_URL?.startsWith("postgres://")) {
    return "push:pg";
  }

  if (DATABASE_URL?.startsWith("mysql://")) {
    return "push:mysql";
  }

  if (
    DATABASE_URL?.startsWith("sqlite://") ||
    DATABASE_URL?.startsWith("libsql://")
  ) {
    return "push:sqlite";
  }

  throw new Error("Unsupported database");
};

export const getDatabaseUrl = async (
  client: Client,
  token?: string | Secret
) => {
  if (Deno.env.get("DATABASE_URL")) {
    return client.setSecret("DATABASE_URL", Deno.env.get("DATABASE_URL")!);
  }
  if (token && typeof token === "string") {
    try {
      const secret = client.loadSecretFromID(token as SecretID);
      await secret.id();
      return secret;
    } catch (_) {
      return client.setSecret("DATABASE_URL", token);
    }
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};

export const getTursoAuthToken = async (
  client: Client,
  token?: string | Secret
) => {
  if (Deno.env.get("TURSO_AUTH_TOKEN")) {
    return client.setSecret(
      "TURSO_AUTH_TOKEN",
      Deno.env.get("TURSO_AUTH_TOKEN")!
    );
  }
  if (token && typeof token === "string") {
    try {
      const secret = client.loadSecretFromID(token as SecretID);
      await secret.id();
      return secret;
    } catch (_) {
      return client.setSecret("TURSO_AUTH_TOKEN", token);
    }
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};
