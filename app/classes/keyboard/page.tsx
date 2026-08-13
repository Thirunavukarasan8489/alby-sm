import React from "react";
import { CLASSES_DATA, ACADEMY_INFO } from "@/lib/constants";
import { constructMetadata } from "@/lib/seo";
import { ClassPageTemplate } from "@/components/templates/ClassPageTemplate";

const keyboardData = CLASSES_DATA.keyboard;

export const metadata = constructMetadata({
  title: `Keyboard Class in Coimbatore | ${ACADEMY_INFO.name}`,
  description: keyboardData.geoAnswer,
  path: "/classes/keyboard",
});

export default function KeyboardClassPage() {
  return (
    <ClassPageTemplate
      classItem={keyboardData}
      heroHeadline="Modern sound,<br><i class='italic text-[#E8A33D] not-italic'>performance-ready</i> fast"
      heroSubtext="A great fit for students who want to play modern music quickly — layered sounds, arrangement and performance technique, with the theory explained as it's used."
      levelsData={[
        {
          number: "01",
          title: "Beginner",
          items: [
            "Keyboard layout & key navigation",
            "Auto-accompaniment & rhythm selection",
            "Single finger & open chords",
            "Basic melody playing",
          ],
        },
        {
          number: "02",
          title: "Intermediate",
          items: [
            "Dual-hand coordination",
            "Voice registration & tone mixing",
            "Pop, film & devotional accompaniment",
            "Scale runs & inversions",
          ],
        },
        {
          number: "03",
          title: "Advanced",
          items: [
            "Arranger keyboard production",
            "Complex Indian & Western rhythms",
            "Live band scoring & performance",
            "Trinity Grade exam prep",
          ],
        },
      ]}
      whyData={[
        {
          title: "Small batches",
          description:
            "Every student gets real one-on-one correction, every class.",
        },
        {
          title: "Modern sounds",
          description:
            "Learn synth patches, layering, and arranger rhythm styles.",
        },
        {
          title: "Fast progress",
          description:
            "Play complete songs quickly with dual-hand accompaniment.",
        },
        {
          title: "Stage ready",
          description:
            "Perform in annual recitals with full arranger backing tracks.",
        },
      ]}
      scheduleData={[
        {
          batch: "Weekday Evening",
          level: "Beginner",
          days: "Wed, Fri",
          time: "4:30 – 6:00 PM",
        },
        {
          batch: "Weekend Afternoon",
          level: "All levels",
          days: "Saturday",
          time: "3:00 – 4:30 PM",
        },
        {
          batch: "1-on-1 (flexible)",
          level: "Any level",
          days: "By appointment",
          time: "To be scheduled",
        },
      ]}
      testimonial={{
        quote:
          "",
        cite: "",
      }}
      relatedClasses={[
        {
          title: "Piano Class",
          subtitle: "Classical & contemporary technique",
          href: "/classes/piano",
        },
        {
          title: "Guitar Class",
          subtitle: "Acoustic & electric, song-first",
          href: "/classes/guitar",
        },
      ]}
    />
  );
}
