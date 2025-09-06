// src/components/tools/pdf-merger.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function PdfMerger() {
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleMerge = async () => {
        // 여기에 PDF 병합 로직을 구현할 예정입니다.
        setIsLoading(true);
        // ...
        setIsLoading(false);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">PDF 병합</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <Label htmlFor="pdf-files">병합할 PDF 파일 선택 (두 개 이상)</Label>
                    <Input id="pdf-files" type="file" multiple accept=".pdf" onChange={handleFileChange} />
                    <Button onClick={handleMerge} disabled={files.length < 2 || isLoading}>
                        {isLoading ? '병합 중...' : 'PDF 병합'}
                    </Button>
                    {files.length > 0 && (
                        <div className="mt-2 text-sm text-muted-foreground">
                            선택된 파일: {files.map(f => f.name).join(', ')}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}