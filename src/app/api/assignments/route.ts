import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Assignment } from '@/lib/types';

// Fallback seed assignments if DB empty or during initial setup
const DEFAULT_ASSIGNMENTS: Assignment[] = [
  {
    id: 'tugas-paw-01',
    title: 'Portofolio LMS — Arsitektur Next.js & Supabase',
    description:
      'Tugas besar mata kuliah Pengembangan Aplikasi Web. Membangun sistem profil portofolio interaktif berbasis LMS dengan fitur upload tugas multi-format dan sistem review feedback dosen.',
    subject: 'Pengembangan Aplikasi Web',
    category: 'Tugas Besar',
    semester: 'Semester 5',
    file_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    file_type: 'image',
    file_name: 'portofolio-lms-architecture.png',
    file_size: 2450000,
    tags: ['Next.js', 'React', 'Supabase', 'HTML5 Semantik'],
    created_at: new Date('2026-10-29T08:00:00Z').toISOString(),
    updated_at: new Date('2026-10-29T08:00:00Z').toISOString(),
  },
  {
    id: 'tugas-mbd-01',
    title: 'Normalisasi Basis Data & Perancangan ERD Sistem Akademik',
    description:
      'Laporan praktikum Manajemen Basis Data: Normalisasi data hingga 3NF, skema relasional, Row Level Security (RLS) policies, dan optimasi query indexing.',
    subject: 'Manajemen Basis Data',
    category: 'Laporan Praktikum',
    semester: 'Semester 5',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_type: 'pdf',
    file_name: 'laporan-mbd-normalisasi-rio-alfian.pdf',
    file_size: 1820000,
    tags: ['PostgreSQL', 'ERD', 'Normalisasi', 'RLS'],
    created_at: new Date('2026-10-20T10:30:00Z').toISOString(),
    updated_at: new Date('2026-10-20T10:30:00Z').toISOString(),
  },
  {
    id: 'tugas-pam-01',
    title: 'Prototipe UI Mobile LMS — Flutter & Jetpack Compose',
    description:
      'Desain antarmuka aplikasi mobile pembelajaran dengan komponen interaktif, navigasi bottom bar, dan sinkronisasi data offline-first.',
    subject: 'Pengembangan Aplikasi Mobile',
    category: 'Tugas Mandiri',
    semester: 'Semester 5',
    file_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    file_type: 'image',
    file_name: 'mobile-lms-prototype.png',
    file_size: 3200000,
    tags: ['Mobile UI', 'Prototyping', 'PAM'],
    created_at: new Date('2026-10-15T14:00:00Z').toISOString(),
    updated_at: new Date('2026-10-15T14:00:00Z').toISOString(),
  },
  {
    id: 'tugas-jarkom-01',
    title: 'Konfigurasi Routing OSPF & Subnetting VLSM',
    description:
      'Dokumentasi konfigurasi topologi jaringan kampus menggunakan Cisco Packet Tracer dengan implementasi protokol routing dinamis OSPF.',
    subject: 'Jaringan Komputer',
    category: 'Laporan Jarkom',
    semester: 'Semester 5',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_type: 'pdf',
    file_name: 'konfigurasi-ospf-vlsm-rio.pdf',
    file_size: 1450000,
    tags: ['Jarkom', 'Routing', 'OSPF', 'VLSM'],
    created_at: new Date('2026-10-10T09:15:00Z').toISOString(),
    updated_at: new Date('2026-10-10T09:15:00Z').toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');

    // Attempt to fetch from Supabase
    const query = supabaseAdmin
      .from('assignments')
      .select('*')
      .order('created_at', { ascending: false });

    if (subject && subject !== 'all') {
      query.eq('subject', subject);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      // Return filtered seed data if DB is empty or during setup
      const filtered = subject && subject !== 'all'
        ? DEFAULT_ASSIGNMENTS.filter((a) => a.subject.toLowerCase().includes(subject.toLowerCase()))
        : DEFAULT_ASSIGNMENTS;
      return NextResponse.json({ success: true, data: filtered, source: 'fallback' });
    }

    return NextResponse.json({ success: true, data, source: 'supabase' });
  } catch (err: any) {
    return NextResponse.json({ success: true, data: DEFAULT_ASSIGNMENTS, source: 'fallback_catch' });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, subject, category, file_url, file_type, file_name, file_size, tags } = body;

    if (!title || !subject || !file_url) {
      return NextResponse.json(
        { success: false, error: 'Judul, Mata Kuliah, dan URL Berkas wajib diisi.' },
        { status: 400 }
      );
    }

    const newAssignment = {
      title,
      description: description || '',
      subject,
      category: category || 'Tugas Kuliah',
      semester: 'Semester 5',
      file_url,
      file_type: file_type || 'other',
      file_name: file_name || 'berkas-tugas',
      file_size: file_size || 0,
      tags: tags || [],
    };

    const { data, error } = await supabaseAdmin
      .from('assignments')
      .insert([newAssignment])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
