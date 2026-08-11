import { getUploadedImagesAction } from "@/app/actions/admin";
import ImageLibraryClient from "./ImageLibraryClient";

export const dynamic = "force-dynamic";

export default async function ImagesPage() {
  const images = await getUploadedImagesAction();

  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono-stat text-xs font-semibold uppercase tracking-wider text-forest">
          Admin › Media
        </span>
        <h1 className="mt-1 font-display text-4xl font-semibold text-navy">
          Image Library
        </h1>
        <p className="mt-2 text-sm text-ink/70">
          Upload photos and visual assets to the system. Hover over any image to copy its path or delete it.
        </p>
      </div>
      <ImageLibraryClient initialImages={images} />
    </div>
  );
}
