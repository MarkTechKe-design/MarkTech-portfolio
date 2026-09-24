"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMail, FiPhone, FiCheck, FiArrowRight } from "react-icons/fi";

const DEFAULT_LINKS = {
  whatsapp: "https://wa.me/254718178521",
  email: "oduor.markochieng@gmail.com",
};

export default function ContactView() {
  const [links, setLinks] = useState(DEFAULT_LINKS);
  const [contactType, setContactType] = useState("email");
  const [form, setForm] = useState({ name: "", contact: "", reason: "" });
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'

  useEffect(() => {
    fetch("/api/links")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === "object") {
          setLinks((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    if (contactType === "phone") {
      // Extract target number from saved links or default
      const rawNumber = links.whatsapp ? links.whatsapp.replace(/[^0-9]/g, "") : "254718178521";
      const msg = encodeURIComponent(
        `Hello Mark (Mark Tech),\n\nMy Name: ${form.name}\nContact: ${form.contact}\n\nProject Scope / Inquiry:\n${form.reason}`
      );
      window.open(`https://wa.me/${rawNumber}?text=${msg}`, "_blank");
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.contact,
          phone: "Web Contact Form",
          message: form.reason,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", contact: "", reason: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white px-6 md:px-16 pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 pb-8 border-b border-white/5">
          <p className="text-[11px] text-[#ff6b1a] tracking-[0.45em] uppercase font-mono font-bold">
            Direct Discussion
          </p>
          <h1
            className="font-black text-white tracking-tighter leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Initiate Contact.<br />
            <span className="text-white/20">Let&apos;s Build.</span>
          </h1>
          <p className="text-sm md:text-base text-white/60 font-light leading-relaxed max-w-xl">
            Available for enterprise software engineering, clinical informatics advisory, and IT infrastructure administration.
          </p>
        </div>

        {/* Contact Selection Form */}
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 md:p-10 space-y-8">
          <div className="flex bg-white/5 p-1 rounded-xl max-w-xs font-mono text-xs">
            <button
              type="button"
              onClick={() => setContactType("email")}
              className={`flex-1 py-2.5 rounded-lg font-bold uppercase tracking-wider transition-all ${
                contactType === "email" ? "bg-[#ff6b1a] text-black shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              Direct Email
            </button>
            <button
              type="button"
              onClick={() => setContactType("phone")}
              className={`flex-1 py-2.5 rounded-lg font-bold uppercase tracking-wider transition-all ${
                contactType === "phone" ? "bg-emerald-500 text-black shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              WhatsApp
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
            <div className="space-y-2">
              <label className="text-white/50 uppercase tracking-widest text-[10px]">Your Name / Entity</label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe / Institution Representative"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b1a] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/50 uppercase tracking-widest text-[10px]">
                {contactType === "email" ? "Your Email Address" : "Your Phone / WhatsApp Number"}
              </label>
              <input
                type={contactType === "email" ? "email" : "text"}
                required
                placeholder={contactType === "email" ? "name@institution.com" : "+254..."}
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b1a] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/50 uppercase tracking-widest text-[10px]">Project Scope / Subject</label>
              <textarea
                rows={4}
                required
                placeholder="Outline systems requirements, clinical architecture, consulting inquiry..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b1a] transition-colors resize-none"
              />
            </div>

            {status === "success" && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 flex items-center gap-2">
                <FiCheck className="w-4 h-4 shrink-0" />
                <span>
                  {contactType === "phone"
                    ? "WhatsApp chat initiated successfully."
                    : "Inquiry transmitted directly to Mark Tech operations console."}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                contactType === "phone"
                  ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/10"
                  : "bg-[#ff6b1a] hover:bg-[#ff8c42] text-black shadow-lg shadow-orange-500/10"
              }`}
            >
              <span>
                {status === "sending"
                  ? "Transmitting..."
                  : contactType === "phone"
                  ? "Open WhatsApp Chat"
                  : "Send Direct Message"}
              </span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Quick Back to Overview */}
        <div className="pt-4 flex justify-between items-center text-xs font-mono text-white/40">
          <Link href="/" className="hover:text-white transition-colors">
            ← Return to Overview
          </Link>
          <span>Siaya & Nairobi, Kenya</span>
        </div>
      </div>
    </main>
  );
}