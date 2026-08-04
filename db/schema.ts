import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const waitlist = sqliteTable("waitlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  audience: text("audience").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [uniqueIndex("waitlist_email_unique").on(table.email)]);
