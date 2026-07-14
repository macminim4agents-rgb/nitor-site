import type { IconName } from "@/content/ro";

/**
 * Iconografie proprie — desenată pe grilă 24×24, stroke 1.5, doar linii.
 * Fără biblioteci externe, fără clipart: aceeași familie vizuală peste tot.
 */

type P = { size?: number; className?: string };

function Svg({
  size = 26,
  className,
  children,
  filled = false,
}: P & { children: React.ReactNode; filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/**
 * Semnul casei — cercul închis de coardă.
 *
 * Arcul (300°) = lucrarea pe care o ducem noi până la capăt. Coarda în alamă
 * care îi închide deschiderea = aprobarea omului: ultimul segment, fără care
 * cercul nu e cerc. „Pregătim noi. Aprobați dumneavoastră." — literal.
 *
 * Deliberat NU seamănă cu o literă: cuvântul începe cu Q, iar un semn în formă
 * de Q lângă el s-ar bâlbâi. Geometria e replicată în `scripts/gen-assets.mjs`
 * (`markGeometry`) — dacă se schimbă aici, se schimbă și acolo.
 * Puncte: 18° și 78° pe cercul r=7.3 centrat în (12,12).
 */
export function Mark({ size = 18, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M13.52 19.14 A7.3 7.3 0 1 1 18.94 14.26"
        stroke="currentColor"
        strokeWidth="2.15"
        strokeLinecap="round"
      />
      <path
        d="M18.94 14.26 L13.52 19.14"
        stroke="var(--brass)"
        strokeWidth="2.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconCheck({ size = 16, className }: P) {
  return (
    <Svg size={size} className={className}>
      <path d="M4.5 12.5l4.6 4.6L19.5 6.8" />
    </Svg>
  );
}

export function IconArrow({ size = 16, className }: P) {
  return (
    <Svg size={size} className={className}>
      <path d="M4.5 12h15" />
      <path d="M13.5 6l6 6-6 6" />
    </Svg>
  );
}

export function IconPlus({ size = 20, className }: P) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 5.5v13" />
      <path d="M5.5 12h13" />
    </Svg>
  );
}

export function IconWhatsApp({ size = 26, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.1.6 4.1 1.6 5.9L4 29l8.4-1.6c1.7.9 3.6 1.4 5.6 1.4 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.3l-.4-.2-5 1 1-4.8-.3-.4c-1-1.6-1.5-3.4-1.5-5.2 0-5.5 4.5-9.9 10.1-9.9s10.1 4.4 10.1 9.9-4.5 9.9-10 9.9zm5.5-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.5-.4z" />
    </svg>
  );
}

const icons: Record<IconName, React.ReactNode> = {
  site: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18" />
      <path d="M6 6.8h.01M8.4 6.8h.01" />
      <path d="M6.5 13h6" />
      <path d="M6.5 16h4" />
    </>
  ),
  seo: (
    <>
      <circle cx="10.5" cy="10.5" r="6.75" />
      <path d="M15.5 15.5 21 21" />
      <path d="M7.4 12.6l2.3-2.5 1.6 1.5 2.6-3" />
    </>
  ),
  continut: (
    <>
      <path d="M6 3.5h9.5L19 7v13.5H6z" />
      <path d="M15 3.5V7.5h4" />
      <path d="M9 12h7" />
      <path d="M9 15.5h7" />
      <path d="M9 8.5h3" />
    </>
  ),
  social: (
    <>
      <path d="M4 5.5h13a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4H4A1.5 1.5 0 0 1 2.5 14V7A1.5 1.5 0 0 1 4 5.5z" />
      <path d="M7 10.5h.01M10.5 10.5h.01M14 10.5h.01" />
      <path d="M21.5 9v7.2a1.3 1.3 0 0 1-1.3 1.3H19" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M10.2 9.2l4.8 2.8-4.8 2.8z" />
    </>
  ),
  automatizari: (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20.2 3.6v4.2H16" />
      <path d="M12 9v3.2l2.4 1.6" />
    </>
  ),
  chatbot: (
    <>
      <rect x="4" y="6.5" width="16" height="11" rx="3" />
      <path d="M12 3.5v3" />
      <circle cx="12" cy="2.8" r="0.9" />
      <path d="M9 11.5h.01M15 11.5h.01" />
      <path d="M9.5 14.4c.7.6 1.5.9 2.5.9s1.8-.3 2.5-.9" />
      <path d="M4 20.5h16" opacity="0" />
    </>
  ),
  programari: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4" />
      <path d="M3 9.5h18" />
      <path d="M8.6 15l2.3 2.3 4.5-4.6" />
    </>
  ),
};

export function ServiceIcon({ name, size = 28, className }: P & { name: IconName }) {
  return (
    <Svg size={size} className={className}>
      {icons[name]}
    </Svg>
  );
}
