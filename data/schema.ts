import { relations } from "drizzle-orm";
import { pgSchema, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
export const schema = pgSchema("universal-app");

export const users = schema.table("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  firstName: varchar("first_name", { length: 64 }).notNull(),
  lastName: varchar("last_name", { length: 64 }).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const usersRelations = relations(users, ({ many, one }) => ({}));
