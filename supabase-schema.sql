-- Script SQL pour créer la table entries dans Supabase
-- À exécuter dans l'éditeur SQL de votre projet Supabase

CREATE TABLE IF NOT EXISTS entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_date DATE NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('loisir_lundi', 'loisir_vendredi', 'solo', 'physique')),
  overall_rating NUMERIC(3,1) CHECK (overall_rating >= 1 AND overall_rating <= 10),
  service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 10),
  reception_rating INTEGER CHECK (reception_rating >= 1 AND reception_rating <= 10),
  block_rating INTEGER CHECK (block_rating >= 1 AND block_rating <= 10),
  attack_rating INTEGER CHECK (attack_rating >= 1 AND attack_rating <= 10),
  pass_rating INTEGER CHECK (pass_rating >= 1 AND pass_rating <= 10),
  mental_rating INTEGER CHECK (mental_rating >= 1 AND mental_rating <= 10),
  physical_rating INTEGER CHECK (physical_rating >= 1 AND physical_rating <= 10),
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Migration pour une table existante (exécuter si la table existe déjà)
-- ALTER TABLE entries
--   ALTER COLUMN overall_rating DROP NOT NULL,
--   ALTER COLUMN overall_rating TYPE NUMERIC(3,1),
--   ALTER COLUMN service_rating DROP NOT NULL,
--   ALTER COLUMN reception_rating DROP NOT NULL,
--   ALTER COLUMN block_rating DROP NOT NULL,
--   ALTER COLUMN attack_rating DROP NOT NULL,
--   ALTER COLUMN mental_rating DROP NOT NULL,
--   ALTER COLUMN physical_rating DROP NOT NULL,
--   ADD COLUMN IF NOT EXISTS pass_rating INTEGER CHECK (pass_rating >= 1 AND pass_rating <= 10);

-- Activer RLS (Row Level Security)
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre toutes les opérations (pour un usage personnel simple)
-- Note: Pour un usage production multi-utilisateur, il faudrait ajouter l'authentification
CREATE POLICY "Allow all operations" ON entries
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index pour optimiser les requêtes par date
CREATE INDEX IF NOT EXISTS idx_entries_session_date ON entries(session_date DESC);
