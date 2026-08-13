"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  generateLocalBusinessJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";
import { PianoKeyDivider } from "@/components/ui/PianoKeyDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { COUNTRIES, getCountryByDialCode } from "@/lib/countries";
import { ACADEMY_INFO } from "@/lib/constants";

interface FormState {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  instrument: string;
  preferredTime: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  instrument?: string;
  preferredTime?: string;
  message?: string;
  general?: string;
}

export default function ContactPage() {
  const localBusinessJsonLd = generateLocalBusinessJsonLd();
  const faqJsonLd = generateFaqJsonLd();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState<FormState>({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    instrument: "",
    preferredTime: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    name: string;
    fullPhone: string;
    instrument: string;
    email: string;
  } | null>(null);

  const currentCountry = getCountryByDialCode(formData.countryCode);

  // ---------- VALIDATION HELPERS ----------
  const validateField = (field: keyof FormState, value: string): string => {
    switch (field) {
      case "name": {
        const trimmed = value.trim();
        if (!trimmed) return "Full name is mandatory";
        if (trimmed.length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Only letters and spaces are allowed (no numbers or symbols)";
        return "";
      }
      case "phone": {
        const clean = value.replace(/\D/g, "");
        if (!clean) return "Phone number is mandatory";
        if (
          currentCountry.minLength === currentCountry.maxLength &&
          clean.length !== currentCountry.minLength
        ) {
          return `${currentCountry.name} phone number must be exactly ${currentCountry.minLength} digits`;
        }
        if (
          clean.length < currentCountry.minLength ||
          clean.length > currentCountry.maxLength
        ) {
          return `${currentCountry.name} phone number must be ${currentCountry.minLength}-${currentCountry.maxLength} digits`;
        }
        return "";
      }
      case "email": {
        const trimmed = value.trim();
        if (!trimmed) return "Email address is mandatory";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
          return "Please enter a valid email address";
        return "";
      }
      case "instrument": {
        if (!value || value === "")
          return "Please select an instrument from the dropdown";
        return "";
      }
      case "preferredTime": {
        const trimmed = value.trim();
        if (!trimmed) return "Preferred time is mandatory";
        if (!/^[a-zA-Z0-9\s\-.,]+$/.test(value))
          return "Only letters, numbers, hyphens (-), commas (,), and dots (.) are allowed";
        return "";
      }
      case "message": {
        if (value && !/^[a-zA-Z0-9\s\-.,\n\r]*$/.test(value)) {
          return "Only letters, numbers, hyphens (-), commas (,), and dots (.) are allowed";
        }
        return "";
      }
      default:
        return "";
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};

    const nameErr = validateField("name", formData.name);
    if (nameErr) newErrors.name = nameErr;

    const phoneErr = validateField("phone", formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) newErrors.email = emailErr;

    const instErr = validateField("instrument", formData.instrument);
    if (instErr) newErrors.instrument = instErr;

    const timeErr = validateField("preferredTime", formData.preferredTime);
    if (timeErr) newErrors.preferredTime = timeErr;

    const msgErr = validateField("message", formData.message);
    if (msgErr) newErrors.message = msgErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- INPUT HANDLERS (WITH CHARACTER FILTERING) ----------
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Restrict on keystroke: allow only letters and spaces
    const filtered = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFormData((prev) => ({ ...prev, name: filtered }));
    if (touched.name) {
      setErrors((prev) => ({
        ...prev,
        name: validateField("name", filtered),
      }));
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    const newCountry = getCountryByDialCode(newCode);
    // Slice phone if it exceeds new country max length
    const adjustedPhone = formData.phone.slice(0, newCountry.maxLength);

    setFormData((prev) => ({
      ...prev,
      countryCode: newCode,
      phone: adjustedPhone,
    }));

    if (touched.phone) {
      const clean = adjustedPhone.replace(/\D/g, "");
      let err = "";
      if (!clean) {
        err = "Phone number is mandatory";
      } else if (
        newCountry.minLength === newCountry.maxLength &&
        clean.length !== newCountry.minLength
      ) {
        err = `${newCountry.name} phone number must be exactly ${newCountry.minLength} digits`;
      } else if (
        clean.length < newCountry.minLength ||
        clean.length > newCountry.maxLength
      ) {
        err = `${newCountry.name} phone number must be ${newCountry.minLength}-${newCountry.maxLength} digits`;
      }
      setErrors((prev) => ({ ...prev, phone: err }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Restrict on keystroke: digits only and max length limit
    const digitsOnly = e.target.value
      .replace(/\D/g, "")
      .slice(0, currentCountry.maxLength);

    setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    if (touched.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: validateField("phone", digitsOnly),
      }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, email: val }));
    if (touched.email) {
      setErrors((prev) => ({
        ...prev,
        email: validateField("email", val),
      }));
    }
  };

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, instrument: val }));
    if (touched.instrument) {
      setErrors((prev) => ({
        ...prev,
        instrument: validateField("instrument", val),
      }));
    }
  };

  const handlePreferredTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Restrict on keystroke: letters, numbers, spaces, -, ., ,
    const filtered = e.target.value.replace(/[^a-zA-Z0-9\s\-.,]/g, "");
    setFormData((prev) => ({ ...prev, preferredTime: filtered }));
    if (touched.preferredTime) {
      setErrors((prev) => ({
        ...prev,
        preferredTime: validateField("preferredTime", filtered),
      }));
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Restrict on keystroke: letters, numbers, spaces, newlines, -, ., ,
    const filtered = e.target.value.replace(/[^a-zA-Z0-9\s\-.,\n\r]/g, "");
    setFormData((prev) => ({ ...prev, message: filtered }));
    if (touched.message) {
      setErrors((prev) => ({
        ...prev,
        message: validateField("message", filtered),
      }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  // ---------- FORM SUBMIT ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all touched
    setTouched({
      name: true,
      phone: true,
      email: true,
      instrument: true,
      preferredTime: true,
      message: true,
    });

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({
            general:
              data.message ||
              "Submission failed. Please check your inputs and try again.",
          });
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setSubmittedReceipt({
        name: formData.name,
        fullPhone: `${formData.countryCode} ${formData.phone}`,
        instrument: formData.instrument,
        email: formData.email,
      });
      setSubmitSuccess(true);
      setIsSubmitting(false);

      // Reset form fields
      setFormData({
        name: "",
        countryCode: "+91",
        phone: "",
        email: "",
        instrument: "",
        preferredTime: "",
        message: "",
      });
      setTouched({});
    } catch {
      setIsSubmitting(false);
      setErrors({
        general:
          "Unable to connect to the server. Please check your connection or contact us via WhatsApp.",
      });
    }
  };

  const faqs = [
    {
      question: "Is the trial class free?",
      answer:
        "Yes — every new student gets one free trial class before enrolling, across any of our three instruments (Piano, Guitar, Keyboard).",
    },
    {
      question: "What age can my child start?",
      answer:
        "Piano and Keyboard classes are open from age 6+, and Guitar from age 8+, though we assess each child individually for hand span and interest.",
    },
    {
      question: "Do you offer 1-on-1 lessons?",
      answer:
        "Yes, both small-group batches (max 5 students) and dedicated one-on-one formats are available depending on your schedule and preference.",
    },
    {
      question: "Do I need to own an instrument to start?",
      answer:
        "Not for your first few classes — our Coimbatore studio is fully equipped with acoustic grand pianos, weighted keyboards, and guitars for every student.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#2B2420]">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
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

        <ScrollReveal
          direction="up"
          delay={0.05}
          className="relative z-10 max-w-[1140px] mx-auto"
        >
          <p className="text-[13px] text-[#b7aa9c] mb-2">
            <Link href="/" className="text-[#E8A33D] hover:underline">
              Home
            </Link>{" "}
            / Contact
          </p>
          <p className="eyebrow">Get in Touch</p>
          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-serif tracking-normal mt-3.5 mb-4 leading-[1.05]">
            Book your <i className="italic text-[#E8A33D] not-italic">Slots</i>
          </h1>
          <p className="max-w-[480px] mx-auto text-[#e6dcd0] text-base leading-[1.6]">
            Tell us which instrument you&apos;re interested in and a preferred
            time — we&apos;ll get back to you within a day.
          </p>
        </ScrollReveal>
      </section>

      {/* ---------- PIANO KEY DIVIDER (TEAL) ---------- */}
      <PianoKeyDivider variant="teal" />

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

        <div className="relative z-10 max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-[50px]">
          {/* Left Column: Academy Info */}
          <ScrollReveal direction="up" delay={0.05}>
            <h2 className="text-3xl sm:text-[38px] font-serif text-[#F8F3E7]">
              Let&apos;s talk music
            </h2>
            <p className="text-[#d7e4e2] text-base leading-[1.7] mt-4 mb-[30px]">
              Reach out with any questions about batches, timings, or Trinity
              exam prep — or come visit our studio in Coimbatore.
            </p>

            <div className="flex flex-col">
              {/* Address */}
              <div className="flex gap-3.5 items-start py-4 border-b border-white/12">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E8A33D]/15 flex items-center justify-center shrink-0">
                  <svg
                    className="w-[18px] h-[18px] stroke-[#E8A33D] fill-none stroke-[1.6]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[14.5px] mb-0.5 text-white">
                    Visit us
                  </strong>
                  <span className="text-[13.5px] text-[#c9dedb]">
                    {ACADEMY_INFO.formattedAddress}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3.5 items-start py-4 border-b border-white/12">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E8A33D]/15 flex items-center justify-center shrink-0">
                  <svg
                    className="w-[18px] h-[18px] stroke-[#E8A33D] fill-none stroke-[1.6]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 6l8 7 8-7" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[14.5px] mb-0.5 text-white">
                    Email us
                  </strong>
                  <a
                    href={`mailto:${ACADEMY_INFO.email}`}
                    className="text-[13.5px] text-[#c9dedb] hover:underline underline-offset-2 transition-all"
                  >
                    {ACADEMY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-3.5 items-start py-4">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E8A33D]/15 flex items-center justify-center shrink-0">
                  <svg
                    className="w-[18px] h-[18px] stroke-[#E8A33D] fill-none stroke-[1.6]"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[14.5px] mb-0.5 text-white">
                    Academy hours
                  </strong>
                  <span className="text-[13.5px] text-[#c9dedb]">
                    {ACADEMY_INFO.openingHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={ACADEMY_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-xs font-semibold hover:bg-[#E8A33D] hover:border-[#E8A33D] hover:text-[#211126] transition-colors"
              >
                IG
              </a>
              <a
                href={ACADEMY_INFO.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-xs font-semibold hover:bg-[#E8A33D] hover:border-[#E8A33D] hover:text-[#211126] transition-colors"
              >
                YT
              </a>
              <a
                href={ACADEMY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-xs font-semibold hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors"
              >
                WA
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Custom Validated Form & Database Connection */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="bg-white/6 border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl relative">
              <AnimatePresence mode="wait">
                {submitSuccess && submittedReceipt ? (
                  /* Success Feedback Screen */
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8 px-4 flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#E8A33D]/20 border-2 border-[#E8A33D] text-[#E8A33D] flex items-center justify-center mb-5 shadow-lg">
                      <svg
                        className="w-8 h-8 stroke-current fill-none stroke-[2.5]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3E7] mb-2">
                      Trial Request Received!
                    </h3>

                    <p className="text-sm text-[#d7e4e2] max-w-md leading-relaxed mb-6">
                      Thank you,{" "}
                      <strong className="text-[#E8A33D]">
                        {submittedReceipt.name}
                      </strong>
                      ! Your trial registration for{" "}
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white font-semibold">
                        {submittedReceipt.instrument}
                      </span>{" "}
                      has been saved. Our coordinator will contact you at{" "}
                      <strong className="text-[#E8A33D]">
                        {submittedReceipt.fullPhone}
                      </strong>{" "}
                      shortly.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-[#E8A33D] text-[#211126] font-semibold text-sm px-6 py-3 rounded-[3px] transition-all hover:bg-white cursor-pointer shadow-md"
                    >
                      Book Another Trial Session
                    </button>
                  </motion.div>
                ) : (
                  /* Form Screen */
                  <motion.form
                    key="booking-form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-4"
                  >
                    {/* General Error Banner */}
                    {errors.general && (
                      <div className="p-3.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-2">
                        <span className="text-rose-400 font-bold shrink-0">
                          ⚠️
                        </span>
                        <span>{errors.general}</span>
                      </div>
                    )}

                    {/* Row 1: Full Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="text-[12px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 flex items-center justify-between"
                        >
                          <span>
                            Full name <span className="text-[#E8A33D]">*</span>
                          </span>
                          <span className="text-[11px] text-[#a9d8d3]/60 font-normal lowercase">
                            (letters only)
                          </span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleNameChange}
                          onBlur={() => handleBlur("name")}
                          placeholder="e.g. Anand Kumar"
                          className={`w-full bg-white/8 border text-[#F8F3E7] placeholder-[#b7cbc8] p-3 rounded-[3px] font-sans text-sm focus:outline-none transition-colors ${touched.name && errors.name
                            ? "border-rose-400 focus:border-rose-400 bg-rose-500/5"
                            : "border-white/20 focus:border-[#E8A33D]"
                            }`}
                        />
                        {touched.name && errors.name && (
                          <p className="text-[11.5px] text-rose-300 mt-1 flex items-center gap-1">
                            <span>⚠</span>
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label
                          htmlFor="email"
                          className="text-[12px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 block"
                        >
                          Email address{" "}
                          <span className="text-[#E8A33D]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleEmailChange}
                          onBlur={() => handleBlur("email")}
                          placeholder="e.g. anand@example.com"
                          className={`w-full bg-white/8 border text-[#F8F3E7] placeholder-[#b7cbc8] p-3 rounded-[3px] font-sans text-sm focus:outline-none transition-colors ${touched.email && errors.email
                            ? "border-rose-400 focus:border-rose-400 bg-rose-500/5"
                            : "border-white/20 focus:border-[#E8A33D]"
                            }`}
                        />
                        {touched.email && errors.email && (
                          <p className="text-[11.5px] text-rose-300 mt-1 flex items-center gap-1">
                            <span>⚠</span>
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone with Country Code Selector */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-[12px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 flex items-center justify-between"
                      >
                        <span>
                          Phone number <span className="text-[#E8A33D]">*</span>
                        </span>
                        <span className="text-[11px] text-[#a9d8d3]/60 font-normal lowercase">
                          ({currentCountry.name}: {currentCountry.minLength}{" "}
                          digits)
                        </span>
                      </label>

                      <div className="flex gap-2">
                        {/* Country Code Dropdown */}
                        <div className="relative w-[130px] shrink-0">
                          <select
                            id="countryCode"
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleCountryChange}
                            aria-label="Select Country Dial Code"
                            className="w-full bg-white/8 border border-white/20 text-[#F8F3E7] placeholder-[#b7cbc8] p-3 rounded-[3px] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#E8A33D] cursor-pointer appearance-none pr-7"
                          >
                            {COUNTRIES.map((c) => (
                              <option
                                key={c.code}
                                value={c.dialCode}
                                className="bg-white/8 text-[#211126]"
                              >
                                {c.flag} {c.dialCode} ({c.name})
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#F8F3E7]/60 text-xs">
                            ▼
                          </div>
                        </div>

                        {/* Phone Number Input */}
                        <div className="flex-1">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            inputMode="numeric"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            onBlur={() => handleBlur("phone")}
                            maxLength={currentCountry.maxLength}
                            placeholder={currentCountry.placeholder}
                            className={`w-full bg-white/8 border text-[#F8F3E7] placeholder-[#b7cbc8] p-3 rounded-[3px] font-sans text-sm focus:outline-none transition-colors ${touched.phone && errors.phone
                              ? "border-rose-400 focus:border-rose-400 bg-rose-500/5"
                              : "border-white/20 focus:border-[#E8A33D]"
                              }`}
                          />
                        </div>
                      </div>

                      {touched.phone && errors.phone && (
                        <p className="text-[11.5px] text-rose-300 mt-1 flex items-center gap-1">
                          <span>⚠</span>
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Row 3: Interested in (Instrument) */}
                    <div>
                      <label
                        htmlFor="instrument"
                        className="text-[12px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 block"
                      >
                        Interested in <span className="text-[#E8A33D]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="instrument"
                          name="instrument"
                          value={formData.instrument}
                          onChange={handleInstrumentChange}
                          onBlur={() => handleBlur("instrument")}
                          className={`w-full bg-white/8 border-white/20 border text-[#F8F3E7] p-3 rounded-[3px] font-sans text-sm focus:outline-none transition-colors appearance-none pr-8 cursor-pointer ${touched.instrument && errors.instrument
                            ? "border-rose-400 focus:border-rose-400"
                            : "border-white/20 focus:border-[#E8A33D]"
                            }`}
                        >
                          <option value="" disabled className="text-gray-900">
                            -- Select an Instrument --
                          </option>
                          <option
                            value="Piano"
                            className="bg-white/8 text-[#211126]"
                          >
                            🎹 Piano Class (Ages 6+)
                          </option>
                          <option
                            value="Guitar"
                            className="bg-white/8 text-[#211126]"
                          >
                            🎸 Guitar Class (Ages 8+)
                          </option>
                          <option
                            value="Keyboard"
                            className="bg-white/8 text-[#211126]"
                          >
                            🎛 Electronic Keyboard Class (Ages 6+)
                          </option>
                          <option
                            value="Not sure yet"
                            className="bg-white/8 text-[#211126]"
                          >
                            🎼 Not sure yet (General Consultation)
                          </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#F8F3E7]/60 text-xs">
                          ▼
                        </div>
                      </div>
                      {touched.instrument && errors.instrument && (
                        <p className="text-[11.5px] text-rose-300 mt-1 flex items-center gap-1">
                          <span>⚠</span>
                          <span>{errors.instrument}</span>
                        </p>
                      )}
                    </div>

                    {/* Row 4: Preferred Time */}
                    <div>
                      <label
                        htmlFor="preferredTime"
                        className="text-[12px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 flex items-center justify-between"
                      >
                        <span>
                          Preferred time{" "}
                          <span className="text-[#E8A33D]">*</span>
                        </span>
                        <span className="text-[11px] text-[#a9d8d3]/60 font-normal lowercase">
                          (text, numbers, -, ., ,)
                        </span>
                      </label>
                      <input
                        type="text"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handlePreferredTimeChange}
                        onBlur={() => handleBlur("preferredTime")}
                        placeholder="e.g. Weekday evenings, Sat 10 AM - 12 PM"
                        className={`w-full bg-white/8 border text-[#F8F3E7] placeholder-[#b7cbc8] p-3 rounded-[3px] font-sans text-sm focus:outline-none transition-colors ${touched.preferredTime && errors.preferredTime
                          ? "border-rose-400 focus:border-rose-400 bg-rose-500/5"
                          : "border-white/20 focus:border-[#E8A33D]"
                          }`}
                      />
                      {touched.preferredTime && errors.preferredTime && (
                        <p className="text-[11.5px] text-rose-300 mt-1 flex items-center gap-1">
                          <span>⚠</span>
                          <span>{errors.preferredTime}</span>
                        </p>
                      )}
                    </div>

                    {/* Row 5: Message (Optional) */}
                    <div>
                      <label
                        htmlFor="message"
                        className="text-[12px] font-semibold tracking-wider uppercase text-[#a9d8d3] mb-1.5 flex items-center justify-between"
                      >
                        <span>Message (Optional)</span>
                        <span className="text-[11px] text-[#a9d8d3]/60 font-normal lowercase">
                          (text, numbers, -, ., ,)
                        </span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleMessageChange}
                        onBlur={() => handleBlur("message")}
                        placeholder="Tell us a bit about your musical background or goals..."
                        className={`w-full bg-white/8 border text-[#F8F3E7] placeholder-[#b7cbc8] p-3 rounded-[3px] font-sans text-sm focus:outline-none transition-colors ${touched.message && errors.message
                          ? "border-rose-400 focus:border-rose-400 bg-rose-500/5"
                          : "border-white/20 focus:border-[#E8A33D]"
                          }`}
                      />
                      {touched.message && errors.message && (
                        <p className="text-[11.5px] text-rose-300 mt-1 flex items-center gap-1">
                          <span>⚠</span>
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button with Dynamic Animation */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#E8A33D] text-[#211126] border-none p-3.5 font-semibold text-[15.5px] rounded-[3px] cursor-pointer transition-all hover:bg-white hover:scale-[1.01] mt-2 flex items-center justify-center gap-2 shadow-lg disabled:opacity-75 disabled:cursor-not-allowed min-h-[48px]"
                    >
                      {isSubmitting ? (
                        <>
                          {/* Animated Spinner SVG */}
                          <svg
                            className="animate-spin h-5 w-5 text-[#211126]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          <span>Submitting Booking Request...</span>
                        </>
                      ) : (
                        <span>Join Now &rarr;</span>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- MAP / LOCATION HIGHLIGHT SECTION ---------- */}
      <section className="bg-[#F8F3E7] py-12 px-6 border-b border-[#17514E]/10">
        <div className="max-w-[1140px] mx-auto text-center">
          <div className="w-full py-10 px-6 rounded-2xl bg-gradient-to-br from-[#ece4d3] to-[#ded3be] border border-[#17514E]/15 flex flex-col items-center justify-center text-[#5c5147]">
            <span className="text-3xl mb-2">📍</span>
            <h3 className="font-serif text-2xl text-[#211126] font-bold mb-1">
              Alby.sm Music Academy Campus
            </h3>
            <p className="text-sm max-w-md">
              {ACADEMY_INFO.formattedAddress}
            </p>
            <a
              href={`https://maps.google.com/?q=${ACADEMY_INFO.geo.latitude},${ACADEMY_INFO.geo.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#17514E] hover:text-[#E8A33D] transition-colors"
            >
              <span>Open in Google Maps</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- FAQ SECTION ---------- */}
      <section className="py-[70px] sm:py-[90px] px-6 bg-[#F8F3E7]">
        <ScrollReveal
          direction="up"
          delay={0.05}
          className="max-w-[760px] mx-auto"
        >
          <p className="eyebrow !text-[#17514E] text-center block">
            Common Questions
          </p>
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
                    className="font-sans text-base font-semibold text-[#211126] cursor-pointer flex justify-between items-center select-none"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`text-[#E8A33D] text-xl transition-transform duration-200 ${isOpen ? "rotate-45" : ""
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
