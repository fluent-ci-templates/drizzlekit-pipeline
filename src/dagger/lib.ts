import {
  Directory,
  type DirectoryID,
  Secret,
  type SecretID,
  env,
} from "../../deps.ts";
import type { Client } from "../../sdk/client.gen.ts";

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

export const getDatabaseUrl = async (
  client: Client,
  token?: string | Secret
) => {
  if (env.get("DATABASE_URL")) {
    return client.setSecret("DATABASE_URL", env.get("DATABASE_URL")!);
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
  if (env.get("TURSO_AUTH_TOKEN")) {
    return client.setSecret("TURSO_AUTH_TOKEN", env.get("TURSO_AUTH_TOKEN")!);
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
