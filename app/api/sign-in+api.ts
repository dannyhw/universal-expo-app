import { eq } from "drizzle-orm";
import { ExpoRequest, ExpoResponse } from "expo-router/server";
// import { Argon2id } from "oslo/password";

import { db } from "~/data/db";
import { users } from "~/data/schema";
import { lucia } from "~/util/auth";
import { loginValidationSchema } from "~/util/auth.schema";

export async function POST(request: ExpoRequest) {
  try {
    const json = await request.json();

    const parsedResponse = loginValidationSchema.safeParse(json);

    if (parsedResponse.success) {
      const user = await db.query.users.findFirst({
        where: eq(users.email, parsedResponse.data.email),
      });

      if (!user) {
        return ExpoResponse.json(
          { error: "Invalid email or password" },
          { status: 400 },
        );
      }

      const validPassword = await Bun.password.verify(
        parsedResponse.data.password,
        user.hashedPassword,
      );

      if (!validPassword) {
        return ExpoResponse.json(
          { error: "Invalid email or password" },
          { status: 400 },
        );
      }

      const session = await lucia.createSession(user.id, {});

      return ExpoResponse.json({
        session: session.id,
      });
    } else {
      const firstError = parsedResponse.error.errors.at(0);
      return ExpoResponse.json(
        { error: `${firstError?.path} - ${firstError?.message}` },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error(error);

    return ExpoResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
