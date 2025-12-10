import Link from 'next/link';
import { Entry, SESSION_TYPE_LABELS } from '@/types/entry';

interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
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

  const formatRating = (rating: number | null | undefined) => {
    return rating == null ? 'N/A' : rating.toString();
  };

  return (
    <Link href={`/entry/${entry.id}`}>
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-600">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {formatDate(entry.session_date)}
            </p>
            <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {SESSION_TYPE_LABELS[entry.session_type]}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Global</p>
            <p className={`text-2xl font-bold ${getRatingColor(entry.overall_rating)}`}>
              {entry.overall_rating === null ? 'N/A' : `${entry.overall_rating}/10`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">Service</p>
            <p className={`font-semibold ${getRatingColor(entry.service_rating)}`}>
              {formatRating(entry.service_rating)}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">Réception</p>
            <p className={`font-semibold ${getRatingColor(entry.reception_rating)}`}>
              {formatRating(entry.reception_rating)}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">Passe</p>
            <p className={`font-semibold ${getRatingColor(entry.pass_rating)}`}>
              {formatRating(entry.pass_rating)}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">Bloc</p>
            <p className={`font-semibold ${getRatingColor(entry.block_rating)}`}>
              {formatRating(entry.block_rating)}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">Attaque</p>
            <p className={`font-semibold ${getRatingColor(entry.attack_rating)}`}>
              {formatRating(entry.attack_rating)}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">Mental</p>
            <p className={`font-semibold ${getRatingColor(entry.mental_rating)}`}>
              {formatRating(entry.mental_rating)}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">Physique</p>
            <p className={`font-semibold ${getRatingColor(entry.physical_rating)}`}>
              {formatRating(entry.physical_rating)}
            </p>
          </div>
        </div>

        {entry.notes && (
          <p className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {entry.notes}
          </p>
        )}
      </div>
    </Link>
  );
}
