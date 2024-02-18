import { ExpoRequest, ExpoResponse } from "expo-router/server";

import { loginValidationSchema } from "./auth.schema";

export async function POST(request: ExpoRequest) {
  try {
    const json = await request.json();
    const parsedResponse = loginValidationSchema.safeParse(json);
    if (parsedResponse.success) {
      console.log({
        email: parsedResponse.data.email,
        pass: parsedResponse.data.password,
      });
    } else {
      console.log(json);

      return ExpoResponse.json(
        { error: parsedResponse.error.message },
        { status: 400 },
      );
    }

    return ExpoResponse.json({
      bla: "blabla",
    });
  } catch (error) {
    console.log({ request });
    console.error(error);
    return ExpoResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
