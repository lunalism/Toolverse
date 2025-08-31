// src/components/tools/word-counter.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function WordCounter() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">글자 수 세기</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea placeholder="여기에 텍스트를 입력하세요." className="h-[500px]" />
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex-1">
                        <span className="font-semibold text-primary">0</span> 글자 (공백 포함)
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold text-primary">0</span> 글자 (공백 제외)
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold text-primary">0</span> 단어
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold text-primary">0</span> 줄
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}