"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import CyberTitle from "./CyberTitle";

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <section
      id="contact"
      aria-label="Contact and professional inquiries"
      className="py-24 sm:py-32 border-b border-white/[0.08] relative overflow-hidden"
    >
      <div className="editorial-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <CyberTitle
              title="CONTACT"
              subtext="Initiate a conversation. Available for high-impact roles, contracts, and engineering collaborations."
            />

            <div className="space-y-4 pt-4 border-t border-white/[0.08] text-xs font-opensans">
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
          <div className="lg:col-span-7">
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
          </div>
        </div>
      </div>
    </section>
  );
}
