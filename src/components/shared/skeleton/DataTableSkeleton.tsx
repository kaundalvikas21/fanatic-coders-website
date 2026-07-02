import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

type DataTableSkeltonProps = {
  rows?: number;
  cols?: number;
  showPagination?: boolean;
  tableClassName?: string;
};

export function DataTableSkeleton({
  rows = 5,
  cols = 5,
  showPagination = false,
  tableClassName,
}: DataTableSkeltonProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border">
        <Table className={cn('min-w-190', tableClassName)}>
          <TableHeader className="bg-muted/40">
            <TableRow>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <TableHead
                  key={colIndex}
                  className="px-4"
                >
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: cols }).map((__, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="px-4 py-5 align-top"
                  >
                    <Skeleton className="h-5 w-full max-w-40" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <div className="flex items-center justify-between gap-3 px-4 pb-4">
          <Skeleton className="h-5 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-7 w-16" />
          </div>
        </div>
      )}
    </div>
  );
}

export { DataTableSkeleton as DataTableSkelton };
