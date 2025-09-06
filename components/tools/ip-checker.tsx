// src/components/tools/ip-checker.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function IpChecker() {
    const [ipInfo, setIpInfo] = useState<any | null>(null);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">IP 주소 확인</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="p-6 border rounded-md">
                        {ipInfo ? (
                            <div className="space-y-2">
                                <p><strong>IP 주소:</strong> {ipInfo.ip}</p>
                                <p><strong>국가:</strong> {ipInfo.country_name}</p>
                                <p><strong>도시:</strong> {ipInfo.city}</p>
                                <p><strong>ISP:</strong> {ipInfo.organization}</p>
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center">IP 주소를 확인하는 중...</p>
                        )}
                    </div>
                <Button onClick={() => window.location.reload()}>새로고침</Button>
                </div>
            </CardContent>
        </Card>
    );
}