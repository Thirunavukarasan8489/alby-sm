"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Classes", href: "/classes" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
          className="md:hidden absolute top-full left-0 right-0 bg-[#211126] border-b border-[#F8F3E7]/10 p-6 flex flex-col gap-4 z-50 shadow-2xl"
        >
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {navItems.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`text-base font-medium transition-colors block py-2 ${
                      isActive
                        ? "text-[#E8A33D] font-semibold"
                        : "text-[#F8F3E7] hover:text-[#E8A33D]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            onClick={onClose}
            className="mt-2 text-center bg-[#E8A33D] text-[#211126] font-semibold text-base py-3 px-6 rounded-[2px] transition-all hover:bg-white"
          >
            Book a Trial
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
