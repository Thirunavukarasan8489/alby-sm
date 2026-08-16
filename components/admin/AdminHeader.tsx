"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ExternalLink, LogOut, ChevronRight } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const pathname = usePathname();
  const router = useRouter();

  const getSectionTitle = () => {
    if (pathname === "/admin") return "Overview & Stats";
    if (pathname.startsWith("/admin/leads")) return "Leads & Enquiries";
    if (pathname.startsWith("/admin/testimonials")) return "Testimonials Management";
    return "Dashboard";
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-[#211126]/90 backdrop-blur-md border-b border-[#E8A33D]/20 px-4 sm:px-8 py-4 flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-[#F8F3E7] p-2 hover:bg-white/10 rounded-lg min-h-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5 text-[#E8A33D]" />
        </button>

        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 text-xs text-[#a89b8c]">
          <span className="font-medium">Alby Admin</span>
          {/* <ChevronRight className="w-3.5 h-3.5 text-white/30" /> */}
          <span className="font-bold text-[#E8A33D]">{getSectionTitle()}</span>
        </div>
      </div>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="px-3.5 py-1.5 rounded-lg bg-white/5 text-[#F8F3E7] text-xs font-semibold hover:bg-[#E8A33D] hover:text-[#211126] transition-all border border-white/10 flex items-center gap-1.5 min-h-[38px]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Site</span>
        </Link>

        <button
          onClick={handleLogout}
          className="px-3.5 py-1.5 rounded-lg bg-red-500/15 text-red-200 text-xs font-semibold hover:bg-red-500 hover:text-white transition-all border border-red-500/30 flex items-center gap-1.5 cursor-pointer min-h-[38px]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
