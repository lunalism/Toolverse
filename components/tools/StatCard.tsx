// src/components/tools/StatCard.tsx

"use client"; // 이 컴포넌트는 클라이언트에서 렌더링됩니다.

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react"; // 상태 관리를 위한 훅을 import 합니다.

interface StatCardProps {
    title: string;
    value: number;
}

export function StatCard({ title, value }: StatCardProps) {
    const [animatedValue, setAnimatedValue] = useState(value);
    const [isAnimating, setIsAnimating] = useState(false);

    // 'value' prop이 변경될 때마다 애니메이션을 트리거합니다.
    useEffect(() => {
        // 새로운 값이 들어오면 애니메이션을 시작합니다.
        setIsAnimating(true);
        
        // 300ms(0.3초) 후에 애니메이션을 끝내고 값을 업데이트합니다.
        const timer = setTimeout(() => {
        setAnimatedValue(value);
        setIsAnimating(false);
        }, 300);

        // 컴포넌트가 언마운트되거나 'value'가 다시 변경되면 타이머를 정리합니다.
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <Card className="flex flex-col justify-between p-4 min-h-[100px]">
            <CardTitle className="text-sm font-normal text-muted-foreground line-clamp-2">
                {title}
            </CardTitle>
            <CardContent className="flex items-center justify-end p-0 pt-2">
                <span
                className={`
                    // 투명도(opacity)와 관련된 전환 효과를 설정합니다.
                    transition-opacity duration-300 ease-in
                    text-3xl font-bold text-primary
                    // 애니메이션 상태에 따라 투명도를 변경합니다.
                    ${isAnimating ? 'opacity-0' : 'opacity-100'}
                `}
                >
                    {animatedValue}
                </span>
            </CardContent>
        </Card>
    );
}