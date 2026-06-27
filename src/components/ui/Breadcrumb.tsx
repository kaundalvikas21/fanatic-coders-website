import Link from 'next/link';
import { Fragment } from 'react';

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Code-styled breadcrumb. Renders a path-like trail (home / section / current)
 * in mono, matching the terminal motif. The last crumb is the current page.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-xs font-mono font-semibold uppercase tracking-[0.18em]"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li>
                {item.href && !last ? (
                  <Link
                    href={item.href}
                    className="text-indigo-300 transition-colors hover:text-white no-underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={last ? 'text-white' : 'text-blue-100/70'}
                    aria-current={last ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!last && (
                <li
                  aria-hidden
                  className="text-indigo-400/50"
                >
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
