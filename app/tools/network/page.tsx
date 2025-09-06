// app/tools/network/page.tsx

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NetworkToolsPage() {
    return (
        <div className="container py-10 max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">네트워크 도구</h1>
            <p className="text-lg text-muted-foreground mb-8">
                네트워크와 관련된 정보를 확인하는 도구들입니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                <Card>
                    <CardHeader>
                        <CardTitle>IP 주소 확인</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                        내 공인 IP 주소와 위치 정보를 자동으로 확인합니다.
                        </p>
                        <Link href="/tools/network/ip-checker">
                        <Button>도구 사용하기</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}