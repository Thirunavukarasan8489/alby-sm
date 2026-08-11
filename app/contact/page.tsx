"use client";

import React, { useState } from "react";
import Link from "next/link";
import { constructMetadata, generateLocalBusinessJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { PianoKeyDivider } from "@/components/ui/PianoKeyDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ContactPage() {
  const localBusinessJsonLd = generateLocalBusinessJsonLd();
  const faqJsonLd = generateFaqJsonLd();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is the trial class free?",
      answer: "Yes — every new student gets one free trial class before enrolling, across any of our three instruments.",
    },
    {
      question: "What age can my child start?",
      answer: "Piano and Keyboard classes are open from age 6, and Guitar from age 8, though we assess each child individually.",
    },
    {
      question: "Do you offer 1-on-1 lessons?",
      answer: "Yes, both small-group and one-on-one formats are available depending on the batch and instrument.",
    },
    {
      question: "Do I need to own an instrument to start?",
      answer: "Not for your first few classes — we'll guide you on what to buy once you're ready to practice at home.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#2B2420]">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ---------- PAGE HERO ---------- */}
      <section className="relative overflow-hidden bg-[#211126] text-[#F8F3E7] pt-[70px] pb-[55px] px-6 text-center">
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
            / Contact
          </p>
          <p className="eyebrow">Get in Touch</p>
          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-serif tracking-normal mt-3.5 mb-4 leading-[1.05]">
            Book your <i className="italic text-[#E8A33D] not-italic">trial class</i>
          </h1>
          <p className="max-w-[480px] mx-auto text-[#e6dcd0] text-base leading-[1.6]">
            Tell us which instrument you&apos;re interested in and a preferred time — we&apos;ll get back to you within a day.
          </p>
        </ScrollReveal>
      </section>

      {/* ---------- PIANO KEY DIVIDER (DARK) ---------- */}
      <PianoKeyDivider variant="dark" />

      {/* ---------- MAIN CONTACT SECTION ---------- */}
      <section className="relative overflow-hidden bg-[#17514E] text-[#F8F3E7] py-[70px] sm:py-[90px] px-6">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80')",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-[60px]">
          <ScrollReveal direction="up" delay={0.05}>
            <h2 className="text-3xl sm:text-[38px] font-serif text-[#F8F3E7]">Let&apos;s talk music</h2>
            <p className="text-[#d7e4e2] text-base leading-[1.7] mt-4 mb-[30px]">
              Reach out with any questions about batches, timings or fees — or just come by the academy for a visit.
            </p>

            <div className="flex flex-col">
              <div className="flex gap-3.5 items-start py-4 border-b border-white/12">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E8A33D]/15 flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px] stroke-[#E8A33D] fill-none stroke-[1.6]" viewBox="0 0 24 24">
                    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[14.5px] mb-0.5 text-white">Visit us</strong>
                  <span className="text-[13.5px] text-[#c9dedb]">Alby.sm Music Academy, Coimbatore, Tamil Nadu</span>
                </div>
              </div>

              <div className="flex gap-3.5 items-start py-4 border-b border-white/12">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E8A33D]/15 flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px] stroke-[#E8A33D] fill-none stroke-[1.6]" viewBox="0 0 24 24">
                    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8 9.9a16 16 0 006 6l1.4-1.3a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.8 2z" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[14.5px] mb-0.5 text-white">Call us</strong>
                  <span className="text-[13.5px] text-[#c9dedb]">+91 98765 43210</span>
                </div>
              </div>

              <div className="flex gap-3.5 items-start py-4 border-b border-white/12">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E8A33D]/15 flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px] stroke-[#E8A33D] fill-none stroke-[1.6]" viewBox="0 0 24 24">
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 6l8 7 8-7" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[14.5px] mb-0.5 text-white">Email us</strong>
                  <span className="text-[13.5px] text-[#c9dedb]">hello@albysm.com</span>
                </div>
              </div>

              <div className="flex gap-3.5 items-start py-4">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E8A33D]/15 flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px] stroke-[#E8A33D] fill-none stroke-[1.6]" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[14.5px] mb-0.5 text-white">Academy hours</strong>
                  <span className="text-[13.5px] text-[#c9dedb]">Mon–Sat, 10:00 AM – 7:30 PM</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/alby.sm.music"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-xs hover:bg-[#E8A33D] hover:border-[#E8A33D] hover:text-[#211126] transition-colors"
              >
                IG
              </a>
              <a
                href="https://facebook.com/albysmmusic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-xs hover:bg-[#E8A33D] hover:border-[#E8A33D] hover:text-[#211126] transition-colors"
              >
                FB
              </a>
              <a
                href="https://youtube.com/@albysmmusic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-xs hover:bg-[#E8A33D] hover:border-[#E8A33D] hover:text-[#211126] transition-colors"
              >
                YT
              </a>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="left" delay={0.15}>
            <form className="bg-white/6 border border-white/15 rounded-[6px] p-7 sm:p-[34px] flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12.5px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 block">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full bg-white/8 border border-white/20 text-[#F8F3E7] placeholder-[#b7cbc8] p-3 rounded-[3px] font-sans text-sm focus:outline-none focus:border-[#E8A33D]"
                  />
                </div>

                <div>
                  <label className="text-[12.5px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 block">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91"
                    required
                    className="w-full bg-white/8 border border-white/20 text-[#F8F3E7] placeholder-[#b7cbc8] p-3 rounded-[3px] font-sans text-sm focus:outline-none focus:border-[#E8A33D]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12.5px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 block">
                  Interested in
                </label>
                <select className="w-full bg-white/8 border border-white/20 text-[#F8F3E7] p-3 rounded-[3px] font-sans text-sm focus:outline-none focus:border-[#E8A33D]">
                  <option className="text-[#222]">Piano Class</option>
                  <option className="text-[#222]">Guitar Class</option>
                  <option className="text-[#222]">Keyboard Class</option>
                  <option className="text-[#222]">Not sure yet</option>
                </select>
              </div>

              <div>
                <label className="text-[12.5px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 block">
                  Preferred time
                </label>
                <input
                  type="text"
                  placeholder="e.g. Weekday evenings"
                  className="w-full bg-white/8 border border-white/20 text-[#F8F3E7] placeholder-[#b7cbc8] p-3 rounded-[3px] font-sans text-sm focus:outline-none focus:border-[#E8A33D]"
                />
              </div>

              <div>
                <label className="text-[12.5px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 block">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us a bit about yourself or your child"
                  className="w-full bg-white/8 border border-white/20 text-[#F8F3E7] placeholder-[#b7cbc8] p-3 rounded-[3px] font-sans text-sm focus:outline-none focus:border-[#E8A33D]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#E8A33D] text-[#211126] border-none p-3.5 font-semibold text-[15.5px] rounded-[3px] cursor-pointer transition-all hover:bg-white hover:scale-[1.01] mt-1.5"
              >
                Send Request
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- MAP SECTION ---------- */}
      <section className="bg-[#F8F3E7] p-0">
        <div className="w-full h-[360px] bg-gradient-to-br from-[#e4dcc9] to-[#d8cdb4] flex items-center justify-center text-[#8a7a63] text-sm tracking-wide">
          📍 Map embed goes here — Alby.sm Music Academy, Coimbatore
        </div>
      </section>

      {/* ---------- FAQ SECTION ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]">
        <ScrollReveal direction="up" delay={0.05} className="max-w-[760px] mx-auto">
          <p className="eyebrow !text-[#17514E] text-center block">Common Questions</p>
          <h2 className="text-center text-[#211126] mt-3 mb-10 text-2xl sm:text-[36px] font-serif">
            Frequently asked
          </h2>

          <div className="space-y-0">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-[#2B2420]/15 py-[22px]"
                >
                  <h3
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="font-sans text-base font-semibold text-[#211126] cursor-pointer flex justify-between items-center"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`text-[#E8A33D] text-xl transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </h3>
                  {isOpen && (
                    <p className="text-[14.5px] text-[#5c5147] leading-[1.65] mt-3">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
