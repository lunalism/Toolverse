// src/components/tools/palette-generator.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#10b981');
  const [palette, setPalette] = useState<string[]>([]);

  // 이 함수는 아직 기능이 없습니다. 다음 단계에서 구현할 거예요.
  const generatePalette = () => {
    // 여기에 팔레트 생성 로직을 추가합니다.
    setPalette(['#ff0000', '#00ff00', '#0000ff']); // 임시 색상
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">컬러 팔레트 조합</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* 기준 색상 입력 섹션 */}
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
            <Button onClick={generatePalette}>팔레트 생성</Button>
          </div>

          {/* 팔레트 표시 섹션 */}
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