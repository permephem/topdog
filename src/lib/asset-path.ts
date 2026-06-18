/** Prefix public asset paths when deployed under a subpath (e.g. GitHub Pages). */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
