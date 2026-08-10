"use client";

import { useState } from "react";
import { saveSiteAction } from "@/app/actions/admin";
import Button from "@/components/ui/Button";

interface SiteFormProps {
  initialData: {
    name: string;
    fullName: string;
    tagline: string;
    location: string;
    registrationNumber: string;
    email: string;
    phone: string;
    phoneHref: string;
    url: string;
    founded: string;
    healthDisclaimer: string;
    safeguardingStatement: string;
    privacyStatement: string;
  };
}

export default function SiteForm({ initialData }: SiteFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await saveSiteAction(formData);
      if (res.success) {
        setMessage({ type: "success", text: "Site settings saved successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to save settings." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-line rounded-2xl p-6 md:p-8">
      {message && (
        <div
          className={`rounded-xl px-5 py-4 border text-sm ${
            message.type === "success"
              ? "bg-forest-light/60 border-forest/20 text-navy"
              : "bg-sand/10 border-sand-dark/25 text-sand-dark"
          }`}
        >
          <p className="font-semibold">{message.type === "success" ? "Success" : "Error"}</p>
          <p className="mt-0.5">{message.text}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Short Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Full Organization Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Slogan / Tagline
          </label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            required
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Contact Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Phone Href Link (e.g. +221778577078)
          </label>
          <input
            type="text"
            name="phoneHref"
            value={formData.phoneHref}
            onChange={handleChange}
            required
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Canonical Site URL
          </label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Registration Number
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Founded Year
          </label>
          <input
            type="text"
            name="founded"
            value={formData.founded}
            onChange={handleChange}
            required
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>
      </div>

      <hr className="border-line/10" />

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Health and Emergency Disclaimer
          </label>
          <textarea
            name="healthDisclaimer"
            value={formData.healthDisclaimer}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Safeguarding Statement
          </label>
          <textarea
            name="safeguardingStatement"
            value={formData.safeguardingStatement}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
            Privacy Statement
          </label>
          <textarea
            name="privacyStatement"
            value={formData.privacyStatement}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving settings..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
