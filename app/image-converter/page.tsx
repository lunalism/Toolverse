// app/image-converter/page.tsx
'use client'

import { useState } from "react";
import Dropzone from "@/components/image-converter/Dropzone";
import FormatSelector from "@/components/image-converter/FormatSelector";

export default function ImageConverterPage() {
  const [format, setFormat] = useState("jpg");
  const [optimize, setOptimize] = useState(true);

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🖼️ 이미지 변환기</h1>
      <h3 className="text-sm text-muted-foreground mb-6 text-center">
        HEIC, JPG, PNG 등을 웹에서 바로 JPG/PNG/WEBP로 변환해보세요
      </h3>
      <Dropzone />
      <FormatSelector format={format} onFormatChange={setFormat} optimize={optimize} onOptimizeToggle={setOptimize} />
    </main>
  );
}
