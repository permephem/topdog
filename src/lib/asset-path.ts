/** Prefix public asset paths when deployed under a subpath (e.g. GitHub Pages). */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || path.startsWith(base)) return path;
  return `${base}${path}`;
}
