// src/components/tools/password-generator.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  // 새로운 상태 변수 추가 및 기본값 설정
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  // 이 함수는 아직 기능이 없습니다. 다음 단계에서 구현할 거예요.
  const generatePassword = () => {
    // 여기에 암호 생성 로직을 추가합니다.
    setPassword('...'); // 임시 텍스트
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">복잡한 암호 생성기</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 생성된 암호가 표시될 입력창 */}
        <div className="flex w-full items-center space-x-2">
          <Input type="text" readOnly value={password} />
          <Button onClick={generatePassword}>생성</Button>
        </div>

        {/* 암호 길이 설정 슬라이더 */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <Label>암호 길이: {length}</Label>
          </div>
          <Slider
            min={8}
            max={32}
            step={1}
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            className="mt-2"
          />
        </div>

        {/* 옵션 설정 스위치들 */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            {/* 대문자 포함 스위치 */}
            <Switch
              id="include-uppercase"
              checked={includeUppercase}
              onCheckedChange={setIncludeUppercase}
            />
            <Label htmlFor="include-uppercase">대문자 포함</Label>
          </div>
          <div className="flex items-center space-x-2">
            {/* 소문자 포함 스위치 */}
            <Switch
              id="include-lowercase"
              checked={includeLowercase}
              onCheckedChange={setIncludeLowercase}
            />
            <Label htmlFor="include-lowercase">소문자 포함</Label>
          </div>
          <div className="flex items-center space-x-2">
            {/* 숫자 포함 스위치 */}
            <Switch
              id="include-numbers"
              checked={includeNumbers}
              onCheckedChange={setIncludeNumbers}
            />
            <Label htmlFor="include-numbers">숫자 포함</Label>
          </div>
          <div className="flex items-center space-x-2">
            {/* 특수 문자 포함 스위치 */}
            <Switch
              id="include-symbols"
              checked={includeSymbols}
              onCheckedChange={setIncludeSymbols}
            />
            <Label htmlFor="include-symbols">특수 문자 포함</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}