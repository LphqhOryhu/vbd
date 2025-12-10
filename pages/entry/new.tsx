import { Geist } from 'next/font/google';
import Layout from '@/components/Layout';
import EntryForm from '@/components/EntryForm';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export default function NewEntry() {
  return (
    <div className={geistSans.className}>
      <Layout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Nouvelle entrée
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Enregistrez les détails de votre séance
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <EntryForm />
        </div>
      </Layout>
    </div>
  );
}
