function Facebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.1 1.5-4.1 4.3v2.5H7.4V14h2.8v8h3.3z" />
    </svg>
  );
}
function Instagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Tripadvisor() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="7.5" cy="13.5" r="3.5" />
      <circle cx="16.5" cy="13.5" r="3.5" />
      <circle cx="7.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
      <path d="M2 10h4M18 10h4M12 8c-2.5 0-4.5 1-4.5 1M12 8c2.5 0 4.5 1 4.5 1M12 8V6" />
      <path d="M12 16l-1.5 2h3L12 16z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Tripadvisor", href: "https://tripadvisor.com", Icon: Tripadvisor },
];

export function SocialLinks() {
  return (
    <>
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="ring-gold-hover grid h-10 w-10 place-items-center rounded-full text-ivory/80"
        >
          <Icon />
        </a>
      ))}
    </>
  );
}
