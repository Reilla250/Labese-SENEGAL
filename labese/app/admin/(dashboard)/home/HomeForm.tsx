"use client";

import { useState } from "react";
import { saveHomeAction } from "@/app/actions/admin";
import Button from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";

interface HomeImage { src: string; alt: string; }
interface HomeFormProps {
  initialData: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    aboutTitle: string;
    aboutParagraph1: string;
    aboutParagraph2: string;
    images: HomeImage[];
  };
}

type HomeTextField = Exclude<keyof HomeFormProps["initialData"], "images">;

export default function HomeForm({ initialData }: HomeFormProps) {
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const set = (field: HomeTextField, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setImage = (idx: number, field: keyof HomeImage, value: string) =>
    setForm((prev) => {
      const images = [...prev.images];
      images[idx] = { ...images[idx], [field]: value };
      return { ...prev, images };
    });

  const addImage = () =>
    setForm((prev) => ({ ...prev, images: [...prev.images, { src: "", alt: "" }] }));

  const removeImage = async (idx: number) => {
    const previous = form;
    const next = { ...previous, images: previous.images.filter((_, i) => i !== idx) };
    setForm(next);
    setLoading(true);
    setMessage(null);

    try {
      const res = await saveHomeAction(next);
      if (res.success) {
        setMessage({ type: "success", text: "Image removed and saved." });
      } else {
        setForm(previous);
        setMessage({ type: "error", text: res.error || "Failed to remove image." });
      }
    } catch (err) {
      setForm(previous);
      const errorMessage = err instanceof Error ? err.message : "An error occurred.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await saveHomeAction(form);
      if (res.success) {
        setMessage({ type: "success", text: "Home page saved successfully!" });
      } else {
        setMessage({ type: "error", text: res.error || "Save failed." });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred.";
      setMessage({ type: "error", text: errorMessage });
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`rounded-xl px-5 py-4 border text-sm ${message.type === "success" ? "bg-forest-light/60 border-forest/20 text-navy" : "bg-sand/10 border-sand-dark/25 text-sand-dark"}`}>
          <p className="font-semibold">{message.type === "success" ? "✓ Saved" : "Error"}</p>
          <p className="mt-0.5">{message.text}</p>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-white border border-line rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-navy">Hero Section</h2>
        {([
          { field: "heroSubtitle", label: "Hero Eyebrow / Subtitle" },
          { field: "heroTitle", label: "Hero Main Title" },
          { field: "heroDescription", label: "Hero Description", textarea: true },
        ] satisfies Array<{ field: HomeTextField; label: string; textarea?: boolean }>).map(({ field, label, textarea }) => (
          <div key={field}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">{label}</label>
            {textarea ? (
              <textarea rows={3} value={form[field]} onChange={(e) => set(field, e.target.value)}
                className="block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest" />
            ) : (
              <input type="text" value={form[field]} onChange={(e) => set(field, e.target.value)}
                className="block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest" />
            )}
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="bg-white border border-line rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-navy">About Block</h2>
        {([
          { field: "aboutTitle", label: "Section Title" },
          { field: "aboutParagraph1", label: "Paragraph 1", textarea: true },
          { field: "aboutParagraph2", label: "Paragraph 2", textarea: true },
        ] satisfies Array<{ field: HomeTextField; label: string; textarea?: boolean }>).map(({ field, label, textarea }) => (
          <div key={field}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">{label}</label>
            {textarea ? (
              <textarea rows={4} value={form[field]} onChange={(e) => set(field, e.target.value)}
                className="block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest" />
            ) : (
              <input type="text" value={form[field]} onChange={(e) => set(field, e.target.value)}
                className="block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest" />
            )}
          </div>
        ))}
      </section>

      {/* Image Slots */}
      <section className="bg-white border border-line rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-navy">Hero / Gallery Images</h2>
        <p className="text-sm text-ink/60">Add image URLs (Unsplash, or /uploads/filename from Image Library).</p>
        {form.images.map((img, idx) => (
          <div key={idx} className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Image URL</label>
              <input type="text" value={img.src} onChange={(e) => setImage(idx, "src", e.target.value)} placeholder="/uploads/photo.jpg"
                className="block w-full rounded-lg border border-line bg-cream/20 px-3 py-2 text-sm text-navy focus:border-forest focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Alt Text</label>
              <input type="text" value={img.alt} onChange={(e) => setImage(idx, "alt", e.target.value)} placeholder="Describe the image"
                className="block w-full rounded-lg border border-line bg-cream/20 px-3 py-2 text-sm text-navy focus:border-forest focus:outline-none" />
            </div>
            <button type="button" onClick={() => void removeImage(idx)} disabled={loading}
              className="h-10 w-10 flex items-center justify-center rounded-lg border border-line text-rose-400 hover:bg-rose-50 hover:border-rose-300 transition-colors shrink-0">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button type="button" onClick={addImage}
          className="flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-dark">
          <Plus size={15} /> Add Image Slot
        </button>
      </section>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save Home Page"}
      </Button>
    </form>
  );
}
