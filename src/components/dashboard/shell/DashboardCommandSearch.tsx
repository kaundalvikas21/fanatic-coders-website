'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { getAccessibleDashboardRouteGroups } from '@/components/dashboard/shell/nav-utils';
import { ActionDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type DashboardCommandSearchProps = {
  role?: string | null;
};

export function DashboardCommandSearch({ role }: DashboardCommandSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const groups = useMemo(() => getAccessibleDashboardRouteGroups(role), [role]);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items
        .filter((item) => !item.comingSoon)
        .flatMap((item) => [
          {
            title: item.title,
            url: item.url,
            icon: item.icon,
            searchText: `${group.label} ${item.title}`.toLowerCase(),
          },
          ...(item.subItems ?? []).map((subItem) => ({
            title: subItem.title,
            url: subItem.url,
            icon: item.icon,
            searchText: `${group.label} ${item.title} ${subItem.title}`.toLowerCase(),
          })),
        ])
        .filter((item) => !normalizedQuery || item.searchText.includes(normalizedQuery)),
    }))
    .filter((group) => group.items.length > 0);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) setQuery('');
  }

  return (
    <ActionDialog
      title="Search dashboard"
      description="Open a page available for your account."
      open={open}
      onOpenChange={handleOpenChange}
      contentClassName="top-[18%] max-h-[min(32rem,calc(100svh-2rem))] translate-y-0 overflow-hidden sm:max-w-xl"
      trigger={
        <Button
          type="button"
          variant="ghost"
          className="h-9 min-w-9 flex-1 justify-start gap-2 px-2 text-muted-foreground sm:max-w-sm sm:border sm:border-border/70 sm:bg-muted/30 sm:px-3 sm:hover:bg-muted/60"
          aria-label="Search dashboard. Command or Control K"
        >
          <Search className="size-4" />
          <span className="hidden truncate text-sm sm:inline">Search dashboard…</span>
          <kbd className="ml-auto hidden rounded border border-border/70 bg-background/70 px-1.5 py-0.5 font-mono text-[0.625rem] font-medium text-muted-foreground sm:inline-flex">
            ⌘K
          </kbd>
        </Button>
      }
    >
      <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-muted/30 px-3">
        <Search
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search pages…"
          aria-label="Search dashboard pages"
          className="h-10 border-0 bg-transparent px-0 text-sm focus-visible:ring-0 dark:bg-transparent"
        />
        <kbd className="rounded border border-border/70 px-1.5 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
          ESC
        </kbd>
      </div>

      <div className="-mx-2 -mb-2 max-h-[min(24rem,60svh)] overflow-y-auto p-2">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <section
              key={group.label}
              aria-labelledby={`command-group-${group.label}`}
              className="py-1"
            >
              <h3
                id={`command-group-${group.label}`}
                className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {group.label}
              </h3>
              <div className="grid gap-0.5">
                {group.items.map((item) => (
                  <Link
                    key={`${item.url}:${item.title}`}
                    href={item.url}
                    className="flex min-h-10 items-center gap-3 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate">{item.title}</span>
                    <span className="text-xs text-muted-foreground">Open</span>
                  </Link>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="px-4 py-10 text-center">
            <p className="text-sm font-medium">No pages found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search term.</p>
          </div>
        )}
      </div>
    </ActionDialog>
  );
}
