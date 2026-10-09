'use client';

import { useSocialLinks } from '@/hooks/useSocialLinks';

export default function FooterSocialLinks() {
  const socialLinks = useSocialLinks();
  if (socialLinks.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {socialLinks.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          className="w-11 h-11 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-all duration-300 border border-indigo-500/20 hover:border-indigo-500/30 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit us on ${label}`}
          title={label}
        >
          {icon ? (
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              width={18}
              height={18}
              fill="currentColor"
            >
              <path d={icon.path} />
            </svg>
          ) : (
            <span
              aria-hidden
              className="text-xs font-bold"
            >
              in
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
