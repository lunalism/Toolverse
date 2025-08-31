// app/tools/security/password-generator/page.tsx

import { PasswordGenerator } from '@/components/tools/password-generator';

export default function PasswordGeneratorPage() {
    return (
        <div className="container py-10 max-w-5xl mx-auto">
            <PasswordGenerator />
        </div>
    );
}