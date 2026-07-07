import type { ApiResponse, Response } from './api';

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
};

export type InviteMemberResponse = Response<Invitation> | ApiResponse;
