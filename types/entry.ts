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
  overall_rating: number;
  service_rating: number;
  reception_rating: number;
  block_rating: number;
  attack_rating: number;
  mental_rating: number;
  physical_rating: number;
  notes: string;
  created_at: string;
}

export type EntryFormData = Omit<Entry, 'id' | 'created_at'>;
