import { getGalleryImages } from "@/lib/gallery-data";
import Gallery from "@/components/Gallery";

export default function GallerySection() {
  const images = getGalleryImages();
  return <Gallery images={images} />;
}
