import { NextResponse, type NextRequest } from 'next/server';
import { FCOP_AUTH_TOKEN_COOKIE } from '@/lib/auth/bearer-token';
import { ApiResponse, HttpStatus } from '@/utils/api-response';

const AUTH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json().catch(() => null)) as { token?: unknown } | null;
    const token = typeof payload?.token === 'string' ? payload.token.trim() : '';

    if (!token) {
      return NextResponse.json(
        ApiResponse({
          success: false,
          status: HttpStatus.BAD_REQUEST,
          message: 'Missing auth token.',
          error: {
            code: 'AUTH_TOKEN_MISSING',
          },
        }),
        { status: HttpStatus.BAD_REQUEST },
      );
    }

    const response = NextResponse.json(
      ApiResponse({
        success: true,
        status: HttpStatus.OK,
        message: 'Auth token stored successfully.',
      }),
      { status: HttpStatus.OK },
    );

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
  } catch {
    return NextResponse.json(
      ApiResponse({
        success: false,
        status: HttpStatus.INTERNAL_ERROR,
        message: 'Could not store auth token.',
        error: {
          code: 'AUTH_TOKEN_STORE_FAILED',
        },
      }),
      { status: HttpStatus.INTERNAL_ERROR },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json(
      ApiResponse({
        success: true,
        status: HttpStatus.OK,
        message: 'Auth token cleared successfully.',
      }),
      { status: HttpStatus.OK },
    );

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
  } catch {
    return NextResponse.json(
      ApiResponse({
        success: false,
        status: HttpStatus.INTERNAL_ERROR,
        message: 'Could not clear auth token.',
        error: {
          code: 'AUTH_TOKEN_CLEAR_FAILED',
        },
      }),
      { status: HttpStatus.INTERNAL_ERROR },
    );
  }
}
