'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import type { AdminPaymentSummary } from '@/types';
import type { ProjectCurrency } from '@/types/enum';
import { formatMoney } from '@/utils/money';

type Props = {
  currencies: AdminPaymentSummary['byCurrency'];
  trend: AdminPaymentSummary['revenueTrend'];
};

const ranges = [
  { label: '30 days', days: 30 },
  { label: '90 days', days: 90 },
  { label: '12 months', days: 365 },
] as const;

const chartConfig = {
  revenue: { label: 'Revenue', color: 'var(--chart-2)' },
} satisfies ChartConfig;

const dateKey = (date: Date) => date.toISOString().slice(0, 10);

function createSeries(
  trend: AdminPaymentSummary['revenueTrend'],
  currency: ProjectCurrency,
  days: number,
) {
  const values = new Map(
    trend.filter((point) => point.currency === currency).map((point) => [point.date, point]),
  );
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - (days - index - 1));
    const key = dateKey(date);
    const point = values.get(key);

    return {
      date: key,
      revenue: Number(point?.revenue ?? 0),
      invoiceCount: point?.invoiceCount ?? 0,
    };
  });
}

export function PaymentRevenueOverview({ currencies, trend }: Props) {
  const [currency, setCurrency] = useState<ProjectCurrency>(currencies[0]?.currency ?? 'AED');
  const [days, setDays] = useState<(typeof ranges)[number]['days']>(90);
  const series = useMemo(() => createSeries(trend, currency, days), [currency, days, trend]);
  const periodRevenue = series.reduce((total, point) => total + point.revenue, 0);
  const periodInvoices = series.reduce((total, point) => total + point.invoiceCount, 0);

  return (
    <section aria-labelledby="collected-revenue-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3
            id="collected-revenue-heading"
            className="text-sm font-semibold"
          >
            Revenue trend
          </h3>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Paid invoice value over the selected period.
          </p>
        </div>

        {currencies.length > 1 && (
          <div
            className="inline-flex w-fit rounded-md bg-muted p-1"
            aria-label="Revenue currency"
          >
            {currencies.map((item) => (
              <button
                key={item.currency}
                type="button"
                aria-pressed={currency === item.currency}
                onClick={() => setCurrency(item.currency)}
                className={cn(
                  'rounded px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  currency === item.currency
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.currency}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-y border-border/60 py-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
            {formatMoney(periodRevenue, currency)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {periodInvoices} paid {periodInvoices === 1 ? 'invoice' : 'invoices'}
          </p>
        </div>

        <div
          className="flex flex-wrap gap-1"
          aria-label="Revenue date range"
        >
          {ranges.map((range) => (
            <button
              key={range.days}
              type="button"
              aria-pressed={days === range.days}
              onClick={() => setDays(range.days)}
              className={cn(
                'rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                days === range.days
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <ChartContainer
        config={chartConfig}
        className="mt-5 h-64 w-full aspect-auto"
      >
        <AreaChart
          accessibilityLayer
          data={series}
          margin={{ left: 4, right: 8, top: 8 }}
        >
          <defs>
            <linearGradient
              id="revenue-fill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.35}
              />
              <stop
                offset="95%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.03}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            minTickGap={32}
            tickFormatter={(value: string) =>
              new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC',
              })
            }
          />
          <YAxis
            width={48}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) =>
              Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
                value,
              )
            }
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="line"
                labelFormatter={(value) =>
                  new Date(`${String(value)}T00:00:00Z`).toLocaleDateString('en-US', {
                    dateStyle: 'medium',
                    timeZone: 'UTC',
                  })
                }
                formatter={(value) => formatMoney(Number(value), currency)}
              />
            }
          />
          <Area
            dataKey="revenue"
            type="monotone"
            fill="url(#revenue-fill)"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ChartContainer>
    </section>
  );
}
