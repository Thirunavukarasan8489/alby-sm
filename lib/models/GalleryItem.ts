import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  image: string;
  publicId?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema: Schema<IGalleryItem> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title / Alt Text is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
      default: "Alby School of Music Gallery Photo",
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
