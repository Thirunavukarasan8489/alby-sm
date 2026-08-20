"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { COUNTRIES, getCountryByDialCode } from "@/lib/countries";

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

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    instrument: "Piano",
    preferredTime: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    fullPhone: string;
    instrument: string;
  } | null>(null);

  const currentCountry = getCountryByDialCode(formData.countryCode);

  const validateField = (field: keyof FormState, value: string): string => {
    switch (field) {
      case "name": {
        const trimmed = value.trim();
        if (!trimmed) return "Full name is mandatory";
        if (trimmed.length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Only letters and spaces are allowed";
        return "";
      }
      case "phone": {
        const clean = value.replace(/\D/g, "");
        if (!clean) return "Phone number is mandatory";
        if (
          currentCountry.minLength === currentCountry.maxLength &&
          clean.length !== currentCountry.minLength
        ) {
          return `${currentCountry.name} phone number must be ${currentCountry.minLength} digits`;
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
        if (!value || value === "") return "Please select an instrument";
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFormData((prev) => ({ ...prev, name: filtered }));
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateField("name", filtered) }));
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    const newCountry = getCountryByDialCode(newCode);
    const adjustedPhone = formData.phone.slice(0, newCountry.maxLength);

    setFormData((prev) => ({
      ...prev,
      countryCode: newCode,
      phone: adjustedPhone,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setErrors((prev) => ({ ...prev, email: validateField("email", val) }));
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
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      phone: true,
      email: true,
      instrument: true,
      preferredTime: true,
      message: true,
    });

    if (!validateAll()) return;

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || "Failed to submit request." });
        }
        setStatus("idle");
        return;
      }

      setSubmittedData({
        name: formData.name,
        fullPhone: `${formData.countryCode} ${formData.phone}`,
        instrument: formData.instrument,
      });
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors({
        general: "Network error. Please try again or reach us via WhatsApp.",
      });
    }
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

      {status === "success" && submittedData ? (
        <div className="p-6 rounded-2xl bg-[#17514E]/40 border border-[#17514E] text-center flex flex-col items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-12 h-12 text-[#E8A33D]" />
          <h4 className="font-serif text-xl font-bold text-[#F8F3E7]">
            Trial Booking Received!
          </h4>
          <p className="text-sm text-[#F8F3E7]/90 leading-relaxed">
            Thank you,{" "}
            <strong className="text-[#E8A33D]">{submittedData.name}</strong>!
            Your trial request for{" "}
            <span className="font-semibold text-white">
              {submittedData.instrument}
            </span>{" "}
            has been saved. Our admissions coordinator will call you shortly at{" "}
            <span className="font-semibold text-[#E8A33D]">
              {submittedData.fullPhone}
            </span>{" "}
            to confirm your batch slot.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setFormData({
                name: "",
                countryCode: "+91",
                phone: "",
                email: "",
                instrument: "Piano",
                preferredTime: "",
                message: "",
              });
              setTouched({});
            }}
            className="mt-4 px-6 py-2.5 rounded-xl bg-[#E8A33D] text-[#211126] font-semibold text-sm hover:bg-[#f0b04c] transition-colors min-h-[44px] cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {errors.general && (
            <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs">
              {errors.general}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label
              htmlFor="name-modal"
              className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
            >
              Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              id="name-modal"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              onBlur={() => handleBlur("name")}
              placeholder="e.g. Anand Kumar"
              className={`w-full px-4 py-3 rounded-xl bg-[#211126] border text-[#F8F3E7] placeholder-[#F8F3E7]/40 focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px] ${
                touched.name && errors.name
                  ? "border-rose-400"
                  : "border-[#F8F3E7]/15"
              }`}
            />
            {touched.name && errors.name && (
              <p className="text-xs text-rose-300 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="phone-modal"
                className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
              >
                Phone Number <span className="text-rose-400">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={handleCountryChange}
                  className="w-[105px] shrink-0 bg-[#211126] border border-[#F8F3E7]/15 rounded-xl px-2 py-3 text-xs text-[#F8F3E7] focus:ring-2 focus:ring-[#E8A33D] focus:outline-none"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.dialCode}>
                      {c.flag} {c.dialCode}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phone-modal"
                  name="phone"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onBlur={() => handleBlur("phone")}
                  maxLength={currentCountry.maxLength}
                  placeholder={currentCountry.placeholder}
                  className={`flex-1 px-4 py-3 rounded-xl bg-[#211126] border text-[#F8F3E7] placeholder-[#F8F3E7]/40 focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px] ${
                    touched.phone && errors.phone
                      ? "border-rose-400"
                      : "border-[#F8F3E7]/15"
                  }`}
                />
              </div>
              {touched.phone && errors.phone && (
                <p className="text-xs text-rose-300 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email-modal"
                className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
              >
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                id="email-modal"
                name="email"
                value={formData.email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur("email")}
                placeholder="e.g. anand@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-[#211126] border text-[#F8F3E7] placeholder-[#F8F3E7]/40 focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px] ${
                  touched.email && errors.email
                    ? "border-rose-400"
                    : "border-[#F8F3E7]/15"
                }`}
              />
              {touched.email && errors.email && (
                <p className="text-xs text-rose-300 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Instrument & Preferred Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="instrument-modal"
                className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
              >
                Preferred Instrument <span className="text-rose-400">*</span>
              </label>
              <select
                id="instrument-modal"
                name="instrument"
                value={formData.instrument}
                onChange={handleInstrumentChange}
                className="w-full px-4 py-3 rounded-xl bg-[#211126] border border-[#F8F3E7]/15 text-[#F8F3E7] focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px]"
              >
                <option value="Piano">🎹 Piano (Ages 6+)</option>
                <option value="Guitar">🎸 Guitar (Ages 8+)</option>
                <option value="Keyboard">🎛 Keyboard (Ages 6+)</option>
                <option value="Not sure yet">🎼 Not sure yet</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="preferredTime-modal"
                className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
              >
                Preferred Time <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                id="preferredTime-modal"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handlePreferredTimeChange}
                onBlur={() => handleBlur("preferredTime")}
                placeholder="e.g. Weekday evenings, Sat morning"
                className={`w-full px-4 py-3 rounded-xl bg-[#211126] border text-[#F8F3E7] placeholder-[#F8F3E7]/40 focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px] ${
                  touched.preferredTime && errors.preferredTime
                    ? "border-rose-400"
                    : "border-[#F8F3E7]/15"
                }`}
              />
              {touched.preferredTime && errors.preferredTime && (
                <p className="text-xs text-rose-300 mt-1">
                  {errors.preferredTime}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message-modal"
              className="block text-xs font-semibold uppercase tracking-wider text-[#E8A33D] mb-2"
            >
              Additional Questions or Learning Goals (Optional)
            </label>
            <textarea
              id="message-modal"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleMessageChange}
              onBlur={() => handleBlur("message")}
              placeholder="Tell us about your learning goals..."
              className={`w-full px-4 py-3 rounded-xl bg-[#211126] border text-[#F8F3E7] placeholder-[#F8F3E7]/40 focus:outline-none focus:ring-2 focus:ring-[#E8A33D] transition-colors min-h-[44px] ${
                touched.message && errors.message
                  ? "border-rose-400"
                  : "border-[#F8F3E7]/15"
              }`}
            />
            {touched.message && errors.message && (
              <p className="text-xs text-rose-300 mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#E8A33D] text-[#211126] font-bold text-base hover:bg-white hover:shadow-[0_8px_25px_rgba(232,163,61,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 min-h-[48px] shadow-lg disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "submitting" ? (
              <div className="flex items-center gap-2">
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
                <span>Submitting Booking...</span>
              </div>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Book Your Slots</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
