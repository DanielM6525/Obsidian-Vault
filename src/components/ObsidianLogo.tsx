import React, { useState } from 'react';

interface ObsidianLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ObsidianLogo: React.FC<ObsidianLogoProps> = ({ 
  className = '',
  size = 'md' 
}) => {
  const [imageError, setImageError] = useState(false);

  // Direct image URL provided by the user in the prompt
  const directImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCPVCFdP8-TYdOXkrwCXa3YIFzL0ZIztyoc7isW4qMlN41uZD3_hG9aDdrQlIuPYQrGoEvMfiLfMLMpeWVoZxtKOkpA4eEm-itFaPNI_6LQvCDrASBgJR5a7xTmMs-6_c5tZplfUfNv7BzPnRKlEUhUQkiq_BgIYUXzSYO60V0x7ZcYp8M1vNJPPN2uqP9K6_hnrKFCqcqaBIW2MlNfPkmReq21tlO0tXuj_BXc5oZ0BpLcKl1y6Pw_26Lbz7UqEzBYvgc";

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#060a12] border border-blue-500/20 shadow-lg shadow-blue-950/50 p-1 overflow-hidden group ${sizeClasses[size]} ${className}`}>
      {/* Background ambient neon glow */}
      <div className="absolute inset-0 bg-blue-500/15 blur-sm group-hover:bg-blue-400/25 transition-all duration-300 pointer-events-none" />

      {!imageError ? (
        <img
          src={directImageUrl}
          alt="Obsidian Vault Logo"
          className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
          loading="eager"
        />
      ) : (
        /* High-Definition SVG Fallback reproducing the 3D Obsidian Crystal Emblem */
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagonal Outer Shield */}
          <polygon
            points="50,6 86,26 86,74 50,94 14,74 14,26"
            stroke="url(#silverGrad)"
            strokeWidth="3.5"
            fill="#090d16"
          />
          {/* Inner Hexagonal Border */}
          <polygon
            points="50,14 78,30 78,70 50,86 22,70 22,30"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />
          {/* Faceted Crystal Monolith */}
          <path
            d="M50,16 L68,48 L50,84 L32,48 Z"
            fill="url(#crystalGrad)"
            stroke="#60a5fa"
            strokeWidth="1.8"
          />
          {/* Facet Light Split */}
          <path
            d="M50,16 L68,48 L50,84 Z"
            fill="rgba(255,255,255,0.18)"
          />
          <path
            d="M50,16 L32,48 L50,84 Z"
            fill="rgba(0,0,0,0.3)"
          />
          {/* Center Monogram O / V */}
          <ellipse
            cx="50"
            cy="46"
            rx="8.5"
            ry="11.5"
            stroke="#f8fafc"
            strokeWidth="2.8"
            fill="none"
          />
          <path
            d="M44,61 L50,71 L56,61"
            stroke="#93c5fd"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <defs>
            <linearGradient id="silverGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#94a3b8" />
              <stop offset="0.5" stopColor="#cbd5e1" />
              <stop offset="1" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="crystalGrad" x1="50" y1="16" x2="50" y2="84" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e293b" />
              <stop offset="0.5" stopColor="#0f172a" />
              <stop offset="1" stopColor="#020617" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};
