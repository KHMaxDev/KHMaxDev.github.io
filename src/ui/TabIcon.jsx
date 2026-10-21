const ICONS = {
  knowledge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3.2" />
      <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(-30 12 12)" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19 9 8l4 6 3-4 4 9z" strokeLinejoin="round" />
      <circle cx="9" cy="4.8" r="1.3" />
      <circle cx="18" cy="7" r="1.1" />
    </svg>
  ),
  traits: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3c1.8 3 3.4 4.6 3.4 7.4A3.4 3.4 0 0 1 12 14a3.4 3.4 0 0 1-3.4-3.6C8.6 7.6 10.2 6 12 3z" />
      <path d="M12 14v7M8 21h8" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.6v.2" strokeLinecap="round" />
    </svg>
  ),
};

export default function TabIcon({ id }) {
  return ICONS[id] ?? ICONS.info;
}
