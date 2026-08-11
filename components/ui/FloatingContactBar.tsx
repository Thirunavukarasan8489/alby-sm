"use client";

import React, { useState } from "react";
import { ACADEMY_INFO } from "@/lib/constants";

const PhoneIcon = () => (
  <svg
    className="w-5.5 h-5.5 fill-[#007AFF] transition-transform duration-200 group-hover:scale-110"
    viewBox="0 0 24 24"
  >
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57a1 1 0 01-.27 1.11l-2.3 2.31z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg
    className="w-5.5 h-5.5 fill-[#25D366] relative z-10"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="w-5.5 h-5.5 fill-[#EA4335] transition-transform duration-200 group-hover:scale-110"
    viewBox="0 0 24 24"
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-5.5 h-5.5 fill-[#1877F2] transition-transform duration-200 group-hover:scale-110"
    viewBox="0 0 24 24"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="w-5.5 h-5.5 transition-transform duration-200 group-hover:scale-110"
    viewBox="0 0 24 24"
  >
    <radialGradient id="igGrad" cx="30%" cy="107%" r="128%" fx="30%" fy="107%">
      <stop offset="0%" stopColor="#fdf497" />
      <stop offset="5%" stopColor="#fdf497" />
      <stop offset="45%" stopColor="#fd5949" />
      <stop offset="60%" stopColor="#d6249f" />
      <stop offset="90%" stopColor="#285AEB" />
    </radialGradient>
    <path
      fill="url(#igGrad)"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    />
  </svg>
);

export const FloatingContactBar: React.FC = () => {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const actionItems = [
    {
      id: "phone",
      label: "Call Us",
      href: `tel:${ACADEMY_INFO.phoneRaw}`,
      icon: <PhoneIcon />,
      target: "_self",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: ACADEMY_INFO.whatsappUrl,
      icon: <WhatsappIcon />,
      target: "_blank",
    },
    {
      id: "email",
      label: "Email Us",
      href: `mailto:${ACADEMY_INFO.email}`,
      icon: <EmailIcon />,
      target: "_self",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: ACADEMY_INFO.socials.facebook,
      icon: <FacebookIcon />,
      target: "_blank",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: ACADEMY_INFO.socials.instagram,
      icon: <InstagramIcon />,
      target: "_blank",
    },
  ];

  return (
    <aside
      aria-label="Floating Quick Contact & Social Links"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5 pointer-events-auto"
    >
      {actionItems.map((item) => (
        <div
          key={item.id}
          className="relative flex items-center justify-end group"
        >
          {/* Hover Tooltip (Desktop) */}
          <span
            className={`hidden sm:block absolute right-full mr-3 px-3 py-1.5 bg-[#211126] text-[#F8F3E7] text-xs font-semibold whitespace-nowrap shadow-lg pointer-events-none transition-all duration-200 ${
              hoveredLabel === item.id
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
            }`}
          >
            {item.label}
          </span>

          {/* Icon Tile */}
          <a
            href={item.href}
            target={item.target}
            rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
            onMouseEnter={() => setHoveredLabel(item.id)}
            onMouseLeave={() => setHoveredLabel(null)}
            aria-label={item.label}
            className="w-11 h-11 sm:w-12 sm:h-12 bg-white border border-black/10 shadow-[0_6px_16px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-[0_8px_20px_rgba(0,0,0,0.22)] active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
          >
            {item.icon}
          </a>
        </div>
      ))}
    </aside>
  );
};
