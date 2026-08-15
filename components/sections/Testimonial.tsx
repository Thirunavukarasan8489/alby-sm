"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export const Testimonial: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-[#F8F3E7] text-[#211126] relative overflow-hidden"
    >
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="mb-12 max-w-[600px] mx-auto">
          <p className="eyebrow text-center !text-[#17514E]">
            Student & Parent Voices
          </p>
          <h2 className="text-3xl text-center sm:text-[44px] font-serif mt-3 text-[#211126]">
            Loved by Music Learners Across Coimbatore
          </h2>
          <p className="text-base md:text-lg text-center mt-4">
            Real experiences from students mastering Piano, Guitar, and Keyboard
            at Alby School of Music.
          </p>
        </div>
        {/* <SectionHeading
          badge="Student & Parent Voices"
          title="Loved by Music Learners Across Coimbatore"
          subtitle="Real experiences from students mastering Piano, Guitar, and Keyboard at Alby School of Music."
        /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-[4px] bg-[#2c1732] border border-[#E8A33D]/18 relative shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8A33D]"
            >
              <Quote className="w-8 h-8 text-[#E8A33D]/25 absolute top-5 right-5 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3.5 text-[#E8A33D]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-[14px] text-[#F8F3E7]/90 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-[#F8F3E7]/12 pt-3.5 mt-auto">
                <h4 className="font-sans text-sm font-semibold text-[#F8F3E7]">
                  {item.author}
                </h4>
                <p className="text-[12px] text-[#E8A33D] font-medium mt-0.5">
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
