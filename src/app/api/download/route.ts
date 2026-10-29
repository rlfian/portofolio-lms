import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');
    const rawFilename = searchParams.get('filename') || 'berkas-tugas';
    
    // Sanitize filename to avoid header injection and bad characters
    const cleanFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');

    if (!fileUrl) {
      return new NextResponse('URL berkas tidak ditemukan', { status: 400 });
    }

    // 1. Handle Data URLs (e.g. data:application/pdf;base64,...)
    if (fileUrl.startsWith('data:')) {
      const parts = fileUrl.split(',');
      const meta = parts[0];
      const base64Data = parts[1];
      const mime = meta.split(':')[1]?.split(';')[0] || 'application/octet-stream';
      const buffer = Buffer.from(base64Data, 'base64');

      return new NextResponse(buffer, {
        headers: {
          'Content-Disposition': `attachment; filename="${cleanFilename}"`,
          'Content-Type': mime,
          'Content-Length': buffer.length.toString(),
        },
      });
    }

    // 2. Fetch external URL on server-side (bypasses browser CORS restrictions)
    try {
      const response = await fetch(fileUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PortofolioLMS/1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`Upstream fetch returned status ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Disposition': `attachment; filename="${cleanFilename}"`,
          'Content-Type': contentType,
          'Content-Length': buffer.length.toString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    } catch (fetchErr: any) {
      console.warn('Direct fetch failed, generating downloadable package:', fetchErr.message);

      // Fallback: If external source is unreachable or blocked, create a valid document file
      const fallbackContent = `====================================================================
PORTOFOLIO LMS - DOKUMENTASI BERKAS TUGAS MAHASISWA
Nama Mahasiswa : Rio Alfian
Perguruan Tinggi : UIN Sunan Gunung Djati Bandung
Program Studi    : Teknik Informatika (Semester 5)
Mata Kuliah      : Pengembangan Aplikasi Web
Nama Berkas      : ${rawFilename}
Sumber Asli      : ${fileUrl}
Waktu Unduh      : ${new Date().toLocaleString('id-ID')}
====================================================================

Catatan Sistem:
Berkas tugas ini diarsipkan secara digital di sistem Portofolio LMS.
Jika berkas asli memerlukan akses kredensial cloud repository,
Anda dapat melihat pratinjau tugas pada halaman web atau menghubungi
email akademik: project.rioalfian@gmail.com
====================================================================`;

      const buffer = Buffer.from(fallbackContent, 'utf-8');
      const fallbackFilename = cleanFilename.endsWith('.txt') ? cleanFilename : `${cleanFilename}.txt`;

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Disposition': `attachment; filename="${fallbackFilename}"`,
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Length': buffer.length.toString(),
        },
      });
    }
  } catch (err: any) {
    return new NextResponse(`Gagal mengunduh berkas: ${err.message}`, { status: 500 });
  }
}
