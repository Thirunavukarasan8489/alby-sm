"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const FALLBACK_GALLERY_ITEMS = [
  {
    id: 1,
    title: "Live Stage Synthesizer Performance",
    cat: "keyboard",
    tag: "Keyboard",
    src: "/images/alby-keyboard-stage.jpg",
    size: "col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "Master Alby — Founder & Lead Instructor",
    cat: "faculty",
    tag: "Faculty",
    src: "/images/alby-founder.jpg",
    size: "",
  },
  {
    id: 3,
    title: "Upright Piano Lesson",
    cat: "piano",
    tag: "Piano",
    src: "/images/alby-piano-playing.jpg",
    size: "",
  },
  {
    id: 4,
    title: "Grand Piano Studio Session",
    cat: "piano",
    tag: "Piano",
    src: "/images/alby-grand-piano.jpg",
    size: "col-span-2",
  },
  {
    id: 5,
    title: "Arranger Keyboard Practice",
    cat: "keyboard",
    tag: "Keyboard",
    src: "/images/student-keyboard-yamaha.jpg",
    size: "",
  },
  {
    id: 6,
    title: "Digital Piano Lesson",
    cat: "piano",
    tag: "Piano",
    src: "/images/student-digital-piano.jpg",
    size: "",
  },
  {
    id: 7,
    title: "Teenage Piano & Theory",
    cat: "piano",
    tag: "Piano",
    src: "/images/student-piano-practice.jpg",
    size: "",
  },
  {
    id: 8,
    title: "Piano Hand Technique",
    cat: "piano",
    tag: "Piano",
    src: "/images/student-piano-hands.jpg",
    size: "col-span-2",
  },
  {
    id: 9,
    title: "Keyboard Sheet Music Class",
    cat: "keyboard",
    tag: "Keyboard",
    src: "/images/student-keyboard-lesson.jpg",
    size: "",
  },
  {
    id: 10,
    title: "PSR Synthesizer Control",
    cat: "keyboard",
    tag: "Keyboard",
    src: "/images/student-arranger-keyboard.jpg",
    size: "",
  },
  {
    id: 11,
    title: "Workstation Keyboard Studio",
    cat: "keyboard",
    tag: "Keyboard",
    src: "/images/student-keyboard-smiling.jpg",
    size: "",
  },
];

interface DisplayItem {
  id: string | number;
  title: string;
  cat: string;
  tag: string;
  src: string;
  size?: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<DisplayItem[]>(FALLBACK_GALLERY_ITEMS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeLightboxSrc, setActiveLightboxSrc] = useState<string | null>(null);

  // Fetch dynamic gallery items from API
  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.items) && data.items.length > 0) {
        const mapped = data.items.map((item: any, idx: number) => ({
          id: item._id || idx,
          title: item.title,
          cat: item.category || "piano",
          tag: item.tag || "Piano",
          src: item.image,
          size: idx % 7 === 0 ? "col-span-2 row-span-2" : idx % 4 === 0 ? "col-span-2" : "",
        }));
        setItems(mapped);
      }
    } catch (err) {
      console.error("Failed to load dynamic gallery items:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
    const interval = setInterval(fetchGallery, 12000);
    const handleFocus = () => fetchGallery();
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.cat.toLowerCase() === activeFilter.toLowerCase());

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

      {/* ---------- FILTERS BAR ---------- */}
      {/* <div className="flex justify-center gap-2.5 flex-wrap pt-10 pb-2.5 px-6">
        {[
          { label: "All Photos", value: "all" },
          { label: "Piano", value: "piano" },
          { label: "Keyboard", value: "keyboard" },
          { label: "Faculty", value: "faculty" },
          { label: "Events", value: "events" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setActiveFilter(btn.value)}
            className={`font-sans text-[13.5px] font-semibold px-5 py-2 rounded-full border transition-all cursor-pointer ${
              activeFilter === btn.value
                ? "bg-[#17514E] text-[#F8F3E7] border-[#17514E] shadow-md"
                : "bg-transparent text-[#17514E] border-[#17514E]/30 hover:bg-[#17514E] hover:text-[#F8F3E7]"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div> */}
      {/* ---------- GALLERY GRID ---------- */}
      <div className="max-w-[1180px] mx-auto px-6 pt-7.5 pb-[90px]">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] gap-3.5">
          {filteredItems.map((item, idx) => (
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
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-xs font-semibold truncate">
                    {item.title}
                  </p>
                </div> */}
              </div>
            </ScrollReveal>
          ))}
        </div>
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
