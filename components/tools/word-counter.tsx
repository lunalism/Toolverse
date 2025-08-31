// src/components/tools/word-counter.tsx

"use client";

import { useState, useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

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
            <CardContent>
                <Textarea placeholder="여기에 텍스트를 입력하세요." className="h-[500px]" value={text} onChange={handleTextChange} />
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex-1">
                        <span className="font-semibold text-primary">{stats.charCount}</span> 글자 (공백 포함)
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold text-primary">{stats.charCountWithoutSpaces}</span> 글자 (공백 제외)
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold text-primary">{stats.wordCount}</span> 단어
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold text-primary">{stats.lineCount}</span> 줄
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}