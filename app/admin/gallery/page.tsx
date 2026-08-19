"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Upload,
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  X,
  AlertCircle,
  Sparkles,
  CloudUpload,
  Filter,
} from "lucide-react";

interface GalleryPhotoItem {
  _id: string;
  title: string;
  category: "piano" | "keyboard" | "faculty" | "events";
  tag: "Piano" | "Keyboard" | "Faculty" | "Events";
  image: string;
  publicId?: string;
  caption?: string;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryPhotoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryPhotoItem | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"piano" | "keyboard" | "faculty" | "events">("piano");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch Gallery Items
  const loadGallery = async () => {
    try {
      const authRes = await fetch("/api/admin/me");
      const authData = await authRes.json();

      if (!authData.authenticated) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("/api/gallery", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setItems(data.items || []);
      }
    } catch (err) {
      console.error("Failed to load gallery items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("piano");
    setCaption("");
    setFile(null);
    setPreviewUrl(null);
    setModalOpen(true);
  };

  const openEditModal = (item: GalleryPhotoItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setCaption(item.caption || "");
    setFile(null);
    setPreviewUrl(item.image);
    setModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingItem && !file && !previewUrl) {
      setFeedback({
        type: "error",
        message: "Please select an image file to upload to Cloudinary",
      });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("caption", caption);

      if (file) {
        formData.append("file", file);
      } else if (previewUrl && !previewUrl.startsWith("data:")) {
        formData.append("imageUrl", previewUrl);
      }

      const url = editingItem
        ? `/api/admin/gallery/${editingItem._id}`
        : "/api/admin/gallery";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: editingItem
            ? "Gallery photo updated successfully!"
            : "New photo uploaded to Cloudinary & saved successfully!",
        });
        setModalOpen(false);
        loadGallery();
      } else {
        setFeedback({
          type: "error",
          message: data.message || "Failed to save photo",
        });
      }
    } catch (err) {
      console.error("Save gallery error:", err);
      setFeedback({
        type: "error",
        message: "Failed to upload photo. Please check your connection.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, photoTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${photoTitle}" from Cloudinary and MongoDB?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: "Photo deleted from Cloudinary & database successfully!",
        });
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        setFeedback({
          type: "error",
          message: data.message || "Failed to delete photo",
        });
      }
    } catch (err) {
      console.error("Delete gallery error:", err);
      setFeedback({
        type: "error",
        message: "Failed to delete gallery photo",
      });
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F3E7] flex items-center gap-3">
            Photo Gallery Suite
            <span className="text-xs font-sans px-3 py-1 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] border border-[#E8A33D]/30 font-semibold">
              {items.length} Photos
            </span>
          </h1>
          <p className="text-xs text-[#cfc3b3] mt-1">
            Upload, manage, and serve academy photos via Cloudinary.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-[#E8A33D] text-[#211126] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-2 cursor-pointer self-start sm:self-auto min-h-[44px]"
        >
          <CloudUpload className="w-4 h-4" />
          <span>Upload New Photo</span>
        </button>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between ${
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

      {/* Category Filter Pills */}
      <div className="bg-[#2c1732] border border-white/10 rounded-2xl p-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#a89b8c] font-semibold px-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-[#E8A33D]" /> Filter:
        </span>
        {[
          { label: "All Photos", value: "all" },
          { label: "Piano", value: "piano" },
          { label: "Keyboard", value: "keyboard" },
          { label: "Faculty", value: "faculty" },
          { label: "Events", value: "events" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveCategory(tab.value)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === tab.value
                ? "bg-[#E8A33D] text-[#211126] shadow-md"
                : "bg-[#211126] text-[#cfc3b3] hover:text-[#F8F3E7] hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {loading ? (
        <div className="py-20 text-center text-[#cfc3b3]">
          <span className="inline-block w-8 h-8 border-2 border-[#E8A33D] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs">Loading photos from database...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-[#2c1732] border border-white/10 rounded-2xl p-12 text-center text-[#cfc3b3]">
          <ImageIcon className="w-12 h-12 text-[#E8A33D] mx-auto mb-3 opacity-50" />
          <p className="text-base font-semibold mb-1">No Photos Found</p>
          <p className="text-xs text-[#a89b8c] mb-6">
            Click the button below to upload your first academy image to Cloudinary.
          </p>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl bg-[#E8A33D] text-[#211126] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <CloudUpload className="w-4 h-4" /> Upload Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-[#2c1732] border border-white/10 rounded-2xl overflow-hidden hover:border-[#E8A33D] transition-all shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Photo Thumbnail Container */}
                <div className="relative h-48 w-full bg-[#180b1d] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#211126]/85 backdrop-blur-md text-[#E8A33D] text-[11px] font-bold border border-[#E8A33D]/30 shadow-md">
                    {item.tag || item.category.toUpperCase()}
                  </span>
                </div>

                {/* Info Container */}
                <div className="p-4">
                  <h3 className="font-serif font-bold text-base text-[#F8F3E7] line-clamp-1 mb-1">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-[#cfc3b3] line-clamp-2 italic">
                      &ldquo;{item.caption}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="p-4 pt-0 flex items-center justify-between border-t border-white/10 mt-2 pt-3">
                <span className="text-[10.5px] text-[#a89b8c]">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    aria-label="Edit photo"
                    className="p-2 rounded-lg bg-white/10 text-[#F8F3E7] hover:bg-[#E8A33D] hover:text-[#211126] transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    aria-label="Delete photo"
                    className="p-2 rounded-lg bg-white/10 text-[#F8F3E7] hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog for Upload / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2c1732] border border-[#E8A33D]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-[#F8F3E7] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-bold mb-1 text-[#F8F3E7] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E8A33D]" />
              {editingItem ? "Edit Photo Metadata" : "Upload Photo to Cloudinary"}
            </h2>
            <p className="text-xs text-[#cfc3b3] mb-6">
              Images are processed & stored in Cloudinary for high-speed serving.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* File Selector & Preview */}
              <div>
                <label className="block font-semibold text-[#E8A33D] mb-1.5">
                  Select Image File *
                </label>

                {previewUrl ? (
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-white/20 mb-2">
                    <Image
                      src={previewUrl}
                      alt="Upload preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/75 text-white hover:bg-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-white/20 hover:border-[#E8A33D] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-[#211126]/60 transition-colors">
                    <Upload className="w-8 h-8 text-[#E8A33D] mb-2" />
                    <span className="text-xs font-semibold text-[#F8F3E7]">
                      Click to choose photo from computer
                    </span>
                    <span className="text-[10.5px] text-[#a89b8c] mt-1">
                      Supports WebP, JPG, PNG up to 10MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block font-semibold text-[#E8A33D] mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Grand Piano Classical Recital"
                  required
                  className="w-full bg-[#211126] border border-white/20 rounded-xl px-4 py-3 text-sm text-[#F8F3E7] focus:outline-none focus:border-[#E8A33D]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-[#E8A33D] mb-1">
                  Category Tag *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#211126] border border-white/20 rounded-xl px-3 py-3 text-sm text-[#F8F3E7] focus:outline-none focus:border-[#E8A33D]"
                >
                  <option value="piano">Piano</option>
                  <option value="keyboard">Keyboard</option>
                  <option value="faculty">Faculty</option>
                  <option value="events">Events</option>
                </select>
              </div>

              {/* Caption */}
              <div>
                <label className="block font-semibold text-[#E8A33D] mb-1">
                  Caption (Optional)
                </label>
                <textarea
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Short description of the photo..."
                  className="w-full bg-[#211126] border border-white/20 rounded-xl px-4 py-3 text-sm text-[#F8F3E7] focus:outline-none focus:border-[#E8A33D]"
                />
              </div>

              <div className="pt-3 flex items-center justify-between">
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
                  className="px-6 py-3 rounded-xl bg-[#E8A33D] text-[#211126] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md disabled:opacity-50 flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#211126] border-t-transparent rounded-full animate-spin" />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <span>{editingItem ? "Update Photo" : "Upload to Cloudinary"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
