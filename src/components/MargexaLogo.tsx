import React from 'react';

interface MargexaLogoProps {
  variant?: 'full' | 'horizontal' | 'icon';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const MargexaIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MARGEXA Logo Mark"
    >
      <defs>
        {/* Navy Blue Primary Gradient */}
        <linearGradient id="margexaNavy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0b2447" />
          <stop offset="100%" stopColor="#19376d" />
        </linearGradient>

        {/* Teal Road Gradient (Upper Curve) */}
        <linearGradient id="roadTealLight" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00796b" />
          <stop offset="45%" stopColor="#009688" />
          <stop offset="100%" stopColor="#26a69a" />
        </linearGradient>

        {/* Teal Road Gradient (Lower Shadow Curve) */}
        <linearGradient id="roadTealDark" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#004d40" />
          <stop offset="60%" stopColor="#00796b" />
          <stop offset="100%" stopColor="#00897b" />
        </linearGradient>
      </defs>

      {/* --- Letter M Base (Navy) --- */}
      {/* Left Pillar of M with smooth rounded top shoulder */}
      <path
        d="M32 110C32 80 42 56 68 56C88 56 102 74 112 90C118 80 128 66 142 58V110H118V84C112 76 104 68 96 68C84 68 76 78 74 94V110H32Z"
        fill="url(#margexaNavy)"
      />

      {/* Main Solid Left and Right Stems of M */}
      <path
        d="M32 78C32 60 48 54 62 54C80 54 94 72 104 88C110 78 120 62 136 58V114H114V86C108 78 100 70 92 70C80 70 74 80 72 96V114H32V78Z"
        fill="#0b2447"
      />
      {/* Left Wall Solid */}
      <path
        d="M32 74C32 62 44 54 58 54C72 54 84 68 96 84L82 102C74 88 64 74 54 74C46 74 44 80 44 88V112H32V74Z"
        fill="#0d2b56"
      />
      {/* Right Wall Solid */}
      <path
        d="M120 66H144V112H120V66Z"
        fill="#0b2447"
      />

      {/* --- The Ascending Highway / Pathway (Two-Tone Teal) --- */}
      {/* Lower dark-teal strip */}
      <path
        d="M26 112C44 94 74 78 114 68C126 65 138 63 144 62V70C136 71 124 73 112 76C76 86 48 102 34 118L26 112Z"
        fill="url(#roadTealDark)"
      />
      {/* Upper bright-teal strip */}
      <path
        d="M32 118C48 98 80 82 120 72C130 69 138 67 144 66V72C138 73 130 75 120 78C82 88 52 104 38 122L32 118Z"
        fill="url(#roadTealLight)"
      />
      {/* Road Center Line Accent */}
      <path
        d="M36 116C50 99 80 84 122 74C132 71 140 70 144 69V70C138 71 130 72 120 75C82 85 52 101 38 118L36 116Z"
        fill="#ffffff"
        opacity="0.85"
      />

      {/* --- Column / Pedestal on the Right Pillar (Teal) --- */}
      <rect x="134" y="52" width="10" height="15" rx="1" fill="#009688" />

      {/* --- Graduation Cap (Navy) on Top of Right Column --- */}
      {/* Mortarboard Diamond Crown */}
      <polygon
        points="140,24 176,37 140,50 104,37"
        fill="#0b2447"
      />
      {/* Cap Under-Brim / Skull Cap */}
      <path
        d="M118 43L140 52L162 43V48C162 55 152 61 140 61C128 61 118 55 118 48V43Z"
        fill="#081c38"
      />
      {/* Tassel Button / Apex */}
      <circle cx="140" cy="37" r="2.5" fill="#26a69a" />
      {/* Tassel Cord hanging to the right */}
      <path
        d="M140 37C152 38 168 40 172 50V60"
        stroke="#0b2447"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Tassel Hanging Bob / Fringe */}
      <ellipse cx="172" cy="62" rx="3" ry="5" fill="#0b2447" />
    </svg>
  );
};

export const MargexaLogo: React.FC<MargexaLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  // Height sizing
  const iconSize =
    size === 'sm'
      ? 'w-7 h-7'
      : size === 'md'
      ? 'w-10 h-10'
      : size === 'lg'
      ? 'w-14 h-14'
      : 'w-20 h-20';

  const titleSize =
    size === 'sm'
      ? 'text-lg'
      : size === 'md'
      ? 'text-2xl'
      : size === 'lg'
      ? 'text-3xl'
      : 'text-4xl';

  const taglineSize =
    size === 'sm'
      ? 'text-[8px]'
      : size === 'md'
      ? 'text-[10px]'
      : size === 'lg'
      ? 'text-xs'
      : 'text-sm';

  if (variant === 'icon') {
    return <MargexaIcon className={`${iconSize} ${className}`} />;
  }

  if (variant === 'full') {
    // Stacked full visual identity like the 4th image
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* Top Icon Mark */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 relative flex items-center justify-center">
          <MargexaIcon className="w-full h-full drop-shadow-sm" />
        </div>

        {/* Wordmark */}
        <div className="mt-1 flex items-center tracking-wider font-extrabold font-heading text-slate-900">
          <span className="text-3xl sm:text-4xl tracking-widest text-[#0b2447]">
            MARGE
          </span>
          <span className="text-3xl sm:text-4xl tracking-widest text-[#009688]">
            X
          </span>
          <span className="text-3xl sm:text-4xl tracking-widest text-[#0b2447]">
            A
          </span>
        </div>

        {/* Tagline */}
        {showTagline && (
          <div className="mt-1.5 flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
            <span className="w-6 sm:w-8 h-0.5 bg-[#009688] rounded-full"></span>
            <span className="tracking-wide">Your College. Your Course. Our Guidance.</span>
            <span className="w-6 sm:w-8 h-0.5 bg-[#009688] rounded-full"></span>
          </div>
        )}
      </div>
    );
  }

  // Horizontal variant (default for Navbar / Headers)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className={`${iconSize} shrink-0 relative flex items-center justify-center`}>
        <MargexaIcon className="w-full h-full" />
      </div>

      {/* Brand Text + Optional Tagline */}
      <div className="flex flex-col text-left">
        <div className="flex items-center leading-none font-heading font-black tracking-wider">
          <span className={`${titleSize} text-[#0b2447]`}>MARGE</span>
          <span className={`${titleSize} text-[#009688]`}>X</span>
          <span className={`${titleSize} text-[#0b2447]`}>A</span>
        </div>
        {showTagline && (
          <div className="hidden xl:flex items-center gap-1.5 mt-0.5 text-slate-600 font-medium">
            <span className="w-2.5 h-[1.5px] bg-[#009688] rounded-full hidden sm:inline-block"></span>
            <p className={`${taglineSize} tracking-tight leading-none whitespace-nowrap text-slate-600`}>
              Your College. Your Course. Our Guidance.
            </p>
            <span className="w-2.5 h-[1.5px] bg-[#009688] rounded-full hidden sm:inline-block"></span>
          </div>
        )}
      </div>
    </div>
  );
};
