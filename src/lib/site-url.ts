/** Canonical site URL for metadata and structured data. */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (basePath) {
    return `https://permephem.github.io${basePath}`.replace(/\/$/, "");
  }

  return "https://permephem.github.io/topdog";
}
