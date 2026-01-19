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

    console.log('\n🔐 Login attempt with username:', username);

    // Temporary fallback: allow env-based admin credentials for quick testing
    const testAdminEmail = process.env.TEST_ADMIN_EMAIL
    const testAdminPass = process.env.TEST_ADMIN_PASS

    console.log('✓ Test admin email env:', testAdminEmail);

    if (testAdminEmail && testAdminPass && username === testAdminEmail && password === testAdminPass) {
      console.log('✅ SUCCESS: Test credentials matched!');
      const token = generateToken(testAdminEmail)
      return NextResponse.json({ token, success: true })
    }

    console.log('ℹ️ Attempting database validation...');
    
    // validateAdminCredentials expects email as first parameter
    const isValid = await validateAdminCredentials(username, password)

    if (isValid) {
      console.log('✅ SUCCESS: Database credentials valid!');
      const token = generateToken(username)
      return NextResponse.json({ token, success: true })
    }

    console.log('❌ FAILED: Invalid credentials');
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('❌ Login error:', errorMsg);
    return NextResponse.json(
      { error: 'Login failed', details: errorMsg },
      { status: 500 }
    );
  }
}
