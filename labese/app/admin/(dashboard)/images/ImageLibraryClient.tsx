"use client";

import { useState, useRef } from "react";
import { uploadImageAction, deleteImageAction } from "@/app/actions/admin";
import { Upload, Copy, Trash2, Check, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageFile {
  name: string;
  url: string;
  size: number;
}

interface ImageLibraryClientProps {
  initialImages: ImageFile[];
}

export default function ImageLibraryClient({ initialImages }: ImageLibraryClientProps) {
  const [images, setImages] = useState<ImageFile[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await uploadImageAction(formData);
        if (res.success && res.image) {
          setImages((prev) => [res.image!, ...prev]);
        } else {
          setError(res.error ?? "Upload failed");
        }
      } catch {
        setError("An unexpected error occurred during upload.");
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (name: string, url: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const formData = new FormData();
    formData.append("url", url);
    const res = await deleteImageAction(formData);
    if (res.success) {
      setImages((prev) => prev.filter((img) => img.url !== url));
    } else {
      setError(res.error ?? "Failed to delete image.");
    }
  };

  const copyPath = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 transition-all cursor-pointer ${
          dragging
            ? "border-forest bg-forest-light/40 scale-[1.01]"
            : "border-line bg-white hover:border-forest/50 hover:bg-forest-light/20"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="h-14 w-14 rounded-full bg-forest-light flex items-center justify-center">
          <Upload size={24} className="text-forest-dark" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-navy">
            {uploading ? "Uploading…" : "Drop images here or click to browse"}
          </p>
          <p className="mt-1 text-xs text-ink/60">
            PNG, JPG, GIF, WebP, SVG up to 10 MB each. Multiple files supported.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl px-5 py-4 border bg-sand/10 border-sand-dark/25 text-sand-dark text-sm">
          <p className="font-semibold">Upload Error</p>
          <p className="mt-0.5">{error}</p>
        </div>
      )}

      {/* Image Grid */}
      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white py-16 text-center">
          <ImageIcon size={40} className="mx-auto text-ink/25" />
          <p className="mt-3 text-sm font-medium text-ink/50">
            No images uploaded yet. Start by dragging files above.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-ink/60">
              <strong className="text-navy">{images.length}</strong> image{images.length !== 1 ? "s" : ""} stored
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map((img) => (
              <div
                key={img.name}
                className="group relative rounded-xl overflow-hidden border border-line bg-white hover:shadow-md hover:shadow-navy/5 transition-all"
              >
                <div className="relative aspect-square bg-cream/50">
                  <Image
                    src={img.url}
                    alt={img.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                <div className="p-2">
                  <p className="text-[10px] font-medium text-ink/70 truncate" title={img.name}>
                    {img.name}
                  </p>
                  <p className="text-[9px] text-ink/40">
                    {(img.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyPath(img.url)}
                    title="Copy path"
                    className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-navy hover:bg-forest hover:text-white transition-colors"
                  >
                    {copiedUrl === img.url ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(img.name, img.url)}
                    title="Delete image"
                    className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
