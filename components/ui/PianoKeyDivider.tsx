import React from "react";

interface PianoKeyDividerProps {
  variant?: "dark" | "light" | "teal" | "teal-ink";
  className?: string;
}

export const PianoKeyDivider: React.FC<PianoKeyDividerProps> = ({
  variant = "dark",
  className = "",
}) => {
  return (
    <div
      role="presentation"
      className={`keys ${variant} ${className}`}
      aria-hidden="true"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
