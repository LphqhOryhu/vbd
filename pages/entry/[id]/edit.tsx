import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Geist } from 'next/font/google';
import Layout from '@/components/Layout';
import EntryForm from '@/components/EntryForm';
import { Entry, EntryFormData } from '@/types/entry';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export default function EditEntry() {
  const router = useRouter();
  const { id } = router.query;
  const [entry, setEntry] = useState<Entry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const initialData: EntryFormData = {
    session_date: entry.session_date,
    session_type: entry.session_type,
    overall_rating: entry.overall_rating,
    service_rating: entry.service_rating,
    reception_rating: entry.reception_rating,
    block_rating: entry.block_rating,
    attack_rating: entry.attack_rating,
    mental_rating: entry.mental_rating,
    physical_rating: entry.physical_rating,
    notes: entry.notes,
  };

  return (
    <div className={geistSans.className}>
      <Layout>
        <div className="mb-6">
          <Link
            href={`/entry/${id}`}
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Retour aux détails
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Modifier l'entrée
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Modifiez les détails de votre séance
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <EntryForm initialData={initialData} entryId={entry.id} />
        </div>
      </Layout>
    </div>
  );
}
