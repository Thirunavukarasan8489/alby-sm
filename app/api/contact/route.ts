import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ContactSubmission } from "@/lib/models/ContactSubmission";
import { getCountryByDialCode } from "@/lib/countries";

// Regular expressions for strict validation
const NAME_REGEX = /^[a-zA-Z\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PREFERRED_TIME_REGEX = /^[a-zA-Z0-9\s\-.,]+$/;
const MESSAGE_REGEX = /^[a-zA-Z0-9\s\-.,\n\r]*$/;
const DIGITS_ONLY_REGEX = /^\d+$/;

const VALID_INSTRUMENTS = ["Piano", "Guitar", "Keyboard", "Not sure yet"];

interface ContactRequestBody {
  name?: string;
  countryCode?: string;
  phone?: string;
  email?: string;
  instrument?: string;
  preferredTime?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequestBody = await request.json();
    const errors: Record<string, string> = {};

    // 1. Name Validation (Mandatory, letters and spaces only)
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) {
      errors.name = "Full name is required";
    } else if (name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    } else if (name.length > 100) {
      errors.name = "Name cannot exceed 100 characters";
    } else if (!NAME_REGEX.test(name)) {
      errors.name = "Name can only contain letters and spaces (no numbers or special characters)";
    }

    // 2. Country Code & Phone Validation
    const countryCode =
      typeof body.countryCode === "string" && body.countryCode.trim()
        ? body.countryCode.trim()
        : "+91";
    const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
    // Strip non-digits
    const cleanPhone = rawPhone.replace(/\D/g, "");

    const countryConfig = getCountryByDialCode(countryCode);

    if (!cleanPhone) {
      errors.phone = "Phone number is required";
    } else if (!DIGITS_ONLY_REGEX.test(cleanPhone)) {
      errors.phone = "Phone number must contain digits only";
    } else if (
      countryConfig.minLength === countryConfig.maxLength &&
      cleanPhone.length !== countryConfig.minLength
    ) {
      errors.phone = `Phone number for ${countryConfig.name} must be exactly ${countryConfig.minLength} digits`;
    } else if (
      cleanPhone.length < countryConfig.minLength ||
      cleanPhone.length > countryConfig.maxLength
    ) {
      errors.phone = `Phone number for ${countryConfig.name} must be between ${countryConfig.minLength} and ${countryConfig.maxLength} digits`;
    }

    // 3. Email Validation (Mandatory, valid format)
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email) {
      errors.email = "Email address is required";
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // 4. Interested in / Instrument Validation (Mandatory select)
    const instrument = typeof body.instrument === "string" ? body.instrument.trim() : "";
    if (!instrument || !VALID_INSTRUMENTS.includes(instrument)) {
      errors.instrument = "Please select a valid instrument from the options";
    }

    // 5. Preferred Time Validation (Mandatory, letters, numbers, -, ., , only)
    const preferredTime =
      typeof body.preferredTime === "string" ? body.preferredTime.trim() : "";
    if (!preferredTime) {
      errors.preferredTime = "Preferred time is required";
    } else if (!PREFERRED_TIME_REGEX.test(preferredTime)) {
      errors.preferredTime =
        "Preferred time can only contain letters, numbers, hyphens (-), commas (,), and dots (.)";
    } else if (preferredTime.length > 150) {
      errors.preferredTime = "Preferred time cannot exceed 150 characters";
    }

    // 6. Message Validation (Optional, letters, numbers, -, ., , only if provided)
    const rawMessage = typeof body.message === "string" ? body.message.trim() : "";
    if (rawMessage && !MESSAGE_REGEX.test(rawMessage)) {
      errors.message =
        "Message can only contain letters, numbers, hyphens (-), commas (,), and dots (.)";
    } else if (rawMessage.length > 1000) {
      errors.message = "Message cannot exceed 1000 characters";
    }

    // If validation fails, return 400 Bad Request with field errors
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please check the provided information.",
          errors,
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Extract request metadata
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "";
    const userAgent = request.headers.get("user-agent") || "";

    const fullPhone = `${countryCode} ${cleanPhone}`;

    // Create record in MongoDB
    const submission = await ContactSubmission.create({
      name,
      countryCode,
      phone: cleanPhone,
      fullPhone,
      email,
      instrument,
      preferredTime,
      message: rawMessage || "",
      ipAddress,
      userAgent,
      status: "new",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your trial lesson request has been submitted successfully!",
        data: {
          id: submission._id.toString(),
          name: submission.name,
          fullPhone: submission.fullPhone,
          instrument: submission.instrument,
          createdAt: submission.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error processing contact submission:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error occurred";

    return NextResponse.json(
      {
        success: false,
        message:
          "We encountered a database error while processing your request. Please try again or contact us directly via WhatsApp/phone.",
        error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
