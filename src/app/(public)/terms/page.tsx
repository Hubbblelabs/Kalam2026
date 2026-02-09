'use client';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-cream pt-32 pb-20">
            <div className="container-custom max-w-4xl">
                <h1 className="font-heading font-bold text-4xl md:text-5xl text-neutral-dark mb-8">Terms and Conditions</h1>

                <div className="prose prose-lg prose-blue max-w-none text-neutral-dark/60">
                    <p>Last updated: January 2026</p>

                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing and using the Kalam 2026 website and registering for events, you agree to be bound by these Terms and Conditions.</p>

                    <h3>2. Registration and Participation</h3>
                    <p>Participants must provide accurate information during registration. The organizers reserve the right to disqualify any participant found violating the code of conduct or providing false information.</p>

                    <h3>3. Event Rules</h3>
                    <p>All participants must adhere to the specific rules and regulations of the events they have registered for. Decisions made by the judges and organizers are final and binding.</p>

                    <h3>4. Intellectual Property</h3>
                    <p>Any project or idea presented during the hackathon remains the intellectual property of the participants. However, Kalam 2026 reserves the right to showcase these projects for promotional purposes.</p>

                    <h3>5. Code of Conduct</h3>
                    <p>We are dedicated to providing a harassment-free experience for everyone. Harassment of any form will not be tolerated and may result in immediate expulsion from the event.</p>

                    <h3>6. Limitation of Liability</h3>
                    <p>The organizers shall not be held liable for any loss of property or injury sustained during the event, although necessary safety measures will be in place.</p>
                </div>
            </div>
        </div>
    );
}
