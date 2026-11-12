import React from 'react';

interface TaxAidBrandProps {
  className?: string;
  darkBg?: boolean;
}

export function TaxAidBrand({ className = '', darkBg = false }: TaxAidBrandProps) {
  if (darkBg) {
    return (
      <span
        className={`inline-flex items-center font-bold tracking-tight bg-white/95 px-1.5 py-0.5 rounded shadow-sm ${className}`}
      >
        <span className="text-[#D62828]">Tax</span>
        <span className="text-[#0B1F3A]">Aid</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center font-bold tracking-tight ${className}`}>
      <span className="text-[#D62828]">Tax</span>
      <span className="text-[#0B1F3A]">Aid</span>
    </span>
  );
}

