"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Award, CheckCircle2, GraduationCap, Music2 } from "lucide-react";

export const EXAM_BOARDS = [
  {
    id: "trinity",
    name: "Trinity College London",
    logo: "/university_logos/trinity-college-london.jpg",
    subtitle: "Classical & Contemporary Performance Grades",
    grades: "Initial to Grade 8 + Diplomas",
    instruments: ["Piano", "Classical Guitar", "Electronic Keyboard"],
    description:
      "Comprehensive performance and technical assessments focused on musical expression, sight-reading, and ear training.",
    accent: "#E8A33D",
  },
  {
    id: "rockschool",
    name: "Rockschool (RSL Awards)",
    logo: "/university_logos/rockschool-rsl.jpg",
    subtitle: "Rock, Pop & Modern Music Examinations",
    grades: "Debut to Grade 8",
    instruments: ["Electric & Acoustic Guitar", "Keyboard", "Bass"],
    description:
      "Contemporary music exam board providing song-first learning, improvisation solos, and rhythm backing track play-alongs.",
    accent: "#00A8E8",
  },
  {
    id: "lcm",
    name: "London College of Music (LCM)",
    logo: "/university_logos/london-college-of-music.jpg",
    subtitle: "University of West London Examinations",
    grades: "Step 1 to Grade 8 & Music Theory",
    instruments: ["Piano", "Music Theory", "Keyboard"],
    description:
      "Rigorous UK university accreditation testing notation literacy, aural analysis, and structured repertoire execution.",
    accent: "#17514E",
  },
];

const EXAM_HIGHLIGHTS = [
  {
    title: "100% Pass Rate",
    desc: "Consistent distinction & merit achievements in Trinity & RSL exams.",
    icon: Award,
  },
  {
    title: "Grade 1 to 8 Syllabi",
    desc: "Structured step-by-step prep from absolute beginner to diploma.",
    icon: GraduationCap,
  },
  {
    title: "Mock Exams & Stage Prep",
    desc: "In-house recital trials to eliminate stage fear before exam day.",
    icon: Music2,
  },
];

export const ExamsSection: React.FC = () => {
  return (
    <section
      id="exams"
      className="relative py-[70px] sm:py-[90px] px-6 bg-[#211126] text-[#F8F3E7] overflow-hidden"
    >
      {/* Ambient Radial Spotlight */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,163,61,0.15),transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1140px] mx-auto">
        {/* Section Header */}
        <ScrollReveal
          direction="up"
          delay={0.05}
          className="text-center max-w-[720px] mx-auto mb-14"
        >
          {/* <span className="inline-block px-3.5 py-1 mb-3.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#E8A33D]/18 text-[#E8A33D] border border-[#E8A33D]/30">
            Music Grade Examinations
          </span> */}
          <p className="eyebrow py-1 mb-3.5">Music Grade Examinations</p>
          <h2 className="text-3xl sm:text-[44px] font-serif text-[#F8F3E7] leading-[1.1]">
            Global Music University{" "}
            <i className="italic text-[#E8A33D] not-italic">Certifications</i>
          </h2>
          <p className="mt-3.5 text-[#cfc3b3] text-base leading-[1.65]">
            We prepare students for accredited international grade exams (Grade
            1 to Grade 8) with world-renowned UK music examination boards.
          </p>
        </ScrollReveal>

        {/* Exam Boards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14">
          {EXAM_BOARDS.map((board, idx) => (
            <ScrollReveal
              key={board.id}
              direction="up"
              delay={0.1 + idx * 0.08}
            >
              <div className="h-full bg-[#2c1732] border border-[#E8A33D]/20 rounded-[8px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-[#E8A33D] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group">
                <div>
                  {/* Logo Tile */}
                  <div className="w-full h-24 bg-white rounded-[6px] p-4 flex items-center justify-center mb-6 shadow-inner relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                    <Image
                      src={board.logo}
                      alt={`${board.name} logo`}
                      width={240}
                      height={70}
                      className="max-h-16 w-auto object-contain"
                    />
                  </div>

                  <span className="inline-block text-xs font-bold text-[#E8A33D] tracking-wide uppercase mb-1">
                    {board.grades}
                  </span>

                  <h3 className="font-serif text-2xl text-[#F8F3E7] mb-2 leading-snug group-hover:text-[#E8A33D] transition-colors">
                    {board.name}
                  </h3>

                  <p className="text-[13.5px] text-[#cfc3b3] leading-[1.6] mb-5">
                    {board.description}
                  </p>
                </div>

                <div>
                  {/* Target Instruments Tags */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5 mb-5">
                    {board.instruments.map((inst) => (
                      <span
                        key={inst}
                        className="text-[11.5px] font-medium px-2.5 py-1 rounded-[3px] bg-white/6 text-[#e6dcd0] border border-white/10"
                      >
                        {inst}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="w-full py-2.5 text-center text-xs font-semibold tracking-wider uppercase text-[#E8A33D] border border-[#E8A33D]/40 rounded-[3px] transition-all hover:bg-[#E8A33D] hover:text-[#211126] block"
                  >
                    Enquire for {board.name.split(" ")[0]} Exam Prep →
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Exam Feature Highlights Bar */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="bg-white/5 border border-white/12 rounded-[8px] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {EXAM_HIGHLIGHTS.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col md:flex-row items-center md:items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#E8A33D]/15 text-[#E8A33D] flex items-center justify-center shrink-0 border border-[#E8A33D]/30">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#F8F3E7] mb-1 font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#cfc3b3] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
