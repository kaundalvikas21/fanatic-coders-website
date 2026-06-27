import { Box } from 'lucide-react';
import { techIcons } from './techIcons';

/** Tech logo chip: brand-color simple-icons logo on a light tile; `Box` fallback. */
export function TechTile({ name }: { name: string }) {
  const icon = techIcons[name];
  return (
    <span className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5">
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          width={16}
          height={16}
          fill={`#${icon.hex}`}
          aria-hidden
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <Box
          size={16}
          aria-hidden
          className="text-gray-500"
        />
      )}
      {name}
    </span>
  );
}
