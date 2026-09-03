import { AuthForm } from '@/components/auth/AuthForm';
import { getSafeDashboardRedirectPath } from '@/lib/auth/redirect';

export const metadata = {
  title: 'Sign in | fanaticCoders',
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return (
    <AuthForm
      mode="login"
      redirectPath={getSafeDashboardRedirectPath(next)}
    />
  );
}
