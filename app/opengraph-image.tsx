import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Alby.sm Music Academy — Piano, Guitar & Keyboard in Coimbatore";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #211126, #2c1732)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "#F8F3E7",
          padding: "40px",
          border: "12px solid #E8A33D",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "#E8A33D",
            textTransform: "uppercase",
            letterSpacing: "4px",
            marginBottom: "16px",
            fontWeight: "bold",
          }}
        >
          Alby.sm Music Academy • Coimbatore
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          Master Piano, Guitar & Keyboard
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "rgba(248,243,231,0.8)",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Golden Hour Recital Concept • Ear-First Training • Trinity College Exam Prep
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
