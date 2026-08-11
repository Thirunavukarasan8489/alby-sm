import React from "react";
import Link from "next/link";
import { Music, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-[#211126] text-[#F8F3E7] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-[#2c1732] p-8 rounded-3xl border border-[#E8A33D]/30 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#E8A33D]/20 text-[#E8A33D] flex items-center justify-center mx-auto">
          <Music className="w-8 h-8" />
        </div>

        <h1 className="text-6xl font-serif font-bold text-[#E8A33D]">404</h1>

        <h2 className="text-2xl font-serif font-bold text-[#F8F3E7]">
          Off-Key Note! Page Not Found
        </h2>

        <p className="text-sm text-[#F8F3E7]/80 leading-relaxed">
          The page you are looking for might have been moved, renamed, or doesn&apos;t exist. Let&apos;s guide you back to our music academy homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button href="/" variant="primary" size="md">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Home</span>
          </Button>

          <Button href="/classes" variant="outline" size="md">
            <span>Browse Classes</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
