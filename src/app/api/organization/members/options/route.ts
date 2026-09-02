import { NextResponse, type NextRequest } from 'next/server';
import { parseRoles, isOrganizationMemberRole } from '@/lib/auth/roles';
import { getUsers } from '@/lib/data/users/queries';
import type { OrganizationMemberOption, OrganizationMemberRole } from '@/types';
import { ApiResponse, HttpStatus } from '@/utils/api-response';

function parseRequestedRoles(request: NextRequest): OrganizationMemberRole[] | null {
  const roles = request.nextUrl.searchParams
    .get('roles')
    ?.split(',')
    .map((role) => role.trim().toUpperCase())
    .filter(Boolean);

  if (!roles) return [];
  if (!roles.every(isOrganizationMemberRole)) return null;

  return [...new Set(roles)];
}

export async function GET(request: NextRequest) {
  const requestedRoles = parseRequestedRoles(request);

  if (!requestedRoles) {
    return NextResponse.json(
      ApiResponse({
        success: false,
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid organization member role.',
        error: { code: 'INVALID_MEMBER_ROLE' },
      }),
      { status: HttpStatus.BAD_REQUEST },
    );
  }

  const response = await getUsers({
    limit: 100,
    sortBy: 'createdAt',
    sortDirection: 'asc',
  });

  if (!response.success) {
    return NextResponse.json(response, { status: response.status });
  }

  const allowedRoles = new Set(requestedRoles);
  const options: OrganizationMemberOption[] = response.data.members
    .filter(
      (member) =>
        allowedRoles.size === 0 || parseRoles(member.role).some((role) => allowedRoles.has(role)),
    )
    .map((member) => ({
      value: member.id,
      label: member.user.name || member.user.email,
      name: member.user.name,
      email: member.user.email,
      image: member.user.image ?? null,
    }))
    .sort(
      (left, right) =>
        left.label.localeCompare(right.label) || left.value.localeCompare(right.value),
    );

  return NextResponse.json(
    ApiResponse({
      success: true,
      status: HttpStatus.OK,
      message: 'Organization member options loaded successfully.',
      data: options,
    }),
    { status: HttpStatus.OK },
  );
}
