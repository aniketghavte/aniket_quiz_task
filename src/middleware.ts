import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT_SECRET is not defined');

    const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret));

    if (payload && 'userId' in payload) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
