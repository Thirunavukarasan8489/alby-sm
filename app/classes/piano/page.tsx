import React from "react";
import { CLASSES_DATA, ACADEMY_INFO } from "@/lib/constants";
import { constructMetadata } from "@/lib/seo";
import { ClassPageTemplate } from "@/components/templates/ClassPageTemplate";

const pianoData = CLASSES_DATA.piano;

export const metadata = constructMetadata({
  title: `Piano Class in Coimbatore | ${ACADEMY_INFO.name}`,
  description: pianoData.geoAnswer,
  path: "/classes/piano",
});

export default function PianoClassPage() {
  return (
    <ClassPageTemplate
      classItem={pianoData}
      heroHeadline="From first scales to<br>full <i class='italic text-[#E8A33D] not-italic'>performance</i>"
      heroSubtext="Classical and contemporary piano technique, taught with ear training and sight-reading built into every lesson from day one."
      levelsData={[
        {
          number: "01",
          title: "Beginner",
          items: [
            "Posture & hand position",
            "Note reading & rhythm basics",
            "First simple pieces",
            "Ear training games",
          ],
        },
        {
          number: "02",
          title: "Intermediate",
          items: [
            "Scales, chords & arpeggios",
            "Two-hand coordination",
            "Classical & film repertoire",
            "Basic sight-reading",
          ],
        },
        {
          number: "03",
          title: "Advanced",
          items: [
            "Performance repertoire",
            "Music theory & composition basics",
            "Exam & recital preparation",
            "Expression & dynamics",
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
          title: "Ear-first method",
          description: "Students learn to hear music, not just read it.",
        },
        {
          title: "Real repertoire",
          description:
            "Playing whole pieces early, not just drills and scales.",
        },
        {
          title: "Exam & recital ready",
          description:
            "Structured prep whenever a student is ready to perform.",
        },
      ]}
      scheduleData={[
        {
          batch: "Morning Beginners",
          level: "Beginner",
          days: "Mon, Wed, Fri",
          time: "10:00 – 11:00 AM",
        },
        {
          batch: "Weekday Evening",
          level: "Intermediate",
          days: "Tue, Thu",
          time: "5:00 – 6:00 PM",
        },
        {
          batch: "Weekend Batch",
          level: "All levels",
          days: "Saturday",
          time: "10:00 AM – 1:00 PM",
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
          "My daughter went from not knowing where middle C was to playing her first recital piece in eight months — the teachers here are endlessly patient.",
        cite: "— Parent of a Piano Class student",
      }}
      relatedClasses={[
        {
          title: "Guitar Class",
          subtitle: "Acoustic & electric, song-first",
          href: "/classes/guitar",
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
