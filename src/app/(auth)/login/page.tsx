import { AuthForm } from '@/components/auth/AuthForm';

export const metadata = {
  title: 'Sign in | fanaticCoders',
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
