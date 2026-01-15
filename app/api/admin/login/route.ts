import { NextResponse } from 'next/server';
import { validateAdminCredentials, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Missing username or password' },
        { status: 400 }
      );
    }

    // Temporary fallback: allow env-based admin credentials for quick testing
    const testAdminEmail = process.env.TEST_ADMIN_EMAIL
    const testAdminPass = process.env.TEST_ADMIN_PASS

    if (testAdminEmail && testAdminPass && username === testAdminEmail && password === testAdminPass) {
      const token = generateToken(username)
      return NextResponse.json({ token, success: true })
    }

    const isValid = await validateAdminCredentials(username, password)

    if (isValid) {
      const token = generateToken(username)
      return NextResponse.json({ token, success: true })
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
