"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactBar } from "@/components/ui/FloatingContactBar";

export function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="flex-1 min-h-screen flex flex-col">{children}</main>;
  }

  return (
    <>
      <Header />
      <FloatingContactBar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
