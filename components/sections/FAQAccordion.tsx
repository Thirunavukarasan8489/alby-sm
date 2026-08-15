"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { SectionHeading } from "../ui/SectionHeading";

interface FAQAccordionProps {
  items?: typeof FAQS;
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items = FAQS,
  title = "Frequently Asked Questions",
  subtitle = "Clear, direct answers about batch timings, age limits, location, and teaching methods at Alby School of Music.",
  badge = "Got Questions?",
  className = "",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`py-16 md:py-24 bg-[#211126] text-[#F8F3E7] ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={badge} title={title} subtitle={subtitle} />

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const faqId = `faq-content-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={index}
                className="rounded-2xl bg-[#2c1732] border border-[#F8F3E7]/10 overflow-hidden transition-colors"
              >
                <h3>
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={faqId}
                    onClick={() => toggleIndex(index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left text-base md:text-lg font-serif font-semibold text-[#F8F3E7] hover:text-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D] rounded-2xl min-h-[44px] transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#E8A33D] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={faqId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-6 md:px-6 md:pb-6 text-sm md:text-base text-[#F8F3E7]/80 leading-relaxed border-t border-[#F8F3E7]/5 pt-4"
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
