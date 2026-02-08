import { Metadata } from 'next';
import { AuthPageLayout } from '@/components/auth/AuthPageLayout';
import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Create your account to enable event registration, team formation, and certification.',
};

export default function RegisterPage() {
    return (
        <AuthPageLayout
            heading="Join the"
            subHeading="Revolution."
            description="Create your account to enable event registration, team formation, and certification."
            statLabel="Join the community"
            statCount="2000+ Innovators"
            formTitle="Create Account"
            alternativeLinkText="Already have an account?"
            alternativeLinkAction="Sign In"
            alternativeLinkTarget="/login"
        >
            <RegisterForm />
        </AuthPageLayout>
    );
}
