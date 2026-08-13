"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    instrument: "piano",
    experienceLevel: "beginner",
    preferredTime: "weekday_evening",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate submission state
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="rounded-3xl bg-[#2c1732] p-6 sm:p-10 border border-[#F8F3E7]/10 shadow-2xl text-[#F8F3E7]">
      <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2 text-[#F8F3E7]">
        Enrol for a Free Trial Lesson
      </h3>
      <p className="text-sm text-[#F8F3E7]/80 mb-8">
        Fill out the form below to reserve a trial slot for Piano, Guitar, or
        Keyboard at our Coimbatore campus.
      </p>

      {status === "success" ? (
        <div className="p-6 rounded-2xl bg-[#17514E]/40 border border-[#17514E] text-center flex flex-col items-center gap-3">
          <CheckCircle2 className="w-12 h-12 text-[#E8A33D]" />
          <h4 className="font-serif text-xl font-bold text-[#F8F3E7]">
            Trial Booking Received!
          </h4>
          <p className="text-sm text-[#F8F3E7]/90 leading-relaxed">
            Thank you, {formData.name}! Our admissions coordinator will call you
            shortly at{" "}
            <span className="font-semibold text-[#E8A33D]">
              {formData.phone}
            </span>{" "}
            to confirm your batch time.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-6 py-2.5 rounded-xl bg-[#E8A33D] text-[#211126] font-semibold text-sm hover:bg-[#f0b04c] transition-colors min-h-[44px]"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
            >
              Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Anand Kumar"
              className="w-full px-4 py-3 rounded-xl bg-[#211126] border border-[#F8F3E7]/15 text-[#F8F3E7] placeholder-[#F8F3E7]/40 focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px]"
            />
          </div>

          {/* Phone & Email (Responsive Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
              >
                Phone Number <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                inputMode="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-4 py-3 rounded-xl bg-[#211126] border border-[#F8F3E7]/15 text-[#F8F3E7] placeholder-[#F8F3E7]/40 focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                inputMode="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. student@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#211126] border border-[#F8F3E7]/15 text-[#F8F3E7] placeholder-[#F8F3E7]/40 focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px]"
              />
            </div>
          </div>

          {/* Instrument Selection & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="instrument"
                className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
              >
                Preferred Instrument <span className="text-rose-400">*</span>
              </label>
              <select
                id="instrument"
                name="instrument"
                value={formData.instrument}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#211126] border border-[#F8F3E7]/15 text-[#F8F3E7] focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px]"
              >
                <option value="piano">Piano (Ages 6+)</option>
                <option value="guitar">Guitar (Ages 8+)</option>
                <option value="keyboard">Keyboard (Ages 6+)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
              >
                Experience Level
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#211126] border border-[#F8F3E7]/15 text-[#F8F3E7] focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px]"
              >
                <option value="beginner">Complete Beginner</option>
                <option value="intermediate">
                  Intermediate (Self-taught / basic scales)
                </option>
                <option value="advanced">
                  Advanced (Exam prep / performance)
                </option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
            >
              Additional Questions or Batch Preference
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your learning goals..."
              className="w-full px-4 py-3 rounded-xl bg-[#211126] border border-[#F8F3E7]/15 text-[#F8F3E7] placeholder-[#F8F3E7]/40 focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#E8A33D] text-[#211126] font-bold text-base hover:bg-[#f0b04c] active:scale-[0.98] transition-all min-h-[44px] shadow-lg disabled:opacity-50"
          >
            {status === "submitting" ? (
              <span>Submitting Booking...</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Confirm Trial Class Registration</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
