'use client';

import { ChevronsUpDown, LogOut, Settings, UserRound } from 'lucide-react';
import Link from 'next/link';
import { UserAvatar } from '@/components/shared/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth/client';
import { clearFrontendBearerToken } from '@/lib/auth/token-client';
import { useAuth } from '@/providers/AuthProvider';
import { useClient } from '@/hooks/useClient';

type UserIdentity = {
  name: string;
  email: string;
  image?: string;
};

function getUserIdentity(
  user:
    | {
        name?: string | null;
        email?: string | null;
        image?: string | null;
      }
    | null
    | undefined,
): UserIdentity {
  return {
    name: user?.name || 'Signed in',
    email: user?.email || '',
    image: user?.image ?? undefined,
  };
}

function UserIdentityRow({
  user,
  context = 'sidebar',
}: {
  user: UserIdentity;
  context?: 'sidebar' | 'popover';
}) {
  const isPopover = context === 'popover';

  return (
    <>
      <UserAvatar
        name={user.name}
        email={user.email}
        image={user.image}
        className={`h-8 w-8 rounded-lg ring-1 ${isPopover ? 'ring-border' : 'ring-sidebar-border'}`}
        fallbackClassName="rounded-lg"
      />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span
          className={`truncate font-medium ${isPopover ? 'text-popover-foreground' : 'text-sidebar-foreground'}`}
        >
          {user.name}
        </span>
        <span
          className={`truncate text-xs ${isPopover ? 'text-muted-foreground' : 'text-sidebar-foreground/60'}`}
        >
          {user.email}
        </span>
      </div>
    </>
  );
}

export function NavUser() {
  const { session } = useAuth();
  const { isMobile } = useSidebar();
  const isClient = useClient();
  const user = getUserIdentity(isClient ? session?.user : undefined);

  async function handleSignOut() {
    await authClient.signOut().finally(clearFrontendBearerToken);
    window.location.replace('/login');
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-12 cursor-pointer gap-2.5 rounded-lg border border-sidebar-border/70 bg-sidebar-accent/35 px-2.5 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-px hover:border-sidebar-primary/25 hover:bg-sidebar-accent/70 data-[state=open]:translate-y-0 data-[state=open]:border-sidebar-primary/30 data-[state=open]:bg-sidebar-primary/10 data-[state=open]:text-sidebar-accent-foreground motion-reduce:transform-none group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:bg-transparent"
            >
              <UserIdentityRow user={user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-lg shadow-background/20 ring-0"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal text-popover-foreground">
              <div className="flex items-center gap-2.5 px-2 py-2 text-left text-sm">
                <UserIdentityRow
                  user={user}
                  context="popover"
                />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1.5" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="cursor-pointer gap-2.5 px-2 py-2 transition-colors focus:bg-accent focus:text-accent-foreground"
              >
                <Link href="/dashboard/settings/profile">
                  <UserRound />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer gap-2.5 px-2 py-2 transition-colors focus:bg-accent focus:text-accent-foreground"
              >
                <Link href="/dashboard/settings">
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer gap-2.5 px-2 py-2 transition-colors"
              onSelect={handleSignOut}
            >
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
