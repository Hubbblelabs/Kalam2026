
import { Metadata } from 'next';
import { AuthPageLayout } from '@/components/auth/AuthPageLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
    title: 'Admin Login',
    description: 'Secure access for administrators.',
};

export default function AdminLoginPage() {
    return (
        <AuthPageLayout
            heading="Admin Panel"
            subHeading="Control Center."
            description="Manage events, participants, and platform settings."
            statLabel="System Status"
            statCount="Online"
            formTitle="Admin Access"
            alternativeLinkText="Go back to"
            alternativeLinkAction="Home"
            alternativeLinkTarget="/"
        >
            <LoginForm isAdmin={true} />
        </AuthPageLayout>
    );
}
