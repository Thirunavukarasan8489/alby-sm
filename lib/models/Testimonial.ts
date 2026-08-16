import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  instrument: "Piano" | "Guitar" | "Keyboard" | "General";
  quote: string;
  rating: number;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student or parent name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    role: {
      type: String,
      required: [true, "Role/description is required"],
      trim: true,
      maxlength: [100, "Role cannot exceed 100 characters"],
    },
    instrument: {
      type: String,
      required: [true, "Instrument selection is required"],
      enum: ["Piano", "Guitar", "Keyboard", "General"],
      default: "Piano",
    },
    quote: {
      type: String,
      required: [true, "Testimonial quote is required"],
      trim: true,
      maxlength: [1000, "Quote cannot exceed 1000 characters"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    featured: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite error during Next.js hot module reloads
export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
