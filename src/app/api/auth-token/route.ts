import { NextResponse, type NextRequest } from 'next/server';
import { FCOP_AUTH_TOKEN_COOKIE } from '@/lib/auth/bearer-token';

const AUTH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as { token?: unknown } | null;
  const token = typeof payload?.token === 'string' ? payload.token.trim() : '';

  if (!token) {
    return NextResponse.json({ success: false, message: 'Missing auth token.' }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: FCOP_AUTH_TOKEN_COOKIE,
    value: token,
    httpOnly: true,
    secure: request.nextUrl.protocol === 'https:',
    sameSite: 'lax',
    path: '/',
    maxAge: AUTH_TOKEN_MAX_AGE_SECONDS,
  });

  return response;
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: FCOP_AUTH_TOKEN_COOKIE,
    value: '',
    httpOnly: true,
    secure: request.nextUrl.protocol === 'https:',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
