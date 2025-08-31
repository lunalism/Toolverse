// app/tools/text/page.tsx

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TextToolsPage() {
    return (
        <div className="container py-10 max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">텍스트 도구</h1>
            <p className="text-lg text-muted-foreground mb-8">
                다양한 텍스트 관련 도구들을 사용해 보세요.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {/* 글자 수 세기 */}
                <Card>
                    <CardHeader>
                        <CardTitle>글자 수 세기</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            실시간으로 글자 수, 단어 수, 줄 수를 계산해 드립니다.
                        </p>
                        <Link href="/tools/text/word-counter">
                            <Button>도구 사용하기</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* 글자 비교 */}
                <Card>
                    <CardHeader>
                        <CardTitle>글자 비교</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            두 텍스트의 차이점을 찾아 시각적으로 보여줍니다.
                        </p>
                        <Link href="/tools/text/text-comparator">
                            <Button>도구 사용하기</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* 다른 텍스트 도구들이 여기에 추가될 예정입니다. */}
            </div>
        </div>
    );
}