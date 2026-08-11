import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ClassData } from "@/lib/constants";
import { generateCourseJsonLd } from "@/lib/seo";
import { PianoKeyDivider } from "../ui/PianoKeyDivider";
import { ScrollReveal } from "../ui/ScrollReveal";

interface ClassPageTemplateProps {
  classItem: ClassData;
  heroHeadline: string;
  heroSubtext: string;
  levelsData: {
    number: string;
    title: string;
    items: string[];
  }[];
  whyData: {
    title: string;
    description: string;
  }[];
  scheduleData: {
    batch: string;
    level: string;
    days: string;
    time: string;
  }[];
  testimonial: {
    quote: string;
    cite: string;
  };
  relatedClasses: {
    title: string;
    subtitle: string;
    href: string;
  }[];
}

export const ClassPageTemplate: React.FC<ClassPageTemplateProps> = ({
  classItem,
  heroHeadline,
  heroSubtext,
  levelsData,
  whyData,
  scheduleData,
  testimonial,
  relatedClasses,
}) => {
  const courseJsonLd = generateCourseJsonLd(classItem);

  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#2B2420]">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* ---------- PAGE HERO ---------- */}
      <section className="relative overflow-hidden bg-[#211126] text-[#F8F3E7] pt-[70px] pb-0 px-6">
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
          <ScrollReveal direction="up" delay={0.05} className="pb-10 lg:pb-16">
            <p className="text-[13px] text-[#b7aa9c] mb-2">
              <Link href="/" className="text-[#E8A33D] hover:underline">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/classes" className="text-[#E8A33D] hover:underline">
                Classes
              </Link>{" "}
              / {classItem.name}
            </p>
            <p className="eyebrow">{classItem.name} Class</p>
            <h1
              className="text-3xl sm:text-5xl lg:text-[58px] font-serif tracking-normal mt-3.5 mb-4 leading-[1.05]"
              dangerouslySetInnerHTML={{ __html: heroHeadline }}
            />
            <p className="text-[#e6dcd0] text-base leading-[1.65] max-w-[440px] mb-[26px]">
              {heroSubtext}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/contact"
                className="bg-[#E8A33D] text-[#211126] font-semibold text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:bg-white hover:-translate-y-0.5 inline-block shadow-md"
              >
                Enroll in {classItem.name}
              </Link>
              <a
                href="#curriculum"
                className="border border-[#F8F3E7]/40 text-[#F8F3E7] font-medium text-[15px] px-7 py-3.5 rounded-[2px] transition-all hover:border-[#E8A33D] hover:bg-[#E8A33D]/10 inline-block"
              >
                View Curriculum
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.15} className="rounded-[4px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] border border-[#E8A33D]/25 self-end mt-5 lg:mt-0">
            <Image
              src={classItem.heroImage}
              alt={`${classItem.name} at Alby.sm`}
              width={600}
              height={320}
              priority
              className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-700 hover:scale-105"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- PIANO KEY DIVIDER (DARK) ---------- */}
      <PianoKeyDivider variant="dark" />

      {/* ---------- CURRICULUM LEVELS ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]" id="curriculum">
        <ScrollReveal direction="up" delay={0.05} className="text-center max-w-[600px] mx-auto mb-[50px]">
          <p className="eyebrow !text-[#17514E]">Curriculum</p>
          <h2 className="text-3xl sm:text-[40px] font-serif mt-3 text-[#211126]">Three levels, one steady path</h2>
          <p className="mt-3 text-[#5c5147] text-[15.5px] leading-[1.6]">
            Every student moves through these stages at their own pace — no one is rushed ahead or held back.
          </p>
        </ScrollReveal>

        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {levelsData.map((lvl, idx) => (
            <ScrollReveal key={lvl.number} direction="up" delay={0.1 + idx * 0.1}>
              <div className="h-full bg-white border border-[#17514E]/15 rounded-[5px] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_30px_-14px_rgba(23,81,78,0.25)]">
                <div className="font-serif text-[32px] text-[#E8A33D] font-normal leading-none">
                  {lvl.number}
                </div>
                <h3 className="text-[20px] text-[#211126] mt-1.5 mb-3 font-serif">{lvl.title}</h3>
                <ul className="list-none m-0 p-0">
                  {lvl.items.map((item, i) => (
                    <li key={i} className="text-[13.5px] text-[#5c5147] py-1.25 flex gap-2 items-start">
                      <span className="text-[#17514E] shrink-0">♪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---------- PIANO KEY DIVIDER (LIGHT) ---------- */}
      <PianoKeyDivider variant="light" />

      {/* ---------- WHY LEARN HERE ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#211126] text-[#F8F3E7]">
        <ScrollReveal direction="up" delay={0.05} className="text-center max-w-[600px] mx-auto mb-[50px]">
          <p className="eyebrow">Why {classItem.name} at Alby.sm</p>
          <h2 className="text-3xl sm:text-[40px] font-serif mt-3 text-[#F8F3E7]">What makes it different</h2>
        </ScrollReveal>

        <div className="max-w-[1140px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5.5">
          {whyData.map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={0.1 + idx * 0.08}>
              <div className="h-full bg-[#2c1732] border border-[#E8A33D]/18 rounded-[4px] p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8A33D]">
                <div className="w-[46px] h-[46px] mx-auto mb-4 rounded-full bg-[#E8A33D]/12 flex items-center justify-center">
                  <svg className="w-[22px] h-[22px] stroke-[#E8A33D] fill-none stroke-[1.6]" viewBox="0 0 24 24">
                    <path d="M12 3v14M8 21h8M9 17a3 3 0 006 0" />
                  </svg>
                </div>
                <h3 className="font-serif text-[17px] mb-2 text-[#F8F3E7]">{item.title}</h3>
                <p className="text-[13px] text-[#cfc3b3] leading-[1.55]">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---------- SCHEDULE TABLE ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]">
        <ScrollReveal direction="up" delay={0.05} className="text-center max-w-[600px] mx-auto mb-[50px]">
          <p className="eyebrow !text-[#17514E]">Batch Timings</p>
          <h2 className="text-3xl sm:text-[40px] font-serif mt-3 text-[#211126]">Find a batch that fits</h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15} className="max-w-[820px] mx-auto overflow-x-auto rounded-[5px] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.2)]">
          <table className="w-full border-collapse bg-white text-left text-sm">
            <thead>
              <tr className="bg-[#17514E] text-[#F8F3E7] font-semibold text-[12.5px] uppercase tracking-wider">
                <th className="p-4 sm:px-5 sm:py-3.5">Batch</th>
                <th className="p-4 sm:px-5 sm:py-3.5">Level</th>
                <th className="p-4 sm:px-5 sm:py-3.5">Days</th>
                <th className="p-4 sm:px-5 sm:py-3.5">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B2420]/10 text-[#3d352c]">
              {scheduleData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? "bg-[#f2ece0]" : ""}>
                  <td className="p-4 sm:px-5 sm:py-3.5 font-medium">{row.batch}</td>
                  <td className="p-4 sm:px-5 sm:py-3.5">{row.level}</td>
                  <td className="p-4 sm:px-5 sm:py-3.5">{row.days}</td>
                  <td className="p-4 sm:px-5 sm:py-3.5">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>
      </section>

      {/* ---------- TESTIMONIAL STRIP ---------- */}
      <section className="py-[70px] px-6 bg-[#17514E] text-[#F8F3E7] text-center">
        <ScrollReveal direction="up" delay={0.05} className="max-w-[720px] mx-auto">
          <blockquote className="font-serif text-xl sm:text-3xl mb-5 italic leading-[1.4]">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <cite className="not-italic text-[13.5px] text-[#a9d8d3]">{testimonial.cite}</cite>
        </ScrollReveal>
      </section>

      {/* ---------- RELATED CLASSES ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]">
        <ScrollReveal direction="up" delay={0.05} className="text-center max-w-[600px] mx-auto mb-[50px]">
          <p className="eyebrow !text-[#17514E]">Explore More</p>
          <h2 className="text-3xl sm:text-[40px] font-serif mt-3 text-[#211126]">Other classes at Alby.sm</h2>
        </ScrollReveal>

        <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedClasses.map((rel, idx) => (
            <ScrollReveal key={idx} direction="up" delay={0.1 + idx * 0.1}>
              <Link
                href={rel.href}
                className="bg-[#211126] text-[#F8F3E7] rounded-[5px] p-7 flex items-center justify-between transition-transform duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <h3 className="font-serif text-[22px] text-[#F8F3E7]">{rel.title}</h3>
                  <span className="text-[13px] text-[#cfc3b3]">{rel.subtitle}</span>
                </div>
                <span className="text-[#E8A33D] text-[22px] group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---------- CTA STRIP ---------- */}
      <section className="bg-[radial-gradient(ellipse_at_30%_30%,rgba(232,163,61,0.12),transparent_60%),linear-gradient(180deg,#211126_0%,#2c1732_100%)] text-[#F8F3E7] text-center py-[70px] px-6 border-t border-white/6">
        <ScrollReveal direction="up" delay={0.05} className="max-w-[1140px] mx-auto">
          <h2 className="text-3xl sm:text-[38px] font-serif">Ready to start playing?</h2>
          <p className="mt-3.5 mb-6.5 max-w-[460px] mx-auto text-[#cfc3b3] text-base">
            Book a free trial class and meet your instructor first.
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
};
