import React from "react";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import { PianoKeyDivider } from "@/components/ui/PianoKeyDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = constructMetadata({
  title: "About Us | Alby.sm Music Academy Coimbatore",
  description:
    "Learn about Alby.sm Music Academy in Coimbatore, Tamil Nadu — our ear-first teaching philosophy, certified faculty, and state-of-the-art facilities for Piano, Guitar, and Keyboard.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#2B2420]">
      {/* ---------- PAGE HERO ---------- */}
      <section className="relative overflow-hidden bg-[#211126] text-[#F8F3E7] py-[70px] px-6 text-center">
        {/* Ambient Overlay Texture */}
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

        <ScrollReveal
          direction="up"
          delay={0.05}
          className="relative z-10 max-w-[1140px] mx-auto"
        >
          <p className="text-[13px] text-[#b7aa9c] mb-2">
            <Link href="/" className="text-[#E8A33D] hover:underline">
              Home
            </Link>{" "}
            / About
          </p>
          <p className="eyebrow">Our Story</p>
          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-serif tracking-normal mt-3.5 mb-4 leading-[1.05]">
            Two decades of{" "}
            <i className="italic text-[#E8A33D] not-italic">teaching,</i>
            <br />
            one room full of sound
          </h1>
          <p className="max-w-[520px] mx-auto mt-4 text-[#e6dcd0] text-base leading-[1.6]">
            Alby.sm began as a single piano and a handful of curious students —
            today it&apos;s a full academy built on patient, one-on-one
            attention.
          </p>
        </ScrollReveal>
      </section>

      {/* ---------- PIANO KEY DIVIDER (DARK) ---------- */}
      <PianoKeyDivider variant="dark" />

      {/* ---------- STORY SECTION ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-[60px] items-center">
          <ScrollReveal
            direction="right"
            delay={0.1}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-[4px] overflow-hidden">
              <Image
                src="/images/alby-grand-piano.jpg"
                alt="Piano lesson in progress at Alby.sm"
                width={600}
                height={400}
                className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 hover:scale-105"
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
            <p className="eyebrow !text-[#17514E]">How it started</p>
            <h2 className="text-3xl sm:text-[40px] font-serif text-[#211126] mt-3.5 mb-4 leading-[1.05]">
              Music, taught the way it&apos;s meant to be learned
            </h2>
            <p className="text-[#5c5147] text-base sm:text-[16px] leading-[1.75] mb-4">
              Alby.sm was founded on a simple idea: that every student learns
              music differently, and a good teacher listens before they
              instruct. What started as informal piano lessons has grown into a
              full academy for piano, guitar and keyboard — but the small-batch,
              ear-first approach hasn&apos;t changed.
            </p>
            <p className="text-[#5c5147] text-base sm:text-[16px] leading-[1.75]">
              We don&apos;t chase big numbers. We keep every batch small enough
              that the instructor knows exactly where each student is stuck, and
              exactly what they&apos;re ready for next.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- PIANO KEY DIVIDER (LIGHT) ---------- */}
      <PianoKeyDivider variant="light" />

      {/* ---------- VALUES SECTION ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#211126] text-[#F8F3E7]">
        <ScrollReveal
          direction="up"
          delay={0.05}
          className="text-center max-w-[600px] mx-auto mb-14"
        >
          <p className="eyebrow">What we believe</p>
          <h2 className="text-3xl sm:text-[44px] font-serif mt-3 text-[#F8F3E7]">
            How we teach
          </h2>
          <p className="mt-3.5 text-[#cfc3b3] text-base leading-[1.6]">
            Three principles that shape every lesson at Alby.sm.
          </p>
        </ScrollReveal>

        <div className="max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6.5">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="h-full bg-[#2c1732] border border-[#E8A33D]/18 rounded-[4px] p-7 sm:p-[32px_26px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8A33D]">
              <div className="w-[48px] h-[48px] rounded-full bg-[#E8A33D]/12 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 stroke-[#E8A33D] fill-none stroke-[1.6]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v14M8 21h8M9 17a3 3 0 006 0" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] mb-2.5 text-[#F8F3E7]">
                Ear before page
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-[#cfc3b3]">
                Students learn to hear music first — sight-reading and theory
                build on top of that instinct, not instead of it.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="h-full bg-[#2c1732] border border-[#E8A33D]/18 rounded-[4px] p-7 sm:p-[32px_26px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8A33D]">
              <div className="w-[48px] h-[48px] rounded-full bg-[#E8A33D]/12 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 stroke-[#E8A33D] fill-none stroke-[1.6]"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] mb-2.5 text-[#F8F3E7]">
                Small batches, always
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-[#cfc3b3]">
                No class grows so large that a student can quietly fall behind.
                Every session is built around who&apos;s actually in the room.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="h-full bg-[#2c1732] border border-[#E8A33D]/18 rounded-[4px] p-7 sm:p-[32px_26px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8A33D]">
              <div className="w-[48px] h-[48px] rounded-full bg-[#E8A33D]/12 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 stroke-[#E8A33D] fill-none stroke-[1.6]"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 12l6 6L20 6" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] mb-2.5 text-[#F8F3E7]">
                Progress you can hear
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-[#cfc3b3]">
                Every few weeks, students play something whole — not drills.
                Real progress should sound like real music.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- TIMELINE SECTION ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]">
        <ScrollReveal
          direction="up"
          delay={0.05}
          className="text-center max-w-[600px] mx-auto mb-14"
        >
          <p className="eyebrow !text-[#17514E]">Milestones</p>
          <h2 className="text-3xl sm:text-[44px] font-serif mt-3 text-[#211126]">
            Our journey
          </h2>
        </ScrollReveal>

        <div className="max-w-[760px] mx-auto relative pl-[32px] border-l-2 border-[#17514E]/25 space-y-10">
          <ScrollReveal direction="up" delay={0.1} className="relative">
            <div className="absolute -left-[39px] top-1 w-[13px] h-[13px] rounded-full bg-[#17514E] border-[3px] border-[#F8F3E7] shadow-[0_0_0_2px_#17514E]" />
            <div className="font-serif text-[24px] text-[#17514E]">2007</div>
            <p className="text-[#5c5147] mt-1.5 leading-[1.6] text-[15px]">
              Alby.sm opens with a single piano room and 12 students in
              Coimbatore.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15} className="relative">
            <div className="absolute -left-[39px] top-1 w-[13px] h-[13px] rounded-full bg-[#17514E] border-[3px] border-[#F8F3E7] shadow-[0_0_0_2px_#17514E]" />
            <div className="font-serif text-[24px] text-[#17514E]">2013</div>
            <p className="text-[#5c5147] mt-1.5 leading-[1.6] text-[15px]">
              Guitar classes introduced, followed by our first public student
              recital.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="relative">
            <div className="absolute -left-[39px] top-1 w-[13px] h-[13px] rounded-full bg-[#17514E] border-[3px] border-[#F8F3E7] shadow-[0_0_0_2px_#17514E]" />
            <div className="font-serif text-[24px] text-[#17514E]">2019</div>
            <p className="text-[#5c5147] mt-1.5 leading-[1.6] text-[15px]">
              Keyboard program launches, rounding out the academy&apos;s three
              core instruments.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.25} className="relative">
            <div className="absolute -left-[39px] top-1 w-[13px] h-[13px] rounded-full bg-[#17514E] border-[3px] border-[#F8F3E7] shadow-[0_0_0_2px_#17514E]" />
            <div className="font-serif text-[24px] text-[#17514E]">2026</div>
            <p className="text-[#5c5147] mt-1.5 leading-[1.6] text-[15px]">
              500+ students trained, with alumni performing across Tamil Nadu.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- PIANO KEY DIVIDER (DARK) ---------- */}
      <PianoKeyDivider variant="dark" />

      {/* ---------- FACULTY SECTION ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#211126] text-[#F8F3E7]">
        <ScrollReveal
          direction="up"
          delay={0.05}
          className="text-center max-w-[600px] mx-auto mb-14"
        >
          <p className="eyebrow">Meet the instructors</p>
          <h2 className="text-3xl sm:text-[44px] font-serif mt-3 text-[#F8F3E7]">
            Taught by working musicians
          </h2>
          {/* <p className="mt-3.5 text-[#cfc3b3] text-base leading-[1.6]">
            Every instructor at Alby.sm performs, not just teaches.
          </p> */}
        </ScrollReveal>

        <div className="max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6.5">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="h-full bg-[#2c1732] rounded-[4px] overflow-hidden border border-[#E8A33D]/15 transition-all duration-300 hover:-translate-y-1.5">
              <Image
                src="/images/alby-founder.jpg"
                alt="Master Alby - Founder & Lead Instructor"
                width={400}
                height={260}
                className="w-full h-[260px] object-cover"
              />
              <div className="p-[22px]">
                <h3 className="font-serif text-[21px] text-[#F8F3E7]">
                  Master Alby
                </h3>
                <span className="block text-[#E8A33D] text-[13px] my-1.5 font-semibold">
                  Piano · 12 yrs experience
                </span>
                <p className="text-[14px] text-[#cfc3b3] leading-[1.6]">
                  Trained in classical piano performance, specialising in
                  beginner-to-intermediate technique.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="h-full bg-[#2c1732] rounded-[4px] overflow-hidden border border-[#E8A33D]/15 transition-all duration-300 hover:-translate-y-1.5">
              <Image
                src="https://images.unsplash.com/photo-1583407723467-9b0c6d2f2b8f?w=400&q=80"
                alt="Guitar instructor"
                width={400}
                height={260}
                className="w-full h-[260px] object-cover"
              />
              <div className="p-[22px]">
                <h3 className="font-serif text-[21px] text-[#F8F3E7]">
                  R. Karthik
                </h3>
                <span className="block text-[#E8A33D] text-[13px] my-1.5 font-semibold">
                  Guitar · 9 yrs experience
                </span>
                <p className="text-[14px] text-[#cfc3b3] leading-[1.6]">
                  Acoustic and electric guitarist focused on song-first,
                  practical learning.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="h-full bg-[#2c1732] rounded-[4px] overflow-hidden border border-[#E8A33D]/15 transition-all duration-300 hover:-translate-y-1.5">
              <Image
                src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80"
                alt="Keyboard instructor"
                width={400}
                height={260}
                className="w-full h-[260px] object-cover"
              />
              <div className="p-[22px]">
                <h3 className="font-serif text-[21px] text-[#F8F3E7]">
                  S. Priya
                </h3>
                <span className="block text-[#E8A33D] text-[13px] my-1.5 font-semibold">
                  Keyboard · 7 yrs experience
                </span>
                <p className="text-[14px] text-[#cfc3b3] leading-[1.6]">
                  Performance keyboardist teaching modern arrangement and
                  layered sound.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- CTA STRIP ---------- */}
      <section className="bg-[#17514E] text-[#F8F3E7] text-center py-[70px] px-6">
        <ScrollReveal
          direction="up"
          delay={0.05}
          className="max-w-[1140px] mx-auto"
        >
          <h2 className="text-3xl sm:text-[38px] font-serif">
            Come hear it for yourself
          </h2>
          <p className="mt-3.5 mb-6.5 max-w-[460px] mx-auto text-[#d7e4e2] text-base">
            Book a free trial class and meet your instructor before you commit.
          </p>
          <Link
            href="/contact"
            className="bg-[#E8A33D] text-[#211126] font-semibold text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5 inline-block shadow-md"
          >
            Join Now
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
