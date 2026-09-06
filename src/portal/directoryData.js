export const PROFILE_FIELDS =
  "user_id,full_name,company,job_title,phone,country,city,website,bio,avatar_path,revision,created_at,updated_at";
export const DIRECTORY_PAGE_SIZE = 20;

// Treat user input as literal text, including SQL LIKE wildcard characters.
export function literalNamePattern(value) {
  return `%${value.trim().replace(/[\\%_]/g, "\\$&")}%`;
}

export function profileWebsite(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
