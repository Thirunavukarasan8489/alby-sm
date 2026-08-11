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
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#211126] min-h-[44px] min-w-[44px]";

  const variantStyles = {
    primary:
      "bg-[#E8A33D] text-[#211126] hover:bg-[#f0b04c] hover:shadow-[0_0_20px_rgba(232,163,61,0.4)] font-semibold",
    secondary:
      "bg-[#17514E] text-[#F8F3E7] hover:bg-[#1f6662] hover:shadow-[0_0_15px_rgba(23,81,78,0.4)] font-medium",
    outline:
      "border-2 border-[#E8A33D] text-[#E8A33D] hover:bg-[#E8A33D] hover:text-[#211126] font-medium",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
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
