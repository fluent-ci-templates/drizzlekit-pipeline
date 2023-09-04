export const pushCommand = () => {
  const DATABASE_URL = Deno.env.get("DATABASE_URL");

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
