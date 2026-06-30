import { DashboardShell } from '@/components/dashboard/DashboardShell';
import './global.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
