import { createContext, useContext } from "react";

import { loginResponseSchema } from "./auth.schema";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext<{
  signIn: (auth: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => ({ success: false }),
  signOut: async () => {},
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async ({ password, email }) => {
          try {
            const resp = await fetch("http://localhost:8081/api/sign-in", {
              method: "POST",
              body: JSON.stringify({ email, password }),
            });

            const json = await resp.json();

            const parsedJson = loginResponseSchema.safeParse(json);

            if (!resp.ok && parsedJson.success && parsedJson.data.error) {
              return {
                success: false,
                error: parsedJson.data.error,
              };
            }

            if (parsedJson.success) {
              if (!parsedJson.data.session) {
                throw new Error("No session in response");
              }

              setSession(parsedJson.data.session);

              return { success: true };
            }

            const firstError = parsedJson.error.errors.at(0);

            return {
              success: false,
              error: `${firstError?.path} - ${firstError?.message}`,
            };
          } catch (error: any) {
            console.error(error);

            return {
              success: false,
              error: error.message || String(error),
            };
          }
        },
        signOut: async () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
