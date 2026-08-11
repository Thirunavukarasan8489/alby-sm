import React from "react";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import { PianoKeyDivider } from "@/components/ui/PianoKeyDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Testimonial } from "@/components/sections/Testimonial";

export const metadata = constructMetadata({
  title: "Alby.sm Music Academy | Piano, Guitar & Keyboard in Coimbatore",
  description:
    "Alby.sm Music Academy in Coimbatore offers structured, ear-first music education for Piano, Guitar, and Keyboard across all age groups (ages 6+) and skill levels.",
  path: "",
});

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#2B2420]">
      {/* ---------- HERO SECTION ---------- */}
      <section className="relative overflow-hidden bg-[#211126] text-[#F8F3E7] py-[70px] sm:py-[100px] px-6">
        {/* Background Texture & Ambient Spotlight */}
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

        <div className="relative z-10 max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-[50px] items-center">
          <ScrollReveal direction="up" delay={0.05}>
            <p className="eyebrow">
              Alby.sm Music Academy · Piano · Guitar · Keyboard
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-serif tracking-normal mt-4 mb-6 leading-[1.05]">
              Where music
              <br />
              finds its{" "}
              <i className="italic text-[#E8A33D] not-italic">voice.</i>
            </h1>

            {/* Soundwave SVG */}
            <svg
              className="mt-2 mb-6 opacity-85"
              width="220"
              height="30"
              viewBox="0 0 220 30"
              aria-hidden="true"
            >
              <path
                d="M0 15 Q 10 2, 20 15 T 40 15 T 60 15 T 80 15 T 100 15 T 120 15 T 140 15 T 160 15 T 180 15 T 200 15 T 220 15"
                stroke="#E8A33D"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <p className="text-base sm:text-[17px] leading-[1.6] text-[#e6dcd0] max-w-[460px] mb-8">
              Personalised piano, guitar and keyboard lessons for every age and
              skill level — taught by working musicians in a space built for
              learning by ear, and by heart.
            </p>

            {/* Direct GEO Factual statement for AI Answer Engines */}
            <p className="sr-only">
              Alby.sm Music Academy in Coimbatore, Tamil Nadu provides
              individual and small-batch music classes for Piano, Guitar, and
              Keyboard starting at age 6+.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-[#E8A33D] text-[#211126] font-semibold text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5 inline-block shadow-lg"
              >
                Book a Trial Class
              </Link>
              <Link
                href="/classes"
                className="border border-[#F8F3E7]/40 text-[#F8F3E7] font-medium text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:border-[#E8A33D] hover:bg-[#E8A33D]/10 inline-block"
              >
                Explore Classes
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.15} className="relative">
            <div className="rounded-[4px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] border border-[#E8A33D]/25">
              <Image
                src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80"
                alt="Student playing piano at Alby.sm Music Academy"
                width={700}
                height={420}
                priority
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Floating Card */}
            <div className="relative sm:absolute sm:-bottom-[26px] sm:-left-[26px] bg-[#F8F3E7] text-[#2B2420] p-4 sm:px-5 sm:py-4 rounded-[3px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] flex items-center gap-3 max-w-[240px] mt-4 sm:mt-0 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-[#17514E] shrink-0"></span>
              <div>
                <strong className="block text-sm font-semibold">
                  Live class in session
                </strong>
                <span className="text-xs text-[#6b6055]">
                  Piano · Beginners Batch
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- PIANO KEY DIVIDER (DARK) ---------- */}
      <PianoKeyDivider variant="dark" />

      {/* ---------- ABOUT SECTION ---------- */}
      <section
        className="relative py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7] overflow-hidden"
        id="about"
      >
        {/* Background Texture Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80')",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-[60px] items-center">
          <ScrollReveal
            direction="right"
            delay={0.1}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-[4px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80"
                alt="Guitar close up at Alby.sm Music Academy"
                width={600}
                height={380}
                className="w-full h-[320px] sm:h-[380px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Offset Amber Border Box */}
            <div className="hidden lg:block absolute inset-[18px_-18px_-18px_18px] border-2 border-[#E8A33D] rounded-[4px] -z-10 pointer-events-none" />
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            delay={0.15}
            className="order-1 lg:order-2"
          >
            <p className="eyebrow !text-[#17514E]">About the Academy</p>
            <h2 className="text-3xl sm:text-[40px] font-serif text-[#211126] mt-3.5 mb-4 leading-[1.05]">
              Two decades of teaching, one room full of sound
            </h2>
            <p className="text-[#5c5147] text-base sm:text-[16px] leading-[1.75] mb-4">
              Alby.sm began as a single piano and a handful of curious students.
              Today it&apos;s a full academy where children and adults learn
              piano, guitar and keyboard through structured, patient, one-on-one
              attention — never rushed, never generic.
            </p>
            <p className="text-[#5c5147] text-base sm:text-[16px] leading-[1.75] mb-7">
              Every batch is small by design, and every lesson is built around
              the student&apos;s ear, not just a syllabus.
            </p>

            {/* Stats Row */}
            <div className="flex gap-9 pt-2">
              <div>
                <strong className="font-serif text-[34px] text-[#17514E] block font-normal leading-none mb-1">
                  18+
                </strong>
                <span className="text-[13px] text-[#6b6055]">
                  Years teaching
                </span>
              </div>
              <div>
                <strong className="font-serif text-[34px] text-[#17514E] block font-normal leading-none mb-1">
                  500+
                </strong>
                <span className="text-[13px] text-[#6b6055]">
                  Students trained
                </span>
              </div>
              <div>
                <strong className="font-serif text-[34px] text-[#17514E] block font-normal leading-none mb-1">
                  3
                </strong>
                <span className="text-[13px] text-[#6b6055]">
                  Instruments taught
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- PIANO KEY DIVIDER (LIGHT) ---------- */}
      <PianoKeyDivider variant="light" />

      {/* ---------- CLASSES SECTION ---------- */}
      <section
        className="relative py-[70px] sm:py-[90px] px-6 bg-[#211126] text-[#F8F3E7] overflow-hidden"
        id="classes"
      >
        {/* Background Image Texture Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80')",
          }}
          aria-hidden="true"
        />

        <ScrollReveal
          direction="up"
          delay={0.05}
          className="relative z-10 text-center max-w-[600px] mx-auto mb-14"
        >
          <p className="eyebrow">Our Programs</p>
          <h2 className="text-3xl sm:text-[44px] font-serif mt-3 text-[#F8F3E7]">
            Choose your instrument
          </h2>
          <p className="mt-3.5 text-[#cfc3b3] text-base leading-[1.6]">
            Structured beginner-to-advanced tracks, taught in small batches with
            room to go at your own pace.
          </p>
        </ScrollReveal>

        <div className="relative z-10 max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6.5">
          {/* Card 1: Piano */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="h-full bg-[#2c1732] border border-[#E8A33D]/18 rounded-[4px] p-7 sm:p-8.5 transition-all duration-300 hover:-translate-y-2 hover:border-[#E8A33D] hover:bg-[#331c3a] hover:shadow-[0_15px_30px_rgba(232,163,61,0.15)] flex flex-col justify-between group">
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#E8A33D]/12 flex items-center justify-center mb-5.5 group-hover:bg-[#E8A33D] transition-colors">
                  <svg
                    className="w-[26px] h-[26px] stroke-[#E8A33D] group-hover:stroke-[#211126] fill-none stroke-[1.6] transition-colors"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 4h18v16H3z" />
                    <path d="M6 4v16M9 4v10M12 4v10M18 4v16" />
                  </svg>
                </div>
                <h3 className="font-serif text-[26px] mb-2.5 text-[#F8F3E7]">
                  Piano Class
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-[#cfc3b3] mb-5">
                  From first scales to full performance pieces — classical and
                  contemporary technique, ear training and sight-reading built
                  in from lesson one.
                </p>
              </div>
              <div>
                <div className="flex justify-between text-[12.5px] text-[#a89b8c] border-t border-white/8 pt-4">
                  <span>Ages 6+</span>
                  <span>Beginner → Advanced</span>
                </div>
                <Link
                  href="/classes/piano"
                  className="text-[#E8A33D] text-[13.5px] font-semibold inline-flex items-center gap-1.5 mt-4.5 group-hover:translate-x-1 transition-transform"
                >
                  Explore Piano Class &rarr;
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Guitar */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="h-full bg-[#2c1732] border border-[#E8A33D]/18 rounded-[4px] p-7 sm:p-8.5 transition-all duration-300 hover:-translate-y-2 hover:border-[#E8A33D] hover:bg-[#331c3a] hover:shadow-[0_15px_30px_rgba(232,163,61,0.15)] flex flex-col justify-between group">
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#E8A33D]/12 flex items-center justify-center mb-5.5 group-hover:bg-[#E8A33D] transition-colors">
                  <svg
                    className="w-[26px] h-[26px] stroke-[#E8A33D] group-hover:stroke-[#211126] fill-none stroke-[1.6] transition-colors"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="8" cy="17" r="3" />
                    <path d="M11 17V5l7-2v12" />
                    <circle cx="18" cy="15" r="3" />
                  </svg>
                </div>
                <h3 className="font-serif text-[26px] mb-2.5 text-[#F8F3E7]">
                  Guitar Class
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-[#cfc3b3] mb-5">
                  Acoustic and electric fundamentals — chords, strumming
                  patterns, fingerstyle and improvisation, taught song-first so
                  progress always feels real.
                </p>
              </div>
              <div>
                <div className="flex justify-between text-[12.5px] text-[#a89b8c] border-t border-white/8 pt-4">
                  <span>Ages 8+</span>
                  <span>Beginner → Advanced</span>
                </div>
                <Link
                  href="/classes/guitar"
                  className="text-[#E8A33D] text-[13.5px] font-semibold inline-flex items-center gap-1.5 mt-4.5 group-hover:translate-x-1 transition-transform"
                >
                  Explore Guitar Class &rarr;
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Keyboard */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="h-full bg-[#2c1732] border border-[#E8A33D]/18 rounded-[4px] p-7 sm:p-8.5 transition-all duration-300 hover:-translate-y-2 hover:border-[#E8A33D] hover:bg-[#331c3a] hover:shadow-[0_15px_30px_rgba(232,163,61,0.15)] flex flex-col justify-between group">
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#E8A33D]/12 flex items-center justify-center mb-5.5 group-hover:bg-[#E8A33D] transition-colors">
                  <svg
                    className="w-[26px] h-[26px] stroke-[#E8A33D] group-hover:stroke-[#211126] fill-none stroke-[1.6] transition-colors"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="8" width="18" height="10" rx="1" />
                    <path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2M7 12v3M11 12v3M15 12v3" />
                  </svg>
                </div>
                <h3 className="font-serif text-[26px] mb-2.5 text-[#F8F3E7]">
                  Keyboard Class
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-[#cfc3b3] mb-5">
                  Sounds, layering and performance-ready keyboard skills —
                  perfect for students who want to play modern music fast, and
                  understand the theory behind it.
                </p>
              </div>
              <div>
                <div className="flex justify-between text-[12.5px] text-[#a89b8c] border-t border-white/8 pt-4">
                  <span>Ages 6+</span>
                  <span>Beginner → Advanced</span>
                </div>
                <Link
                  href="/classes/keyboard"
                  className="text-[#E8A33D] text-[13.5px] font-semibold inline-flex items-center gap-1.5 mt-4.5 group-hover:translate-x-1 transition-transform"
                >
                  Explore Keyboard Class &rarr;
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <PianoKeyDivider variant="light" />

      {/* ---------- GALLERY SECTION ---------- */}
      <section
        className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]"
        id="gallery"
      >
        <ScrollReveal
          direction="up"
          delay={0.05}
          className="text-center max-w-[600px] mx-auto mb-14"
        >
          <p className="eyebrow !text-[#17514E]">Life at the Academy</p>
          <h2 className="text-3xl sm:text-[44px] font-serif mt-3 text-[#211126]">
            Gallery
          </h2>
        </ScrollReveal>

        <div className="max-w-[1140px] mx-auto grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[150px] gap-3.5">
          <ScrollReveal
            direction="up"
            delay={0.1}
            className="col-span-2 row-span-2"
          >
            <Link
              href="/gallery"
              className="relative overflow-hidden rounded-[3px] block h-full group"
            >
              <Image
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
                alt="Recital at Alby.sm Music Academy"
                width={700}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <Link
              href="/gallery"
              className="relative overflow-hidden rounded-[3px] block h-full group"
            >
              <Image
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80"
                alt="Guitar lesson"
                width={400}
                height={150}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <Link
              href="/gallery"
              className="relative overflow-hidden rounded-[3px] block h-full group"
            >
              <Image
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
                alt="Keyboard class"
                width={400}
                height={150}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.25} className="col-span-2">
            <Link
              href="/gallery"
              className="relative overflow-hidden rounded-[3px] block h-full group"
            >
              <Image
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80"
                alt="Students together"
                width={700}
                height={150}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
            </Link>
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            delay={0.3}
            className="col-span-2 sm:col-span-1"
          >
            <Link
              href="/gallery"
              className="relative overflow-hidden rounded-[3px] block h-full group"
            >
              <Image
                src="https://images.unsplash.com/photo-1513883049090-d0b7439799bf?w=800&q=80"
                alt="Piano keys close up"
                width={400}
                height={150}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- PIANO KEY DIVIDER (LIGHT) ---------- */}
      <PianoKeyDivider variant="light" />

      {/* ---------- TESTIMONIALS SECTION ---------- */}
      <Testimonial />

      {/* ---------- PIANO KEY DIVIDER (DARK) ---------- */}
      <PianoKeyDivider variant="dark" />

      {/* ---------- CONTACT SECTION ---------- */}
      <section
        className="relative py-[70px] sm:py-[90px] px-6 bg-[#17514E] text-[#F8F3E7] overflow-hidden"
        id="contact"
      >
        {/* Background Texture Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80')",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px]">
          <ScrollReveal direction="up" delay={0.05}>
            <p className="eyebrow !text-[#a9d8d3]">Get in touch</p>
            <h2 className="text-3xl sm:text-[40px] font-serif text-[#F8F3E7] mt-3 mb-4">
              Book your trial class
            </h2>
            <p className="text-[#d7e4e2] text-base leading-[1.7] mb-6.5">
              Tell us which instrument you&apos;re interested in and a preferred
              time — we&apos;ll get back to you within a day to set up your
              first free trial session.
            </p>

            <div className="flex flex-col gap-3.5 text-[14.5px]">
              <div className="flex gap-3 items-start">
                <span>📍</span>
                <span>Alby.sm Music Academy, Coimbatore, Tamil Nadu</span>
              </div>
              <div className="flex gap-3 items-start">
                <span>📞</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex gap-3 items-start">
                <span>✉️</span>
                <span>hello@albysm.com</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.15}>
            <form
              className="bg-white/6 border border-white/15 rounded-[6px] p-7 sm:p-[34px] flex flex-col gap-3.5"
              action="/contact"
            >
              <input
                type="text"
                placeholder="Your name"
                required
                className="bg-white/8 border border-white/20 text-[#F8F3E7] placeholder-[#b7cbc8] p-3.5 rounded-[3px] font-sans text-sm focus:outline-none focus:border-[#E8A33D]"
              />
              <input
                type="tel"
                placeholder="Phone number"
                required
                className="bg-white/8 border border-white/20 text-[#F8F3E7] placeholder-[#b7cbc8] p-3.5 rounded-[3px] font-sans text-sm focus:outline-none focus:border-[#E8A33D]"
              />
              <input
                type="text"
                placeholder="Interested in (Piano / Guitar / Keyboard)"
                className="bg-white/8 border border-white/20 text-[#F8F3E7] placeholder-[#b7cbc8] p-3.5 rounded-[3px] font-sans text-sm focus:outline-none focus:border-[#E8A33D]"
              />
              <textarea
                rows={3}
                placeholder="Message"
                className="bg-white/8 border border-white/20 text-[#F8F3E7] placeholder-[#b7cbc8] p-3.5 rounded-[3px] font-sans text-sm focus:outline-none focus:border-[#E8A33D]"
              />
              <button
                type="submit"
                className="bg-[#E8A33D] text-[#211126] border-none p-3.5 font-semibold text-[15px] rounded-[3px] cursor-pointer transition-all hover:bg-white hover:scale-[1.01]"
              >
                Send Request
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
