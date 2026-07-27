'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

type TaskStatusBarChartProps = {
  data: Array<{
    status: string;
    tasks: number;
    fill: string;
  }>;
};

const chartConfig = {
  tasks: {
    label: 'Tasks',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function TaskStatusBarChart({ data }: TaskStatusBarChartProps) {
  const total = data.reduce((sum, item) => sum + item.tasks, 0);

  if (total === 0) {
    return (
      <div className="flex min-h-72 items-center justify-center text-sm text-muted-foreground">
        Task distribution will appear when tasks are created.
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
        layout="vertical"
        margin={{ left: 8, right: 16 }}
      >
        <CartesianGrid horizontal={false} />
        <XAxis
          dataKey="tasks"
          type="number"
          hide
        />
        <YAxis
          dataKey="status"
          type="category"
          tickLine={false}
          axisLine={false}
          width={82}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="tasks"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
