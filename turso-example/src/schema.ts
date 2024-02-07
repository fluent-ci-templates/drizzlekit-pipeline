import { index, sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id"),
    name: text("name").notNull(),
  },
  (table) => ({
    idx1: index("name_index").on(table.name),
  })
);
