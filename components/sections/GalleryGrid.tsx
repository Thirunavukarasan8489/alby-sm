"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Eye } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

// TODO: replace with real content / photos before launch
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Golden Hour Annual Piano Recital 2025",
    category: "recital",
    instrument: "Piano",
    caption:
      "Student performing classical piece on stage at Coimbatore Auditorium.",
    gradient: "from-[#E8A33D]/30 to-[#2c1732]",
  },
  {
    id: 2,
    title: "Guitar Ensemble Practice Session",
    category: "guitar",
    instrument: "Guitar",
    caption: "Acoustic strumming & chord transition drills in class.",
    gradient: "from-[#17514E]/40 to-[#2c1732]",
  },
  {
    id: 3,
    title: "Electronic Keyboard Rhythm Workshop",
    category: "keyboard",
    instrument: "Keyboard",
    caption: "Dual-hand melody and auto-accompaniment arranger practice.",
    gradient: "from-[#C97B84]/30 to-[#2c1732]",
  },
  {
    id: 4,
    title: "Junior Piano Recital Showcase",
    category: "piano",
    instrument: "Piano",
    caption: "Ages 6-10 students receiving recital participation honors.",
    gradient: "from-[#E8A33D]/40 to-[#211126]",
  },
  {
    id: 5,
    title: "Acoustic Lead Solo Performance",
    category: "guitar",
    instrument: "Guitar",
    caption: "Fingerstyle performance during student jam session.",
    gradient: "from-[#17514E]/30 to-[#211126]",
  },
  {
    id: 6,
    title: "Academy Classroom Practice Room",
    category: "recital",
    instrument: "Keyboard",
    caption: "Individual workstations with weighted keyboards and headphones.",
    gradient: "from-[#C97B84]/40 to-[#211126]",
  },
];

const CATEGORIES = [
  { label: "All Photos", value: "all" },
  { label: "Recitals", value: "recital" },
  { label: "Piano", value: "piano" },
  { label: "Guitar", value: "guitar" },
  { label: "Keyboard", value: "keyboard" },
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
          title="Academy Life & Recital Gallery"
          subtitle="Explore stage performances, classroom practice sessions, and annual student achievements at Alby.sm Music Academy."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all min-h-[44px] ${
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer relative rounded-2xl overflow-hidden bg-gradient-to-br border border-[#F8F3E7]/10 p-6 flex flex-col justify-between min-h-[260px] hover:border-[#E8A33D]/50 transition-all hover:shadow-[0_10px_25px_rgba(232,163,61,0.2)]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 group-hover:opacity-90 transition-opacity`}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#211126]/80 text-[#E8A33D] text-xs font-semibold uppercase tracking-wider">
                    {item.instrument}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#211126]/60 flex items-center justify-center text-[#F8F3E7] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-[#E8A33D]" />
                  </div>
                </div>

                <div className="relative z-10 mt-12">
                  <div className="w-10 h-10 rounded-xl bg-[#E8A33D]/20 text-[#E8A33D] flex items-center justify-center mb-3">
                    <Music className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#F8F3E7] group-hover:text-[#E8A33D] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F8F3E7]/70 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 bg-[#211126]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-[#2c1732] border border-[#E8A33D]/40 rounded-3xl p-8 max-w-lg w-full text-[#F8F3E7] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="px-3 py-1 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
                {selectedItem.instrument} Showcase
              </span>
              <h3 className="font-serif text-2xl font-bold mb-3 text-[#F8F3E7]">
                {selectedItem.title}
              </h3>
              <p className="text-sm text-[#F8F3E7]/80 leading-relaxed mb-6">
                {selectedItem.caption}
              </p>
              <div className="p-4 rounded-xl bg-[#211126] border border-[#F8F3E7]/10 text-xs text-[#E8A33D]">
                // TODO: replace placeholder with real photo asset before
                production launch
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="mt-6 w-full py-3 rounded-xl bg-[#E8A33D] text-[#211126] font-semibold text-sm hover:bg-[#f0b04c] transition-colors min-h-[44px]"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
