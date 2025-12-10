import { createClient } from '@supabase/supabase-js';
import { Entry } from '@/types/entry';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      entries: {
        Row: Entry;
        Insert: Omit<Entry, 'id' | 'created_at'>;
        Update: Partial<Omit<Entry, 'id' | 'created_at'>>;
      };
    };
  };
};
