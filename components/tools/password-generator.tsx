// src/components/tools/password-generator.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// 각 문자 유형에 대한 상수 문자열을 정의합니다.
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

// 각 문자에 대한 타입을 반환하는 헬퍼 함수
const getCharType = (char: string) => {
  if (uppercaseChars.includes(char)) return 'uppercase';
  if (lowercaseChars.includes(char)) return 'lowercase';
  if (numberChars.includes(char)) return 'number';
  if (symbolChars.includes(char)) return 'symbol';
  return 'other';
};

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('random');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  // 암호를 생성하는 핵심 함수입니다.
  const generatePassword = () => {
    let allChars = '';
    let generatedPassword = '';

    if (mode === 'pin') {
      allChars = numberChars;
    } else {
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
    }

    if (allChars.length === 0) {
      toast("옵션 선택 오류", {
        description: "하나 이상의 옵션을 선택해야 합니다.",
        duration: 3000,
        position: 'top-center'
      });
      return;
    }

    if (mode === 'random') {
      if (includeLowercase) generatedPassword += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
      if (includeUppercase) generatedPassword += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
      if (includeNumbers) generatedPassword += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
      if (includeSymbols) generatedPassword += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
    }
    
    for (let i = generatedPassword.length; i < length; i++) {
      generatedPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    if (mode === 'random') {
      generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');
    }

    setPassword(generatedPassword);
  };

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
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-2xl mb-4 md:mb-0">
          복잡한 암호 생성기
        </CardTitle>
        <ToggleGroup type="single" value={mode} onValueChange={setMode}>
          <ToggleGroupItem value="random" aria-label="Toggle random">
            무작위
          </ToggleGroupItem>
          <ToggleGroupItem value="pin" aria-label="Toggle pin">
            PIN
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      
      <CardContent className="flex flex-col md:flex-row gap-6">
        {/* 왼쪽 섹션: 암호 표시 및 버튼 */}
        <div className="md:w-1/2 flex flex-col justify-center gap-4">
          {/* input을 div로 교체하고 스타일을 입힙니다. */}
          <div className="flex w-full items-center rounded-md border border-input bg-background px-3 py-2 text-xl font-mono">
            {password.split('').map((char, index) => {
              const charType = getCharType(char);
              const colorClass = 
                charType === 'uppercase' ? 'text-blue-500 dark:text-blue-300' :
                charType === 'lowercase' ? 'text-yellow-500 dark:text-yellow-300' :
                charType === 'number' ? 'text-green-500 dark:text-green-300' :
                charType === 'symbol' ? 'text-red-500 dark:text-red-300' : '';
              
              return (
                <span key={index} className={colorClass}>
                  {char}
                </span>
              );
            })}
          </div>
          <div className="flex justify-between gap-4">
            <Button onClick={generatePassword} className="flex-1">
              생성
            </Button>
            <Button variant="outline" onClick={copyToClipboard} className="flex-1">
              복사
            </Button>
          </div>
        </div>

        {/* 오른쪽 섹션: 컨트롤러 */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {/* 암호 길이 설정 슬라이더 */}
          <div>
            <div className="flex items-center justify-between">
              <Label>
                {mode === 'pin' ? "PIN 길이" : "암호 길이"}: {length}
              </Label>
            </div>
            <Slider
              min={mode === 'pin' ? 4 : 8}
              max={mode === 'pin' ? 12 : 32}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              className="mt-2"
            />
          </div>

          {/* 옵션 설정 스위치들 */}
          {mode === 'random' && (
            <div className="grid grid-cols-2 gap-4">
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
          )}
        </div>
      </CardContent>
    </Card>
  );
}