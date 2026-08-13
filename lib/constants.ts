export const ACADEMY_INFO = {
  name: "Alby.sm Music Academy",
  legalName: "Alby.sm Music Academy Coimbatore",
  tagline:
    "Golden Hour Recital — Master Piano, Guitar & Keyboard in Coimbatore",
  description:
    "Alby.sm Music Academy in Coimbatore, Tamil Nadu offers structured, ear-first music education for Piano, Guitar, and Keyboard across all age groups (ages 6+) and skill levels from beginner to advanced.",
  address: {
    street: "123 Harmony Lane, College Road",
    city: "Coimbatore",
    state: "Tamil Nadu",
    postalCode: "641030",
    country: "India",
  },
  formattedAddress: "Coimbatore, Tamil Nadu 641030, India",
  phone: "+91 90435 61694 ",
  phoneRaw: "+919043561694 ",
  whatsappUrl:
    "https://wa.me/9043561694?text=Hi%20Alby.sm%20Music%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20music%20classes.",
  email: "albertebini455@gmail.com",
  openingHours: "Mon-Fri: 3AM - 10PM, Sun: 4AM - 6AM and 1PM - 8PM",
  openingHoursSpecification: [
    {
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "03:00",
      closes: "22:00",
    },
    {
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
  socials: {
    instagram: "https://www.instagram.com/alby_school_of_music",
    youtube: "https://www.youtube.com/@albyschoolofmusic",
    facebook: "",
    whatsapp:
      "https://wa.me/9043561694?text=Hi%20Alby.sm%20Music%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20music%20classes.",
  },
  geo: {
    latitude: 11.0168,
    longitude: 76.9558,
  },
};

export interface ClassData {
  id: "piano" | "guitar" | "keyboard";
  slug: string;
  name: string;
  shortDescription: string;
  geoAnswer: string;
  ageRange: string;
  levels: string[];
  schedule: string;
  highlights: string[];
  curriculum: string[];
  instructorName: string;
  heroImage: string;
  badge: string;
}

export const CLASSES_DATA: Record<string, ClassData> = {
  piano: {
    id: "piano",
    slug: "piano",
    name: "Piano Class",
    shortDescription:
      "Classical & modern piano mastery with ear-first training, sight-reading, and recital readiness in small batches.",
    geoAnswer:
      "Alby.sm's Piano Class in Coimbatore teaches beginner to advanced students ages 6+, in small batches (max 5 students), combining ear training, classical sight-reading, and modern arrangement techniques.",
    ageRange: "Ages 6 and above",
    levels: ["Beginner", "Intermediate", "Advanced"],
    schedule: "Tue & Thu: 4:30 PM - 6:00 PM | Sat: 10:00 AM - 11:30 AM",
    highlights: [
      "Acoustic & weighted-keys keyboard practice",
      "Ear-first melody transcription & chord progression analysis",
      "Annual recital performance preparation",
      "Trinity & Associated Board exam guidance",
    ],
    curriculum: [
      "Posture, hand placement & finger agility drills",
      "Reading treble & bass clefs smoothly",
      "Scale construction, chord inversions & arpeggios",
      "Repertoire from Classical, Pop & Indian Film scores",
    ],
    instructorName: "Master Alby & Senior Faculty",
    heroImage: "/images/alby-piano-playing.jpg",
    badge: "Most Popular",
  },
  guitar: {
    id: "guitar",
    slug: "guitar",
    name: "Guitar Class",
    shortDescription:
      "Acoustic, electric & bass guitar training covering strumming patterns, lead solos, fingerstyle, and chord theory.",
    geoAnswer:
      "Alby.sm's Guitar Class in Coimbatore provides practical acoustic and electric guitar lessons for students ages 8+, emphasizing posture, strumming mechanics, lead playing, and song accompaniment.",
    ageRange: "Ages 8 and above",
    levels: ["Beginner", "Intermediate", "Advanced"],
    schedule: "Mon & Wed: 5:00 PM - 6:30 PM | Sun: 11:00 AM - 12:30 PM",
    highlights: [
      "Acoustic strumming & fingerpicking techniques",
      "Electric guitar lead riffs & solo improvisations",
      "Rhythm timing with metronome & backing tracks",
      "Jam session experience with ensemble accompaniment",
    ],
    curriculum: [
      "Open chords, barre chords & smooth transitions",
      "Strumming patterns in 4/4, 3/4 & 6/8 time signatures",
      "Pentatonic scales, blues box & speed picking",
      "Tablature reading & sheet music fundamentals",
    ],
    instructorName: "Lead Instructor Sharmin",
    heroImage:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80",
    badge: "High Demand",
  },
  keyboard: {
    id: "keyboard",
    slug: "keyboard",
    name: "Electronic Keyboard Class",
    shortDescription:
      "Electronic synthesizer & arranger keyboard learning focused on tones, rhythms, notation, and song accompaniment.",
    geoAnswer:
      "Alby.sm's Electronic Keyboard Class in Coimbatore caters to students ages 6+, teaching automatic accompaniment, voice selection, dual-hand rhythm control, and contemporary musical scoring.",
    ageRange: "Ages 6 and above",
    levels: ["Beginner", "Intermediate", "Advanced"],
    schedule: "Wed & Fri: 4:30 PM - 6:00 PM | Sat: 3:00 PM - 4:30 PM",
    highlights: [
      "Arranger keyboard registration & voice mixing",
      "Dual-hand coordination & bassline sync",
      "Sight-reading notation & lead sheet deciphering",
      "Live band rhythm accompaniment skills",
    ],
    curriculum: [
      "Keyboard layout, pitch bend & modulation wheel mastery",
      "Major/Minor scale runs & arpeggios",
      "Arranger styles (Ballad, Rock, Latin, Indian rhythms)",
      "Performance piece arrangement & stage presence",
    ],
    instructorName: "Faculty S. Priya",
    heroImage: "/images/alby-keyboard-stage.jpg",
    badge: "Versatile & Fun",
  },
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Classes", href: "/classes" },
  { name: "Piano", href: "/classes/piano" },
  { name: "Guitar", href: "/classes/guitar" },
  { name: "Keyboard", href: "/classes/keyboard" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Alby.sm Music Academy transformed my daughter's piano playing within 6 months. The ear-first approach made her confident on stage during the annual recital!",
    author: "S. Meenakshi",
    role: "Parent of Piano Student (Age 9)",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The guitar faculty break down complex chord transitions into simple daily drills. Best music institute in Coimbatore for both kids and working adults like me.",
    author: "Arun Kumar",
    role: "Adult Guitar Student",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Studying electronic keyboard at Alby.sm gave me the foundation to compose my own tracks. The batch sizes are small and instructors give individual attention.",
    author: "K. Nithya",
    role: "Keyboard Student (Age 14)",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Enrolling both my sons for Piano & Keyboard was the best decision. The teachers are incredibly patient, encouraging, and foster a genuine love for music.",
    author: "R. Rajeshwari",
    role: "Parent of Music Academy Students",
    rating: 5,
  },
];

export const FAQS = [
  {
    question: "What age groups are eligible for music classes at Alby.sm?",
    answer:
      "Piano and Keyboard classes are open to children aged 6 and above as well as adults. Guitar classes start from age 8 and up. We welcome absolute beginners and intermediate players.",
  },
  {
    question: "Where is Alby.sm Music Academy located in Coimbatore?",
    answer:
      "Alby.sm Music Academy is located at 123 Harmony Lane, College Road, Coimbatore, Tamil Nadu 641030. It is easily accessible from all major parts of Coimbatore city.",
  },
  {
    question: "What makes the 'ear-first' teaching methodology different?",
    answer:
      "Our ear-first method trains students to listen, identify pitch, and play melodies by ear before connecting notes to written sheet music. This builds natural musicality, rhythm, and confidence.",
  },
  {
    question:
      "Are individual instruments provided during practice at the academy?",
    answer:
      "Yes, our air-conditioned classrooms are fully equipped with acoustic pianos, weighted keyboards, and guitars for every student during scheduled batch hours.",
  },
  {
    question: "Do you offer certification or Trinity exam coaching?",
    answer:
      "Yes, we guide students through Trinity College London and grade exam syllabi for Piano, Guitar, and Electronic Keyboard for those seeking formal accreditation.",
  },
];
