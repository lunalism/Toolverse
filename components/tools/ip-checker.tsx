// src/components/tools/ip-checker.tsx

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function IpChecker() {
    const [ipInfo, setIpInfo] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchIpInfo = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. ip-api.com API로 상세 정보를 가져오려고 시도합니다.
            const response = await fetch('https://ip-api.com/json');
            if (!response.ok) {
                throw new Error('IP 정보를 불러오는데 실패했습니다.');
            }

            const data = await response.json();
            if (data.status === 'fail') {
                throw new Error(data.message);
            }
            setIpInfo(data);
        } catch (err: any) {
            // 2. 상세 정보 API 호출 실패 시, api.ipify.org로 IP 주소만 가져옵니다.
            console.error('상세 정보 API 실패, 대체 API를 사용합니다.', err);
            try {
                const fallbackResponse = await fetch('https://api.ipify.org?format=json');
                const fallbackData = await fallbackResponse.json();
                setIpInfo({ query: fallbackData.ip, country: '알 수 없음', city: '알 수 없음', isp: '알 수 없음' });
            } catch (fallbackErr) {
                setError('IP 정보를 가져올 수 없습니다.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchIpInfo();
    }, []);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">IP 주소 확인</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="p-6 border rounded-md min-h-[150px] flex items-center justify-center">
                        {isLoading ? (
                            <p className="text-muted-foreground text-center">IP 정보를 가져오는 중...</p>
                        ) : error ? (
                            <p className="text-destructive text-center">{error}</p>
                        ) : ipInfo ? (
                            <div className="space-y-2">
                                <p><strong>IP 주소:</strong> {ipInfo.query}</p>
                                <p><strong>국가:</strong> {ipInfo.country || ipInfo.country_name || '알 수 없음'}</p>
                                <p><strong>도시:</strong> {ipInfo.city || '알 수 없음'}</p>
                                <p><strong>ISP:</strong> {ipInfo.isp || ipInfo.organization || '알 수 없음'}</p>
                            </div>
                        ) : (
                        <p className="text-muted-foreground text-center">IP 정보를 확인할 수 없습니다.</p>
                        )}
                    </div>
                    <Button onClick={fetchIpInfo}>새로고침</Button>
                </div>
            </CardContent>
        </Card>
    );
}