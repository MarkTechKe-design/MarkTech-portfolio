import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    const configuredPassword = (process.env.ADMIN_PASSWORD || '').trim().replace(/^["']|["']$/g, '');
    const incomingPassword = (password || '').trim();

    if (!configuredPassword) {
      console.error('[ADMIN-LOGIN] ADMIN_PASSWORD environment variable is not defined.');
      return NextResponse.json({ error: 'Server configuration error: missing admin credentials.' }, { status: 500 });
    }

    if (!incomingPassword || incomingPassword !== configuredPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const jwtSecretString = process.env.JWT_SECRET || 'fallback-secret-key-32-chars-minimum!!';
    const secret = new TextEncoder().encode(jwtSecretString);

    const token = await new SignJWT({ admin: true })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);

    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return res;
  } catch (err) {
    console.error('[ADMIN-LOGIN-ERROR]', err);
    return NextResponse.json({ error: 'Authentication internal error' }, { status: 500 });
  }
}