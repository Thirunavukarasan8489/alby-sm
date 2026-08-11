import React from "react";
import { CLASSES_DATA, ACADEMY_INFO } from "@/lib/constants";
import { constructMetadata } from "@/lib/seo";
import { ClassPageTemplate } from "@/components/templates/ClassPageTemplate";

const guitarData = CLASSES_DATA.guitar;

export const metadata = constructMetadata({
  title: `Guitar Class in Coimbatore | ${ACADEMY_INFO.name}`,
  description: guitarData.geoAnswer,
  path: "/classes/guitar",
});

export default function GuitarClassPage() {
  return (
    <ClassPageTemplate
      classItem={guitarData}
      heroHeadline="Song-first, so progress<br>always <i class='italic text-[#E8A33D] not-italic'>feels real</i>"
      heroSubtext="Acoustic and electric fundamentals taught through actual songs from lesson one — chords and strumming build naturally into fingerstyle and improvisation."
      levelsData={[
        {
          number: "01",
          title: "Beginner",
          items: [
            "Open chords & strumming patterns",
            "Fretboard posture & tuning",
            "First 3-chord songs",
            "Rhythm & timing drills",
          ],
        },
        {
          number: "02",
          title: "Intermediate",
          items: [
            "Barre chords & fingerpicking",
            "Pentatonic scales & lead riffs",
            "Acoustic & electric styles",
            "Tablature & sight reading",
          ],
        },
        {
          number: "03",
          title: "Advanced",
          items: [
            "Improvisation & soloing",
            "Complex time signatures",
            "Stage performance & tone dialing",
            "Ensemble jam sessions",
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
          title: "Song-first method",
          description:
            "Learn technique through songs you actually want to play.",
        },
        {
          title: "Acoustic & Electric",
          description:
            "Master both acoustic strumming and electric lead guitar.",
        },
        {
          title: "Stage ready",
          description:
            "Perform in recitals and jam with fellow student ensembles.",
        },
      ]}
      scheduleData={[
        {
          batch: "Weekday Evening",
          level: "Beginner",
          days: "Mon, Wed",
          time: "5:00 – 6:30 PM",
        },
        {
          batch: "Weekend Batch",
          level: "Intermediate",
          days: "Sunday",
          time: "11:00 AM – 12:30 PM",
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
          "Learning guitar at Alby.sm started with my favorite acoustic songs instead of dry exercises. Within 3 months I was strumming comfortably!",
        cite: "— Adult Guitar Class student",
      }}
      relatedClasses={[
        {
          title: "Piano Class",
          subtitle: "Classical & contemporary technique",
          href: "/classes/piano",
        },
        {
          title: "Keyboard Class",
          subtitle: "Modern sound, performance-ready",
          href: "/classes/keyboard",
        },
      ]}
    />
  );
}
