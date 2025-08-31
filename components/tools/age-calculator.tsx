// src/components/tools/age-calculator.tsx

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { differenceInYears, isValid } from 'date-fns';

export function AgeCalculator() {
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState<string | null>(null);

  useEffect(() => {
    // birthdate가 유효한 날짜 형식인지 확인합니다.
    if (birthdate && isValid(new Date(birthdate))) {
      const birthDateObj = new Date(birthdate);
      const today = new Date();
      
      // date-fns의 differenceInYears 함수를 사용해 나이를 계산합니다.
      const calculatedAge = differenceInYears(today, birthDateObj);
      
      setAge(`${calculatedAge}세`);
    } else {
      // 날짜가 유효하지 않으면 결과 상태를 초기화합니다.
      setAge(null);
    }
  }, [birthdate]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">나이 계산기</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* 입력 섹션 */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <Label htmlFor="birthdate">생년월일</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>

          {/* 결과 섹션 */}
          <div className="md:w-1/2 flex items-center justify-center p-6 border rounded-md min-h-[150px]">
            {age !== null ? (
              <p className="text-2xl font-bold">{age}</p>
            ) : (
              <p className="text-muted-foreground">생년월일을 입력해주세요.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}