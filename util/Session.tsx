import { createContext, useContext } from "react";

import { useStorageState } from "./useStorageState";

const AuthContext = createContext<{
  signIn: (auth: { email: string; password: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => false,
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
          // Perform sign-in logic here
          try {
            const resp = await fetch("http://localhost:8081/auth", {
              method: "POST",
              body: JSON.stringify({ email, password }),
            });

            const json = await resp.json();

            console.log({ json });

            setSession("xxx");

            return true;
          } catch (error) {
            console.error(error);

            return false;
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
