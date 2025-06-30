// app/image-converter/page.tsx
import Dropzone from "@/components/image-converter/Dropzone";

export default function ImageConverterPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🖼️ 이미지 변환기</h1>
      <h3 className="text-sm text-muted-foreground mb-6 text-center">
        HEIC, JPG, PNG 등을 웹에서 바로 JPG/PNG/WEBP로 변환해보세요
      </h3>
      <Dropzone />
    </main>
  );
}
