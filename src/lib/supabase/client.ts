import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mrpqwnvwvjojdmuawtgn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ijR7B45eW2YXgYcVDiq1Wg_70MzW5FN';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
