import { useEffect, useState } from 'react';
import { Geist } from 'next/font/google';
import Layout from '@/components/Layout';
import EntryCard from '@/components/EntryCard';
import { Entry } from '@/types/entry';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const response = await fetch('/api/entries');
        if (!response.ok) throw new Error('Erreur de chargement');
        const data = await response.json();
        setEntries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    }
    fetchEntries();
  }, []);

  return (
    <div className={geistSans.className}>
      <Layout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Mon journal de volley
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Suivez votre progression et notez vos performances
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-800">
            <span className="text-5xl">🏐</span>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Aucune entrée pour le moment
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Commencez à tracker votre progression en ajoutant votre première séance !
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </Layout>
    </div>
  );
}
