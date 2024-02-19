import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { Argon2id } from "oslo/password";

import { db } from "~/data/db";
import { users } from "~/data/schema";
import { lucia } from "~/util/auth.js";
import { signupValidationSchema } from "~/util/auth.schema";

export async function POST(request: ExpoRequest) {
  try {
    const json = await request.json();

    const parsedResponse = signupValidationSchema.safeParse(json);

    if (parsedResponse.success) {
      const hashedPassword = await new Argon2id().hash(
        parsedResponse.data.password,
      );

      const insertResp = await db
        .insert(users)
        .values({
          email: parsedResponse.data.email,
          hashedPassword,
        })
        .returning();

      const newUser = insertResp.at(0);

      if (!newUser) {
        return ExpoResponse.json(
          { error: "Could not create user" },
          { status: 500 },
        );
      }

      const session = await lucia.createSession(newUser.id, {});

      return ExpoResponse.json({
        session: session.id,
      });
    } else {
      return ExpoResponse.json(
        { error: parsedResponse.error.errors.at(0)?.message },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error(error);

    return ExpoResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
