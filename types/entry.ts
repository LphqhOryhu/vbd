export type SessionType = 'loisir_lundi' | 'loisir_vendredi' | 'solo' | 'physique';

export const SESSION_TYPE_LABELS: Record<SessionType, string> = {
  loisir_lundi: 'Loisir Lundi',
  loisir_vendredi: 'Loisir Vendredi',
  solo: 'Solo',
  physique: 'Physique',
};

export interface Entry {
  id: string;
  session_date: string;
  session_type: SessionType;
  overall_rating: number | null;
  service_rating: number | null;
  reception_rating: number | null;
  block_rating: number | null;
  attack_rating: number | null;
  pass_rating: number | null;
  mental_rating: number | null;
  physical_rating: number | null;
  notes: string;
  created_at: string;
}

export type EntryFormData = Omit<Entry, 'id' | 'created_at'>;
