"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MobileNav } from "./MobileNav";
import PianoIcon from "../icons/PianoIcon";
import Image from "next/image";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [classesDropdownOpen, setClassesDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Classes",
      href: "/classes",
      hasDropdown: true,
      subItems: [
        {
          name: "Piano",
          href: "/classes/piano",
          desc: "Classical & contemporary technique, ear training",
          icon: <PianoIcon size={24} />,
        },
        {
          name: "Guitar",
          href: "/classes/guitar",
          desc: "Acoustic & electric, strumming & lead soloing",
          icon: "🎸",
        },
        {
          name: "Keyboard",
          href: "/classes/keyboard",
          desc: "Synthesizers, arranger styles & tone layering",
          icon: "🎹",
        },
        {
          name: "Theory of Music",
          href: "/classes",
          desc: "Compare programs, levels & batch timings",
          icon: "🎼",
        },
      ],
    },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#211126]/95 backdrop-blur-md border-b border-white/8">
        <nav className="flex items-center justify-between px-6 py-4 max-w-[1140px] mx-auto">
          {/* Logo */}
          {/* <Link
            href="/"
            className="font-serif text-2xl sm:text-3xl text-[#F8F3E7] tracking-wide"
          >
            Alby
            <em className="font-serif italic text-[#E8A33D] not-italic">.sm</em>
          </Link> */}
          <Link
            href="/"
            className="h-14 w-14 rounded-full flex items-center justify-center border-amber/80 border-2"
          >
            <Image
              src={"/logo.png"}
              width={200}
              height={200}
              alt="Alby sm logo"
              className="h-12 w-12 rounded-full"
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
            {navItems.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              if (link.hasDropdown) {
                return (
                  <li
                    key={link.href}
                    className="relative py-2"
                    onMouseEnter={() => setClassesDropdownOpen(true)}
                    onMouseLeave={() => setClassesDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`text-[14.5px] uppercase font-medium transition-all px-3 py-1.5 rounded-[4px] inline-flex items-center gap-1.5 relative ${
                        isActive
                          ? "text-[#E8A33D] font-semibold bg-white/6"
                          : "text-[#F8F3E7]/85 hover:text-[#E8A33D] hover:bg-white/4"
                      }`}
                    >
                      <span>{link.name}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          classesDropdownOpen
                            ? "rotate-180 text-[#E8A33D]"
                            : "text-[#F8F3E7]/70"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>

                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8A33D] rounded-full" />
                      )}
                    </Link>

                    {/* Submenu Dropdown Panel */}
                    <AnimatePresence>
                      {classesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-[#2c1732] border border-[#E8A33D]/25 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-3.5 z-50 flex flex-col gap-1"
                        >
                          {link.subItems?.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={`flex uppercase items-start gap-3 p-2.5 rounded-md transition-all ${
                                  isSubActive
                                    ? "bg-[#E8A33D] text-[#211126] font-semibold shadow-md"
                                    : "text-[#F8F3E7] hover:bg-[#E8A33D]/12 hover:text-[#E8A33D]"
                                }`}
                              >
                                <span className="text-xl shrink-0 mt-0.5">
                                  {sub.icon}
                                </span>
                                <div>
                                  <strong className="block text-[14px] leading-snug">
                                    {sub.name}
                                  </strong>
                                  <span
                                    className={`block text-[11.5px] mt-0.5 leading-tight ${
                                      isSubActive
                                        ? "text-[#211126]/80"
                                        : "text-[#cfc3b3]"
                                    }`}
                                  >
                                    {sub.desc}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={link.href} className="relative py-2">
                  <Link
                    href={link.href}
                    className={`text-[14.5px] uppercase font-medium transition-all px-3 py-1.5 rounded-[4px] relative ${
                      isActive
                        ? "text-[#E8A33D] font-semibold bg-white/6"
                        : "text-[#F8F3E7]/85 hover:text-[#E8A33D] hover:bg-white/4"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8A33D] rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-block bg-[#E8A33D] text-[#211126] font-semibold text-sm px-5 py-2.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5 shadow-md"
          >
            Join Now
          </Link>

          {/* Burger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-transparent border-none cursor-pointer p-2 z-50 rounded-lg hover:bg-white/8 transition-colors"
          >
            <span
              className={`w-6 h-0.5 bg-[#F8F3E7] rounded-full transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2 bg-[#E8A33D]" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#F8F3E7] rounded-full transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#F8F3E7] rounded-full transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2 bg-[#E8A33D]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Off-Canvas Drawer (Outside header to avoid backdrop-blur containing block restriction) */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
