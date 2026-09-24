"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTION, COUNTRIES, DIRECT_CONTACT } from "@/app/contact/content";

gsap.registerPlugin(ScrollTrigger);

// Clean text by stripping out %, &, <, >, {, }, $, #, ^, ` and malformed URI symbols
function sanitizeInput(text) {
  if (!text) return "";
  return text.replace(/[%&$#^<>{}~`\\|]/g, "").trim();
}

export default function Contact({ standalone = false }) {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", reason: "" });
  const [contactType, setContactType] = useState("email"); // 'email' | 'whatsapp'
  const [countryCode, setCountryCode] = useState("+254"); // Default Kenya
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [status, setStatus] = useState("idle");

  const handlePhoneChange = (e) => {
    const clean = e.target.value.replace(/\D/g, "");
    setPhoneNumber(clean);
  };

  const handleCountryCodeChange = (e) => {
    let val = e.target.value.trim();
    if (!val.startsWith("+") && val.length > 0) {
      val = "+" + val.replace(/\D/g, "");
    }
    setCountryCode(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanName = sanitizeInput(form.name);
    const cleanReason = sanitizeInput(form.reason);

    if (contactType === "whatsapp") {
      const cleanPhone = phoneNumber.replace(/\D/g, "");
      const cleanCC = countryCode.replace(/[^\d+]/g, "");
      const fullSenderPhone = `${cleanCC}${cleanPhone}`;
      const destination = DIRECT_CONTACT.whatsappNumber || "254718178521";

      const messageLines = [
        `Hi Oduor Mark! My name is ${cleanName || "a client"}.`,
        "",
        `Scope / Inquiry: ${cleanReason || "Inquiry regarding software engineering / IT operations / digital marketing."}`,
        "",
        cleanPhone ? `My Contact: ${fullSenderPhone}` : ""
      ].filter(Boolean);

      const encodedMessage = encodeURIComponent(messageLines.join("\n"));
      window.open(`https://wa.me/${destination}?text=${encodedMessage}`, "_blank");
      return;
    }

    // Email Submission
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          email: form.email.trim(),
          message: cleanReason,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", reason: "" });
        setPhoneNumber("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-label", { y: 25, opacity: 0, duration: 0.5, delay: 0.3 });
      gsap.from(".contact-h", { y: 60, opacity: 0, duration: 0.8, ease: "power4.out", delay: 0.5 });
      gsap.from(".contact-form-box", { y: 35, opacity: 0, duration: 0.7, delay: 0.7 });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact-section"
      ref={ref}
      className="relative w-full bg-[#080808] text-white px-6 md:px-16 py-24 md:py-32 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Form Container */}
          <div className="lg:col-span-6 w-full contact-form-box">
            <div className="mb-8">
              <p className="contact-label text-[11px] text-[#ff6b1a] tracking-[0.45em] uppercase font-mono font-bold mb-3">
                {SECTION.label}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Initiate a Project or Opportunity
              </h3>
              <p className="text-xs md:text-sm text-white/50 mt-1">
                Open for Software Architecture, IT Operations & Digital Marketing engagements.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl">
              
              {/* Method Switcher */}
              <div className="grid grid-cols-2 p-1 bg-white/5 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setContactType("email")}
                  className={`py-2 text-xs font-mono font-bold rounded-lg uppercase tracking-wider transition-all ${
                    contactType === "email"
                      ? "bg-[#ff6b1a] text-black shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Email Message
                </button>
                <button
                  type="button"
                  onClick={() => setContactType("whatsapp")}
                  className={`py-2 text-xs font-mono font-bold rounded-lg uppercase tracking-wider transition-all ${
                    contactType === "whatsapp"
                      ? "bg-[#25D366] text-black shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  WhatsApp Direct
                </button>
              </div>

              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest text-white/50 font-mono">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kennedy Onjiro"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff6b1a] transition-colors text-sm"
                />
              </div>

              {/* Conditional Input: Email or Phone */}
              {contactType === "email" ? (
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-widest text-white/50 font-mono">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff6b1a] transition-colors text-sm"
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-widest text-white/50 font-mono">
                    Phone (WhatsApp)
                  </label>
                  <div className="flex gap-2 relative">
                    {/* Country Code manual input & dropdown trigger */}
                    <div className="relative">
                      <input
                        type="text"
                        value={countryCode}
                        onChange={handleCountryCodeChange}
                        onFocus={() => setShowDropdown(true)}
                        placeholder="+254"
                        className="w-24 bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white font-mono text-sm text-center focus:outline-none focus:border-[#25D366]"
                      />
                      {showDropdown && (
                        <>
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setShowDropdown(false)}
                          />
                          <div className="absolute top-full left-0 mt-2 w-56 max-h-56 overflow-y-auto bg-[#121212] border border-white/10 rounded-xl shadow-2xl z-30 p-1.5 space-y-1">
                            {COUNTRIES.map((c) => (
                              <button
                                key={c.name}
                                type="button"
                                onClick={() => {
                                  setCountryCode(`+${c.code}`);
                                  setShowDropdown(false);
                                }}
                                className="w-full text-left px-3 py-2 text-xs text-white/80 hover:bg-white/10 rounded-lg flex items-center justify-between"
                              >
                                <span>{c.flag} {c.name}</span>
                                <span className="font-mono text-white/40">+{c.code}</span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <input
                      type="tel"
                      required
                      placeholder="718 178 521"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#25D366] transition-colors text-sm font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Message / Scope */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest text-white/50 font-mono">
                  Project Scope or Opportunity
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your requirements (e.g. HMS platform deployment, IT network infrastructure, social media operations, or full-stack software development)..."
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff6b1a] transition-colors text-sm resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                  contactType === "whatsapp"
                    ? "bg-[#25D366] hover:bg-[#20ba59] text-black shadow-lg shadow-green-500/10"
                    : "bg-[#ff6b1a] hover:bg-[#ff8c42] text-black shadow-lg shadow-orange-500/10"
                }`}
              >
                {status === "sending"
                  ? "Transmitting..."
                  : contactType === "whatsapp"
                  ? "Open WhatsApp Direct →"
                  : "Send Message →"}
              </button>

              {status === "sent" && (
                <p className="text-center text-xs text-green-400 font-mono">
                  ✓ Message received successfully. I will get back to you shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-xs text-red-400 font-mono">
                  ✕ An error occurred. Please reach out directly on WhatsApp (+254 718 178 521).
                </p>
              )}
            </form>
          </div>

          {/* Right Column: "Let's build something cool." Headline */}
          <div className="lg:col-span-6 w-full flex flex-col justify-center space-y-6">
            <h2
              className="font-black text-white tracking-tighter leading-[0.88] contact-h"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              Let&apos;s build<br />
              <span className="text-white/30 font-light">something </span>
              <span className="text-[#ff6b1a] italic font-serif">cool.</span>
            </h2>

            <p className="text-base md:text-lg text-white/60 font-light max-w-md leading-relaxed">
              Got an engineering platform to scale, an institutional IT bottleneck to solve, or a digital brand presence to lead? Drop your details and let&apos;s collaborate.
            </p>

            <div className="pt-6 border-t border-white/5 space-y-2 text-xs font-mono text-white/50">
              <p>Direct Email: <a href={`mailto:${DIRECT_CONTACT.email}`} className="text-white hover:text-[#ff6b1a] transition-colors">{DIRECT_CONTACT.email}</a></p>
              <p>Direct Line / WhatsApp: <a href={`tel:${DIRECT_CONTACT.phone}`} className="text-white hover:text-[#ff6b1a] transition-colors">{DIRECT_CONTACT.phone}</a></p>
              <p>Location: {DIRECT_CONTACT.location}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}