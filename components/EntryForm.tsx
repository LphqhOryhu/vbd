import { useState } from 'react';
import { useRouter } from 'next/router';
import { EntryFormData, SESSION_TYPE_LABELS, SessionType } from '@/types/entry';
import RatingInput from './RatingInput';

interface EntryFormProps {
  initialData?: EntryFormData;
  entryId?: string;
}

const defaultFormData: EntryFormData = {
  session_date: new Date().toISOString().split('T')[0],
  session_type: 'loisir_lundi',
  overall_rating: 5,
  service_rating: 5,
  reception_rating: 5,
  block_rating: 5,
  attack_rating: 5,
  mental_rating: 5,
  physical_rating: 5,
  notes: '',
};

export default function EntryForm({ initialData, entryId }: EntryFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<EntryFormData>(initialData || defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!entryId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = isEditing ? `/api/entries/${entryId}` : '/api/entries';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      const data = await response.json();
      router.push(`/entry/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = <K extends keyof EntryFormData>(field: K, value: EntryFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Date de la séance
          </label>
          <input
            type="date"
            value={formData.session_date}
            onChange={(e) => updateField('session_date', e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Type de séance
          </label>
          <select
            value={formData.session_type}
            onChange={(e) => updateField('session_type', e.target.value as SessionType)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          >
            {Object.entries(SESSION_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800/50">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Note globale
        </h3>
        <RatingInput
          label="Comment s'est passée cette séance ?"
          value={formData.overall_rating}
          onChange={(value) => updateField('overall_rating', value)}
        />
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800/50">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Notes par compétence
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <RatingInput
            label="Service"
            value={formData.service_rating}
            onChange={(value) => updateField('service_rating', value)}
          />
          <RatingInput
            label="Réception"
            value={formData.reception_rating}
            onChange={(value) => updateField('reception_rating', value)}
          />
          <RatingInput
            label="Bloc"
            value={formData.block_rating}
            onChange={(value) => updateField('block_rating', value)}
          />
          <RatingInput
            label="Attaque"
            value={formData.attack_rating}
            onChange={(value) => updateField('attack_rating', value)}
          />
          <RatingInput
            label="Mental"
            value={formData.mental_rating}
            onChange={(value) => updateField('mental_rating', value)}
          />
          <RatingInput
            label="Physique"
            value={formData.physical_rating}
            onChange={(value) => updateField('physical_rating', value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Notes / Observations
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          rows={4}
          placeholder="Ce qui s'est bien passé, points à améliorer, objectifs pour la prochaine fois..."
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}
