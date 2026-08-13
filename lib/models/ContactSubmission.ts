import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactSubmission extends Document {
  name: string;
  countryCode: string;
  phone: string;
  fullPhone: string;
  email: string;
  instrument: string;
  preferredTime: string;
  message?: string;
  ipAddress?: string;
  userAgent?: string;
  status: "new" | "contacted" | "enrolled" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema: Schema<IContactSubmission> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      trim: true,
      default: "+91",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    fullPhone: {
      type: String,
      required: [true, "Full phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    instrument: {
      type: String,
      required: [true, "Interested instrument is required"],
      enum: {
        values: ["Piano", "Guitar", "Keyboard", "Not sure yet"],
        message: "{VALUE} is not a valid instrument selection",
      },
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
      trim: true,
      maxlength: [150, "Preferred time cannot exceed 150 characters"],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
      default: "",
    },
    ipAddress: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "enrolled", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose model overwrite error during Next.js hot reload
export const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);
