"use client";

export default function CyberTitle({ title, subtext, className = "" }) {
  if (!title) return null;

  return (
    <div className={`cyber-title-wrap mb-10 ${className}`}>
      <span className="cyber-primary-title font-fugaz">{title}</span>
      <span className="cyber-secondary-title font-fugaz -mt-2 sm:-mt-4">
        {title}
      </span>
      {subtext && (
        <p className="mt-3 text-xs sm:text-sm font-opensans text-slate-300 max-w-lg tracking-wide uppercase font-medium">
          {subtext}
        </p>
      )}
    </div>
  );
}
