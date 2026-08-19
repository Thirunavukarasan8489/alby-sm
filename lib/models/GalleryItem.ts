import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  category: "piano" | "keyboard" | "faculty" | "events";
  tag: "Piano" | "Keyboard" | "Faculty" | "Events";
  image: string;
  publicId?: string;
  caption?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema: Schema<IGalleryItem> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["piano", "keyboard", "faculty", "events"],
      default: "piano",
    },
    tag: {
      type: String,
      required: [true, "Tag is required"],
      enum: ["Piano", "Keyboard", "Faculty", "Events"],
      default: "Piano",
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
      default: "",
    },
    caption: {
      type: String,
      trim: true,
      maxlength: [500, "Caption cannot exceed 500 characters"],
      default: "",
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

export const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
