import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { AuthContext } from "./AuthContext";
export default function AuthProvider({ children }) {
  const [identity, setIdentity] = useState({ session: null, ready: false });
  const [permission, setPermission] = useState({
    userId: null,
    state: "loading",
  });
  const [retry, setRetry] = useState(0);
  const [logoutState, setLogoutState] = useState("idle");
  useEffect(() => {
    let active = true;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setIdentity({ session, ready: true });
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  const userId = identity.session?.user.id;
  useEffect(() => {
    let active = true;
    if (!userId) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    supabase
      .from("adler_admins")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle()
      .abortSignal(controller.signal)
      .then(({ data, error }) => {
        if (active && !controller.signal.aborted) {
          setPermission({
            userId,
            state: error ? "error" : data ? "authorized" : "denied",
          });
        }
      })
      .catch(() => {
        if (active) setPermission({ userId, state: "error" });
      })
      .finally(() => clearTimeout(timer));
    controller.signal.addEventListener("abort", () => {
      if (active) setPermission({ userId, state: "error" });
    });
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [userId, retry]);
  const signOut = useCallback(async () => {
    setLogoutState("closing");
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw error;
      setIdentity({ session: null, ready: true });
      setPermission({ userId: null, state: "loading" });
      setLogoutState("idle");
    } catch {
      setLogoutState("error");
    }
  }, []);
  const refreshAccess = useCallback(() => {
    setPermission({ userId: null, state: "loading" });
    setRetry((value) => value + 1);
  }, []);
  const state =
    logoutState === "closing"
      ? "loading"
      : logoutState === "error"
        ? "error"
        : !identity.ready
          ? "loading"
          : !userId
            ? "signed-out"
            : permission.userId !== userId
              ? "loading"
              : permission.state;
  return (
    <AuthContext.Provider
      value={{
        state,
        session: identity.session,
        signOut,
        refreshAccess,
        signOutError: logoutState === "error",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
