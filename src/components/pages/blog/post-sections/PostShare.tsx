'use client';

import { useState, useSyncExternalStore } from 'react';
import { Link2, Check, Share2 } from 'lucide-react';

const noopSubscribe = () => () => {};

// Monochrome brand glyphs (currentColor) so they read on the dark surface.
// X + Reddit paths from simple-icons; LinkedIn is not in the package, so its
// path is inlined here.
const BRAND_PATH = {
  x: 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  reddit:
    'M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z',
} as const;

function BrandIcon({ path, color }: { path: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      style={color ? { color } : undefined}
      aria-hidden
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}

// On the dark surface: LinkedIn/Reddit use their brand color; X's brand black
// would vanish, so it renders white (its real on-dark presentation).
const BRAND_COLOR = { x: '#ffffff', linkedin: '#0A66C2', reddit: '#FF4500' } as const;

const ICON_BTN =
  'inline-flex size-11 items-center justify-center rounded-xl bg-white/5 text-blue-100/70 ring-1 ring-white/10 transition-colors hover:bg-indigo-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60';

/**
 * End-of-article share row. Copy-link works everywhere (clipboard + confirm);
 * native share shows only where `navigator.share` exists (mobile); X / LinkedIn /
 * Reddit open the platform share intent. `useSyncExternalStore` returns false on
 * the server / first client render, so there is no hydration mismatch.
 */
export function PostShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const canShare = useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator !== 'undefined' && typeof navigator.share === 'function',
    () => false,
  );

  function copy() {
    navigator.clipboard
      ?.writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  }

  function share() {
    void navigator.share({ title, url: window.location.href });
  }

  function openIntent(kind: 'x' | 'linkedin' | 'reddit') {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    const intent = {
      x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      reddit: `https://www.reddit.com/submit?url=${url}&title=${text}`,
    }[kind];
    window.open(intent, '_blank', 'noopener,noreferrer');
  }

  return (
    <div>
      <span className="mb-2 block text-xs font-mono uppercase tracking-[0.12em] text-blue-100/45">
        share
      </span>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Link copied' : 'Copy link to this post'}
          className={ICON_BTN}
        >
          {copied ? (
            <Check
              size={16}
              aria-hidden
            />
          ) : (
            <Link2
              size={16}
              aria-hidden
            />
          )}
        </button>
        {canShare && (
          <button
            type="button"
            onClick={share}
            aria-label="Share this post"
            className={ICON_BTN}
          >
            <Share2
              size={16}
              aria-hidden
            />
          </button>
        )}
        <button
          type="button"
          onClick={() => openIntent('x')}
          aria-label="Share on X"
          className={ICON_BTN}
        >
          <BrandIcon
            path={BRAND_PATH.x}
            color={BRAND_COLOR.x}
          />
        </button>
        <button
          type="button"
          onClick={() => openIntent('linkedin')}
          aria-label="Share on LinkedIn"
          className={ICON_BTN}
        >
          <BrandIcon
            path={BRAND_PATH.linkedin}
            color={BRAND_COLOR.linkedin}
          />
        </button>
        <button
          type="button"
          onClick={() => openIntent('reddit')}
          aria-label="Share on Reddit"
          className={ICON_BTN}
        >
          <BrandIcon
            path={BRAND_PATH.reddit}
            color={BRAND_COLOR.reddit}
          />
        </button>
      </div>
    </div>
  );
}
