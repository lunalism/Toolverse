// app/image-converter/page.tsx
'use client'

import { useState } from "react";
import Dropzone from "@/components/image-converter/Dropzone";
import FormatSelector from "@/components/image-converter/FormatSelector";
import FileList from "@/components/image-converter/FileList";

export default function ImageConverterPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState("jpg");
  const [optimize, setOptimize] = useState(true);

  const handleDrop = (incoming: File[]) => {
    setFiles((prev) => [...prev, ...incoming]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-2 text-center">🖼️ 이미지 변환기</h1>
      <h3 className="text-sm text-muted-foreground mb-6 text-center">
        HEIC, JPG, PNG 등 이미지를 웹에서 바로 JPG / PNG / WEBP로 변환해보세요
      </h3>

      <Dropzone onDrop={handleDrop} />
      {files.length > 0 && (
        <>
          <FormatSelector
            format={format}
            onFormatChange={setFormat}
            optimize={optimize}
            onOptimizeToggle={setOptimize}
          />
          <FileList files={files} outputFormat={format} onRemove={handleRemove} />
        </>
      )}
    </main>
  );
}
