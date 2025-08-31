// src/components/tools/text-comparator.tsx

"use client";

import { useState } from 'react'; // <-- useState import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function TextComparator() {
    // 텍스트 상태 관리
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    
    // 비교 결과 표시 여부 상태 관리
    const [showResult, setShowResult] = useState(false);

    // '비교하기' 버튼 클릭 핸들러
    const handleCompareClick = () => {
        // 여기에 비교 로직을 추가할 예정입니다.
        // 현재는 버튼을 누르면 결과 섹션을 보이게만 합니다.
        setShowResult(true);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">글자 비교</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
                <Textarea
                    placeholder="첫 번째 텍스트를 입력하세요."
                    className="h-[600px] md:w-1/2"
                    value={text1}
                    onChange={(e) => setText1(e.target.value)}
                />
                <Textarea
                    placeholder="두 번째 텍스트를 입력하세요."
                    className="h-[600px] md:w-1/2"
                    value={text2}
                    onChange={(e) => setText2(e.target.value)}
                />
            </CardContent>
            <div className="flex justify-center p-6">
                <Button size="lg" onClick={handleCompareClick}>
                    비교하기
                </Button>
            </div>

            {/* showResult 상태가 true일 때만 결과를 보여줍니다. */}
            {showResult && (
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">비교 결과</h3>
                    {/* 결과가 여기에 표시됩니다. */}
                </div>
            )}
        </Card>
    );
}