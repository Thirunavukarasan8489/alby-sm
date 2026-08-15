"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Master Alby — Founder & Head Instructor",
    category: "faculty",
    instrument: "Faculty",
    image: "/images/alby-founder.jpg",
    caption: "20+ years of dedicated ear-first music education in Coimbatore.",
  },
  {
    id: 2,
    title: "Grand Piano Studio Performance",
    category: "piano",
    instrument: "Piano",
    image: "/images/alby-grand-piano.jpg",
    caption:
      "Master Alby demonstrating classical posture & key weight dynamics.",
  },
  {
    id: 3,
    title: "Live Stage Synthesizer Performance",
    category: "keyboard",
    instrument: "Keyboard",
    image: "/images/alby-keyboard-stage.jpg",
    caption: "Arranger keyboard tone layering and live synthesizer scoring.",
  },
  {
    id: 4,
    title: "Upright Piano Instruction Session",
    category: "piano",
    instrument: "Piano",
    image: "/images/alby-piano-playing.jpg",
    caption: "One-on-one classical & contemporary piano training.",
  },
  {
    id: 5,
    title: "Junior Keyboard Arranger Practice",
    category: "keyboard",
    instrument: "Keyboard",
    image: "/images/student-keyboard-yamaha.jpg",
    caption: "Young student mastering auto-accompaniment on Yamaha PSR-SX900.",
  },
  {
    id: 6,
    title: "Digital Piano Lesson Session",
    category: "piano",
    instrument: "Piano",
    image: "/images/student-digital-piano.jpg",
    caption:
      "Beginner piano student building ear training and treble clef reading.",
  },
  {
    id: 7,
    title: "Teenage Piano & Theory Practice",
    category: "piano",
    instrument: "Piano",
    image: "/images/student-piano-practice.jpg",
    caption: "Intermediate student practicing Trinity exam repertoire.",
  },
  {
    id: 8,
    title: "Piano Hand Placement & Chord Drills",
    category: "piano",
    instrument: "Piano",
    image: "/images/student-piano-hands.jpg",
    caption: "Close-up finger agility and chord inversion exercises.",
  },
  {
    id: 9,
    title: "Electronic Keyboard Notation Class",
    category: "keyboard",
    instrument: "Keyboard",
    image: "/images/student-keyboard-lesson.jpg",
    caption: "Deciphering lead sheets and arranger style registrations.",
  },
  {
    id: 10,
    title: "PSR Synthesizer Rhythm Control",
    category: "keyboard",
    instrument: "Keyboard",
    image: "/images/student-arranger-keyboard.jpg",
    caption: "Dual-hand melody control and accompaniment sync.",
  },
  {
    id: 11,
    title: "Workstation Keyboard Studio",
    category: "keyboard",
    instrument: "Keyboard",
    image: "/images/student-keyboard-smiling.jpg",
    caption: "Individual keyboard practice session at Alby.sm studio.",
  },
  {
    id: 12,
    title: "Home Practice & Song Transcription",
    category: "keyboard",
    instrument: "Keyboard",
    image: "/images/student-home-practice.jpg",
    caption: "Student practicing song arrangements by ear.",
  },
];

const CATEGORIES = [
  { label: "All Photos", value: "all" },
  { label: "Piano", value: "piano" },
  { label: "Keyboard", value: "keyboard" },
  { label: "Faculty", value: "faculty" },
];

export const GalleryGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<
    (typeof GALLERY_ITEMS)[0] | null
  >(null);

  const filteredItems =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="py-16 md:py-24 bg-[#2c1732] text-[#F8F3E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Moments & Performances"
          title="Academy Life & Student Gallery"
          subtitle="Explore stage performances, studio practice sessions, and student achievements at Alby School of Music."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all min-h-[44px] cursor-pointer ${
                  isActive
                    ? "bg-[#E8A33D] text-[#211126] font-semibold shadow-md"
                    : "bg-[#211126]/60 text-[#F8F3E7]/80 hover:bg-[#211126] border border-[#F8F3E7]/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Items Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer relative rounded-2xl overflow-hidden border border-[#F8F3E7]/15 h-[320px] flex flex-col justify-between hover:border-[#E8A33D] transition-all hover:shadow-[0_12px_30px_rgba(232,163,61,0.25)]"
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#211126]/95 via-[#211126]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge & Eye Icon */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#211126]/85 text-[#E8A33D] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-[#E8A33D]/30">
                    {item.instrument}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#211126]/75 flex items-center justify-center text-[#F8F3E7] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <Eye className="w-4 h-4 text-[#E8A33D]" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 p-5">
                  <h3 className="font-serif text-xl font-semibold text-[#F8F3E7] group-hover:text-[#E8A33D] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F8F3E7]/80 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-[#211126]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-[#2c1732] border border-[#E8A33D]/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-[#F8F3E7] shadow-2xl relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close modal"
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 text-[#F8F3E7] hover:bg-[#E8A33D] hover:text-[#211126] flex items-center justify-center transition-colors cursor-pointer border-none z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Full Image in Lightbox */}
                <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-5 border border-white/10">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <span className="px-3 py-1 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] text-xs font-semibold uppercase tracking-wider mb-2 inline-block border border-[#E8A33D]/30">
                  {selectedItem.instrument} Showcase
                </span>
                <h3 className="font-serif text-2xl font-bold mb-2 text-[#F8F3E7]">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-[#F8F3E7]/85 leading-relaxed">
                  {selectedItem.caption}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
