"use client";
import { useEffect, useState } from "react";
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiMail, 
  FiPhone, 
  FiInstagram, 
  FiYoutube, 
  FiCheck 
} from "react-icons/fi";

const LINK_FIELDS = [
  { key: "github", label: "GitHub", icon: FiGithub, placeholder: "https://github.com/MarkTechKe-design" },
  { key: "linkedin", label: "LinkedIn", icon: FiLinkedin, placeholder: "https://linkedin.com/in/oduor-mark" },
  { key: "twitter", label: "X / Twitter", icon: FiTwitter, placeholder: "https://x.com/MarkTechKe" },
  { key: "whatsapp", label: "WhatsApp Direct", icon: FiPhone, placeholder: "https://wa.me/254718178521" },
  { key: "email", label: "Primary Email", icon: FiMail, placeholder: "mailto:oduor.markochieng@gmail.com" },
  { key: "instagram", label: "Instagram", icon: FiInstagram, placeholder: "https://instagram.com/username (optional)" },
  { key: "youtube", label: "YouTube", icon: FiYoutube, placeholder: "https://youtube.com/@channel (optional)" },
];

export default function SocialLinksAdmin() {
  const [links, setLinks] = useState({});
  const [savingKey, setSavingKey] = useState(null);
  const [savedKey, setSavedKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data || {});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSave = async (key) => {
    setSavingKey(key);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: links[key] || "" }),
      });

      if (res.ok) {
        setSavedKey(key);
        setTimeout(() => setSavedKey(null), 2500);
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight font-mono">
          Social & Direct Communication Links
        </h1>
        <p className="text-xs text-white/40 font-mono mt-1">
          Manage public touchpoints. Updates synchronize across navigation bars, dossiers, and footer components.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-white/40">
          Loading synchronized links...
        </div>
      ) : (
        <div className="space-y-4">
          {LINK_FIELDS.map((field) => {
            const Icon = field.icon;
            const isSaving = savingKey === field.key;
            const isSaved = savedKey === field.key;

            return (
              <div
                key={field.key}
                className="bg-[#111] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3.5 w-full sm:w-1/3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#ff6b1a]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      {field.label}
                    </h3>
                    <p className="text-[10px] font-mono text-white/30 truncate">
                      {links[field.key] ? "Configured" : "Unset / Optional"}
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-3 w-full">
                  <input
                    type="text"
                    value={links[field.key] || ""}
                    placeholder={field.placeholder}
                    onChange={(e) => setLinks({ ...links, [field.key]: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#ff6b1a] transition-colors"
                  />
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => handleSave(field.key)}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all shrink-0 ${
                      isSaved
                        ? "bg-emerald-500 text-black"
                        : "bg-white/5 hover:bg-[#ff6b1a] hover:text-black border border-white/10 text-white"
                    }`}
                  >
                    {isSaving ? "Saving..." : isSaved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}