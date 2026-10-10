"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import CyberTitle from "./CyberTitle";
import ContentScrollFade from "./ContentScrollFade";

export default function Contact({ presetId }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isPreset2 = presetId === "preset-2";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mwaqar7615@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("submitting");
    setErrorMessage("");

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_95ug8p8";
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_xl97ao4";
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "R9fDbaj9KoVL-LL8k";

    try {
      const response = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      if (response.status === 200 || response.text === "OK") {
        setStatus("success");
        if (formRef.current) formRef.current.reset();
      } else {
        setStatus("error");
        setErrorMessage("Unexpected response status from email provider.");
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setErrorMessage(
        err?.text || "Failed to dispatch message. Please try again or email directly."
      );
    }
  };

  if (isPreset2) {
    return (
      <section
        id="contact"
        aria-label="Contact and professional inquiries"
        className="py-20 md:py-28 px-4 md:px-6 relative z-10"
      >
        <div className="mx-auto max-w-6xl">
          {/* Section Heading with red dot */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#fafafa]">
              Contact
              <span className="text-red-500">.</span>
            </h2>
            <p className="mt-3 text-lg text-[#a1a1aa]">Want to know more? Let's build something great together</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Info & Social Channels */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bento-card p-6">
                <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold block mb-2">
                  Direct Electronic Mail
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="mailto:mwaqar7615@gmail.com"
                    className="text-[#fafafa] hover:text-red-400 text-sm font-semibold truncate transition-colors"
                  >
                    mwaqar7615@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white glass border border-white/10 transition-all text-xs"
                    title="Copy Email"
                  >
                    {copiedEmail ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="bento-card p-6">
                <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold block mb-1">
                  Location & Availability
                </span>
                <p className="text-[#fafafa] text-sm font-semibold">
                  Pakistan (Available for Remote & Relocation)
                </p>
                <p className="text-xs text-zinc-400 mt-1">Open to full-time and contractual roles worldwide.</p>
              </div>

              <div className="bento-card p-6">
                <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold block mb-3">
                  Professional Networks
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com/MuhammadWaqar7615"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl glass border border-white/10 hover:border-red-500/50 hover:text-red-400 text-xs font-medium text-[#fafafa] transition-all"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://linkedin.com/in/muhammad-waqar-7615"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl glass border border-white/10 hover:border-red-500/50 hover:text-red-400 text-xs font-medium text-[#fafafa] transition-all"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Obsidian Form */}
            <div className="lg:col-span-7">
              <div className="bento-card p-6 sm:p-8">
                <form
                  ref={formRef}
                  onSubmit={sendEmail}
                  className="space-y-5"
                  aria-label="Direct inquiry form"
                >
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#fafafa] placeholder-zinc-500 focus:border-red-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                    >
                      Your Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#fafafa] placeholder-zinc-500 focus:border-red-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                    >
                      Message / Project Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Briefly describe your requirements or ideas..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#fafafa] placeholder-zinc-500 focus:border-red-500 focus:outline-none transition-all resize-y"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white text-sm font-medium shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-600 pulse-glow-btn cursor-pointer disabled:opacity-50"
                    >
                      <span>{status === "submitting" ? "Transmitting..." : "Send Message"}</span>
                      <span>→</span>
                    </button>
                  </div>

                  {/* Feedback States */}
                  <div aria-live="polite">
                    {status === "success" && (
                      <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs shadow-md">
                        ✓ Inquiry transmitted successfully. I will review and get back to you promptly.
                      </div>
                    )}
                    {status === "error" && (
                      <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 text-xs shadow-md">
                        ✕ {errorMessage}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      aria-label="Contact and professional inquiries"
      className="py-24 sm:py-32 border-b border-white/[0.08] relative"
    >
      <div className="editorial-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries */}
          <div className="w-full lg:col-span-5 sticky top-16 lg:top-28 self-start z-30 bg-background/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none py-3 lg:py-0 border-b border-black/[0.06] dark:border-white/[0.08] lg:border-none transition-all">
            <CyberTitle
              title="CONTACT"
              subtext="Initiate a conversation. Available for high-impact roles, contracts, and engineering collaborations."
            />
            {/* Soft gradient dissolve for content scrolling under the sticky heading on mobile */}
            <div
              className="pointer-events-none absolute left-0 right-0 -bottom-10 h-10 bg-gradient-to-b from-background via-background/70 to-transparent lg:hidden"
              aria-hidden="true"
            />

            <div className="hidden lg:block space-y-4 pt-4 border-t border-white/[0.08] text-xs font-opensans">
              <div className="p-4 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-md">
                <span className="text-[#1fc3ff] font-bold uppercase tracking-wider block mb-1">
                  Electronic Mail
                </span>
                <a
                  href="mailto:mwaqar7615@gmail.com"
                  className="text-white hover:text-[#1fc3ff] transition-colors text-sm font-semibold truncate block"
                >
                  mwaqar7615@gmail.com
                </a>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-md">
                <span className="text-[#1fc3ff] font-bold uppercase tracking-wider block mb-1">
                  Direct Line
                </span>
                <a
                  href="tel:+923115119984"
                  className="text-white hover:text-[#1fc3ff] transition-colors text-sm font-semibold block"
                >
                  +92 311 5119984
                </a>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-md">
                <span className="text-[#1fc3ff] font-bold uppercase tracking-wider block mb-1">
                  Location & Availability
                </span>
                <span className="text-slate-300 text-sm block">
                  Pakistan (Available for Global Remote & Relocation)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Cyber Contact Form */}
          <ContentScrollFade isBottom={true} className="lg:col-span-7 space-y-6">
            {/* Mobile Contact Quick Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:hidden text-xs font-opensans">
              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-md">
                <span className="text-[#1fc3ff] font-bold uppercase tracking-wider text-[10px] block mb-0.5">
                  Electronic Mail
                </span>
                <a
                  href="mailto:mwaqar7615@gmail.com"
                  className="text-white hover:text-[#1fc3ff] transition-colors text-xs font-semibold truncate block"
                >
                  mwaqar7615@gmail.com
                </a>
              </div>

              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-md">
                <span className="text-[#1fc3ff] font-bold uppercase tracking-wider text-[10px] block mb-0.5">
                  Direct Line
                </span>
                <a
                  href="tel:+923115119984"
                  className="text-white hover:text-[#1fc3ff] transition-colors text-xs font-semibold block"
                >
                  +92 311 5119984
                </a>
              </div>

              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-md">
                <span className="text-[#1fc3ff] font-bold uppercase tracking-wider text-[10px] block mb-0.5">
                  Location & Availability
                </span>
                <span className="text-slate-300 text-xs block">
                  Pakistan (Remote & Relocation)
                </span>
              </div>
            </div>

            <div className="cyber-glow-card p-6 sm:p-10">
              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="space-y-6"
                aria-label="Direct inquiry form"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 font-opensans"
                  >
                    Your Name <span className="text-[#1fc3ff]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#06090e]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#1fc3ff] focus:ring-1 focus:ring-[#1fc3ff] focus:outline-none transition-all shadow-inner font-opensans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 font-opensans"
                  >
                    Your Email Address <span className="text-[#1fc3ff]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-[#06090e]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#1fc3ff] focus:ring-1 focus:ring-[#1fc3ff] focus:outline-none transition-all shadow-inner font-opensans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 font-opensans"
                  >
                    Message / Project Details <span className="text-[#1fc3ff]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Briefly describe your project objectives, timeline, or scope..."
                    className="w-full bg-[#06090e]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#1fc3ff] focus:ring-1 focus:ring-[#1fc3ff] focus:outline-none transition-all shadow-inner font-opensans resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="cyber-floating-btn cyber-floating-btn-solid text-xs py-3 px-8 w-full sm:w-auto cursor-pointer disabled:opacity-50"
                  >
                    <span>{status === "submitting" ? "Transmitting..." : "Send Message"}</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Feedback States */}
                <div aria-live="polite">
                  {status === "success" && (
                    <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-opensans shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                      ✓ Inquiry transmitted successfully. I will review and respond promptly.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 text-xs font-opensans shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                      ✕ {errorMessage}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </ContentScrollFade>
        </div>
      </div>
    </section>
  );
}
