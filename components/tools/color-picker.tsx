// src/components/tools/color-picker.tsx

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Pipette } from 'lucide-react';
import { colord, extend } from 'colord';
import cmykPlugin from 'colord/plugins/cmyk';

declare global {
    interface Window {
        EyeDropper: any;
    }
}

extend([cmykPlugin]);

export function ColorPicker() {
    const [color, setColor] = useState('#F1BB06');
    const [format, setFormat] = useState('hex');
    const [colorCode, setColorCode] = useState('');

    const handleEyeDropper = async () => {
        if (!window.EyeDropper) {
            alert("이 브라우저에서는 EyeDropper API가 지원되지 않습니다.");
            return;
        }

        const eyeDropper = new window.EyeDropper();
            try {
                const result = await eyeDropper.open();
                setColor(result.sRGBHex);
            } catch (e) {
                console.error("EyeDropper API 사용 중 오류 발생", e);
        }
    };

    useEffect(() => {
        const colorInstance = colord(color);
        let newCode = '';
        
        if (format === 'hex') {
            newCode = colorInstance.toHex();
        } else if (format === 'rgb') {
            const rgb = colorInstance.toRgb();
            newCode = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        } else if (format === 'cmyk') {
            const cmyk = colorInstance.toCmyk();
            newCode = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
        }
        
        setColorCode(newCode);
    }, [color, format]);

    const paletteColors = ['#FEEA84', '#F4944A', '#512A4F', '#7E9181', '#A6213B', '#B4C5E4'];
    
    // 선택된 색상의 밝기를 기반으로 글자색을 결정하는 헬퍼 함수
    const getContrastTextColor = () => {
        const isLight = colord(color).isLight();
        return isLight ? 'text-black' : 'text-white';
    };

    return (
        <div className="h-185 flex flex-col justify-center items-center text-center transition-colors duration-500" style={{ backgroundColor: color }}>
            {/* 메인 카드 */}
            <div className={`bg-[#2A2530] text-white rounded-xl p-5 w-[50%] max-w-md shadow-lg ${getContrastTextColor()}`}>
                <h1 className="text-3xl font-semibold mb-4">색상 선택기</h1>
                <p className="text-sm mb-6">
                    아래의 색상 선택기 버튼을 클릭하고 화면의 색상을 선택하세요!
                </p>

                <div className="flex flex-col items-center">
                    <Button
                        variant="ghost"
                        onClick={handleEyeDropper}
                        className="bg-white rounded-full p-5 h-20 w-20 flex items-center justify-center mb-6 shadow-md hover:bg-white/90 transition"
                    >
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Pipette className="text-blue-500 w-8 h-8" />
                        </div>
                    </Button>

                    <div className="text-sm mb-1">선택된 색상:</div>
                    <div className="text-xl font-bold mb-4">{colorCode}</div>

                    <ToggleGroup
                        type="single"
                        value={format}
                        onValueChange={setFormat}
                        className="justify-center items-center text-center border mt-4"
                    >
                        <ToggleGroupItem value="hex">HEX</ToggleGroupItem>
                        <ToggleGroupItem value="rgb">RGB</ToggleGroupItem>
                        <ToggleGroupItem value="cmyk">CMYK</ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>

            {/* 팔레트 카드 */}
            <div className="bg-white rounded-xl mt-8 p-4 flex items-center justify-center gap-4 shadow-md">
                {paletteColors.map((hex, index) => (
                    <div
                        key={index}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border cursor-pointer transition hover:scale-105"
                        style={{ backgroundColor: hex }}
                        onClick={() => setColor(hex)}
                    />
                ))}
            </div>
        </div>
    );
}