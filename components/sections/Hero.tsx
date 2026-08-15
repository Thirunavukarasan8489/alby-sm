"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Music, Award, Users, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#211126] via-[#2c1732] to-[#211126] text-[#F8F3E7]">
      {/* Background Spotlight / Glowing Ambient Light */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E8A33D]/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & GEO Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8A33D]/15 border border-[#E8A33D]/30 text-[#E8A33D] text-xs font-semibold uppercase tracking-wider mb-6">
              <Music className="w-4 h-4" />
              <span>Coimbatore&apos;s Premier Music Academy</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.1] mb-6 text-[#F8F3E7]">
              Unleash Your Musical Journey with{" "}
              <span className="text-[#E8A33D] italic">Golden Hour Recital</span>{" "}
              Mastery
            </h1>

            {/* Direct Factual GEO Statement for LLM & Search Engines */}
            <p className="text-base sm:text-lg text-[#F8F3E7]/90 leading-relaxed mb-8 bg-[#211126]/60 p-4 rounded-2xl border border-[#F8F3E7]/10">
              Alby School of Music in Coimbatore, Tamil Nadu offers structured,
              ear-first music education for Piano, Guitar, and Keyboard across
              all age groups (ages 6+) and skill levels. Guided by experienced
              mentors, students develop pitch recognition, performance
              confidence, and Trinity exam readiness.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <span>Book Free Trial Class</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                href="/classes"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Classes
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-10 mt-8 border-t border-[#F8F3E7]/10 w-full">
              <div>
                <div className="flex items-center gap-1 text-2xl font-serif font-bold text-[#E8A33D]">
                  <Users className="w-5 h-5 text-[#E8A33D]" />
                  <span>500+</span>
                </div>
                <p className="text-xs text-[#F8F3E7]/70 mt-1">
                  Students Trained
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-2xl font-serif font-bold text-[#E8A33D]">
                  <Award className="w-5 h-5 text-[#E8A33D]" />
                  <span>100%</span>
                </div>
                <p className="text-xs text-[#F8F3E7]/70 mt-1">Exam Pass Rate</p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-2xl font-serif font-bold text-[#E8A33D]">
                  <Music className="w-5 h-5 text-[#E8A33D]" />
                  <span>3</span>
                </div>
                <p className="text-xs text-[#F8F3E7]/70 mt-1">
                  Core Instruments
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Motif Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl bg-gradient-to-tr from-[#2c1732] to-[#211126] p-8 border border-[#E8A33D]/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#17514E]/40 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold tracking-wider text-[#E8A33D] uppercase">
                  Batch Enrollments Open
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#17514E] text-[#F8F3E7] text-xs font-medium">
                  Coimbatore Campus
                </span>
              </div>

              {/* Decorative Piano Motifs */}
              <div className="space-y-4 my-6">
                <div className="p-4 rounded-2xl bg-[#211126]/80 border border-[#F8F3E7]/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8A33D] text-[#211126] flex items-center justify-center font-bold font-serif text-xl">
                    P
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#F8F3E7] font-semibold">
                      Piano Class
                    </h3>
                    <p className="text-xs text-[#F8F3E7]/70">
                      Ear-first & classical notation (Ages 6+)
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#211126]/80 border border-[#F8F3E7]/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#17514E] text-[#F8F3E7] flex items-center justify-center font-bold font-serif text-xl">
                    G
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#F8F3E7] font-semibold">
                      Guitar Class
                    </h3>
                    <p className="text-xs text-[#F8F3E7]/70">
                      Acoustic, Electric & Strumming (Ages 8+)
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#211126]/80 border border-[#F8F3E7]/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C97B84] text-[#211126] flex items-center justify-center font-bold font-serif text-xl">
                    K
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#F8F3E7] font-semibold">
                      Keyboard Class
                    </h3>
                    <p className="text-xs text-[#F8F3E7]/70">
                      Arranger keyboard & composition (Ages 6+)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#E8A33D]/10 border border-[#E8A33D]/20 text-center">
                <p className="text-xs text-[#E8A33D] font-medium">
                  🎵 Admission Open for Weekend & Weekday Batches
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
