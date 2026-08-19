"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ImageIcon } from "lucide-react";

interface DisplayItem {
  id: string | number;
  title: string;
  src: string;
  size?: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<DisplayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLightboxSrc, setActiveLightboxSrc] = useState<string | null>(null);

  // Fetch dynamic gallery items from MongoDB backend
  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        const mapped = data.items.map((item: any, idx: number) => ({
          id: item._id || idx,
          title: item.title || "Alby School of Music Gallery Photo",
          src: item.image,
          size: idx % 7 === 0 ? "col-span-2 row-span-2" : idx % 4 === 0 ? "col-span-2" : "",
        }));
        setItems(mapped);
      }
    } catch (err) {
      console.error("Failed to load backend gallery items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
    const interval = setInterval(fetchGallery, 10000);
    const handleFocus = () => fetchGallery();
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#2B2420]">
      {/* ---------- PAGE HERO ---------- */}
      <section className="relative overflow-hidden bg-[#211126] text-[#F8F3E7] pt-[70px] pb-[50px] px-6 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80')",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(232,163,61,0.22),transparent_55%),linear-gradient(180deg,#211126_0%,#2c1732_100%)] pointer-events-none"
          aria-hidden="true"
        />

        <ScrollReveal
          direction="up"
          delay={0.05}
          className="relative z-10 max-w-[1140px] mx-auto"
        >
          <p className="text-[13px] text-[#b7aa9c] mb-2">
            <Link href="/" className="text-[#E8A33D] hover:underline">
              Home
            </Link>{" "}
            / Gallery
          </p>
          <p className="eyebrow">Life at the Academy</p>
          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-serif tracking-normal mt-3.5 mb-2 leading-[1.05]">
            Moments,{" "}
            <i className="italic text-[#E8A33D] not-italic">captured</i>
          </h1>
        </ScrollReveal>
      </section>

      {/* ---------- GALLERY GRID ---------- */}
      <div className="max-w-[1180px] mx-auto px-6 pt-10 pb-[90px]">
        {loading ? (
          <div className="py-20 text-center text-[#5c5147]">
            <span className="inline-block w-8 h-8 border-2 border-[#17514E] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs">Loading academy photos...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center text-[#5c5147] bg-white rounded-2xl border border-[#E8A33D]/20 p-12 max-w-lg mx-auto shadow-sm">
            <ImageIcon className="w-12 h-12 text-[#E8A33D] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-2xl font-bold text-[#211126] mb-1">
              No Gallery Photos Yet
            </h3>
            <p className="text-xs text-[#6e6359] leading-relaxed">
              Academy photos uploaded by Master Alby via the Admin Portal will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] gap-3.5">
            {items.map((item, idx) => (
              <ScrollReveal
                key={item.id}
                direction="up"
                delay={0.05 + (idx % 8) * 0.04}
                className={item.size}
              >
                <div
                  onClick={() => setActiveLightboxSrc(item.src)}
                  className="relative overflow-hidden rounded-[4px] cursor-pointer group h-full shadow-sm hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={700}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      {/* ---------- LIGHTBOX MODAL ---------- */}
      {activeLightboxSrc && (
        <div
          className="fixed inset-0 bg-[#211126]/92 backdrop-blur-sm flex items-center justify-center z-50 p-7.5"
          onClick={() => setActiveLightboxSrc(null)}
        >
          <button
            onClick={() => setActiveLightboxSrc(null)}
            className="absolute top-6 right-8 text-[#F8F3E7] text-4xl cursor-pointer font-sans bg-transparent border-none hover:text-[#E8A33D] transition-colors"
          >
            &times;
          </button>
          <Image
            src={activeLightboxSrc}
            alt="Gallery Preview"
            width={1200}
            height={800}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-[6px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/20"
          />
        </div>
      )}

      {/* ---------- CTA STRIP ---------- */}
      <section className="bg-[#17514E] text-[#F8F3E7] text-center py-[70px] px-6">
        <ScrollReveal
          direction="up"
          delay={0.05}
          className="max-w-[1140px] mx-auto"
        >
          <h2 className="text-3xl sm:text-[38px] mb-6.5 font-serif">
            Want to be in the next batch?
          </h2>
          <Link
            href="/contact"
            className="bg-[#E8A33D] text-[#211126] font-semibold text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5 inline-block shadow-md"
          >
            Join Now
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
