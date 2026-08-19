"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  MessageSquareQuote,
  ImageIcon,
  Award,
  ArrowRight,
  Sparkles,
  PhoneCall,
  ChevronRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface LeadItem {
  _id: string;
  name: string;
  phone: string;
  fullPhone: string;
  email: string;
  instrument: string;
  preferredTime: string;
  status: "new" | "contacted" | "enrolled" | "archived";
  createdAt: string;
}

export default function AdminOverviewPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    enrolledCount: 0,
    trialCount: 0,
    testimonialCount: 0,
    galleryCount: 12,
    examBoardsCount: 3,
  });
  const [recentLeads, setRecentLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverviewData = async () => {
      try {
        const authRes = await fetch("/api/admin/me");
        const authData = await authRes.json();

        if (!authData.authenticated) {
          router.push("/admin/login");
          return;
        }

        // Fetch leads data
        const leadsRes = await fetch("/api/admin/leads");
        const leadsData = await leadsRes.json();

        // Fetch testimonials data
        const testimonialsRes = await fetch("/api/testimonials");
        const testimonialsData = await testimonialsRes.json();

        // Fetch gallery data
        const galleryRes = await fetch("/api/gallery");
        const galleryData = await galleryRes.json();

        let enrolled = 0;
        let totalLeads = 0;
        let latestLeads: LeadItem[] = [];

        if (leadsData.success) {
          totalLeads = leadsData.metrics?.total || 0;
          enrolled = leadsData.metrics?.enrolledCount || 0;
          latestLeads = (leadsData.leads || []).slice(0, 5);
        }

        let testimonialsTotal = 0;
        if (
          testimonialsData.success &&
          Array.isArray(testimonialsData.testimonials)
        ) {
          testimonialsTotal = testimonialsData.testimonials.length;
        }

        let galleryTotal = 0;
        if (galleryData.success && Array.isArray(galleryData.items)) {
          galleryTotal = galleryData.items.length;
        }

        setStats({
          enrolledCount: enrolled,
          trialCount: totalLeads,
          testimonialCount: testimonialsTotal,
          galleryCount: galleryTotal,
          examBoardsCount: 3,
        });

        setRecentLeads(latestLeads);
      } catch (err) {
        console.error("Failed to load overview data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOverviewData();
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* ---------- WELCOME HERO BANNER ---------- */}
      <div className="bg-gradient-to-r from-[#211126] via-[#2c1732] to-[#211126] border border-[#E8A33D]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#E8A33D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8A33D]/15 text-[#E8A33D] border border-[#E8A33D]/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Alby School of Music Admin Suite</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F3E7] leading-tight mb-3">
            Control Website & Leads{" "}
            <span className="text-[#E8A33D] font-normal italic">Without Code</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#cfc3b3] leading-relaxed max-w-2xl">
            Manage student trial enquiries, track active enrolled students in real time, update homepage testimonials, and oversee academy content seamlessly.
          </p>
        </div>
      </div>

      {/* ---------- SUMMARY STAT TILES ROW (5 TILES) ---------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {/* Tile 1: Enrolled Students */}
        <Link
          href="/admin/leads?status=enrolled"
          className="bg-[#2c1732] border border-emerald-500/30 rounded-2xl p-5 shadow-lg hover:border-emerald-400 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              View <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-emerald-300">
              {stats.enrolledCount}
            </div>
            <div className="text-xs text-emerald-200/80 font-medium mt-1">
              Registered Enrolments
            </div>
          </div>
        </Link>

        {/* Tile 2: Trial Inquiries */}
        <Link
          href="/admin/leads"
          className="bg-[#2c1732] border border-[#E8A33D]/25 rounded-2xl p-5 shadow-lg hover:border-[#E8A33D] transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#E8A33D]/18 text-[#E8A33D] flex items-center justify-center border border-[#E8A33D]/30">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#E8A33D] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Inquiries <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#F8F3E7]">
              {stats.trialCount}
            </div>
            <div className="text-xs text-[#cfc3b3] font-medium mt-1">
              Trial Inquiries
            </div>
          </div>
        </Link>

        {/* Tile 3: Student Reviews */}
        <Link
          href="/admin/testimonials"
          className="bg-[#2c1732] border border-purple-500/30 rounded-2xl p-5 shadow-lg hover:border-purple-400 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-purple-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-purple-200">
              {stats.testimonialCount}
            </div>
            <div className="text-xs text-purple-200/80 font-medium mt-1">
              Student Reviews
            </div>
          </div>
        </Link>

        {/* Tile 4: Gallery Photos */}
        <Link
          href="/admin/gallery"
          className="bg-[#2c1732] border border-blue-500/30 rounded-2xl p-5 shadow-lg hover:border-blue-400 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-500/30">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-blue-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Gallery <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-blue-200">
              {stats.galleryCount}
            </div>
            <div className="text-xs text-blue-200/80 font-medium mt-1">
              Gallery Photos
            </div>
          </div>
        </Link>

        {/* Tile 5: Exam Boards */}
        <Link
          href="/#exams"
          target="_blank"
          className="bg-[#2c1732] border border-rose-500/30 rounded-2xl p-5 shadow-lg hover:border-rose-400 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-rose-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Exams <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-rose-200">
              {stats.examBoardsCount}
            </div>
            <div className="text-xs text-rose-200/80 font-medium mt-1">
              Affiliated Boards
            </div>
          </div>
        </Link>
      </div>

      {/* ---------- QUICK MANAGEMENT ACTIONS & RECENT ACTIVITY ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Quick Action Shortcuts */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#F8F3E7]">
            Quick Management Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/leads"
              className="bg-[#2c1732] border border-[#E8A33D]/20 rounded-2xl p-6 hover:border-[#E8A33D] transition-all group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E8A33D]/18 text-[#E8A33D] flex items-center justify-center mb-4 border border-[#E8A33D]/30">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#F8F3E7] group-hover:text-[#E8A33D] transition-colors mb-1">
                  Manage Trial Enquiries →
                </h3>
                <p className="text-xs text-[#cfc3b3] leading-relaxed">
                  Review student booking requests, update enrolment statuses, and initiate 1-click WhatsApp chats.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/testimonials"
              className="bg-[#2c1732] border border-[#E8A33D]/20 rounded-2xl p-6 hover:border-[#E8A33D] transition-all group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E8A33D]/18 text-[#E8A33D] flex items-center justify-center mb-4 border border-[#E8A33D]/30">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#F8F3E7] group-hover:text-[#E8A33D] transition-colors mb-1">
                  Manage Testimonials →
                </h3>
                <p className="text-xs text-[#cfc3b3] leading-relaxed">
                  Add, edit, or remove student reviews and parent ratings displayed on the homepage slider.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/gallery"
              className="bg-[#2c1732] border border-[#E8A33D]/20 rounded-2xl p-6 hover:border-[#E8A33D] transition-all group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E8A33D]/18 text-[#E8A33D] flex items-center justify-center mb-4 border border-[#E8A33D]/30">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#F8F3E7] group-hover:text-[#E8A33D] transition-colors mb-1">
                  View Photo Gallery →
                </h3>
                <p className="text-xs text-[#cfc3b3] leading-relaxed">
                  Inspect stage recital photos, studio practice images, and academy facility showcases.
                </p>
              </div>
            </Link>

            <Link
              href="/#exams"
              target="_blank"
              className="bg-[#2c1732] border border-[#E8A33D]/20 rounded-2xl p-6 hover:border-[#E8A33D] transition-all group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E8A33D]/18 text-[#E8A33D] flex items-center justify-center mb-4 border border-[#E8A33D]/30">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#F8F3E7] group-hover:text-[#E8A33D] transition-colors mb-1">
                  Grade Exam Accreditations →
                </h3>
                <p className="text-xs text-[#cfc3b3] leading-relaxed">
                  Explore Trinity College London, Rockschool RSL, and LCM grade examination preparation details.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Right 1 Col: Recent Enquiries Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#F8F3E7]">
              Recent Enquiries
            </h2>
            <Link
              href="/admin/leads"
              className="text-xs text-[#E8A33D] hover:underline font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="bg-[#2c1732] border border-white/10 rounded-2xl p-5 divide-y divide-white/10 shadow-xl">
            {loading ? (
              <div className="py-8 text-center text-xs text-[#cfc3b3]">
                Loading recent enquiries...
              </div>
            ) : recentLeads.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#a89b8c]">
                No recent enquiries found.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead._id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-[#F8F3E7]">
                      {lead.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.status === "enrolled"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : lead.status === "contacted"
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {lead.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#cfc3b3] flex items-center justify-between">
                    <span>🎹 {lead.instrument}</span>
                    <span>{lead.fullPhone}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
