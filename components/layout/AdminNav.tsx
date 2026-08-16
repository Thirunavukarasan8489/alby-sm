"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Users, MessageSquareQuote, LogOut, ArrowLeft, Music } from "lucide-react";

export const AdminNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const navItems = [
    {
      label: "Leads & Enrolments",
      href: "/admin/leads",
      icon: Users,
    },
    {
      label: "Testimonials",
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
    },
  ];

  return (
    <header className="bg-[#2c1732] border-b border-[#E8A33D]/20 mb-8 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          {/* Brand & Tabs */}
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
            <Link href="/admin/leads" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-[#E8A33D]/20 text-[#E8A33D] flex items-center justify-center border border-[#E8A33D]/30">
                <Music className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg font-bold text-[#F8F3E7] tracking-wide">
                Alby <span className="text-[#E8A33D] font-normal italic">Admin</span>
              </span>
            </Link>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1.5 bg-[#211126]/60 p-1.5 rounded-xl border border-white/10">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#E8A33D] text-[#211126] shadow-md"
                        : "text-[#cfc3b3] hover:text-[#F8F3E7] hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/"
              className="text-xs text-[#cfc3b3] hover:text-[#E8A33D] transition-colors flex items-center gap-1 min-h-[44px] px-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Website
            </Link>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-white/10 text-[#F8F3E7] text-xs font-semibold hover:bg-red-500/20 hover:text-red-300 transition-colors border border-white/10 flex items-center gap-1.5 cursor-pointer min-h-[44px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
