"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [mobileClassesExpanded, setMobileClassesExpanded] = useState(true);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Classes",
      href: "/classes",
      hasSub: true,
      subItems: [
        { name: "🎹 Piano Class", href: "/classes/piano" },
        { name: "🎸 Guitar Class", href: "/classes/guitar" },
        { name: "🎛 Keyboard Class", href: "/classes/keyboard" },
        { name: "🎼 All Classes Overview", href: "/classes" },
      ],
    },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#211126]/80 backdrop-blur-sm z-[9998] md:hidden"
            aria-hidden="true"
          />

          {/* Off-Canvas Slide-In Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 h-full w-[85vw] max-w-[340px] bg-[#211126] border-l border-[#F8F3E7]/15 p-6 z-[9999] md:hidden flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            <div>
              {/* Top Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <Link
                  href="/"
                  onClick={onClose}
                  className="font-serif text-2xl text-[#F8F3E7] tracking-wide"
                >
                  Alby<em className="font-serif italic text-[#E8A33D] not-italic">.sm</em>
                </Link>

                <button
                  onClick={onClose}
                  aria-label="Close Menu"
                  className="w-9 h-9 rounded-full bg-white/8 text-[#F8F3E7] hover:bg-[#E8A33D] hover:text-[#211126] flex items-center justify-center transition-colors text-xl font-bold border-none cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {/* Nav Items List */}
              <ul className="flex flex-col gap-2 list-none m-0 p-0">
                {navItems.map((link, idx) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href || pathname.startsWith(`${link.href}/`);

                  if (link.hasSub) {
                    return (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + idx * 0.03 }}
                        className="flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className={`flex-1 text-[15px] font-medium transition-all px-4 py-3 rounded-[4px] flex items-center justify-between ${
                              isActive
                                ? "bg-[#E8A33D] text-[#211126] font-bold shadow-md"
                                : "text-[#F8F3E7] hover:bg-white/8 hover:text-[#E8A33D]"
                            }`}
                          >
                            <span>{link.name}</span>
                            {isActive && <span className="text-xs">●</span>}
                          </Link>

                          <button
                            onClick={() => setMobileClassesExpanded(!mobileClassesExpanded)}
                            aria-label="Expand Classes Submenu"
                            className="p-3 text-[#F8F3E7]/70 hover:text-[#E8A33D] bg-transparent border-none cursor-pointer"
                          >
                            <svg
                              className={`w-4 h-4 transition-transform duration-200 ${
                                mobileClassesExpanded ? "rotate-180 text-[#E8A33D]" : ""
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
                          </button>
                        </div>

                        {/* Mobile Accordion Submenu */}
                        <AnimatePresence>
                          {mobileClassesExpanded && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 border-l-2 border-[#E8A33D]/30 flex flex-col gap-1 mt-1 mb-2 list-none"
                            >
                              {link.subItems?.map((sub) => {
                                const isSubActive = pathname === sub.href;
                                return (
                                  <li key={sub.href}>
                                    <Link
                                      href={sub.href}
                                      onClick={onClose}
                                      className={`text-sm font-medium transition-all px-3 py-2 rounded-[4px] block ${
                                        isSubActive
                                          ? "text-[#E8A33D] font-semibold bg-white/8"
                                          : "text-[#F8F3E7]/80 hover:text-[#E8A33D]"
                                      }`}
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  }

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.03 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`text-[15px] font-medium transition-all px-4 py-3 rounded-[4px] flex items-center justify-between ${
                          isActive
                            ? "bg-[#E8A33D] text-[#211126] font-bold shadow-md"
                            : "text-[#F8F3E7] hover:bg-white/8 hover:text-[#E8A33D]"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="text-xs">●</span>}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-white/10 mt-6">
              <Link
                href="/contact"
                onClick={onClose}
                className="w-full text-center bg-[#E8A33D] text-[#211126] font-semibold text-base py-3.5 px-6 rounded-[3px] transition-all hover:bg-white inline-block shadow-lg"
              >
                Book a Free Trial Class
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
