"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/layout/AdminNav";
import {
  Users,
  GraduationCap,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Mail,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  RefreshCw,
  X,
  Phone,
} from "lucide-react";

interface LeadItem {
  _id: string;
  name: string;
  countryCode: string;
  phone: string;
  fullPhone: string;
  email: string;
  instrument: string;
  preferredTime: string;
  message?: string;
  status: "new" | "contacted" | "enrolled" | "archived";
  createdAt: string;
}

interface Metrics {
  total: number;
  newCount: number;
  contactedCount: number;
  enrolledCount: number;
  archivedCount: number;
}

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    total: 0,
    newCount: 0,
    contactedCount: 0,
    enrolledCount: 0,
    archivedCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [instrumentFilter, setInstrumentFilter] = useState<string>("all");

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Load Leads Data
  const loadLeads = async () => {
    try {
      const authRes = await fetch("/api/admin/me");
      const authData = await authRes.json();

      if (!authData.authenticated) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("/api/admin/leads");
      const data = await res.json();

      if (data.success) {
        setLeads(data.leads || []);
        setMetrics(
          data.metrics || {
            total: 0,
            newCount: 0,
            contactedCount: 0,
            enrolledCount: 0,
            archivedCount: 0,
          }
        );
      }
    } catch (err) {
      console.error("Error loading leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: `Status updated to ${newStatus.toUpperCase()}`,
        });

        // Update local state
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, status: newStatus as any } : l))
        );

        // Recalculate metrics
        setMetrics((prev) => {
          const oldLead = leads.find((l) => l._id === id);
          if (!oldLead || oldLead.status === newStatus) return prev;

          const updated = { ...prev };
          if (oldLead.status === "new") updated.newCount--;
          if (oldLead.status === "contacted") updated.contactedCount--;
          if (oldLead.status === "enrolled") updated.enrolledCount--;
          if (oldLead.status === "archived") updated.archivedCount--;

          if (newStatus === "new") updated.newCount++;
          if (newStatus === "contacted") updated.contactedCount++;
          if (newStatus === "enrolled") updated.enrolledCount++;
          if (newStatus === "archived") updated.archivedCount++;

          return updated;
        });
      } else {
        setFeedback({
          type: "error",
          message: data.message || "Failed to update status",
        });
      }
    } catch (err) {
      console.error("Status change error:", err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the enquiry from "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: "Lead deleted successfully",
        });
        setLeads((prev) => prev.filter((l) => l._id !== id));
      }
    } catch (err) {
      console.error("Delete lead error:", err);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    const matchesInstrument =
      instrumentFilter === "all" || lead.instrument === instrumentFilter;

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.fullPhone.toLowerCase().includes(q) ||
      lead.instrument.toLowerCase().includes(q);

    return matchesStatus && matchesInstrument && matchesQuery;
  });

  return (
    <main className="min-h-screen bg-[#211126] text-[#F8F3E7]">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Page Title & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F3E7]">
              Enrolments & Trial Enquiries
            </h1>
            <p className="text-xs text-[#cfc3b3] mt-1">
              Track student trial bookings, contact leads via WhatsApp, and manage enrolment status.
            </p>
          </div>
          <button
            onClick={() => {
              setLoading(true);
              loadLeads();
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-semibold hover:bg-[#E8A33D] hover:text-[#211126] transition-all border border-white/10 inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto min-h-[44px]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Enrolment Data</span>
          </button>
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs flex items-center justify-between ${
              feedback.type === "success"
                ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30"
                : "bg-red-500/20 text-red-200 border border-red-500/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Summary Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Metric 1: Total Enquiries */}
          <div className="bg-[#2c1732] border border-[#E8A33D]/20 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#cfc3b3] font-semibold uppercase tracking-wider">
                Total Enquiries
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#E8A33D]/15 text-[#E8A33D] flex items-center justify-center border border-[#E8A33D]/30">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-[#F8F3E7]">
              {metrics.total}
            </div>
            <p className="text-[11px] text-[#cfc3b3] mt-1">Submitted trial requests</p>
          </div>

          {/* Metric 2: Enrolled Students Count */}
          <div className="bg-[#2c1732] border border-emerald-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                Enrolled Students
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-emerald-300">
              {metrics.enrolledCount}
            </div>
            <p className="text-[11px] text-emerald-200/80 mt-1 font-medium">
              Confirmed Website Enrolments
            </p>
          </div>

          {/* Metric 3: New Unread Leads */}
          <div className="bg-[#2c1732] border border-amber-500/30 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                New Pending
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-amber-300">
              {metrics.newCount}
            </div>
            <p className="text-[11px] text-amber-200/80 mt-1">Awaiting follow-up</p>
          </div>

          {/* Metric 4: Contacted Leads */}
          <div className="bg-[#2c1732] border border-purple-500/30 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
                Contacted
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/40">
                <PhoneCall className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-purple-200">
              {metrics.contactedCount}
            </div>
            <p className="text-[11px] text-purple-200/80 mt-1">In communication</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#2c1732] border border-white/10 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#a89b8c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, phone..."
              className="w-full bg-[#211126] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F8F3E7] placeholder-[#a89b8c] focus:outline-none focus:border-[#E8A33D]"
            />
          </div>

          {/* Status & Instrument Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-[#cfc3b3] font-medium mr-1 hidden sm:inline">
              Status:
            </span>
            {[
              { label: "All", value: "all" },
              { label: "New", value: "new" },
              { label: "Contacted", value: "contacted" },
              { label: "Enrolled", value: "enrolled" },
              { label: "Archived", value: "archived" },
            ].map((st) => (
              <button
                key={st.value}
                onClick={() => setStatusFilter(st.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === st.value
                    ? "bg-[#E8A33D] text-[#211126]"
                    : "bg-[#211126] text-[#cfc3b3] hover:text-[#F8F3E7]"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Grid / Cards */}
        {loading ? (
          <div className="py-20 text-center text-[#cfc3b3]">
            <span className="inline-block w-8 h-8 border-2 border-[#E8A33D] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs">Fetching enrolment submissions from MongoDB...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-[#2c1732] border border-white/10 rounded-2xl p-12 text-center text-[#cfc3b3]">
            <Users className="w-12 h-12 text-[#E8A33D] mx-auto mb-3 opacity-50" />
            <p className="text-base font-semibold mb-1">No Enquiries Found</p>
            <p className="text-xs text-[#a89b8c]">
              No trial requests match the selected search/filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => {
              const cleanDigits = lead.phone.replace(/\D/g, "");
              const dialCode = lead.countryCode.replace("+", "");
              const whatsappUrl = `https://wa.me/${dialCode}${cleanDigits}?text=${encodeURIComponent(
                `Hi ${lead.name}, thank you for inquiring about ${lead.instrument} classes at Alby School of Music!`
              )}`;

              const formattedDate = new Date(lead.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              return (
                <div
                  key={lead._id}
                  className="bg-[#2c1732] border border-white/12 rounded-2xl p-6 flex flex-col justify-between hover:border-[#E8A33D] transition-all shadow-xl"
                >
                  <div>
                    {/* Top Status & Instrument Bar */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#E8A33D]/18 text-[#E8A33D] text-xs font-semibold border border-[#E8A33D]/30">
                        🎹 {lead.instrument}
                      </span>

                      {/* Status Selector Dropdown */}
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead._id, e.target.value)
                        }
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                          lead.status === "enrolled"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : lead.status === "contacted"
                            ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                            : lead.status === "new"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                            : "bg-slate-500/20 text-slate-300 border-slate-500/40"
                        }`}
                      >
                        <option value="new" className="bg-[#211126] text-amber-300">
                          🟡 New
                        </option>
                        <option
                          value="contacted"
                          className="bg-[#211126] text-purple-300"
                        >
                          🟣 Contacted
                        </option>
                        <option
                          value="enrolled"
                          className="bg-[#211126] text-emerald-300"
                        >
                          🟢 Enrolled
                        </option>
                        <option
                          value="archived"
                          className="bg-[#211126] text-slate-300"
                        >
                          ⚪ Archived
                        </option>
                      </select>
                    </div>

                    {/* Student Name */}
                    <h3 className="font-serif text-xl font-bold text-[#F8F3E7] mb-3">
                      {lead.name}
                    </h3>

                    {/* Contact Details */}
                    <div className="space-y-2 text-xs text-[#cfc3b3] mb-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#E8A33D]" />
                        <span className="font-mono text-sm font-semibold text-[#F8F3E7]">
                          {lead.fullPhone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#E8A33D]" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#E8A33D]" />
                        <span>Prefers: {lead.preferredTime}</span>
                      </div>
                    </div>

                    {/* Message */}
                    {lead.message && (
                      <div className="p-3 rounded-xl bg-[#211126] border border-white/10 text-xs text-[#d7e4e2] leading-relaxed mb-4 italic">
                        &ldquo;{lead.message}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[#a89b8c]">
                      {formattedDate}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp lead"
                        className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors cursor-pointer border border-[#25D366]/30"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <a
                        href={`tel:${lead.fullPhone}`}
                        aria-label="Call lead"
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer border border-blue-500/30"
                        title="Call Student"
                      >
                        <Phone className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleDelete(lead._id, lead.name)}
                        aria-label="Delete lead"
                        className="p-2 rounded-lg bg-white/10 text-white/60 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
