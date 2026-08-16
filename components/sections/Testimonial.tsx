"use client";

import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { TESTIMONIALS as FALLBACK_TESTIMONIALS } from "@/lib/constants";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TestimonialItem {
  _id?: string | number;
  id?: string | number;
  author?: string;
  name?: string;
  role: string;
  instrument?: string;
  quote: string;
  rating?: number;
}

export const Testimonial: React.FC = () => {
  const [items, setItems] = useState<TestimonialItem[]>(FALLBACK_TESTIMONIALS);

  // Fetch dynamic testimonials from API with background revalidation
  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials", { cache: "no-store" });
      const data = await res.json();
      if (
        data.success &&
        Array.isArray(data.testimonials) &&
        data.testimonials.length > 0
      ) {
        setItems(data.testimonials);
      }
    } catch (err) {
      console.error("Failed to load dynamic testimonials:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();

    // Poll every 10 seconds & revalidate on focus for real-time ISR-style updates
    const interval = setInterval(fetchTestimonials, 10000);
    const handleFocus = () => fetchTestimonials();
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-[#F8F3E7] text-[#211126] relative overflow-hidden"
    >
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-[600px]">
            <p className="eyebrow !text-[#17514E]">Student & Parent Voices</p>
            <h2 className="text-3xl sm:text-[44px] font-serif mt-3 text-[#211126] leading-[1.1]">
              Loved by Music Learners Across Coimbatore
            </h2>
            <p className="text-base md:text-lg mt-3 text-[#5c5147]">
              Real experiences from students mastering Piano, Guitar, and Keyboard
              at Alby School of Music.
            </p>
          </div>

          {/* Custom Navigation Arrow Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              aria-label="Previous Testimonial Slide"
              className="testimonial-prev w-11 h-11 rounded-full bg-[#211126] text-[#E8A33D] hover:bg-[#E8A33D] hover:text-[#211126] transition-all flex items-center justify-center border border-[#E8A33D]/30 shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next Testimonial Slide"
              className="testimonial-next w-11 h-11 rounded-full bg-[#211126] text-[#E8A33D] hover:bg-[#E8A33D] hover:text-[#211126] transition-all flex items-center justify-center border border-[#E8A33D]/30 shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swiper Slider Carousel */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-testimonial-pagination",
          }}
          loop={items.length > 4}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="w-full pb-2"
        >
          {items.map((item, index) => {
            const displayName = item.name || item.author || "Music Student";
            const starCount = item.rating || 5;
            const key = item._id || item.id || index;

            return (
              <SwiperSlide key={key} className="h-auto">
                <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-[6px] bg-[#2c1732] border border-[#E8A33D]/20 relative shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8A33D] min-h-[290px]">
                  <Quote className="w-8 h-8 text-[#E8A33D]/20 absolute top-5 right-5 pointer-events-none" />

                  <div>
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-3.5 text-[#E8A33D]">
                      {Array.from({ length: starCount }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-[13.5px] text-[#F8F3E7]/90 leading-relaxed italic mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="border-t border-[#F8F3E7]/12 pt-3.5 mt-auto">
                    <h4 className="font-sans text-sm font-semibold text-[#F8F3E7]">
                      {displayName}
                    </h4>
                    <p className="text-[12px] text-[#E8A33D] font-medium mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom Pagination Bullets Container */}
        <div className="swiper-testimonial-pagination" />
      </div>
    </section>
  );
};
