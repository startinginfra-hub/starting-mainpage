// Small inline icons — stroke-based, no external deps
const Icon = ({ name, size = 18, stroke = 1.6, ...rest }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
    ...rest,
  };
  switch (name) {
    case "arrow-right":
      return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "check":
      return <svg {...props}><path d="M4 12.5l5 5L20 6.5"/></svg>;
    case "plus":
      return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "spark":
      return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>;
    case "target":
      return <svg {...props}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>;
    case "shield":
      return <svg {...props}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "doc":
      return <svg {...props}><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M9 13h7M9 17h5"/></svg>;
    case "users":
      return <svg {...props}><circle cx="9" cy="9" r="3.5"/><path d="M3 20c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5"/><circle cx="17" cy="8" r="2.5"/><path d="M21 18.5c0-2-1.7-4-4-4"/></svg>;
    case "bolt":
      return <svg {...props}><path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/></svg>;
    case "filter":
      return <svg {...props}><path d="M4 5h16l-6 8v6l-4-2v-4z"/></svg>;
    case "calendar":
      return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case "receipt":
      return <svg {...props}><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>;
    case "chart":
      return <svg {...props}><path d="M4 19V5M4 19h16"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/></svg>;
    case "search":
      return <svg {...props}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-3.5-3.5"/></svg>;
    case "inbox":
      return <svg {...props}><path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 2h6l1-2h5"/></svg>;
    case "settings":
      return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>;
    case "user":
      return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>;
    case "moon":
      return <svg {...props}><path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/></svg>;
    case "sun":
      return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>;
    case "menu":
      return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "chevron-down":
      return <svg {...props}><path d="M6 9l6 6 6-6"/></svg>;
    default: return null;
  }
};

window.Icon = Icon;
