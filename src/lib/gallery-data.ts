import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { galleryPhotos, type GalleryImage } from "./business";

function loadGooglePhotos(): GalleryImage[] | null {
  try {
    const manifestPath = path.join(
      process.cwd(),
      "public/images/gallery/manifest.json",
    );
    if (!existsSync(manifestPath)) return null;
    const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as {
      images: GalleryImage[];
    };
    return manifest.images?.length ? manifest.images : null;
  } catch {
    return null;
  }
}

/** Prefer Google Business Profile photos when fetched via npm run fetch-photos */
export function getGalleryImages(): GalleryImage[] {
  return loadGooglePhotos() ?? galleryPhotos;
}
