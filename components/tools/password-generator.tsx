// src/components/tools/password-generator.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from "sonner" // <-- sonner의 toast 함수 import

// 각 문자 유형에 대한 상수 문자열을 정의합니다.
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  // 암호를 생성하는 핵심 함수입니다.
  const generatePassword = () => {
    let allChars = '';
    let generatedPassword = '';

    if (includeLowercase) {
      allChars += lowercaseChars;
    }
    if (includeUppercase) {
      allChars += uppercaseChars;
    }
    if (includeNumbers) {
      allChars += numberChars;
    }
    if (includeSymbols) {
      allChars += symbolChars;
    }

    if (allChars.length === 0) {
      toast("옵션 선택 오류", {
        description: "하나 이상의 옵션을 선택해야 합니다.",
        duration: 3000,
        position: 'top-center'
      });
      return;
    }

    if (includeLowercase) generatedPassword += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    if (includeUppercase) generatedPassword += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    if (includeNumbers) generatedPassword += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    if (includeSymbols) generatedPassword += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
    
    for (let i = generatedPassword.length; i < length; i++) {
      generatedPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');

    setPassword(generatedPassword);
  };

  // 클립보드에 암호를 복사하는 함수입니다.
  const copyToClipboard = () => {
    if (!password) {
      toast("복사 오류", {
        description: "먼저 암호를 생성해주세요.",
        duration: 3000,
        position: 'top-center',
        
      });
      return;
    }
    
    navigator.clipboard.writeText(password)
      .then(() => {
        toast("암호 복사 완료!", {
          description: "클립보드에 암호가 복사되었습니다.",
          duration: 3000,
          position: 'top-center',
        });
      })
      .catch((err) => {
        toast("복사 실패", {
          description: "클립보드 복사에 실패했습니다. 직접 복사해 주세요.",
          duration: 3000,
          position: 'top-center',
        });
      });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">복잡한 암호 생성기</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 생성된 암호가 표시될 입력창과 복사 버튼 */}
        <div className="flex w-full items-center space-x-2">
          <Input type="text" readOnly value={password} />
          <Button onClick={generatePassword}>생성</Button>
          <Button variant="outline" onClick={copyToClipboard}>복사</Button>
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
            <Switch
              id="include-uppercase"
              checked={includeUppercase}
              onCheckedChange={setIncludeUppercase}
            />
            <Label htmlFor="include-uppercase">대문자 포함</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="include-lowercase"
              checked={includeLowercase}
              onCheckedChange={setIncludeLowercase}
            />
            <Label htmlFor="include-lowercase">소문자 포함</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="include-numbers"
              checked={includeNumbers}
              onCheckedChange={setIncludeNumbers}
            />
            <Label htmlFor="include-numbers">숫자 포함</Label>
          </div>
          <div className="flex items-center space-x-2">
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