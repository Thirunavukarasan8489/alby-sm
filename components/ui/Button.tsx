import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#E8A33D] focus:ring-offset-2 focus:ring-offset-[#211126] min-h-[44px] min-w-[44px] cursor-pointer shadow-md";

  const variantStyles = {
    primary:
      "bg-[#E8A33D] text-[#211126] hover:bg-white hover:text-[#211126] hover:shadow-[0_8px_25px_rgba(232,163,61,0.45)] font-semibold",
    secondary:
      "bg-[#17514E] text-[#F8F3E7] hover:bg-white hover:text-[#17514E] hover:shadow-[0_8px_20px_rgba(23,81,78,0.45)] font-semibold",
    outline:
      "border-2 border-[#E8A33D] text-[#E8A33D] hover:bg-[#E8A33D] hover:text-[#211126] font-semibold hover:shadow-[0_8px_20px_rgba(232,163,61,0.35)]",
  };

  const sizeStyles = {
    sm: "px-5 py-2.5 text-xs uppercase tracking-wider",
    md: "px-7 py-3 text-sm font-semibold",
    lg: "px-8 py-3.5 text-base font-semibold",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};
