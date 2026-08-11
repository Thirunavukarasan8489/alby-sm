import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  geoSummary?: string;
  centered?: boolean;
  theme?: "dark" | "light";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  geoSummary,
  centered = true,
  theme = "dark",
  className = "",
}) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`mb-12 max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      {badge && (
        <span
          className={`inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider rounded-full ${
            isDark
              ? "bg-[#E8A33D]/20 text-[#E8A33D] border border-[#E8A33D]/30"
              : "bg-[#17514E]/20 text-[#17514E] border border-[#17514E]/30"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl md:text-5xl font-serif tracking-tight mb-4 ${
          isDark ? "text-[#F8F3E7]" : "text-[#211126]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg ${
            isDark ? "text-[#F8F3E7]/80" : "text-[#2B2420]/80"
          }`}
        >
          {subtitle}
        </p>
      )}
      {geoSummary && (
        <p
          className={`mt-3 text-sm italic font-sans ${
            isDark ? "text-[#E8A33D]/90" : "text-[#17514E]"
          }`}
        >
          {geoSummary}
        </p>
      )}
    </div>
  );
};
