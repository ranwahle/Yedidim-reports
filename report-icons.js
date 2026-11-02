// Yedidim icon set v2 — outlined illustrations with soft fills, matching brand reference

function IconFunnel({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M10 14 L54 14 L40 34 L40 52 a4 4 0 0 1 -4 4 L28 56 a4 4 0 0 1 -4 -4 L24 34 Z"
        fill="#f59e0b"
        stroke="#1e1e1e"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 18 L50 18"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".5"
      />
      <rect x="26" y="44" width="12" height="2" fill="#1e1e1e" opacity=".3" />
    </svg>
  );
}
function IconJerryCan({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Can body */}
      <rect
        x="18"
        y="18"
        width="28"
        height="38"
        rx="3"
        fill="#cbd5e1"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      {/* Cap */}
      <rect
        x="26"
        y="10"
        width="12"
        height="10"
        rx="2"
        fill="#dc2626"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <rect
        x="29"
        y="6"
        width="6"
        height="6"
        rx="1"
        fill="#7f1d1d"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      {/* Vertical ribs */}
      <line
        x1="26"
        y1="24"
        x2="26"
        y2="50"
        stroke="#1e1e1e"
        strokeWidth="1.8"
        opacity=".7"
      />
      <line
        x1="38"
        y1="24"
        x2="38"
        y2="50"
        stroke="#1e1e1e"
        strokeWidth="1.8"
        opacity=".7"
      />
      {/* Side handle */}
      <path
        d="M46 26 Q52 26 52 32 Q52 38 46 38"
        fill="none"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      {/* Label */}
      <rect
        x="28"
        y="32"
        width="8"
        height="10"
        rx="1"
        fill="#dc2626"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function IconMechanic({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Hard hat */}
      <path
        d="M18 22 a14 12 0 0 1 28 0 L46 24 L18 24 Z"
        fill="#3b82f6"
        stroke="#1e1e1e"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect
        x="14"
        y="22"
        width="36"
        height="4"
        rx="1"
        fill="#fbbf24"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      <rect
        x="30"
        y="12"
        width="4"
        height="6"
        fill="#fbbf24"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
      {/* Face */}
      <path
        d="M22 26 L22 36 a10 10 0 0 0 20 0 L42 26 Z"
        fill="#fde68a"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <circle cx="27" cy="32" r="1.4" fill="#1e1e1e" />
      <circle cx="37" cy="32" r="1.4" fill="#1e1e1e" />
      <path
        d="M28 38 Q32 40 36 38"
        stroke="#1e1e1e"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Body / overalls */}
      <path
        d="M14 56 L14 50 a8 8 0 0 1 5 -7 L26 42 L26 46 a6 6 0 0 0 12 0 L38 42 L45 43 a8 8 0 0 1 5 7 L50 56 Z"
        fill="#3b82f6"
        stroke="#1e1e1e"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Wrench in hand */}
      <path
        d="M10 50 L16 50 L18 52 L18 56 L14 58 L8 54 Z"
        fill="#9ca3af"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
    </svg>
  );
}
function IconJumperCables({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Right clamp (red) */}
      <g transform="rotate(20 44 18)">
        <rect
          x="36"
          y="10"
          width="16"
          height="12"
          rx="2"
          fill="#ef4444"
          stroke="#1e1e1e"
          strokeWidth="2"
        />
        <path
          d="M40 22 L40 28 M48 22 L48 28"
          stroke="#1e1e1e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="38" y="14" width="12" height="3" fill="#1e1e1e" />
      </g>
      {/* Left clamp (blue) */}
      <g transform="rotate(-20 20 18)">
        <rect
          x="12"
          y="10"
          width="16"
          height="12"
          rx="2"
          fill="#3b82f6"
          stroke="#1e1e1e"
          strokeWidth="2"
        />
        <path
          d="M16 22 L16 28 M24 22 L24 28"
          stroke="#1e1e1e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="14" y="14" width="12" height="3" fill="#1e1e1e" />
      </g>
      {/* Cables */}
      <path
        d="M22 28 Q22 44 32 50"
        stroke="#3b82f6"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M42 28 Q42 44 32 50"
        stroke="#ef4444"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="32" cy="52" r="3" fill="#1e1e1e" />
    </svg>
  );
}
function IconFlatTire({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Squashed tire ellipse */}
      <ellipse
        cx="32"
        cy="38"
        rx="24"
        ry="18"
        fill="#475569"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <ellipse
        cx="32"
        cy="38"
        rx="13"
        ry="10"
        fill="#cbd5e1"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <circle cx="32" cy="38" r="3" fill="#1e1e1e" />
      {/* Spokes */}
      <path
        d="M32 30 L32 36 M32 40 L32 46 M22 38 L29 38 M35 38 L42 38"
        stroke="#1e1e1e"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Air swooshes */}
      <path
        d="M52 14 L48 18 M58 18 L52 22 M56 26 L50 26"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconWarningTriangle({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Outer triangle */}
      <path
        d="M32 8 L58 52 L6 52 Z"
        fill="#dc2626"
        stroke="#1e1e1e"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Inner triangle */}
      <path
        d="M32 18 L50 48 L14 48 Z"
        fill="#fbbf24"
        stroke="#1e1e1e"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Exclamation */}
      <rect x="30" y="26" width="4" height="12" rx="1" fill="#1e1e1e" />
      <circle cx="32" cy="42" r="2" fill="#1e1e1e" />
      {/* Stand */}
      <rect x="22" y="52" width="20" height="4" rx="1" fill="#1e1e1e" />
    </svg>
  );
}
function IconKeyFob({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Key blade */}
      <rect
        x="22"
        y="6"
        width="6"
        height="22"
        fill="#9ca3af"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      <rect x="20" y="10" width="4" height="3" fill="#1e1e1e" />
      <rect x="20" y="16" width="4" height="3" fill="#1e1e1e" />
      {/* Fob body */}
      <rect
        x="18"
        y="26"
        width="20"
        height="32"
        rx="4"
        fill="#374151"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      {/* Buttons */}
      <rect
        x="22"
        y="32"
        width="12"
        height="6"
        rx="2"
        fill="#22c55e"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
      <rect
        x="22"
        y="42"
        width="12"
        height="6"
        rx="2"
        fill="#ef4444"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
      <rect
        x="22"
        y="52"
        width="12"
        height="3"
        rx="1"
        fill="#fbbf24"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
      {/* Signal waves */}
      <path
        d="M44 12 a8 8 0 0 1 0 14"
        stroke="#3b82f6"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M48 8 a14 14 0 0 1 0 22"
        stroke="#3b82f6"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  );
}
function IconToolbox({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Handle */}
      <path
        d="M22 18 L22 14 a4 4 0 0 1 4 -4 L38 10 a4 4 0 0 1 4 4 L42 18"
        fill="none"
        stroke="#1e1e1e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Box body */}
      <rect
        x="8"
        y="22"
        width="48"
        height="32"
        rx="3"
        fill="#f59e0b"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      {/* Lid line */}
      <line x1="8" y1="32" x2="56" y2="32" stroke="#1e1e1e" strokeWidth="2" />
      {/* Latch */}
      <rect
        x="28"
        y="28"
        width="8"
        height="8"
        rx="1"
        fill="#dc2626"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      {/* Tool peeks - wrench + screwdriver */}
      <path
        d="M16 42 L20 42 L20 50 L16 50 Z M14 40 L22 40 L22 44 L14 44 Z"
        fill="#cbd5e1"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
      <rect
        x="40"
        y="40"
        width="3"
        height="12"
        fill="#3b82f6"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
      <rect
        x="38"
        y="38"
        width="7"
        height="4"
        rx="1"
        fill="#fef3c7"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function IconWarBadge({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Sky background circle */}
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="#bae6fd"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      {/* Burst rays */}
      <g stroke="#1e1e1e" strokeWidth="1.5" strokeLinecap="round">
        <line x1="32" y1="10" x2="32" y2="18" />
        <line x1="20" y1="14" x2="24" y2="20" />
        <line x1="44" y1="14" x2="40" y2="20" />
      </g>
      {/* Jet */}
      <path
        d="M14 28 L26 26 L34 22 L44 24 L48 26 L48 30 L44 32 L34 32 L26 34 L14 32 Z"
        fill="#374151"
        stroke="#1e1e1e"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M30 22 L34 18 L36 22 Z"
        fill="#374151"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
      {/* Clouds */}
      <ellipse
        cx="18"
        cy="44"
        rx="8"
        ry="3"
        fill="#fff"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
      <ellipse
        cx="44"
        cy="46"
        rx="9"
        ry="3"
        fill="#fff"
        stroke="#1e1e1e"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* Existing icons kept for backward compat */

function IconJumpStart({ size = 28 }) {
  return <IconJumperCables size={size} />;
}
function IconTire({ size = 28 }) {
  return <IconFlatTire size={size} />;
}
function IconLockedCar({ size = 28 }) {
  return <IconKeyFob size={size} />;
}
function IconFuel({ size = 28 }) {
  return <IconJerryCan size={size} />;
}
function IconWaterOil({ size = 28 }) {
  return <IconFunnel size={size} />;
}
function IconClipboard({ size = 28 }) {
  return <IconToolbox size={size} />;
}
function IconSiren({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <g stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
        <line x1="32" y1="4" x2="32" y2="10" />
        <line x1="14" y1="14" x2="18" y2="18" />
        <line x1="50" y1="14" x2="46" y2="18" />
        <line x1="8" y1="28" x2="14" y2="28" />
        <line x1="56" y1="28" x2="50" y2="28" />
      </g>
      <ellipse
        cx="32"
        cy="34"
        rx="18"
        ry="8"
        fill="#ef4444"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <path
        d="M14 34 L14 44 a18 8 0 0 0 36 0 L50 34"
        fill="#dc2626"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <path
        d="M22 30 a10 10 0 0 1 20 0"
        fill="#fca5a5"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      <rect x="20" y="48" width="24" height="6" rx="1" fill="#1e1e1e" />
      <rect x="14" y="52" width="36" height="4" rx="1" fill="#374151" />
    </svg>
  );
}
function IconPeople({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle
        cx="32"
        cy="20"
        r="7"
        fill="#1e4d8b"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <path
        d="M20 46 a12 12 0 0 1 24 0 L44 52 L20 52 Z"
        fill="#1e4d8b"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <circle
        cx="14"
        cy="24"
        r="5"
        fill="#3b82f6"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      <path
        d="M5 46 a9 9 0 0 1 13 -8 L18 52 L8 52 Z"
        fill="#3b82f6"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      <circle
        cx="50"
        cy="24"
        r="5"
        fill="#3b82f6"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      <path
        d="M59 46 a9 9 0 0 0 -13 -8 L46 52 L56 52 Z"
        fill="#3b82f6"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
    </svg>
  );
}
function IconTrophy({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M18 10 L46 10 L46 28 a14 14 0 0 1 -28 0 Z"
        fill="#fbbf24"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <path
        d="M18 14 L10 14 a4 4 0 0 0 -4 4 L6 22 a6 6 0 0 0 6 6 L18 28"
        fill="none"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <path
        d="M46 14 L54 14 a4 4 0 0 1 4 4 L58 22 a6 6 0 0 1 -6 6 L46 28"
        fill="none"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <rect
        x="28"
        y="42"
        width="8"
        height="6"
        fill="#d97706"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      <path
        d="M20 48 L44 48 L46 56 L18 56 Z"
        fill="#d97706"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <path
        d="M32 16 L34 21 L39 21 L35 24 L36.5 29 L32 26 L27.5 29 L29 24 L25 21 L30 21 Z"
        fill="#fef3c7"
        stroke="#1e1e1e"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconMegaphone({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M10 26 L10 38 L20 38 L42 50 L42 14 L20 26 Z"
        fill="#f59e0b"
        stroke="#1e1e1e"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M42 22 a8 8 0 0 1 0 20"
        fill="none"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <path
        d="M48 18 a14 14 0 0 1 0 28"
        fill="none"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="38"
        width="6"
        height="14"
        rx="2"
        fill="#d97706"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
    </svg>
  );
}
function IconCalendar({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect
        x="8"
        y="14"
        width="48"
        height="42"
        rx="4"
        fill="#fff"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <rect
        x="8"
        y="14"
        width="48"
        height="12"
        rx="4"
        fill="#1e4d8b"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <rect
        x="16"
        y="8"
        width="6"
        height="12"
        rx="1.5"
        fill="#374151"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      <rect
        x="42"
        y="8"
        width="6"
        height="12"
        rx="1.5"
        fill="#374151"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
      <circle cx="20" cy="36" r="2.5" fill="#f59e0b" />
      <circle cx="32" cy="36" r="2.5" fill="#1e4d8b" />
      <circle cx="44" cy="36" r="2.5" fill="#1e4d8b" />
      <circle cx="20" cy="46" r="2.5" fill="#1e4d8b" />
      <circle cx="32" cy="46" r="2.5" fill="#1e4d8b" />
      <circle cx="44" cy="46" r="2.5" fill="#1e4d8b" />
    </svg>
  );
}
function IconPin({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 6 a18 18 0 0 1 18 18 c0 14 -18 34 -18 34 s-18 -20 -18 -34 a18 18 0 0 1 18 -18 Z"
        fill="#64748b"
        stroke="#1e1e1e"
        strokeWidth="2.5"
      />
      <circle
        cx="32"
        cy="24"
        r="7"
        fill="#fff"
        stroke="#1e1e1e"
        strokeWidth="2"
      />
    </svg>
  );
}

// Registry: id → component + label + default color
const ICON_REGISTRY = {
  // New named set (preferred)
  funnel: {
    C: IconFunnel,
    label: "שאיבה",
    color: "#f59e0b",
  },
  jerrycan: {
    C: IconJerryCan,
    label: "ג'ריקן/דלק",
    color: "#dc2626",
  },
  mechanic: {
    C: IconMechanic,
    label: "ביגוד",
    color: "#3b82f6",
  },
  cables: {
    C: IconJumperCables,
    label: "הנעה",
    color: "#ef4444",
  },
  flattire: {
    C: IconFlatTire,
    label: "פנצ'ר",
    color: "#475569",
  },
  warning: {
    C: IconWarningTriangle,
    label: "בטיחות",
    color: "#dc2626",
  },
  keyfob: {
    C: IconKeyFob,
    label: "פתיחה",
    color: "#374151",
  },
  toolbox: {
    C: IconToolbox,
    label: "כללי",
    color: "#f59e0b",
  },
  warbadge: {
    C: IconWarBadge,
    label: "זמן לוחמה",
    color: "#0284c7",
  },
  // Legacy/extra
  jumpstart: {
    C: IconJumperCables,
    label: "התנעה",
    color: "#ef4444",
  },
  tire: {
    C: IconFlatTire,
    label: "פנצ'ר",
    color: "#475569",
  },
  lockedcar: {
    C: IconKeyFob,
    label: "רכב נעול",
    color: "#374151",
  },
  fuel: {
    C: IconJerryCan,
    label: "דלק",
    color: "#dc2626",
  },
  wateroil: {
    C: IconFunnel,
    label: "שאיבה",
    color: "#f59e0b",
  },
  clipboard: {
    C: IconToolbox,
    label: "אחר",
    color: "#f59e0b",
  },
  siren: {
    C: IconSiren,
    label: "חירום",
    color: "#ef4444",
  },
  people: {
    C: IconPeople,
    label: "מתנדבים",
    color: "#1e4d8b",
  },
  trophy: {
    C: IconTrophy,
    label: "מצטיין",
    color: "#d97706",
  },
  megaphone: {
    C: IconMegaphone,
    label: "הודעה",
    color: "#f59e0b",
  },
  calendar: {
    C: IconCalendar,
    label: "תאריך",
    color: "#1e4d8b",
  },
  pin: {
    C: IconPin,
    label: "נעץ",
    color: "#64748b",
  },
};

// Migration: old emoji values → new icon ids
const EMOJI_TO_ID = {
  "🔋": "cables",
  "🛞": "flattire",
  "🔑": "keyfob",
  "⛽": "jerrycan",
  "💧": "funnel",
  "📋": "toolbox",
  "🚨": "siren",
  "👥": "people",
  "🏆": "trophy",
  "📢": "megaphone",
  "📣": "megaphone",
  "📅": "calendar",
  "📌": "pin",
  "⚠️": "warning",
  "🔧": "mechanic",
};
function resolveIconId(id) {
  if (ICON_REGISTRY[id]) return id;
  if (EMOJI_TO_ID[id]) return EMOJI_TO_ID[id];
  return null;
}
function YIcon({ id, size }) {
  const resolved = resolveIconId(id);
  if (!resolved)
    return (
      <span
        style={{
          fontSize: size || 22,
        }}
      >
        {id}
      </span>
    );
  const IconComponent = ICON_REGISTRY[resolved].C;
  return <IconComponent size={size} />;
}

// Order shown in picker — new set first, then extras
const PICKER_ORDER = [
  "funnel",
  "jerrycan",
  "mechanic",
  "cables",
  "flattire",
  "warning",
  "keyfob",
  "toolbox",
  "warbadge",
  "siren",
  "people",
  "trophy",
  "megaphone",
  "calendar",
  "pin",
];

// Picker for inline editing
function IconPicker({ value, onChange, size = 28 }) {
  const [open, setOpen] = useState(false);
  const elementRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target))
        setOpen(false);
    };
    setTimeout(() => document.addEventListener("mousedown", close), 0);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const resolved = resolveIconId(value) || value;
  return (
    <div
      ref={elementRef}
      style={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <button
        className="icon-picker-btn"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((option) => !option);
        }}
        style={{
          background: "transparent",
          border: 0,
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <YIcon id={resolved} size={size} />
      </button>
      {open && (
        <div
          className="no-export"
          style={{
            position: "absolute",
            top: "100%",
            insetInlineStart: 0,
            marginTop: 6,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: 10,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 4,
            boxShadow: "0 12px 30px -10px rgba(0,0,0,.25)",
            zIndex: 50,
            width: 240,
          }}
        >
          {PICKER_ORDER.map((iconId) => {
            const iconDefinition = ICON_REGISTRY[iconId];
            return (
              <button
                key={iconId}
                onClick={(event) => {
                  event.stopPropagation();
                  onChange(iconId);
                  setOpen(false);
                }}
                title={iconDefinition.label}
                style={{
                  background:
                    resolved === iconId
                      ? "color-mix(in srgb, var(--primary) 14%, transparent)"
                      : "transparent",
                  border:
                    "1px solid " +
                    (resolved === iconId ? "var(--primary)" : "transparent"),
                  borderRadius: 8,
                  padding: 6,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <YIcon id={iconId} size={28} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
Object.assign(window, {
  YIcon,
  IconPicker,
  ICON_REGISTRY,
});
