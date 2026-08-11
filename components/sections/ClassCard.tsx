"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Users, ArrowRight } from "lucide-react";
import { ClassData } from "@/lib/constants";

interface ClassCardProps {
  classItem: ClassData;
  index?: number;
}

export const ClassCard: React.FC<ClassCardProps> = ({ classItem, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-[#2c1732] p-6 sm:p-8 border border-[#F8F3E7]/10 hover:border-[#E8A33D]/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(232,163,61,0.15)]"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] text-xs font-semibold uppercase tracking-wider border border-[#E8A33D]/30">
            {classItem.badge}
          </span>
          <span className="text-xs text-[#F8F3E7]/70 flex items-center gap-1 font-medium">
            <Users className="w-3.5 h-3.5 text-[#E8A33D]" />
            {classItem.ageRange}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-serif text-[#F8F3E7] font-semibold mb-3 group-hover:text-[#E8A33D] transition-colors">
          {classItem.name}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[#F8F3E7]/80 leading-relaxed mb-6">
          {classItem.shortDescription}
        </p>

        {/* Schedule */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-[#211126]/60 border border-[#F8F3E7]/5 text-xs text-[#F8F3E7]/90 mb-6">
          <Clock className="w-4 h-4 text-[#E8A33D] shrink-0 mt-0.5" />
          <span>{classItem.schedule}</span>
        </div>

        {/* Highlights */}
        <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-[#F8F3E7]/90">
          {classItem.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E8A33D] shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <Link
        href={`/classes/${classItem.slug}`}
        className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#E8A33D] text-[#211126] font-semibold text-sm hover:bg-[#f0b04c] transition-all min-h-[44px]"
      >
        <span>View Full Curriculum & Details</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
};
