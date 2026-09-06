import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
export function useAvatar(path, revision = 0) {
  const [image, setImage] = useState({ path: null, revision: -1, url: null });
  useEffect(() => {
    if (!path) return;
    let active = true;
    async function refresh() {
      try {
        const { data, error } = await supabase.storage
          .from("adler-avatars")
          .createSignedUrl(path, 3600);
        if (active)
          setImage({ path, revision, url: error ? null : data.signedUrl });
      } catch {
        if (active) setImage({ path, revision, url: null });
      }
    }
    refresh();
    const timer = setInterval(refresh, 3300000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [path, revision]);
  return image.path === path && image.revision === revision ? image.url : null;
}
