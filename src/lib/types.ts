export type FileType = 'pdf' | 'image' | 'zip' | 'text' | 'doc' | 'other';

export interface Assignment {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  category: string;
  semester: string;
  file_url: string;
  file_type: FileType;
  file_name: string;
  file_size: number;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  assignment_id: string;
  reviewer_name: string;
  reviewer_role: string;
  rating: number; // 1 - 5
  comment: string;
  created_at: string;
}

export interface Course {
  no: number;
  code: string;
  name: string;
  sks: number;
  semester: number;
  lecturer: string;
  description: string;
  color: string;
}
