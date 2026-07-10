import 'server-only';

import { FCOP_ORGANIZATION_SLUG } from '@/lib/auth/organization';
import { authServerClient, getServerAuthFetchOptions } from '@/lib/auth/server-client';
import type { GetInvitationsResponse } from '@/types';
import { ApiResponse, HttpStatus } from '@/utils/api-response';

async function getFcopOrganizationId() {
  const result = await authServerClient.organization.list({
    fetchOptions: await getServerAuthFetchOptions(),
  });

  return result.data?.find((organization) => organization.slug === FCOP_ORGANIZATION_SLUG)?.id;
}

export async function getInvitations(): Promise<GetInvitationsResponse> {
  try {
    const organizationId = await getFcopOrganizationId();

    if (!organizationId) {
      return ApiResponse({
        success: false,
        status: HttpStatus.NOT_FOUND,
        message: 'FCOP organization was not found.',
        error: {
          code: 'ORGANIZATION_NOT_FOUND',
        },
      });
    }

    const result = await authServerClient.organization.listInvitations({
      query: {
        organizationId,
      },
      fetchOptions: await getServerAuthFetchOptions(),
    });

    if (result.error) {
      return ApiResponse({
        success: false,
        status: HttpStatus.BAD_REQUEST,
        message: result.error.message ?? 'Could not load invitations.',
        error: {
          code: result.error.code ?? 'INVITATIONS_QUERY_FAILED',
        },
      });
    }

    const invitations = result.data ?? [];

    return ApiResponse({
      success: true,
      status: HttpStatus.OK,
      message: 'Invitations loaded successfully.',
      data: {
        invitations,
        total: invitations.length,
      },
    });
  } catch {
    return ApiResponse({
      success: false,
      status: HttpStatus.INTERNAL_ERROR,
      message: 'Could not load invitations.',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
}
