/**
 * Logo BeachBike em SVG: círculo (céu, bike, sol, ondas, areia) + texto.
 * Replica a arte de referência com bike reconhecível e ondas suaves.
 */
const TEAL = '#1a6b6b'
const TEAL_LIGHT = '#5aabab'
const CREAM = '#f8f4ec'
const CREAM_BORDER = '#ebe5d8'
const WATER = '#b8d8e8'
const SAND = '#e8dcc4'
const SUN = '#f7d54a'

function LogoBeachBike({ className = '', width = 48, height = 72 }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 100"
      width={width}
      height={height}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="logo-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={CREAM} />
          <stop offset="42%" stopColor={CREAM} />
          <stop offset="50%" stopColor={WATER} />
          <stop offset="78%" stopColor={WATER} />
          <stop offset="85%" stopColor={SAND} />
          <stop offset="100%" stopColor={SAND} />
        </linearGradient>
        <linearGradient id="logo-waves" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={TEAL} />
          <stop offset="100%" stopColor={TEAL_LIGHT} />
        </linearGradient>
        <clipPath id="logo-circle-clip">
          <circle cx="40" cy="40" r="35" />
        </clipPath>
      </defs>

      {/* Círculo: borda creme e fundo céu/água/areia */}
      <circle cx="40" cy="40" r="36" fill="url(#logo-bg)" />
      <circle cx="40" cy="40" r="36" fill="none" stroke={CREAM_BORDER} strokeWidth="1.8" />

      {/* Sol - canto superior direito */}
      <circle cx="60" cy="18" r="6" fill={SUN} />

      {/* Bicicleta (vista lateral, fat bike - rodas grossas) */}
      <g stroke={TEAL} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Rodas */}
        <circle cx="28" cy="40" r="10" />
        <circle cx="52" cy="40" r="10" />
        {/* Quadro: tubo do selim, tubo superior, tubo inferior, stays */}
        <path d="M28 40 L30 26 L46 24 L52 40" />
        <path d="M28 40 L36 42 L52 40" />
        <path d="M30 26 L28 40" />
        {/* Guidão */}
        <path d="M46 24 L46 18 M43 18 L49 18" />
        {/* Selim */}
        <path d="M30 26 L32 26" />
      </g>

      {/* Ondas - curvas suaves */}
      <path
        d="M14 54 C24 50 56 50 66 54"
        stroke="url(#logo-waves)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M12 60 C28 56 52 56 68 60"
        stroke="url(#logo-waves)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M16 66 C30 62 50 62 64 66"
        stroke="url(#logo-waves)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Faixa de areia na base do círculo */}
      <path
        d="M8 70 Q40 72 72 70 L72 76 L8 76 Z"
        fill={SAND}
        clipPath="url(#logo-circle-clip)"
      />

      {/* Texto BeachBike */}
      <text
        x="40"
        y="92"
        textAnchor="middle"
        fill={TEAL}
        fontFamily="Nunito, Quicksand, sans-serif"
        fontWeight="800"
        fontSize="13"
        letterSpacing="0.5"
      >
        BeachBike
      </text>
    </svg>
  )
}

export default LogoBeachBike
