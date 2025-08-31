// app/tools/security/password-generator/page.tsx

import { PasswordGenerator } from '@/components/tools/password-generator';

export default function PasswordGeneratorPage() {
    return (
        <>
            <div className="container py-10 max-w-5xl mx-auto">
                <PasswordGenerator />
            </div>

            {/* 새로운 정보 섹션 */}
            <div className="container py-10 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">안전한 암호가 중요한 이유</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    복잡한 암호는 해커의 무작위 공격(brute-force attack)으로부터<br />
                    개인정보를 안전하게 보호하는 첫 번째 방어선입니다.<br />
                    암호의 길이가 길고, 문자, 숫자, 특수 문자가 다양하게 조합될수록 예측하기 어려워져 보안이 강화됩니다.
                </p>
            </div>
        </>
    );
}