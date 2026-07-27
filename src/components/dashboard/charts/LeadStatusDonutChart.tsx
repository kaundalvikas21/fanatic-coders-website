'use client';

import { Label, Pie, PieChart } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

type LeadStatusDonutChartProps = {
  data: Array<{
    status: 'new' | 'qualified' | 'inProgress' | 'closed';
    leads: number;
    fill: string;
  }>;
};

const chartConfig = {
  leads: {
    label: 'Leads',
  },
  new: {
    label: 'New',
    color: 'var(--chart-1)',
  },
  qualified: {
    label: 'Qualified',
    color: 'var(--chart-2)',
  },
  inProgress: {
    label: 'In progress',
    color: 'var(--chart-3)',
  },
  closed: {
    label: 'Closed',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

export function LeadStatusDonutChart({ data }: LeadStatusDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.leads, 0);

  if (total === 0) {
    return (
      <div className="flex min-h-72 items-center justify-center text-sm text-muted-foreground">
        Lead distribution will appear when leads are captured.
      </div>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square min-h-72 w-full max-w-md"
    >
      <PieChart accessibilityLayer>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              nameKey="status"
            />
          }
        />
        <Pie
          data={data}
          dataKey="leads"
          nameKey="status"
          innerRadius={66}
          strokeWidth={4}
        >
          <Label
            content={({ viewBox }) => {
              if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) {
                return null;
              }

              return (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground text-3xl font-semibold"
                  >
                    {total.toLocaleString()}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={(viewBox.cy ?? 0) + 24}
                    className="fill-muted-foreground text-xs"
                  >
                    Total leads
                  </tspan>
                </text>
              );
            }}
          />
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="status" />}
          className="-translate-y-2 flex-wrap gap-x-4 gap-y-2"
        />
      </PieChart>
    </ChartContainer>
  );
}
