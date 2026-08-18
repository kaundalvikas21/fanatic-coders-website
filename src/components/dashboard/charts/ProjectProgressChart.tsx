'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

type ProjectProgressChartProps = {
  data: Array<{
    project: string;
    progress: number;
  }>;
};

const chartConfig = {
  progress: {
    label: 'Progress',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function ProjectProgressChart({ data }: ProjectProgressChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center text-sm text-muted-foreground">
        Project progress will appear when delivery begins.
      </div>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-64 w-full"
      initialDimension={{ width: 640, height: 256 }}
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 28 }}
      >
        <CartesianGrid horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey="project"
          type="category"
          tickLine={false}
          axisLine={false}
          width={132}
          tickFormatter={(value: string) => (value.length > 18 ? `${value.slice(0, 17)}…` : value)}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value) => (
                <div className="flex min-w-28 items-center justify-between gap-4">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-mono font-medium tabular-nums">{Number(value)}%</span>
                </div>
              )}
            />
          }
        />
        <Bar
          dataKey="progress"
          fill="var(--color-progress)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
