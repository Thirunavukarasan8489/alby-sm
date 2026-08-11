import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alby.sm Music Academy",
    short_name: "Alby.sm Academy",
    description: "Piano, Guitar & Keyboard Music Classes in Coimbatore, Tamil Nadu",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F3E7",
    theme_color: "#211126",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
