import { AuthForm } from '@/components/auth/AuthForm';

export const metadata = {
  title: 'Create account | fanaticCoders',
};

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
