// app/tools/pdf/page.tsx

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PdfToolsPage() {
    return (
        <div className="container py-10 max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">PDF 도구</h1>
            <p className="text-lg text-muted-foreground mb-8">
                PDF 문서를 편집하고 관리하는 데 유용한 도구들입니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                <Card>
                    <CardHeader>
                        <CardTitle>PDF 병합</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            여러 개의 PDF 파일을 하나의 파일로 합칩니다.
                        </p>
                        <Link href="/tools/pdf/pdf-merger">
                            <Button>도구 사용하기</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}