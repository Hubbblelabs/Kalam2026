import { Metadata } from 'next';
import { AuthPageLayout } from '@/components/auth/AuthPageLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Log in to manage your participation.',

};

export default function LoginPage() {
    return (
        <AuthPageLayout
            heading="Welcome Back"
            subHeading="Innovator."
            description="Log in to access your account, manage registrations, and stay updated."

            statLabel="Official Portal"
            statCount="2026 Edition"
            formTitle="Sign In"
            alternativeLinkText="Don't have an account?"
            alternativeLinkAction="Create Account"
            alternativeLinkTarget="/register"
        >
            <LoginForm />
        </AuthPageLayout>
    );
}
