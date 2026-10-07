import type { Portfolio } from '@/types';

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue-100/40">
        {label}
      </dt>
      <dd className="text-right text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}

export function PublicPortfolioFacts({ portfolio }: { portfolio: Portfolio }) {
  const { client, industry, year, duration, services } = portfolio;
  if (!client && !industry && !year && !duration && !services?.length) return null;

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl md:p-7">
      <div className="border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-blue-100/40">
        {'// at a glance'}
      </div>
      <dl className="divide-y divide-white/[0.07] pt-1">
        {client && (
          <Fact
            label="client"
            value={client}
          />
        )}
        {industry && (
          <Fact
            label="industry"
            value={industry}
          />
        )}
        {year && (
          <Fact
            label="year"
            value={year}
          />
        )}
        {duration && (
          <Fact
            label="duration"
            value={duration}
          />
        )}
      </dl>
      {services && services.length > 0 && (
        <div className="mt-1 border-t border-white/10 pt-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue-100/40">
            services
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {services.map((service) => (
              <span
                key={service}
                className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs text-blue-100/85"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
