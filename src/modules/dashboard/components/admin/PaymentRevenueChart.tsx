'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { AdminPaymentSummary } from '@/types';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function PaymentRevenueChart({
  currencies,
}: {
  currencies: AdminPaymentSummary['byCurrency'];
}) {
  if (currencies.length === 0) {
    return (
      <div className="flex min-h-56 items-center justify-center text-sm text-muted-foreground">
        Revenue chart will appear after the first payment.
      </div>
    );
  }

  const data = currencies.map((item) => ({
    currency: item.currency,
    revenue: Number(item.totalAmount),
  }));

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-56 w-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ left: 0, right: 12, top: 8, bottom: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="currency"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={6}
          maxBarSize={56}
        />
      </BarChart>
    </ChartContainer>
  );
}
