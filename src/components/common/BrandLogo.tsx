import React from 'react';

interface BrandLogoProps {
  customLogoUrl?: string;
  hindiName?: string;
  englishName?: string;
  businessType?: string;
  tagline?: string;
  size?: 'sm' | 'md' | 'lg' | 'document';
  showText?: boolean;
  className?: string;
}

export const BrandIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 56,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Outer House Roof & Walls */}
      <path
        d="M50 10L14 42V88H86V42L50 10Z"
        fill="#FFFFFF"
        stroke="#0e3c63"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      {/* House Chimney / decorative accent */}
      <path
        d="M70 28V18H78V35"
        stroke="#0e3c63"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner teardrop water droplet */}
      <path
        d="M50 32C50 32 34 50 34 62C34 71 41.2 78 50 78C58.8 78 66 71 66 62C66 50 50 32 50 32Z"
        fill="#0284c7"
      />
      {/* Water droplet shine reflection */}
      <path
        d="M42 56C42 52 44.5 48 47 46"
        stroke="#bae6fd"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  customLogoUrl,
  hindiName = 'वज्र',
  englishName = 'SEAL',
  businessType = 'WATERPROOFING SOLUTIONS',
  tagline = 'Stronger Walls | Drier Spaces | Longer Life',
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 36,
    md: 52,
    lg: 64,
    document: 58,
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {customLogoUrl ? (
        <img
          src={customLogoUrl}
          alt={`${hindiName} ${englishName}`}
          className="object-contain"
          style={{ height: iconSizes[size], maxWidth: iconSizes[size] * 1.5 }}
        />
      ) : (
        <BrandIcon size={iconSizes[size]} />
      )}

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-[#e66827] font-black tracking-tight"
              style={{
                fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif",
                fontSize: size === 'sm' ? '18px' : size === 'lg' ? '30px' : size === 'document' ? '28px' : '24px',
                lineHeight: 1.1,
              }}
            >
              {hindiName}
            </span>
            <span
              className="text-[#0e3c63] font-serif font-black tracking-wider"
              style={{
                fontSize: size === 'sm' ? '18px' : size === 'lg' ? '30px' : size === 'document' ? '28px' : '24px',
                lineHeight: 1.1,
              }}
            >
              {englishName}
            </span>
          </div>

          <div
            className="text-[#0e3c63] font-extrabold uppercase tracking-widest mt-0.5"
            style={{
              fontSize: size === 'sm' ? '9px' : size === 'lg' ? '13px' : size === 'document' ? '12px' : '11px',
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              letterSpacing: '0.08em',
            }}
          >
            {businessType}
          </div>

          <div
            className="text-slate-600 font-medium tracking-tight mt-0.5"
            style={{
              fontSize: size === 'sm' ? '8px' : size === 'lg' ? '11px' : size === 'document' ? '10px' : '9.5px',
            }}
          >
            {tagline}
          </div>
        </div>
      )}
    </div>
  );
};
