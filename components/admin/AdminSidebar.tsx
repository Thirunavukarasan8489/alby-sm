"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquareQuote,
  Image as ImageIcon,
  Award,
  ExternalLink,
  LogOut,
  Music,
  X,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  leadCount?: number;
  testimonialCount?: number;
  galleryCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  mobileOpen = false,
  setMobileOpen,
  leadCount = 0,
  testimonialCount = 0,
  galleryCount = 0,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const navItems = [
    {
      label: "Dashboard Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Leads & Enquiries",
      href: "/admin/leads",
      icon: Users,
      badge: leadCount > 0 ? leadCount : null,
    },
    {
      label: "Testimonials",
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
      badge: testimonialCount > 0 ? testimonialCount : null,
    },
    {
      label: "Photo Gallery",
      href: "/admin/gallery",
      icon: ImageIcon,
      badge: galleryCount > 0 ? galleryCount : null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#120715]/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#1c0d20] border-r border-[#E8A33D]/20 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link
              href="/admin"
              className="flex items-center gap-3"
              onClick={() => setMobileOpen && setMobileOpen(false)}
            >
              <div className="w-10 h-10 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] flex items-center justify-center border border-[#E8A33D]/30 shadow-inner shrink-0">
                {/* <Music className="w-5 h-5" /> */}
                <Image
                  src={"/logo.png"}
                  width={200}
                  height={200}
                  alt="Alby sm logo"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <div>
                <h1 className="font-serif text-lg font-bold text-[#F8F3E7] leading-none tracking-wide">
                  Alby{" "}
                  <span className="text-[#E8A33D] font-normal italic">
                    Admin
                  </span>
                </h1>
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#a89b8c] mt-1 block">
                  Management Suite
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className="lg:hidden text-[#cfc3b3] hover:text-[#E8A33D] p-1"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items List */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              // if (item.href) {
              //   return (
              //     <a
              //       key={item.label}
              //       href={item.href}
              //       target="_blank"
              //       rel="noopener noreferrer"
              //       className="flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-[#cfc3b3] hover:text-[#F8F3E7] hover:bg-white/5 transition-all group"
              //     >
              //       <div className="flex items-center gap-3">
              //         <Icon className="w-4 h-4 text-[#a89b8c] group-hover:text-[#E8A33D] transition-colors" />
              //         <span>{item.label}</span>
              //       </div>
              //       <ExternalLink className="w-3.5 h-3.5 text-[#a89b8c]/60 group-hover:text-[#E8A33D] transition-colors" />
              //     </a>
              //   );
              // }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen && setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-[#E8A33D] text-[#211126] font-bold shadow-[0_4px_15px_rgba(232,163,61,0.3)]"
                      : "text-[#cfc3b3] hover:text-[#F8F3E7] hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? "text-[#211126]"
                          : "text-[#a89b8c] group-hover:text-[#E8A33D] transition-colors"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                        isActive
                          ? "bg-[#211126] text-[#E8A33D]"
                          : "bg-[#E8A33D]/20 text-[#E8A33D] border border-[#E8A33D]/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 text-[#F8F3E7] text-xs font-semibold hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#E8A33D]" />
            <span>View Live Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 rounded-xl bg-red-500/15 text-red-200 text-xs font-semibold hover:bg-red-500 hover:text-white transition-all border border-red-500/30 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
