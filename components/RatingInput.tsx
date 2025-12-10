interface RatingInputProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  max?: number;
  allowNA?: boolean;
}

export default function RatingInput({ label, value, onChange, max = 10, allowNA = false }: RatingInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {value === null ? 'N/A' : `${value}/${max}`}
        </span>
      </div>
      <div className="flex gap-1">
        {allowNA && (
          <button
            key="na"
            type="button"
            onClick={() => onChange(null)}
            className={`h-8 w-12 rounded-md text-xs font-medium transition-colors ${
              value === null
                ? 'bg-zinc-500 text-white'
                : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600'
            }`}
          >
            N/A
          </button>
        )}
        {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
              value !== null && rating <= value
                ? 'bg-blue-500 text-white'
                : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600'
            }`}
          >
            {rating}
          </button>
        ))}
      </div>
    </div>
  );
}
