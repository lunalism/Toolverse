// app/tools/date-time/page.tsx

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DateTimeToolsPage() {
    return (
        <div className="container py-10 max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">날짜/시간 도구</h1>
            <p className="text-lg text-muted-foreground mb-8">
                다양한 날짜 및 시간 관련 도구들을 사용해 보세요.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {/* 날짜 계산기 카드 추가 */}
                <Card>
                    <CardHeader>
                        <CardTitle>나이 계산기</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            생년월일을 입력해 현재 나이를 계산해 드립니다.
                        </p>
                        <Link href="/tools/date-time/age-calculator">
                            <Button>도구 사용하기</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* 디데이 계산기 카드 추가 */}
                <Card>
                    <CardHeader>
                        <CardTitle>디데이 계산기</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            특정 날짜까지 남은 기간을 계산해 드립니다.
                        </p>
                        <Link href="/tools/date-time/d-day-calculator">
                            <Button>도구 사용하기</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* 날짜 차이 계산기 카드 추가 */}
                <Card>
                    <CardHeader>
                        <CardTitle>날짜 차이 계산기</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            두 날짜 사이의 기간을 정확하게 계산해 드립니다. (해외 체류 포함)
                        </p>
                        <Link href="/tools/date-time/date-difference-calculator">
                            <Button>도구 사용하기</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}