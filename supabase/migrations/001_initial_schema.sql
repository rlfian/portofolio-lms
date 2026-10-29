-- ====================================================================
-- PORTOFOLIO LMS - SUPABASE INITIAL SCHEMA
-- Author: Antigravity Squad (Lead, Ian, Io, Vin)
-- ====================================================================

-- 1. Create assignments table (tugas mahasiswa)
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  category TEXT DEFAULT 'Tugas Kuliah',
  semester TEXT DEFAULT 'Semester 5',
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'pdf', 'image', 'zip', 'text', 'doc', 'other'
  file_name TEXT NOT NULL,
  file_size BIGINT DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create reviews table (feedback dari dosen / pengunjung)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  reviewer_role TEXT DEFAULT 'Dosen / Pengunjung',
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Row Level Security (RLS) setup
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Assignments Policies:
-- Anyone can view assignments (Public portfolio)
CREATE POLICY "Public read assignments"
  ON public.assignments FOR SELECT
  USING (true);

-- Anyone with service role key or admin access can insert/update/delete assignments
CREATE POLICY "Admin write assignments"
  ON public.assignments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin update assignments"
  ON public.assignments FOR UPDATE
  USING (true);

CREATE POLICY "Admin delete assignments"
  ON public.assignments FOR DELETE
  USING (true);

-- Reviews Policies:
-- Anyone can read reviews
CREATE POLICY "Public read reviews"
  ON public.reviews FOR SELECT
  USING (true);

-- Anyone (dosen/visitor) can insert review feedback
CREATE POLICY "Public insert reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (true);

-- 4. Storage Bucket Setup (assignments)
INSERT INTO storage.buckets (id, name, public)
VALUES ('assignments', 'assignments', true)
ON CONFLICT (id) DO NOTHING;

-- Storage public read policy
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'assignments');

-- Storage upload policy
CREATE POLICY "Allow Uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'assignments');

CREATE POLICY "Allow Deletes"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'assignments');
