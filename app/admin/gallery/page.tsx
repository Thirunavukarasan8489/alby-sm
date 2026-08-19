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
} from "lucide-react";

interface GalleryPhotoItem {
  _id: string;
  title: string;
  image: string;
  publicId?: string;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryPhotoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryPhotoItem | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

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
    setSelectedFiles([]);
    setPreviews([]);
    setModalOpen(true);
  };

  const openEditModal = (item: GalleryPhotoItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSelectedFiles([]);
    setPreviews([item.image]);
    setModalOpen(true);
  };

  const handleMultipleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);

    // Generate previews
    const previewArray: string[] = [];
    let loadedCount = 0;

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          previewArray.push(reader.result as string);
        }
        loadedCount++;
        if (loadedCount === fileArray.length) {
          setPreviews(previewArray);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSelectedFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingItem && selectedFiles.length === 0) {
      setFeedback({
        type: "error",
        message: "Please select at least one image file to upload to Cloudinary",
      });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      if (editingItem) {
        // Edit single photo title
        const res = await fetch(`/api/admin/gallery/${editingItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setFeedback({
            type: "success",
            message: "Photo title / alt text updated successfully!",
          });
          setModalOpen(false);
          loadGallery();
        } else {
          setFeedback({
            type: "error",
            message: data.message || "Failed to update title",
          });
        }
      } else {
        // Bulk Upload
        const formData = new FormData();
        formData.append("title", title || "Alby School of Music Gallery Photo");

        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });

        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setFeedback({
            type: "success",
            message: `Successfully uploaded ${data.count || selectedFiles.length} photo(s) to Cloudinary & saved!`,
          });
          setModalOpen(false);
          loadGallery();
        } else {
          setFeedback({
            type: "error",
            message: data.message || "Failed to upload photos",
          });
        }
      }
    } catch (err) {
      console.error("Save gallery error:", err);
      setFeedback({
        type: "error",
        message: "Failed to process photo upload. Please check your connection.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, photoTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${photoTitle}" from Cloudinary and database?`)) {
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
            Bulk upload photos to Cloudinary and manage website gallery images.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-[#E8A33D] text-[#211126] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-2 cursor-pointer self-start sm:self-auto min-h-[44px]"
        >
          <CloudUpload className="w-4 h-4" />
          <span>Bulk Upload Photos</span>
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

      {/* Photo Grid */}
      {loading ? (
        <div className="py-20 text-center text-[#cfc3b3]">
          <span className="inline-block w-8 h-8 border-2 border-[#E8A33D] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs">Loading photos from database...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#2c1732] border border-white/10 rounded-2xl p-12 text-center text-[#cfc3b3]">
          <ImageIcon className="w-12 h-12 text-[#E8A33D] mx-auto mb-3 opacity-50" />
          <p className="text-base font-semibold mb-1">No Photos Uploaded Yet</p>
          <p className="text-xs text-[#a89b8c] mb-6">
            Click below to select and bulk upload images directly to Cloudinary.
          </p>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl bg-[#E8A33D] text-[#211126] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <CloudUpload className="w-4 h-4" /> Bulk Upload Photos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-[#2c1732] border border-white/10 rounded-2xl overflow-hidden hover:border-[#E8A33D] transition-all shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Photo Thumbnail Container */}
                <div className="relative h-44 w-full bg-[#180b1d] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Title / Alt Text */}
                <div className="p-3.5">
                  <h3 className="font-serif font-bold text-sm text-[#F8F3E7] line-clamp-2" title={item.title}>
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="p-3.5 pt-0 flex items-center justify-between border-t border-white/10 mt-1 pt-3">
                <span className="text-[10.5px] text-[#a89b8c]">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    aria-label="Edit title"
                    className="p-2 rounded-lg bg-white/10 text-[#F8F3E7] hover:bg-[#E8A33D] hover:text-[#211126] transition-colors cursor-pointer"
                    title="Edit Title / Alt Text"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    aria-label="Delete photo"
                    className="p-2 rounded-lg bg-white/10 text-[#F8F3E7] hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bulk Upload / Edit Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2c1732] border border-[#E8A33D]/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full text-[#F8F3E7] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-bold mb-1 text-[#F8F3E7] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E8A33D]" />
              {editingItem ? "Edit Photo Alt Text" : "Bulk Upload Photos to Cloudinary"}
            </h2>
            <p className="text-xs text-[#cfc3b3] mb-6">
              {editingItem
                ? "Update the title/alt text used for SEO and accessibility."
                : "Select multiple image files to upload to Cloudinary simultaneously."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Multi-File Input (only for new upload) */}
              {!editingItem && (
                <div>
                  <label className="block font-semibold text-[#E8A33D] mb-1.5">
                    Select Photo Files (Multiple allowed) *
                  </label>

                  <label className="border-2 border-dashed border-white/20 hover:border-[#E8A33D] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-[#211126]/60 transition-colors">
                    <CloudUpload className="w-9 h-9 text-[#E8A33D] mb-2" />
                    <span className="text-xs font-semibold text-[#F8F3E7]">
                      {selectedFiles.length > 0
                        ? `${selectedFiles.length} photo(s) selected — Click to change`
                        : "Click to select photos from computer"}
                    </span>
                    <span className="text-[10.5px] text-[#a89b8c] mt-1">
                      Hold Ctrl / Shift to pick multiple images at once (WebP, JPG, PNG)
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultipleFilesChange}
                      className="hidden"
                    />
                  </label>

                  {/* Previews Grid */}
                  {previews.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2 text-[11px] text-[#cfc3b3]">
                        <span>Selected Photos ({previews.length}):</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFiles([]);
                            setPreviews([]);
                          }}
                          className="text-red-400 hover:underline"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-40 overflow-y-auto p-2 bg-[#211126] rounded-xl border border-white/10">
                        {previews.map((src, idx) => (
                          <div key={idx} className="relative h-16 w-full rounded-lg overflow-hidden border border-white/20 group">
                            <Image
                              src={src}
                              alt={`Preview ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeSelectedFile(idx)}
                              className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/80 text-white hover:bg-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Single Title / Alt Text Field */}
              <div>
                <label className="block font-semibold text-[#E8A33D] mb-1">
                  Title / Alt Text {editingItem ? "*" : "(Optional base title)"}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Alby School of Music Recital"
                  required={!!editingItem}
                  className="w-full bg-[#211126] border border-white/20 rounded-xl px-4 py-3 text-sm text-[#F8F3E7] focus:outline-none focus:border-[#E8A33D]"
                />
                <p className="text-[10.5px] text-[#a89b8c] mt-1">
                  This string will be used as the alt attribute for images on the gallery page.
                </p>
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
                      <span>
                        {selectedFiles.length > 1
                          ? `Uploading ${selectedFiles.length} photos...`
                          : "Uploading to Cloudinary..."}
                      </span>
                    </>
                  ) : (
                    <span>
                      {editingItem
                        ? "Update Alt Text"
                        : selectedFiles.length > 1
                        ? `Upload ${selectedFiles.length} Photos`
                        : "Upload Photos"}
                    </span>
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
