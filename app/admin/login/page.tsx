"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, Eye, EyeOff, Lock, Music } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check if already authenticated
  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.push("/admin");
        }
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg("Please enter your admin password");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
      } else {
        setErrorMsg(data.message || "Invalid admin password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#211126] text-[#F8F3E7] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(232,163,61,0.18),transparent_65%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#2c1732] border border-[#E8A33D]/30 rounded-2xl p-8 sm:p-10 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#E8A33D]/15 text-[#E8A33D] flex items-center justify-center mx-auto mb-4 border border-[#E8A33D]/30 shadow-inner">
            <Music className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#F8F3E7]">
            Academy Admin Portal
          </h1>
          <p className="text-xs text-[#cfc3b3] mt-2">
            Alby School of Music Management
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-center gap-2.5">
            <Lock className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2">
              Admin Access Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-[#211126] border border-[#F8F3E7]/20 rounded-xl px-4 py-3.5 pr-12 text-sm text-[#F8F3E7] placeholder-[#a89b8c] focus:outline-none focus:border-[#E8A33D] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a89b8c] hover:text-[#E8A33D] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#E8A33D] text-[#211126] font-bold text-sm hover:bg-white transition-all duration-200 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer min-h-[44px]"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-[#211126] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Access Management Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-5">
          <Link
            href="/"
            className="text-xs text-[#cfc3b3] hover:text-[#E8A33D] transition-colors"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
