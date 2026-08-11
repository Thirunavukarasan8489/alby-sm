import { ACADEMY_INFO, ClassData, FAQS } from "./constants";
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://albysm.com";

export function constructMetadata({
  title = `${ACADEMY_INFO.name} | Piano, Guitar & Keyboard Classes in Coimbatore`,
  description = ACADEMY_INFO.description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: ACADEMY_INFO.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    "@id": `${SITE_URL}/#organization`,
    name: ACADEMY_INFO.name,
    legalName: ACADEMY_INFO.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: ACADEMY_INFO.description,
    telephone: ACADEMY_INFO.phone,
    email: ACADEMY_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: ACADEMY_INFO.address.street,
      addressLocality: ACADEMY_INFO.address.city,
      addressRegion: ACADEMY_INFO.address.state,
      postalCode: ACADEMY_INFO.address.postalCode,
      addressCountry: ACADEMY_INFO.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ACADEMY_INFO.geo.latitude,
      longitude: ACADEMY_INFO.geo.longitude,
    },
    sameAs: [
      ACADEMY_INFO.socials.instagram,
      ACADEMY_INFO.socials.youtube,
      ACADEMY_INFO.socials.facebook,
    ],
    openingHoursSpecification: ACADEMY_INFO.openingHoursSpecification.map(
      (hours) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.dayOfWeek,
        opens: hours.opens,
        closes: hours.closes,
      }),
    ),
  };
}

export function generateCourseJsonLd(course: ClassData) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.name} at ${ACADEMY_INFO.name}`,
    description: course.geoAnswer,
    provider: {
      "@type": "EducationalOrganization",
      name: ACADEMY_INFO.name,
      sameAs: SITE_URL,
    },
    coursePrerequisites: course.ageRange,
    educationalCredentialAwarded:
      "Course Completion Certificate & Grade Exam Prep",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: ACADEMY_INFO.formattedAddress,
      scheduleTiming: course.schedule,
    },
  };
}

export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: ACADEMY_INFO.name,
    image: `${SITE_URL}/og-image.jpg`,
    telePhone: ACADEMY_INFO.phone,
    email: ACADEMY_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: ACADEMY_INFO.address.street,
      addressLocality: ACADEMY_INFO.address.city,
      addressRegion: ACADEMY_INFO.address.state,
      postalCode: ACADEMY_INFO.address.postalCode,
      addressCountry: ACADEMY_INFO.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ACADEMY_INFO.geo.latitude,
      longitude: ACADEMY_INFO.geo.longitude,
    },
    url: `${SITE_URL}/contact`,
    priceRange: "₹₹",
  };
}

export function generateFaqJsonLd(faqList = FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
