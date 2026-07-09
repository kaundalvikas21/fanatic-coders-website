import type { ApiResponse, Response } from './api';
import type { authServerClient } from '@/lib/auth/server-client';

export type InviteMemberRole = 'CLIENT' | 'MANAGER' | 'MEMBER';

export type InviteMemberRequest = {
  email: string;
  role: InviteMemberRole;
  resend?: boolean;
};

export type Invitation = {
  id: string;
  email: string;
  role: string;
  organizationId: string;
  inviterId: string;
  status: string;
  expiresAt: string;
  createdAt?: string;
  teamId?: string;
};

export type InviteMemberResponse = Response<Invitation> | ApiResponse;

export type InvitationListResponse = Awaited<
  ReturnType<typeof authServerClient.organization.listInvitations>
>;

export type InvitationListItem = NonNullable<InvitationListResponse['data']>[number];

export type InvitationsData = {
  invitations: InvitationListItem[];
  total: number;
};

export type GetInvitationsResponse = Response<InvitationsData>;
