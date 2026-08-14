import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Settings | fanaticCoders',
};

export default function SettingsPage() {
  redirect('/dashboard/settings/profile');
}
