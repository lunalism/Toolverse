// src/components/tools/word-counter.tsx

"use client";

import { useState, useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { StatCard } from "@/components/tools/StatCard";

export function WordCounter() {
    const [text, setText] = useState("");

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const stats = useMemo(() => {
        const charCount = text.length;
        const charCountWithoutSpaces = text.replace(/\s/g, "").length;
        const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const lineCount = text.split("\n").length;

        return { charCount, charCountWithoutSpaces, wordCount, lineCount };
    }, [text]);


    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">글자 수 세기</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
                <Textarea placeholder="여기에 텍스트를 입력하세요." className="h-[700px] md:h-[700px] md:w-4/5" value={text} onChange={handleTextChange} />
                <div className="md:w-1/5 flex flex-col gap-4">
                    <StatCard title="글자 (공백 포함)" value={stats.charCount} />
                    <StatCard title="글자 (공백 제외)" value={stats.charCountWithoutSpaces} />
                    <StatCard title="단어" value={stats.wordCount} />
                    <StatCard title="줄" value={stats.lineCount} />
                </div>
            </CardContent>
        </Card>
    );
}