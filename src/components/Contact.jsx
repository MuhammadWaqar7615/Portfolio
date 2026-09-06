"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

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
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                Inquiries & Collaboration
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
                Initiate a Conversation
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed font-light mt-4">
                Available for full-time engineering roles, high-impact contract work,
                or architectural consulting. Drop an inquiry below or reach out via direct channels.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/[0.08] text-xs font-mono">
              <div>
                <span className="text-gray-400 uppercase tracking-widest block mb-1">
                  Electronic Mail
                </span>
                <a
                  href="mailto:mwaqar7615@gmail.com"
                  className="text-white hover:text-accent transition-colors text-sm"
                >
                  mwaqar7615@gmail.com
                </a>
              </div>

              <div>
                <span className="text-gray-400 uppercase tracking-widest block mb-1">
                  Direct Line
                </span>
                <a
                  href="tel:+923115119984"
                  className="text-white hover:text-accent transition-colors text-sm"
                >
                  +92 311 5119984
                </a>
              </div>

              <div>
                <span className="text-gray-400 uppercase tracking-widest block mb-1">
                  Location
                </span>
                <span className="text-gray-200 text-sm">
                  Khanewal, Punjab, Pakistan (Remote Available)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/[0.08] bg-cardBg p-6 sm:p-10">
              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="space-y-6"
                aria-label="Direct inquiry form"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-widest text-gray-300 mb-2"
                  >
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-background border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-widest text-gray-300 mb-2"
                  >
                    Your Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-background border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-widest text-gray-300 mb-2"
                  >
                    Message / Project Details <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Briefly describe your objectives, timeline, or scope..."
                    className="w-full bg-background border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-sky-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === "submitting" ? "Transmitting..." : "Send Message →"}
                  </button>
                </div>

                {/* Accessible Feedback States */}
                <div aria-live="polite">
                  {status === "success" && (
                    <div className="p-4 border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono">
                      ✓ Inquiry transmitted successfully. I will review and respond promptly.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="p-4 border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-mono">
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
