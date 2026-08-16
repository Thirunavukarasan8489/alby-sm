import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { ACADEMY_INFO } from "@/lib/constants";
import { PianoKeyDivider } from "@/components/ui/PianoKeyDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = constructMetadata({
  title: "Privacy Policy | Alby School of Music Coimbatore",
  description:
    "Privacy Policy for Alby School of Music in Coimbatore. Learn how we collect, protect, and use your personal information when booking trial music classes.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
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

        <ScrollReveal
          direction="up"
          delay={0.05}
          className="relative z-10 max-w-[1140px] mx-auto"
        >
          <p className="text-[13px] text-[#b7aa9c] mb-2">
            <Link href="/" className="text-[#E8A33D] hover:underline">
              Home
            </Link>{" "}
            / Privacy Policy
          </p>
          <p className="eyebrow">Legal & Compliance</p>
          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-serif tracking-normal mt-3.5 mb-2 leading-[1.05]">
            Privacy <i className="italic text-[#E8A33D] not-italic">Policy</i>
          </h1>
          <p className="text-xs text-[#cfc3b3] mt-2">
            Last Updated: August 15, 2026
          </p>
        </ScrollReveal>
      </section>

      {/* ---------- PIANO KEY DIVIDER (DARK) ---------- */}
      <PianoKeyDivider variant="dark" />

      {/* ---------- CONTENT SECTION ---------- */}
      <section className="py-[60px] sm:py-[90px] px-6 bg-[#F8F3E7]">
        <div className="max-w-[840px] mx-auto bg-white border border-[#E8A33D]/20 rounded-[8px] p-6 sm:p-[48px] shadow-sm">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="prose prose-stone max-w-none text-[#3a322b] text-sm sm:text-base leading-[1.8] flex flex-col gap-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#211126] mb-3">
                  1. Introduction & Overview
                </h2>
                <p>
                  At <strong>{ACADEMY_INFO.name}</strong> (&quot;we&quot;,
                  &quot;our&quot;, or &quot;us&quot;), located in Coimbatore,
                  Tamil Nadu, we value your privacy and are committed to
                  protecting the personal information of our students, parents,
                  and website visitors. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your data when you visit
                  our website or submit an inquiry for music classes.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#211126] mb-3">
                  2. Information We Collect
                </h2>
                <p className="mb-3">
                  We collect personal information that you voluntarily provide
                  to us when expressing interest in our Piano, Guitar, or
                  Keyboard programs:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#4a4037]">
                  <li>
                    <strong>Contact Data:</strong> Full name, phone number,
                    country code, and email address.
                  </li>
                  <li>
                    <strong>Class Preferences:</strong> Selected instrument
                    (Piano, Guitar, Keyboard), skill level, and preferred trial
                    session timings.
                  </li>
                  <li>
                    <strong>Messages & Notes:</strong> Any specific requests or
                    questions submitted via our booking and contact forms.
                  </li>
                  <li>
                    <strong>Technical Logs:</strong> IP address, browser type,
                    device information, and diagnostic access timestamps.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#211126] mb-3">
                  3. How We Use Your Information
                </h2>
                <p className="mb-3">
                  Your information is strictly used for legitimate educational
                  and communication purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#4a4037]">
                  <li>
                    To schedule and confirm your free trial music class or exam
                    prep consultation.
                  </li>
                  <li>
                    To respond to your inquiries via WhatsApp, email, or direct
                    phone calls.
                  </li>
                  <li>
                    To maintain academy records, student attendance, and
                    schedule updates.
                  </li>
                  <li>
                    To improve our curriculum, website user experience, and
                    course offerings.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#211126] mb-3">
                  4. Data Security & Storage
                </h2>
                <p>
                  We implement robust administrative, technical, and physical
                  security measures to protect your personal data against
                  unauthorized access, alteration, disclosure, or destruction.
                  Trial bookings submitted on our site are processed securely
                  over encrypted HTTPS protocol and stored in secured database
                  environments. We never sell, rent, or trade your personal
                  information to third-party advertisers.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#211126] mb-3">
                  5. Third-Party Services
                </h2>
                <p>
                  We may utilize trusted third-party service providers (such as
                  MongoDB database hosting, Vercel infrastructure, and WhatsApp
                  direct messaging links) strictly to assist in operating our
                  website and conducting academy communications. These third
                  parties have access to your personal information only to
                  perform specific tasks on our behalf.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#211126] mb-3">
                  6. Your Privacy Rights
                </h2>
                <p>
                  You have the right to request access to the personal data we
                  hold about you, request corrections to inaccurate information,
                  or request the deletion of your contact records from our
                  database. To exercise these rights, please contact us using
                  the details below.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#211126] mb-3">
                  7. Contact Us
                </h2>
                <p className="mb-4">
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our data practices, please get in touch
                  with us:
                </p>
                <div className="bg-[#211126] text-[#F8F3E7] p-6 rounded-[6px] text-sm space-y-2 border border-[#E8A33D]/30">
                  <p className="font-serif text-lg text-[#E8A33D] font-semibold">
                    {ACADEMY_INFO.name}
                  </p>
                  <p>📍 Address: {ACADEMY_INFO.formattedAddress}</p>
                  <p>
                    ✉️ Email:{" "}
                    <a
                      href={`mailto:${ACADEMY_INFO.email}`}
                      className="text-[#E8A33D] hover:underline"
                    >
                      {ACADEMY_INFO.email}
                    </a>
                  </p>
                  <p>📞 Phone: {ACADEMY_INFO.phone}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- PIANO KEY DIVIDER (TEAL) ---------- */}
      <PianoKeyDivider variant="teal" />

      {/* ---------- CTA STRIP ---------- */}
      <section className="bg-[#17514E] text-[#F8F3E7] text-center py-[60px] px-6">
        <ScrollReveal
          direction="up"
          delay={0.05}
          className="max-w-[1140px] mx-auto"
        >
          <h2 className="text-2xl sm:text-4xl mb-6.5 font-serif">
            Ready to start your musical journey?
          </h2>
          {/* <p className="mt-3 mb-6 max-w-[480px] mx-auto text-[#d7e4e2] text-sm sm:text-base">
            Book a trial class with Master Alby today and experience ear-first learning.
          </p> */}
          <Link
            href="/contact"
            className="bg-[#E8A33D] text-[#211126] font-semibold text-[15px] px-7 py-3.5 rounded-[3px] transition-all hover:bg-white hover:-translate-y-0.5 inline-block shadow-md"
          >
            Book Your Slots &rarr;
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
