import React from "react";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import { PianoKeyDivider } from "@/components/ui/PianoKeyDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = constructMetadata({
  title: "Classes & Syllabi | Piano, Guitar, Keyboard in Coimbatore",
  description:
    "Explore Piano, Guitar, and Keyboard classes at Alby.sm Music Academy in Coimbatore. Small batch sizes, ear-first training, and Trinity exam prep for ages 6+.",
  path: "/classes",
});

export default function ClassesPage() {
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

        <ScrollReveal direction="up" delay={0.05} className="relative z-10 max-w-[1140px] mx-auto">
          <p className="text-[13px] text-[#b7aa9c] mb-2">
            <Link href="/" className="text-[#E8A33D] hover:underline">
              Home
            </Link>{" "}
            / Classes
          </p>
          <p className="eyebrow">Our Programs</p>
          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-serif tracking-normal mt-3.5 mb-4 leading-[1.05]">
            Choose your <i className="italic text-[#E8A33D] not-italic">instrument</i>
          </h1>
          <p className="max-w-[520px] mx-auto text-[#e6dcd0] text-base leading-[1.6]">
            Structured beginner-to-advanced tracks in Piano, Guitar and Keyboard — taught in small batches, at your own pace.
          </p>
        </ScrollReveal>
      </section>

      {/* ---------- JUMPNAV BAR ---------- */}
      <div className="bg-[#F8F3E7] border-b border-[#17514E]/15 sticky top-[64px] z-40">
        <div className="max-w-[1140px] mx-auto flex gap-2 py-3.5 px-6 overflow-x-auto justify-center">
          <a
            href="#piano"
            className="text-[13.5px] font-semibold px-4 py-2 rounded-full border border-[#17514E]/25 text-[#17514E] whitespace-nowrap transition-colors hover:bg-[#17514E] hover:text-[#F8F3E7]"
          >
            🎹 Piano Class
          </a>
          <a
            href="#guitar"
            className="text-[13.5px] font-semibold px-4 py-2 rounded-full border border-[#17514E]/25 text-[#17514E] whitespace-nowrap transition-colors hover:bg-[#17514E] hover:text-[#F8F3E7]"
          >
            🎸 Guitar Class
          </a>
          <a
            href="#keyboard"
            className="text-[13.5px] font-semibold px-4 py-2 rounded-full border border-[#17514E]/25 text-[#17514E] whitespace-nowrap transition-colors hover:bg-[#17514E] hover:text-[#F8F3E7]"
          >
            🎛 Keyboard Class
          </a>
        </div>
      </div>

      {/* ---------- PIANO KEY DIVIDER (DARK) ---------- */}
      <PianoKeyDivider variant="dark" />

      {/* ---------- PIANO CLASS BLOCK ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]" id="piano">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-center">
          <ScrollReveal direction="right" delay={0.1} className="relative">
            <div className="relative rounded-[4px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80"
                alt="Piano class at Alby.sm"
                width={600}
                height={400}
                className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="hidden lg:block absolute inset-[18px_-18px_-18px_18px] border-2 border-[#E8A33D] rounded-[4px] -z-10 pointer-events-none" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="eyebrow !text-[#17514E]">Piano Class</p>
            <h2 className="text-3xl sm:text-[44px] font-serif text-[#211126] mt-3.5 mb-4 leading-[1.05]">
              From first scales to full performance
            </h2>
            <p className="text-[#5c5147] text-base leading-[1.75] mb-5.5">
              Our piano program builds classical and contemporary technique side by side — ear training and sight-reading are part of every lesson, not a separate track.
            </p>

            <ul className="list-none mb-6.5">
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Posture, hand position and note reading fundamentals</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Scales, chords and basic music theory</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Classical repertoire alongside film and contemporary pieces</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Sight-reading and ear training built into every level</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c]">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Performance prep for recitals and exams</span>
              </li>
            </ul>

            <div className="bg-[#efe7d5] rounded-[4px] p-4.5 flex gap-6 flex-wrap mb-5.5">
              <div>
                <strong className="block text-[13px] text-[#17514E] mb-0.5">Age group</strong>
                <span className="text-[13.5px] text-[#5c5147]">6 years and up</span>
              </div>
              <div>
                <strong className="block text-[13px] text-[#17514E] mb-0.5">Level</strong>
                <span className="text-[13.5px] text-[#5c5147]">Beginner → Advanced</span>
              </div>
              <div>
                <strong className="block text-[13px] text-[#17514E] mb-0.5">Batch size</strong>
                <span className="text-[13.5px] text-[#5c5147]">Small groups / 1-on-1</span>
              </div>
            </div>

            <Link
              href="/classes/piano"
              className="bg-[#E8A33D] text-[#211126] font-semibold text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5 inline-block shadow-md"
            >
              Enroll in Piano Class
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- PIANO KEY DIVIDER (LIGHT) ---------- */}
      <PianoKeyDivider variant="light" />

      {/* ---------- GUITAR CLASS BLOCK ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]" id="guitar">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-center">
          <ScrollReveal direction="up" delay={0.15} className="order-2 lg:order-1">
            <p className="eyebrow !text-[#17514E]">Guitar Class</p>
            <h2 className="text-3xl sm:text-[44px] font-serif text-[#211126] mt-3.5 mb-4 leading-[1.05]">
              Song-first, so progress always feels real
            </h2>
            <p className="text-[#5c5147] text-base leading-[1.75] mb-5.5">
              Acoustic and electric fundamentals taught through actual songs from lesson one — chords and strumming build naturally into fingerstyle and improvisation.
            </p>

            <ul className="list-none mb-6.5">
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Open chords, strumming patterns and rhythm technique</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Fingerstyle and basic fretboard theory</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Acoustic and electric guitar technique</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Improvisation and simple soloing</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c]">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Band-style ensemble playing at intermediate level</span>
              </li>
            </ul>

            <div className="bg-[#efe7d5] rounded-[4px] p-4.5 flex gap-6 flex-wrap mb-5.5">
              <div>
                <strong className="block text-[13px] text-[#17514E] mb-0.5">Age group</strong>
                <span className="text-[13.5px] text-[#5c5147]">8 years and up</span>
              </div>
              <div>
                <strong className="block text-[13px] text-[#17514E] mb-0.5">Level</strong>
                <span className="text-[13.5px] text-[#5c5147]">Beginner → Advanced</span>
              </div>
              <div>
                <strong className="block text-[13px] text-[#17514E] mb-0.5">Batch size</strong>
                <span className="text-[13.5px] text-[#5c5147]">Small groups / 1-on-1</span>
              </div>
            </div>

            <Link
              href="/classes/guitar"
              className="bg-[#E8A33D] text-[#211126] font-semibold text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5 inline-block shadow-md"
            >
              Enroll in Guitar Class
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.1} className="relative order-1 lg:order-2">
            <div className="relative rounded-[4px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80"
                alt="Guitar class at Alby.sm"
                width={600}
                height={400}
                className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="hidden lg:block absolute inset-[18px_18px_-18px_-18px] border-2 border-[#E8A33D] rounded-[4px] -z-10 pointer-events-none" />
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- PIANO KEY DIVIDER (DARK) ---------- */}
      <PianoKeyDivider variant="dark" />

      {/* ---------- KEYBOARD CLASS BLOCK ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]" id="keyboard">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-center">
          <ScrollReveal direction="right" delay={0.1} className="relative">
            <div className="relative rounded-[4px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
                alt="Keyboard class at Alby.sm"
                width={600}
                height={400}
                className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="hidden lg:block absolute inset-[18px_-18px_-18px_18px] border-2 border-[#E8A33D] rounded-[4px] -z-10 pointer-events-none" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="eyebrow !text-[#17514E]">Keyboard Class</p>
            <h2 className="text-3xl sm:text-[44px] font-serif text-[#211126] mt-3.5 mb-4 leading-[1.05]">
              Modern sound, performance-ready fast
            </h2>
            <p className="text-[#5c5147] text-base leading-[1.75] mb-5.5">
              A great fit for students who want to play modern music quickly — layered sounds, arrangement and performance technique, with the theory explained as it&apos;s used.
            </p>

            <ul className="list-none mb-6.5">
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Keyboard-specific technique and voicing</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Sound layering, patches and arrangement basics</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Chord-based playing for film, pop and devotional music</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c] border-b border-dashed border-[#2B2420]/12">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Backing-track and live performance practice</span>
              </li>
              <li className="flex gap-2.5 items-start py-2 text-[14.5px] text-[#3d352c]">
                <span className="text-[#E8A33D] text-[15px]">♪</span>
                <span>Music theory taught in context, not in isolation</span>
              </li>
            </ul>

            <div className="bg-[#efe7d5] rounded-[4px] p-4.5 flex gap-6 flex-wrap mb-5.5">
              <div>
                <strong className="block text-[13px] text-[#17514E] mb-0.5">Age group</strong>
                <span className="text-[13.5px] text-[#5c5147]">6 years and up</span>
              </div>
              <div>
                <strong className="block text-[13px] text-[#17514E] mb-0.5">Level</strong>
                <span className="text-[13.5px] text-[#5c5147]">Beginner → Advanced</span>
              </div>
              <div>
                <strong className="block text-[13px] text-[#17514E] mb-0.5">Batch size</strong>
                <span className="text-[13.5px] text-[#5c5147]">Small groups / 1-on-1</span>
              </div>
            </div>

            <Link
              href="/classes/keyboard"
              className="bg-[#E8A33D] text-[#211126] font-semibold text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5 inline-block shadow-md"
            >
              Enroll in Keyboard Class
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- CTA STRIP ---------- */}
      <section className="bg-[#17514E] text-[#F8F3E7] text-center py-[70px] px-6">
        <ScrollReveal direction="up" delay={0.05} className="max-w-[1140px] mx-auto">
          <h2 className="text-3xl sm:text-[38px] font-serif">Not sure which instrument is right?</h2>
          <p className="mt-3.5 mb-6.5 max-w-[460px] mx-auto text-[#d7e4e2] text-base">
            Book a free trial across any class and decide after you&apos;ve tried it.
          </p>
          <Link
            href="/contact"
            className="bg-[#E8A33D] text-[#211126] font-semibold text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5 inline-block shadow-md"
          >
            Book a Trial Class
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
