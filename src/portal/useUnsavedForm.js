import { useEffect, useRef } from "react";
import { useBlocker } from "react-router-dom";
const prompt =
  "Hay cambios sin guardar o un mensaje sin enviar. ¿Quieres salir de esta página?";
export function useUnsavedForm(dirty) {
  const skip = useRef(false);
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      dirty &&
      !skip.current &&
      (currentLocation.pathname !== nextLocation.pathname ||
        currentLocation.search !== nextLocation.search),
  );
  useEffect(() => {
    if (blocker.state === "blocked") {
      if (window.confirm(prompt)) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);
  useEffect(() => {
    if (!dirty) return;
    function leave(event) {
      if (!skip.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    }
    function logout(event) {
      if (!skip.current && !window.confirm(prompt)) event.preventDefault();
    }
    window.addEventListener("beforeunload", leave);
    window.addEventListener("adler:before-signout", logout);
    return () => {
      window.removeEventListener("beforeunload", leave);
      window.removeEventListener("adler:before-signout", logout);
    };
  }, [dirty]);
  return () => {
    skip.current = true;
  };
}
