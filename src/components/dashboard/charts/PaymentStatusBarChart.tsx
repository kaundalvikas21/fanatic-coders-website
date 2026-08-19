'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

type PaymentStatusBarChartProps = {
  data: Array<{
    status: string;
    payments: number;
  }>;
};

const chartConfig = {
  payments: {
    label: 'Payments',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function PaymentStatusBarChart({ data }: PaymentStatusBarChartProps) {
  if (data.length === 0 || data.every((item) => item.payments <= 0)) {
    return (
      <div className="flex min-h-72 items-center justify-center text-sm text-muted-foreground">
        Payment activity will appear after invoices are created.
      </div>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-72 w-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ left: 8, right: 16, top: 8 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="status"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value: number) => value.toLocaleString()}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="payments"
          fill="var(--color-payments)"
          radius={6}
        />
      </BarChart>
    </ChartContainer>
  );
}
