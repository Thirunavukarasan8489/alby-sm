"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [leadCount, setLeadCount] = useState(0);
  const [testimonialCount, setTestimonialCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);

  // If login route, don't wrap with layout shell
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    // Fetch counts for sidebar badges
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.metrics) {
          setLeadCount(data.metrics.total || 0);
        }
      })
      .catch(() => {});

    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.testimonials)) {
          setTestimonialCount(data.testimonials.length);
        }
      })
      .catch(() => {});

    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.items)) {
          setGalleryCount(data.items.length);
        }
      })
      .catch(() => {});
  }, [pathname, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#180b1d] text-[#F8F3E7] flex">
      {/* Persistent Left Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        leadCount={leadCount}
        testimonialCount={testimonialCount}
        galleryCount={galleryCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
