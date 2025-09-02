// src/components/tools/palette-generator.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// --- 핵심 색상 변환 로직 (라이브러리 없이 직접 구현) ---

// HEX 색상을 HSL 색상으로 변환하는 함수
function hexToHsl(hex: string) {
  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

// HSL 색상을 HEX 색상으로 변환하는 함수
function hslToHex(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // 단색조
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#10b981');
  const [palette, setPalette] = useState<string[]>([]);
  const [paletteType, setPaletteType] = useState('analogous');

  const generatePalette = () => {
    // 6자리 HEX 코드가 아닐 경우 오류 처리
    if (!/^#[0-9A-F]{6}$/i.test(baseColor)) {
        alert('유효한 6자리 HEX 색상 코드를 입력해주세요.');
        setPalette([]);
        return;
    }
    
    let [h, s, l] = hexToHsl(baseColor);
    let newPalette: string[] = [];

    // 팔레트 유형에 따라 HSL 값을 조작합니다.
    if (paletteType === 'analogous') {
      newPalette = [
        hslToHex(h, s, l),
        hslToHex((h + 30) % 360, s, l),
        hslToHex((h - 30 + 360) % 360, s, l),
      ];
    } else if (paletteType === 'complementary') {
      newPalette = [
        hslToHex(h, s, l),
        hslToHex((h + 180) % 360, s, l),
      ];
    } else if (paletteType === 'triadic') {
      newPalette = [
        hslToHex(h, s, l),
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h - 120 + 360) % 360, s, l),
      ];
    }
    
    setPalette(newPalette);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">컬러 팔레트 조합</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 flex flex-col gap-4">
            <Label htmlFor="base-color">기준 색상 (HEX)</Label>
            <div className="flex gap-2">
              <div
                className="w-10 h-10 rounded-md border"
                style={{ backgroundColor: baseColor }}
              ></div>
              <Input
                type="text"
                id="base-color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
              />
            </div>
            
            <Label className="mt-4">팔레트 유형</Label>
            <ToggleGroup type="single" value={paletteType} onValueChange={setPaletteType} className="mt-2">
              <ToggleGroupItem value="analogous">유사색</ToggleGroupItem>
              <ToggleGroupItem value="complementary">보색</ToggleGroupItem>
              <ToggleGroupItem value="triadic">3색</ToggleGroupItem>
            </ToggleGroup>

            <Button onClick={generatePalette} className="mt-4">팔레트 생성</Button>
          </div>

          <div className="md:w-1/2 flex flex-wrap gap-4 items-center justify-center border rounded-md p-6">
            {palette.length > 0 ? (
              palette.map((color, index) => (
                <div
                  key={index}
                  className="w-16 h-16 rounded-md border"
                  style={{ backgroundColor: color }}
                ></div>
              ))
            ) : (
              <p className="text-muted-foreground">팔레트를 생성해주세요.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}