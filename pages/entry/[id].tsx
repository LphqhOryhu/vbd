import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Geist } from 'next/font/google';
import Layout from '@/components/Layout';
import { Entry, SESSION_TYPE_LABELS } from '@/types/entry';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export default function EntryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [entry, setEntry] = useState<Entry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchEntry() {
      try {
        const response = await fetch(`/api/entries/${id}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error('Entrée non trouvée');
          throw new Error('Erreur de chargement');
        }
        const data = await response.json();
        setEntry(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    }
    fetchEntry();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/entries/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRatingColor = (rating: number | null | undefined) => {
    if (rating == null) return 'text-zinc-400 dark:text-zinc-500';
    if (rating >= 8) return 'text-green-600 dark:text-green-400';
    if (rating >= 5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRatingBg = (rating: number | null | undefined) => {
    if (rating == null) return 'bg-zinc-100 dark:bg-zinc-800';
    if (rating >= 8) return 'bg-green-100 dark:bg-green-900/30';
    if (rating >= 5) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const formatRating = (rating: number | null | undefined) => {
    return rating == null ? 'N/A' : `${rating}/10`;
  };

  if (isLoading) {
    return (
      <div className={geistSans.className}>
        <Layout>
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        </Layout>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className={geistSans.className}>
        <Layout>
          <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error || 'Entrée non trouvée'}
          </div>
          <Link
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Retour au journal
          </Link>
        </Layout>
      </div>
    );
  }

  return (
    <div className={geistSans.className}>
      <Layout>
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Retour au journal
          </Link>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-zinc-500 dark:text-zinc-400">
                {formatDate(entry.session_date)}
              </p>
              <span className="mt-2 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {SESSION_TYPE_LABELS[entry.session_type]}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Note globale</p>
              <p className={`text-4xl font-bold ${getRatingColor(entry.overall_rating)}`}>
                {formatRating(entry.overall_rating)}
              </p>
            </div>
          </div>

          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Détail des performances
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Service', value: entry.service_rating },
              { label: 'Réception', value: entry.reception_rating },
              { label: 'Passe', value: entry.pass_rating },
              { label: 'Bloc', value: entry.block_rating },
              { label: 'Attaque', value: entry.attack_rating },
              { label: 'Mental', value: entry.mental_rating },
              { label: 'Physique', value: entry.physical_rating },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl p-4 ${getRatingBg(stat.value)}`}
              >
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
                <p className={`text-2xl font-bold ${getRatingColor(stat.value)}`}>
                  {formatRating(stat.value)}
                </p>
              </div>
            ))}
          </div>

          {entry.notes && (
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Notes
              </h2>
              <p className="whitespace-pre-wrap rounded-lg bg-zinc-50 p-4 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                {entry.notes}
              </p>
            </div>
          )}

          <div className="mt-8 flex gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-700">
            <Link
              href={`/entry/${entry.id}/edit`}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Modifier
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              {isDeleting ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
          Créé le {new Date(entry.created_at).toLocaleDateString('fr-FR')}
        </p>
      </Layout>
    </div>
  );
}
