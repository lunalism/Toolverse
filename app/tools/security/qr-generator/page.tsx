// app/tools/security/qr-generator/page.tsx

import { QrGenerator } from '@/components/tools/qr-generator';

export default function QrGeneratorPage() {
    return (
        <div className="container py-10 max-w-5xl mx-auto">
            <QrGenerator />
        </div>
    );
}