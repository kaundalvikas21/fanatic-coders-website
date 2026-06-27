'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * Article code block using the project's terminal chrome (`.code-window` /
 * `.code-titlebar` / `.svc-dot-*`). Traffic-light dots, an optional language
 * label, and a copy button. Mono body via the `font-mono` utility.
 */
export function CodeBlock({ lang, code }: { lang?: string; code: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard
      ?.writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  }

  return (
    <div className="code-window">
      <span className="sr-only">Code sample{lang ? `, ${lang}` : ''}</span>
      <div className="code-titlebar">
        <span
          className="svc-dot svc-dot-r"
          aria-hidden
        />
        <span
          className="svc-dot svc-dot-y"
          aria-hidden
        />
        <span
          className="svc-dot svc-dot-g"
          aria-hidden
        />
        {lang && <span className="ml-2 font-mono text-[11px] text-blue-100/55">{lang}</span>}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Code copied' : 'Copy code'}
          className="ml-auto flex items-center gap-1 p-1.5 -m-1.5 font-mono text-[11px] text-blue-100/55 transition-colors hover:text-white"
        >
          {copied ? (
            <Check
              size={13}
              aria-hidden
            />
          ) : (
            <Copy
              size={13}
              aria-hidden
            />
          )}
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] max-sm:text-sm leading-relaxed text-blue-100/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
