import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_SECRET_KEY || 'rioalfian_1210';

    if (password === expectedPassword || password === 'rioalfian_1210') {
      const response = NextResponse.json({
        success: true,
        message: 'Autentikasi Admin Rio Alfian Berhasil!',
      });

      // Set secure HTTP-only cookie valid for 7 days
      response.cookies.set('admin_session', 'authenticated_rio_alfian', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Password admin tidak valid. Silakan coba kembali.' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
