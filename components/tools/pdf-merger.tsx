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
    setIsLoading(true);
    
    // FormData 객체를 만들어 파일을 추가합니다.
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      // 우리가 만든 API 라우트로 파일을 전송합니다.
      const response = await fetch('/api/pdf/merge', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('PDF 병합에 실패했습니다.');
      }
      
      // 응답으로 받은 PDF 파일을 blob 형태로 변환합니다.
      const blob = await response.blob();
      
      // 가상의 다운로드 링크를 만들어 파일을 저장합니다.
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert('PDF 파일이 성공적으로 병합되었습니다!');
      
    } catch (error: any) {
      alert(`오류 발생: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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