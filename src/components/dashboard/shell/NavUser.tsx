'use client';

import { BadgeCheck, ChevronsUpDown, LogOut, Settings } from 'lucide-react';
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

function UserIdentityRow({ user }: { user: UserIdentity }) {
  return (
    <>
      <UserAvatar
        name={user.name}
        email={user.email}
        image={user.image}
        className="h-8 w-8 rounded-lg ring-1 ring-sidebar-border"
        fallbackClassName="rounded-lg"
      />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium text-sidebar-foreground">{user.name}</span>
        <span className="truncate text-xs text-sidebar-foreground/50">{user.email}</span>
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
              className="h-12 gap-2.5 rounded-lg border border-sidebar-border/70 bg-sidebar-accent/35 px-2.5 hover:border-sidebar-primary/25 hover:bg-sidebar-accent/70 data-[state=open]:border-sidebar-primary/30 data-[state=open]:bg-sidebar-primary/10 data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:bg-transparent"
            >
              <UserIdentityRow user={user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserIdentityRow user={user} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
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
