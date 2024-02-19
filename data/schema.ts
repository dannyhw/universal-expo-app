import { relations } from "drizzle-orm";
import { pgSchema, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
export const schema = pgSchema("universal-app");

export const users = schema.table("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  // firstName: varchar("first_name", { length: 64 }).notNull(),
  // lastName: varchar("last_name", { length: 64 }).notNull(),
  email: varchar("email", { length: 128 }).notNull().unique(),
  hashedPassword: varchar("hashed_password").notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const usersRelations = relations(users, ({ many, one }) => ({
  session: one(sessions),
}));

export const sessions = schema.table("sessions", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export const sessionsRelations = relations(sessions, ({ one }) => ({
  pathway: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
