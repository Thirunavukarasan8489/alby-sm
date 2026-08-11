"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Recital Night",
    cat: "events",
    tag: "Events",
    src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=700&q=80",
    size: "col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "Guitar Lesson",
    cat: "guitar",
    tag: "Guitar",
    src: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=80",
    size: "",
  },
  {
    id: 3,
    title: "Keyboard Class",
    cat: "keyboard",
    tag: "Keyboard",
    src: "https://images.unsplash.com/photo-1571327073757-af4231c85f4e?w=400&q=80",
    size: "",
  },
  {
    id: 4,
    title: "Students Together",
    cat: "events",
    tag: "Events",
    src: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=700&q=80",
    size: "col-span-2",
  },
  {
    id: 5,
    title: "Piano Keys",
    cat: "piano",
    tag: "Piano",
    src: "https://images.unsplash.com/photo-1466493067616-a2295e69bcf2?w=400&q=80",
    size: "",
  },
  {
    id: 6,
    title: "Piano Lesson",
    cat: "piano",
    tag: "Piano",
    src: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80",
    size: "",
  },
  {
    id: 7,
    title: "Guitar Close Up",
    cat: "guitar",
    tag: "Guitar",
    src: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&q=80",
    size: "",
  },
  {
    id: 8,
    title: "Keyboard Performance",
    cat: "keyboard",
    tag: "Keyboard",
    src: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=700&q=80",
    size: "col-span-2",
  },
  {
    id: 9,
    title: "Instructor Teaching",
    cat: "events",
    tag: "Events",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    size: "",
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeLightboxSrc, setActiveLightboxSrc] = useState<string | null>(null);

  const filteredItems =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.cat === activeFilter);

  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#2B2420]">
      {/* ---------- PAGE HERO ---------- */}
      <section className="bg-[radial-gradient(ellipse_at_75%_20%,rgba(232,163,61,0.18),transparent_55%),linear-gradient(180deg,#211126_0%,#2c1732_100%)] text-[#F8F3E7] pt-[70px] pb-[50px] px-6 text-center">
        <div className="max-w-[1140px] mx-auto">
          <p className="text-[13px] text-[#b7aa9c] mb-2">
            <Link href="/" className="text-[#E8A33D] hover:underline">
              Home
            </Link>{" "}
            / Gallery
          </p>
          <p className="eyebrow">Life at the Academy</p>
          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-serif tracking-normal mt-3.5 mb-2 leading-[1.05]">
            Moments, <i className="italic text-[#E8A33D] not-italic">captured</i>
          </h1>
        </div>
      </section>

      {/* ---------- FILTERS BAR ---------- */}
      <div className="flex justify-center gap-2.5 flex-wrap pt-10 pb-2.5 px-6">
        {[
          { label: "All", value: "all" },
          { label: "Piano", value: "piano" },
          { label: "Guitar", value: "guitar" },
          { label: "Keyboard", value: "keyboard" },
          { label: "Events", value: "events" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setActiveFilter(btn.value)}
            className={`font-sans text-[13.5px] font-semibold px-5 py-2 rounded-full border transition-colors cursor-pointer ${
              activeFilter === btn.value
                ? "bg-[#17514E] text-[#F8F3E7] border-[#17514E]"
                : "bg-transparent text-[#17514E] border-[#17514E]/30 hover:bg-[#17514E] hover:text-[#F8F3E7]"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ---------- GALLERY GRID ---------- */}
      <div className="max-w-[1180px] mx-auto px-6 pt-7.5 pb-[90px]">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] gap-3.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxSrc(item.src)}
              className={`relative overflow-hidden rounded-[3px] cursor-pointer group ${item.size}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={700}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <span className="absolute bottom-2.5 left-2.5 bg-[#211126]/75 text-[#F8F3E7] text-[11px] px-2.5 py-1 rounded-[12px] tracking-wide">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- LIGHTBOX MODAL ---------- */}
      {activeLightboxSrc && (
        <div
          className="fixed inset-0 bg-[#211126]/92 flex items-center justify-center z-50 p-7.5"
          onClick={() => setActiveLightboxSrc(null)}
        >
          <button
            onClick={() => setActiveLightboxSrc(null)}
            className="absolute top-6 right-8 text-[#F8F3E7] text-4xl cursor-pointer font-sans bg-transparent border-none"
          >
            &times;
          </button>
          <Image
            src={activeLightboxSrc}
            alt="Gallery Preview"
            width={1200}
            height={800}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-[4px] shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          />
        </div>
      )}

      {/* ---------- CTA STRIP ---------- */}
      <section className="bg-[#17514E] text-[#F8F3E7] text-center py-[70px] px-6">
        <div className="max-w-[1140px] mx-auto">
          <h2 className="text-3xl sm:text-[38px] font-serif">Want to be in the next batch?</h2>
          <p className="mt-3.5 mb-6.5 max-w-[460px] mx-auto text-[#d7e4e2] text-base">
            Book a free trial class and start your own Alby.sm story.
          </p>
          <Link
            href="/contact"
            className="bg-[#E8A33D] text-[#211126] font-semibold text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5 inline-block"
          >
            Book a Trial Class
          </Link>
        </div>
      </section>
    </main>
  );
}
