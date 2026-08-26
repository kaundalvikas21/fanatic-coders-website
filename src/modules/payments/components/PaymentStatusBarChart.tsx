'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

type Props = { paidInvoices: number; unpaidInvoices: number };

const chartConfig = {
  invoices: { label: 'Invoices', color: 'var(--chart-2)' },
} satisfies ChartConfig;

export function PaymentStatusBarChart({ paidInvoices, unpaidInvoices }: Props) {
  const data = [
    { status: 'Paid', invoices: paidInvoices, fill: 'var(--color-invoices)' },
    { status: 'Unpaid', invoices: unpaidInvoices, fill: 'var(--chart-4)' },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="h-80 w-full aspect-auto"
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ left: 0, right: 8, top: 8 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="status"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <YAxis
          type="number"
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          width={28}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="invoices"
          radius={4}
          maxBarSize={88}
        />
      </BarChart>
    </ChartContainer>
  );
}
