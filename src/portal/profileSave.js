const definitiveCodes = new Set(["23514", "42501", "22023", "P0001"]);

export function createProfileAttempt({
  userId,
  profile,
  form,
  file,
  removePhoto,
  uuid = crypto.randomUUID(),
}) {
  return {
    userId,
    revision: profile.revision,
    payload: {
      ...Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, value.trim()]),
      ),
      avatar_path: file
        ? `${userId}/${uuid}`
        : removePhoto
          ? null
          : profile.avatar_path,
    },
    file,
    uploadAttempted: false,
    uploadConfirmed: false,
    writeAttempted: false,
    saveUncertain: false,
    definitiveRejection: false,
  };
}

async function reconcile(client, attempt) {
  const { data, error } = await client
    .from("adler_client_profiles")
    .select("*")
    .eq("user_id", attempt.userId)
    .single();
  if (error) throw error;
  if (!data) throw new Error("profile_unavailable");
  if (
    data.revision > attempt.revision &&
    Object.entries(attempt.payload).every(
      ([key, value]) => (data[key] ?? "") === (value ?? ""),
    )
  )
    return data;
  if (data.revision !== attempt.revision) {
    const conflict = new Error("profile_conflict");
    conflict.code = "40001";
    conflict.currentProfile = data;
    throw conflict;
  }
  return null;
}

export async function saveProfileAttempt(client, attempt) {
  if (attempt.writeAttempted) {
    const saved = await reconcile(client, attempt);
    if (saved) return saved;
  }
  const storage = client.storage.from("adler-avatars");
  if (attempt.file && !attempt.uploadConfirmed) {
    if (attempt.uploadAttempted) {
      const { data, error } = await storage.download(
        attempt.payload.avatar_path,
      );
      if (data && !error) attempt.uploadConfirmed = true;
      else if (
        !["404", "NoSuchKey", "not_found"].includes(
          String(error?.code || error?.statusCode || error?.status),
        )
      ) {
        throw error || new Error("upload_unconfirmed");
      }
    }
    if (!attempt.uploadConfirmed) {
      attempt.uploadAttempted = true;
      const { error } = await storage.upload(
        attempt.payload.avatar_path,
        attempt.file,
        {
          upsert: false,
          contentType: attempt.file.type,
          cacheControl: "0",
        },
      );
      if (error) throw error;
      attempt.uploadConfirmed = true;
    }
  }
  attempt.writeAttempted = true;
  try {
    const { data, error } = await client.rpc("adler_portal_save_profile", {
      p_revision: attempt.revision,
      p_profile: attempt.payload,
    });
    if (error) throw error;
    if (!data) throw new Error("save_unconfirmed");
    return data;
  } catch (error) {
    if (error?.code === "40001") {
      attempt.saveUncertain = true;
      const saved = await reconcile(client, attempt);
      if (saved) return saved;
    }
    if (definitiveCodes.has(error?.code) && !attempt.saveUncertain) {
      attempt.definitiveRejection = true;
    } else {
      attempt.saveUncertain = true;
    }
    throw error;
  }
}

export async function discardRejectedProfileAttempt(client, attempt) {
  if (!attempt.definitiveRejection || attempt.saveUncertain) return false;
  if (attempt.file && attempt.uploadAttempted) {
    const { error } = await client.storage
      .from("adler-avatars")
      .remove([attempt.payload.avatar_path]);
    if (error) throw error;
  }
  return true;
}
