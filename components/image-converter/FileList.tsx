// components/FileList.tsx
"use client";

import FileItem from "./FileItem";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

type Props = {
    files: File[];
    onRemove: (index: number) => void;
    outputFormat: string;
};

export default function FileList({ files, onRemove, outputFormat }: Props) {
    const [progress, setProgress] = useState(0);

    const handleConvertAll = () => {
        // 변환 로직은 나중에 연결
        setProgress(100); // 예시
    };

    const handleReset = () => {
        window.location.reload(); // 간단 초기화
    };

    return (
        <div className="mt-10 p-6 rounded-xl border bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">일괄 변환 ({files.length})</h3>
                <div className="space-x-2">
                    <Button onClick={handleConvertAll}>일괄 변환</Button>
                    <Button variant="outline" onClick={handleReset}>초기화</Button>
                </div>
            </div>

            <Progress value={(files.length === 0 ? 0 : progress)} className="h-2" />
            <div className="text-right text-xs text-muted-foreground mt-1">
                {files.length === 0 ? "0 / 0 (0%)" : `${progress ? files.length : 0} / ${files.length} (${progress}%)`}
            </div>

            <div className="space-y-3">
                {files.map((file, idx) => (
                    <FileItem
                        key={idx}
                        file={file}
                        outputFormat={outputFormat}
                        onRemove={() => onRemove(idx)}
                    />
                ))}
            </div>
        </div>
    );
}
