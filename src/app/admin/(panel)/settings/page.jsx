"use client";
import { useEffect, useState, useRef } from "react";
import { FiUploadCloud, FiFileText } from "react-icons/fi";

export default function SettingsAdmin() {
  const [config, setConfig] = useState({
    availableForHire: true,
    availabilityText: "Available for Q4 2026 Engagements",
    contactEmail: "oduor.markochieng@gmail.com",
    contactPhone: "+254718178521",
    location: "Nairobi & Siaya, Kenya",
    profileImageUrl: "/photo/about.webp",
    headlineTagline: "Let's build something cool.",
  });
  const [previewTimestamp, setPreviewTimestamp] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const cvInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setUploadStatus("Settings saved successfully.");
        setTimeout(() => setUploadStatus(""), 3000);
      }
    } catch {
      setUploadStatus("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (file, targetType) => {
    if (!file) return;
    setUploadStatus(`Uploading ${targetType === "resume" ? "CV (PDF)" : "Profile Photo"}...`);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetType", targetType);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const now = Date.now();
        setPreviewTimestamp(now);
        
        if (targetType === "profile") {
          setConfig((prev) => ({ ...prev, profileImageUrl: data.url || `/photo/about.webp?v=${now}` }));
        }

        setUploadStatus(`✓ ${targetType === "resume" ? "CV (/resume.pdf)" : "Profile Photo"} updated live.`);
        setTimeout(() => setUploadStatus(""), 4000);
      } else {
        setUploadStatus("Upload failed. Verify server permissions.");
      }
    } catch {
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <div className="space-y-10 font-sans max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight font-mono">
          System Settings & Media Assets
        </h1>
        <p className="text-xs text-white/40 font-mono mt-1">
          Manage live availability status, resume PDF, profile photo, and core contact attributes.
        </p>
      </div>

      {uploadStatus && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-mono text-emerald-400">
          {uploadStatus}
        </div>
      )}

      {/* Media Uploads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CV / Resume Upload */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <FiFileText className="w-5 h-5 text-[#ff6b1a]" />
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Official CV / Resume (PDF)
              </h3>
              <p className="text-xs text-white/40 font-mono">Target: /resume.pdf</p>
            </div>
          </div>

          <p className="text-xs text-white/60 font-light leading-relaxed">
            Replaces the live public <code className="text-[#ff6b1a]">resume.pdf</code>. All navbar and mobile drawer download buttons will immediately serve this version.
          </p>

          <input
            type="file"
            ref={cvInputRef}
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files?.[0], "resume")}
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => cvInputRef.current?.click()}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff6b1a]/40 text-white font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <FiUploadCloud className="w-4 h-4 text-[#ff6b1a]" />
              <span>Upload New PDF</span>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs flex items-center justify-center"
            >
              View
            </a>
          </div>
        </div>

        {/* Profile Image Upload */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#ff6b1a]/40 bg-white/5 shrink-0">
              {/* Native img tag with timestamp bypasses next/image cache lock during dynamic upload */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/photo/about.webp?t=${previewTimestamp}`}
                alt="Profile Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/photo/about.webp";
                }}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Profile Portrait
              </h3>
              <p className="text-xs text-white/40 font-mono">Target: /photo/about.webp</p>
            </div>
          </div>

          <p className="text-xs text-white/60 font-light leading-relaxed">
            Updates your identity photo across the homepage About section and the `/about` engineering dossier.
          </p>

          <input
            type="file"
            ref={photoInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files?.[0], "profile")}
          />

          <button
            type="button"
            onClick={() => photoInputRef.current?.click()}
            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff6b1a]/40 text-white font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <FiUploadCloud className="w-4 h-4 text-[#ff6b1a]" />
            <span>Upload & Replace Photo</span>
          </button>
        </div>

      </div>

      {/* Global Configuration Form */}
      <form onSubmit={handleSaveConfig} className="bg-[#111] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
        <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider border-b border-white/5 pb-3">
          Live Portfolio Attributes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
          <div className="space-y-1.5">
            <label className="text-white/50 text-[10px] uppercase tracking-wider">Availability Status</label>
            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-white">
                <input
                  type="checkbox"
                  checked={config.availableForHire}
                  onChange={(e) => setConfig({ ...config, availableForHire: e.target.checked })}
                  className="accent-emerald-400 w-4 h-4"
                />
                <span>Active (Show Live Indicator)</span>
              </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-white/50 text-[10px] uppercase tracking-wider">Status Badge Label</label>
            <input
              type="text"
              value={config.availabilityText || ""}
              onChange={(e) => setConfig({ ...config, availabilityText: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-white/50 text-[10px] uppercase tracking-wider">Primary Email Address</label>
            <input
              type="email"
              value={config.contactEmail || ""}
              onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-white/50 text-[10px] uppercase tracking-wider">Primary Phone / WhatsApp</label>
            <input
              type="text"
              value={config.contactPhone || ""}
              onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-[#ff6b1a] hover:bg-[#ff8c42] text-black text-xs font-bold font-mono uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}