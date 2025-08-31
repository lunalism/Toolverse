// src/components/tools/qr-generator.tsx

"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import QRCode from "react-qr-code";
import * as htmlToImage from 'html-to-image'; // <-- 라이브러리 import

export function QrGenerator() {
    const [inputValue, setInputValue] = useState('');
    const qrCodeRef = useRef<HTMLDivElement>(null); // QR 코드를 감싸는 div에 연결할 ref

    // QR 코드를 PNG 이미지로 다운로드하는 함수
    const handleDownload = () => {
        if (qrCodeRef.current) {
        // html-to-image 라이브러리의 toPng 함수를 사용해 QR 코드를 이미지로 변환합니다.
        htmlToImage.toPng(qrCodeRef.current)
            .then(function (dataUrl) {
            // 이미지를 다운로드하기 위한 가상의 링크를 생성합니다.
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = dataUrl;
            link.click(); // 링크를 클릭해 다운로드를 실행합니다.
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">QR 코드 생성기</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* 입력 섹션 */}
                    <div className="md:w-1/2 flex flex-col gap-4">
                        <Input
                        type="text"
                        placeholder="QR 코드로 만들 텍스트나 URL을 입력하세요."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                            텍스트를 입력할 때마다 실시간으로 QR 코드가 생성됩니다.
                        </p>
                        {/* 다운로드 버튼 */}
                        {inputValue && (
                            <Button onClick={handleDownload} className="mt-2">
                                QR 코드 다운로드
                            </Button>
                        )}
                    </div>
                    {/* QR 코드 표시 섹션 */}
                    <div
                        ref={qrCodeRef} // ref를 div에 연결합니다.
                        className="md:w-1/2 flex items-center justify-center border border-dashed rounded-md p-6 min-h-[250px] relative"
                    >
                        {inputValue ? (
                        <div className="bg-white p-2">
                            <QRCode
                            value={inputValue}
                            size={220}
                            />
                        </div>
                        ) : (
                            <p className="text-muted-foreground">여기에 QR 코드가 표시됩니다.</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}