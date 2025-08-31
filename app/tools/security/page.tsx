// app/tools/security/page.tsx

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SecurityToolsPage() {
    return (
        <div className="container py-10 max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">보안 도구</h1>
            <p className="text-lg text-muted-foreground mb-8">
                개인 정보를 안전하게 지키는 데 도움이 되는 도구들입니다.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                <Card>
                    <CardHeader>
                        <CardTitle>복잡한 암호 생성기</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            안전한 무작위 암호를 생성해 드립니다.
                        </p>
                        <Link href="/tools/security/password-generator">
                            <Button>도구 사용하기</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}