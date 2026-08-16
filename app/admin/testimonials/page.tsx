"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminNav } from "@/components/layout/AdminNav";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  LogOut,
  Sparkles,
  Music,
  CheckCircle,
  X,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  instrument: "Piano" | "Guitar" | "Keyboard" | "General";
  quote: string;
  rating: number;
  featured: boolean;
  order: number;
}

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    instrument: "Piano" as "Piano" | "Guitar" | "Keyboard" | "General",
    quote: "",
    rating: 5,
    featured: true,
  });

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Check Auth & Fetch Data
  const loadData = async () => {
    try {
      const authRes = await fetch("/api/admin/me");
      const authData = await authRes.json();

      if (!authData.authenticated) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("/api/testimonials");
      const data = await res.json();

      if (data.success) {
        setTestimonials(data.testimonials || []);
      }
    } catch (err) {
      console.error("Error loading testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      role: "",
      instrument: "Piano",
      quote: "",
      rating: 5,
      featured: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      instrument: item.instrument,
      quote: item.quote,
      rating: item.rating,
      featured: item.featured,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const url = editingItem
        ? `/api/testimonials/${editingItem._id}`
        : "/api/testimonials";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: editingItem
            ? "Testimonial updated successfully!"
            : "New testimonial added successfully!",
        });
        setModalOpen(false);
        loadData(); // Re-fetch testimonials dynamically
      } else {
        setFeedback({
          type: "error",
          message: data.message || "Operation failed",
        });
      }
    } catch (err) {
      console.error("Save testimonial error:", err);
      setFeedback({
        type: "error",
        message: "Failed to save testimonial. Please check your connection.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the testimonial by "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: "Testimonial deleted successfully!",
        });
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
      } else {
        setFeedback({
          type: "error",
          message: data.message || "Failed to delete testimonial",
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      setFeedback({
        type: "error",
        message: "Failed to delete testimonial",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Navigation & Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link
                href="/"
                className="text-xs text-[#E8A33D] hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
              </Link>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F3E7] flex items-center gap-3">
              Testimonials Admin
              <span className="text-xs font-sans px-3 py-1 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] border border-[#E8A33D]/30 font-medium">
                {testimonials.length} Reviews
              </span>
            </h1>
            <p className="text-xs text-[#cfc3b3] mt-1">
              Manage parent & student testimonials displayed on the homepage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openCreateModal}
              className="px-5 py-2.5 rounded-xl bg-[#E8A33D] text-[#211126] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md flex items-center gap-2 cursor-pointer min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-white/10 text-[#F8F3E7] text-xs font-semibold hover:bg-red-500/20 hover:text-red-300 transition-colors border border-white/10 flex items-center gap-1.5 cursor-pointer min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs flex items-center justify-between ${
              feedback.type === "success"
                ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30"
                : "bg-red-500/20 text-red-200 border border-red-500/30"
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === "success" ? (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400" />
              )}
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

        {/* Testimonials List Grid */}
        {loading ? (
          <div className="py-20 text-center text-[#cfc3b3]">
            <span className="inline-block w-8 h-8 border-2 border-[#E8A33D] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs">Loading testimonials database...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="bg-[#2c1732] border border-white/10 rounded-2xl p-12 text-center text-[#cfc3b3]">
            <Music className="w-12 h-12 text-[#E8A33D] mx-auto mb-3 opacity-50" />
            <p className="text-base font-semibold mb-2">No Testimonials Found</p>
            <p className="text-xs text-[#a89b8c] mb-6">
              Click the button below to add your first student review.
            </p>
            <button
              onClick={openCreateModal}
              className="px-5 py-2.5 rounded-xl bg-[#E8A33D] text-[#211126] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="bg-[#2c1732] border border-[#E8A33D]/20 rounded-2xl p-6 flex flex-col justify-between hover:border-[#E8A33D] transition-all hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
              >
                <div>
                  {/* Top Bar: Instrument & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#E8A33D]/18 text-[#E8A33D] text-xs font-semibold border border-[#E8A33D]/30">
                      {item.instrument}
                    </span>
                    <div className="flex items-center gap-1 text-[#E8A33D]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < item.rating ? "fill-[#E8A33D]" : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-[#F8F3E7]/90 leading-relaxed italic mb-5">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Bar: Author & Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#F8F3E7]">
                      {item.name}
                    </h3>
                    <span className="text-xs text-[#cfc3b3]">{item.role}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      aria-label="Edit testimonial"
                      className="p-2 rounded-lg bg-white/10 text-[#F8F3E7] hover:bg-[#E8A33D] hover:text-[#211126] transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, item.name)}
                      aria-label="Delete testimonial"
                      className="p-2 rounded-lg bg-white/10 text-[#F8F3E7] hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Dialog for Create / Edit */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#2c1732] border border-[#E8A33D]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-[#F8F3E7] shadow-2xl relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="font-serif text-2xl font-bold mb-1 text-[#F8F3E7] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E8A33D]" />
                {editingItem ? "Edit Testimonial" : "Add New Testimonial"}
              </h2>
              <p className="text-xs text-[#cfc3b3] mb-6">
                Fill in the details below to update homepage student reviews.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#E8A33D] mb-1">
                    Student / Parent Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. S. Meenakshi"
                    required
                    className="w-full bg-[#211126] border border-white/20 rounded-xl px-4 py-3 text-sm text-[#F8F3E7] focus:outline-none focus:border-[#E8A33D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#E8A33D] mb-1">
                    Role / Subtitle *
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    placeholder="e.g. Mother of Piano Student (Grade 3)"
                    required
                    className="w-full bg-[#211126] border border-white/20 rounded-xl px-4 py-3 text-sm text-[#F8F3E7] focus:outline-none focus:border-[#E8A33D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#E8A33D] mb-1">
                      Instrument
                    </label>
                    <select
                      value={formData.instrument}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          instrument: e.target.value as any,
                        })
                      }
                      className="w-full bg-[#211126] border border-white/20 rounded-xl px-3 py-3 text-sm text-[#F8F3E7] focus:outline-none focus:border-[#E8A33D]"
                    >
                      <option value="Piano">Piano</option>
                      <option value="Guitar">Guitar</option>
                      <option value="Keyboard">Keyboard</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#E8A33D] mb-1">
                      Rating (Stars)
                    </label>
                    <div className="flex items-center gap-1 pt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, rating: star })
                          }
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 cursor-pointer ${
                              star <= formData.rating
                                ? "fill-[#E8A33D] text-[#E8A33D]"
                                : "text-white/20"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#E8A33D] mb-1">
                    Testimonial Quote *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.quote}
                    onChange={(e) =>
                      setFormData({ ...formData, quote: e.target.value })
                    }
                    placeholder="Write the full review quote..."
                    required
                    className="w-full bg-[#211126] border border-white/20 rounded-xl px-4 py-3 text-sm text-[#F8F3E7] focus:outline-none focus:border-[#E8A33D]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-3 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20 transition-colors min-h-[44px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 rounded-xl bg-[#E8A33D] text-[#211126] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md disabled:opacity-50 cursor-pointer min-h-[44px]"
                  >
                    {saving ? "Saving..." : editingItem ? "Update Review" : "Save Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}
