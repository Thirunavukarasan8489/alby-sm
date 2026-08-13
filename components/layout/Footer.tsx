import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#211126] text-[#a89b8c] py-8 px-6 text-center text-xs sm:text-sm border-t border-white/5 mt-auto">
      <div className="font-serif text-xl sm:text-2xl text-[#F8F3E7] mb-2 tracking-wide">
        Alby<em className="font-serif italic text-[#E8A33D] not-italic">.sm</em>
      </div>
      <div>
        © {new Date().getFullYear()} Alby sm Music Academy. All rights reserved.
      </div>
    </footer>
  );
};
