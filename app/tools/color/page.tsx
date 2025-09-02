// app/tools/color/page.tsx

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ColorToolsPage() {
    return (
        <div className="container py-10 max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">색상 도구</h1>
            <p className="text-lg text-muted-foreground mb-8">
                웹 디자인과 개발에 유용한 색상 관련 도구들입니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {/* 색상 선택기 카드 추가 */}
                <Card>
                    <CardHeader>
                        <CardTitle>색상 선택기</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                        화면의 색상을 추출하고 HEX, RGB, HSL 값을 확인합니다.
                        </p>
                        <Link href="/tools/color/color-picker">
                        <Button>도구 사용하기</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}