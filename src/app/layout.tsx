import type { Metadata } from 'next';
import { Space_Grotesk, Caveat, Space_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwritten',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rio Alfian — Portofolio & Learning Management System (LMS)',
  description:
    'Halaman profil portofolio dan Learning Management System (LMS) Rio Alfian, Mahasiswa Teknik Informatika UIN Sunan Gunung Djati Bandung. Menampilkan tugas kuliah, biodata akademik, dan sistem ulasan dosen.',
  keywords: [
    'Rio Alfian',
    'Portofolio',
    'LMS',
    'Teknik Informatika',
    'UIN Sunan Gunung Djati',
    'Pengembangan Aplikasi Web',
    'Next.js',
    'Supabase',
  ],
  authors: [{ name: 'Rio Alfian', url: 'https://github.com/rlfiann' }],
  openGraph: {
    title: 'Rio Alfian — Portofolio & Learning Management System (LMS)',
    description:
      'Portofolio dan LMS akademik Rio Alfian, Mahasiswa Teknik Informatika UIN Sunan Gunung Djati Bandung.',
    url: 'https://rioalfian-lms.vercel.app',
    siteName: 'Portofolio LMS Rio Alfian',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Portofolio LMS Rio Alfian — Teknik Informatika UIN SGD Bandung',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rio Alfian — Portofolio & Learning Management System',
    description:
      'Portofolio dan LMS akademik Rio Alfian, Mahasiswa Teknik Informatika UIN Sunan Gunung Djati Bandung.',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&h=630&q=80',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${caveat.variable} ${spaceMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
