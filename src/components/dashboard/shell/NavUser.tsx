'use client';

import { useRouter } from 'next/navigation';
import { BadgeCheck, ChevronsUpDown, LogOut, Settings } from 'lucide-react';
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
import { authClient, useSession } from '@/lib/auth/client';
import { clearFrontendBearerToken } from '@/lib/auth/token-client';

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
        className="h-8 w-8 rounded-lg"
        fallbackClassName="rounded-lg"
      />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </>
  );
}

export function NavUser() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isMobile } = useSidebar();
  const user = getUserIdentity(session?.user);

  async function handleSignOut() {
    await authClient.signOut().finally(clearFrontendBearerToken);
    router.replace('/login');
    router.refresh();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
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
              <DropdownMenuItem>
                <Settings />
                Settings
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
