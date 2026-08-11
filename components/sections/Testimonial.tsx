"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "../ui/SectionHeading";

export const Testimonial: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#211126] text-[#F8F3E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Student & Parent Voices"
          title="Loved by Music Learners Across Coimbatore"
          subtitle="Real experiences from students mastering Piano, Guitar, and Keyboard at Alby.sm Music Academy."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col justify-between p-8 rounded-3xl bg-[#2c1732] border border-[#F8F3E7]/10 relative shadow-lg"
            >
              <Quote className="w-10 h-10 text-[#E8A33D]/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4 text-[#E8A33D]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm md:text-base text-[#F8F3E7]/90 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-[#F8F3E7]/10 pt-4 mt-auto">
                <h4 className="font-serif text-lg font-semibold text-[#F8F3E7]">
                  {item.author}
                </h4>
                <p className="text-xs text-[#E8A33D] font-medium">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
