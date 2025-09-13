// src/app/image/converter/page.tsx

"use client";

import { useState, ChangeEvent, DragEvent, useEffect } from 'react';

export default function ImageConverterPage() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string>('');
    
    // 👇 변환할 포맷을 저장할 state
    const [targetFormat, setTargetFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');

    const handleFile = (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
        setOriginalFile(file);
        const previewUrl = URL.createObjectURL(file);
        setOriginalPreviewUrl(previewUrl);
        } else {
        setOriginalFile(null);
        setOriginalPreviewUrl('');
        if (file) alert('이미지 파일만 업로드해주세요.');
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { handleFile(e.target.files?.[0] || null); };
    const handleDragOver = (e: DragEvent<HTMLElement>) => { e.preventDefault(); };
    const handleDrop = (e: DragEvent<HTMLElement>) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0] || null); };

    useEffect(() => {
        return () => { if (originalPreviewUrl) { URL.revokeObjectURL(originalPreviewUrl); } };
    }, [originalPreviewUrl]);

    return (
        <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-black tracking-tighter">이미지 포맷 변환</h1>
            <p className="text-lg text-gray-600 mt-2">
            이미지를 JPG, PNG, WEBP 포맷으로 변환하세요.
            </p>
        </div>

        {!originalFile && (
            <div className="w-full max-w-2xl mx-auto" onDragOver={handleDragOver} onDrop={handleDrop}>
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <p>이미지 파일을 이곳에 드롭하거나 클릭하여 업로드하세요</p>
                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
            </div>
        )}

        {originalFile && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">원본 이미지</h2>
                <div className="border rounded-lg p-2 bg-gray-50 flex items-center justify-center min-h-[200px]">
                {originalPreviewUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={originalPreviewUrl} alt="Original Preview" className="max-w-full max-h-96 rounded" />
                )}
                </div>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">변환 옵션</h2>
                <div className="border rounded-lg p-4 bg-white space-y-4 shadow-sm">
                <div>
                    <label className="text-sm font-medium">변환할 포맷</label>
                    <div className="flex items-center gap-6 mt-2">
                    <label className="flex items-center"><input type="radio" name="format" value="jpeg" checked={targetFormat === 'jpeg'} onChange={() => setTargetFormat('jpeg')} className="h-4 w-4 text-indigo-600 border-gray-300" /> <span className="ml-2">JPG</span></label>
                    <label className="flex items-center"><input type="radio" name="format" value="png" checked={targetFormat === 'png'} onChange={() => setTargetFormat('png')} className="h-4 w-4 text-indigo-600 border-gray-300" /> <span className="ml-2">PNG</span></label>
                    <label className="flex items-center"><input type="radio" name="format" value="webp" checked={targetFormat === 'webp'} onChange={() => setTargetFormat('webp')} className="h-4 w-4 text-indigo-600 border-gray-300" /> <span className="ml-2">WEBP</span></label>
                    </div>
                </div>

                <button className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
                    포맷 변환 & 다운로드
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}