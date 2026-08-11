"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Classes", href: "/classes" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#211126]/92 backdrop-blur-md">
      <nav className="flex items-center justify-between px-6 py-4.5 max-w-[1140px] mx-auto">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl sm:text-3xl text-[#F8F3E7] tracking-wide">
          Alby<em className="font-serif italic text-[#E8A33D] not-italic">.sm</em>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navItems.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#E8A33D] opacity-100 font-semibold"
                      : "text-[#F8F3E7] opacity-85 hover:opacity-100 hover:text-[#E8A33D]"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-block bg-[#E8A33D] text-[#211126] font-semibold text-sm px-5 py-2.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5"
        >
          Book a Trial
        </Link>

        {/* Burger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          className="md:hidden flex flex-col gap-1.25 bg-transparent border-none cursor-pointer p-2"
        >
          <span className="w-6 h-0.5 bg-[#F8F3E7] block"></span>
          <span className="w-6 h-0.5 bg-[#F8F3E7] block"></span>
          <span className="w-6 h-0.5 bg-[#F8F3E7] block"></span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
