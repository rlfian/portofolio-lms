import { Course } from './types';

export const PROFILE_DATA = {
  name: 'Rio Alfian',
  nickname: 'Rio',
  tagline: 'Crafting thoughtful web interfaces & scalable systems.',
  subtagline: 'Mahasiswa Teknik Informatika yang antusias terhadap pengembangan aplikasi web, perancangan antarmuka pengguna, dan arsitektur sistem modern.',
  university: 'UIN Sunan Gunung Djati Bandung',
  faculty: 'Fakultas Sains dan Teknologi',
  major: 'Teknik Informatika',
  semester: 'Semester 5',
  status: 'Mahasiswa Aktif',
  location: 'Bandung, Indonesia',
  email: 'project.rioalfian@gmail.com',
  github: 'https://github.com/rlfiann',
  linkedin: 'https://linkedin.com/in/rioalfian',
  skills: [
    { label: 'Next.js & React', color: '#facc15' },
    { label: 'TypeScript', color: '#38bdf8' },
    { label: 'Supabase & SQL', color: '#4ade80' },
    { label: 'UI/UX Design', color: '#f472b6' },
    { label: 'Web Architecture', color: '#a78bfa' },
    { label: 'Responsive Design', color: '#fb923c' },
  ],
  stickers: [
    { text: 'MADE WITH LOVE', bg: '#dcfce7', color: '#166534' },
    { text: 'SWEAT THE DETAILS', bg: '#fef3c7', color: '#92400e' },
    { text: 'SEMESTER 5 — 2026', bg: '#e0e7ff', color: '#3730a3' },
  ]
};

export const COURSES: Course[] = [
  {
    no: 1,
    code: 'TIF-301',
    name: 'Pengembangan Aplikasi Web',
    sks: 3,
    semester: 5,
    lecturer: 'Dosen Pengampu PAW',
    description: 'Mempelajari perancangan dan implementasi website modern, arsitektur client-server, Next.js, dan integrasi backend.',
    color: '#fef08a'
  },
  {
    no: 2,
    code: 'TIF-302',
    name: 'Pengembangan Aplikasi Mobile',
    sks: 3,
    semester: 5,
    lecturer: 'Dosen Pengampu PAM',
    description: 'Pemrograman aplikasi perangkat bergerak multiplatform, state management, dan API integration.',
    color: '#bbf7d0'
  },
  {
    no: 3,
    code: 'TIF-303',
    name: 'Manajemen Basis Data',
    sks: 3,
    semester: 5,
    lecturer: 'Dosen Pengampu MBD',
    description: 'Pemodelan data relasional, SQL tingkat lanjut, normalisasi, indexing, dan performa database PostgreSQL.',
    color: '#bae6fd'
  },
  {
    no: 4,
    code: 'TIF-304',
    name: 'Jaringan Komputer',
    sks: 3,
    semester: 5,
    lecturer: 'Dosen Pengampu Jarkom',
    description: 'Protokol TCP/IP, routing, switching, subnetting, dan keamanan transmisi data.',
    color: '#fbcfe8'
  },
  {
    no: 5,
    code: 'TIF-305',
    name: 'Interaksi Manusia dan Komputer',
    sks: 3,
    semester: 5,
    lecturer: 'Dosen Pengampu IMK',
    description: 'Prinsip desain antarmuka, usability testing, heuristik Nielsen, dan perancangan pengalaman pengguna (UX).',
    color: '#fed7aa'
  },
  {
    no: 6,
    code: 'TIF-306',
    name: 'Manajemen Proyek Perangkat Lunak',
    sks: 3,
    semester: 5,
    lecturer: 'Dosen Pengampu MPPL',
    description: 'Metodologi Agile/Scrum, manajemen risiko tim rekayasa perangkat lunak, timeline sprint, dan estimasi.',
    color: '#ddd6fe'
  }
];
