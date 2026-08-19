import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { GalleryItem } from "@/lib/models/GalleryItem";

const INITIAL_SEED_ITEMS = [
  {
    title: "Grand Piano Recital Practice",
    category: "piano",
    tag: "Piano",
    image: "/images/alby-grand-piano1.jpg",
    caption: "Student performing during classical grade exam preparation.",
  },
  {
    title: "Ear-First Piano Sight-Reading",
    category: "piano",
    tag: "Piano",
    image: "/images/student-piano-practice.jpg",
    caption: "One-on-one session with Master Alby focusing on ear training.",
  },
  {
    title: "Synthesizer & Arranger Keyboard Drills",
    category: "keyboard",
    tag: "Keyboard",
    image: "/images/student-keyboard-smiling.jpg",
    caption: "Young student mastering arranger rhythm styles and patch selection.",
  },
  {
    title: "Faculty Recital Coaching",
    category: "faculty",
    tag: "Faculty",
    image: "/images/alby-founder.jpg",
    caption: "Master Alby guiding advanced Trinity exam candidates.",
  },
  {
    title: "Annual Student Music Recital",
    category: "events",
    tag: "Events",
    image: "/images/recital-stage-group.jpg",
    caption: "Students performing live on stage during the annual showcase.",
  },
  {
    title: "Grand Piano Technique Mastery",
    category: "piano",
    tag: "Piano",
    image: "/images/student-grand-piano.jpg",
    caption: "Posture, finger velocity, and dynamic range practice.",
  },
  {
    title: "Faculty Workshop Session",
    category: "faculty",
    tag: "Faculty",
    image: "/images/alby-studio-teaching.jpg",
    caption: "Dedicated instructor guidance in our studio environment.",
  },
  {
    title: "Keyboard Harmony & Duet Practice",
    category: "keyboard",
    tag: "Keyboard",
    image: "/images/student-keyboard-duet.jpg",
    caption: "Interactive keyboard arrangement and harmony drills.",
  },
  {
    title: "Stage Performance Recital",
    category: "events",
    tag: "Events",
    image: "/images/recital-stage-piano.jpg",
    caption: "Live stage recital performance in Coimbatore.",
  },
  {
    title: "Piano Arpeggio Warmup",
    category: "piano",
    tag: "Piano",
    image: "/images/student-piano-duet.jpg",
    caption: "Duet exercise with certified instructor.",
  },
  {
    title: "Arranger Keyboard Solo",
    category: "keyboard",
    tag: "Keyboard",
    image: "/images/student-keyboard-solo.jpg",
    caption: "Hands-on chord transition and rhythm programming.",
  },
];

export async function GET() {
  try {
    await connectToDatabase();

    let items = await GalleryItem.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

    // Auto-seed initial photos if collection is empty
    if (!items || items.length === 0) {
      const seedData = INITIAL_SEED_ITEMS.map((item, idx) => ({
        title: item.title,
        category: item.category as any,
        tag: item.tag as any,
        image: item.image,
        publicId: "",
        caption: item.caption,
        order: idx,
      }));

      await GalleryItem.insertMany(seedData);
      items = await GalleryItem.find({})
        .sort({ order: 1, createdAt: -1 })
        .lean();
    }

    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}
