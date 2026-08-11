"use client";

import { useState } from "react";
import { saveAboutAction } from "@/app/actions/admin";
import Button from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";

interface WhoWeServeItem { label: string; icon: string; }
interface AboutFormProps {
  initialData: {
    storyTitle: string;
    storyImage: string;
    storyImageAlt: string;
    storyParagraph1: string;
    storyParagraph2: string;
    mission: string;
    vision: string;
    whoWeServe: WhoWeServeItem[];
  };
}

export default function AboutForm({ initialData }: AboutFormProps) {
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setServe = (idx: number, field: keyof WhoWeServeItem, value: string) =>
    setForm((prev) => {
      const whoWeServe = [...prev.whoWeServe];
      whoWeServe[idx] = { ...whoWeServe[idx], [field]: value };
      return { ...prev, whoWeServe };
    });

  const addServe = () =>
    setForm((prev) => ({ ...prev, whoWeServe: [...prev.whoWeServe, { label: "", icon: "Users2" }] }));

  const removeServe = async (idx: number) => {
    const previous = form;
    const next = {
      ...previous,
      whoWeServe: previous.whoWeServe.filter((_, i) => i !== idx),
    };
    setForm(next);
    setLoading(true);
    setMessage(null);
    try {
      const res = await saveAboutAction(next);
      if (res.success) {
        setMessage({ type: "success", text: "Entry removed and saved." });
      } else {
        setForm(previous);
        setMessage({ type: "error", text: res.error || "Save failed." });
      }
    } catch {
      setForm(previous);
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await saveAboutAction(form);
      setMessage(res.success ? { type: "success", text: "About page saved!" } : { type: "error", text: "Save failed." });
    } catch { setMessage({ type: "error", text: "An error occurred." }); }
    finally { setLoading(false); }
  };

  const inputCls = "block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`rounded-xl px-5 py-4 border text-sm ${message.type === "success" ? "bg-forest-light/60 border-forest/20 text-navy" : "bg-sand/10 border-sand-dark/25 text-sand-dark"}`}>
          <p className="font-semibold">{message.type === "success" ? "✓ Saved" : "Error"}</p>
          <p className="mt-0.5">{message.text}</p>
        </div>
      )}

      {/* Story */}
      <section className="bg-white border border-line rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-navy">Our Story</h2>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">Story Title</label>
          <input type="text" value={form.storyTitle} onChange={(e) => set("storyTitle", e.target.value)} className={inputCls} /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">Story Image URL</label>
            <input type="text" value={form.storyImage} onChange={(e) => set("storyImage", e.target.value)} className={inputCls} /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">Image Alt Text</label>
            <input type="text" value={form.storyImageAlt} onChange={(e) => set("storyImageAlt", e.target.value)} className={inputCls} /></div>
        </div>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">Story Paragraph 1</label>
          <textarea rows={4} value={form.storyParagraph1} onChange={(e) => set("storyParagraph1", e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">Story Paragraph 2</label>
          <textarea rows={4} value={form.storyParagraph2} onChange={(e) => set("storyParagraph2", e.target.value)} className={inputCls} /></div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white border border-line rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-navy">Mission & Vision</h2>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">Mission Statement</label>
          <textarea rows={3} value={form.mission} onChange={(e) => set("mission", e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">Vision Statement</label>
          <textarea rows={3} value={form.vision} onChange={(e) => set("vision", e.target.value)} className={inputCls} /></div>
      </section>

      {/* Who We Serve */}
      <section className="bg-white border border-line rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-navy">Who We Serve</h2>
        <p className="text-xs text-ink/60">Icon names: GraduationCap, Users2, HeartHandshake, ShieldAlert, Accessibility, Coins</p>
        {form.whoWeServe.map((item, idx) => (
          <div key={idx} className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
            <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Label</label>
              <input type="text" value={item.label} onChange={(e) => setServe(idx, "label", e.target.value)} className={inputCls} /></div>
            <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Icon</label>
              <input type="text" value={item.icon} onChange={(e) => setServe(idx, "icon", e.target.value)} className="block w-32 rounded-lg border border-line bg-cream/20 px-3 py-2 text-sm text-navy focus:border-forest focus:outline-none" /></div>
            <button type="button" onClick={() => void removeServe(idx)} disabled={loading}
              className="h-10 w-10 flex items-center justify-center rounded-lg border border-line text-rose-400 hover:bg-rose-50 transition-colors shrink-0">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button type="button" onClick={addServe} className="flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-dark">
          <Plus size={15} /> Add Entry
        </button>
      </section>

      <Button type="submit" disabled={loading}>{loading ? "Saving…" : "Save About Page"}</Button>
    </form>
  );
}
