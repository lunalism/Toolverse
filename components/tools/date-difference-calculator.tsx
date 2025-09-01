// src/components/tools/date-difference-calculator.tsx

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Plus } from "lucide-react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  isValid
} from 'date-fns';

// Period 데이터 타입을 정의합니다.
interface Period {
  id: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export function DateDifferenceCalculator() {
  const [mode, setMode] = useState('single');
  
  // 단일 기간 모드 상태
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [result, setResult] = useState<string | null>(null);

  // 복수 기간 모드 상태
  const [periods, setPeriods] = useState<Period[]>([{ id: 1, startDate: undefined, endDate: undefined }]);
  const [totalDays, setTotalDays] = useState<number | null>(null);
  const [totalResult, setTotalResult] = useState<string | null>(null);
  const [individualResults, setIndividualResults] = useState<{ id: number, result: string }[]>([]);

  useEffect(() => {
    // 단일 기간 모드 계산
    if (mode === 'single' && startDate && endDate && isValid(startDate) && isValid(endDate)) {
      const years = differenceInYears(endDate, startDate);
      const months = differenceInMonths(endDate, startDate);
      const weeks = differenceInWeeks(endDate, startDate);
      const days = differenceInDays(endDate, startDate);

      setResult(`${years}년 / ${months}개월 / ${weeks}주 / ${days}일`);
    } else if (mode === 'single') {
      setResult(null);
    }

    // 복수 기간 모드 계산
    if (mode === 'multiple') {
      const validPeriods = periods.filter(p => p.startDate && p.endDate && isValid(p.startDate) && isValid(p.endDate));
      if (validPeriods.length > 0) {
        // 각 기간의 결과를 계산합니다.
        const newIndividualResults = validPeriods.map(p => {
          const days = differenceInDays(p.endDate!, p.startDate!);
          const years = differenceInYears(p.endDate!, p.startDate!);
          const months = differenceInMonths(p.endDate!, p.startDate!);
          const weeks = differenceInWeeks(p.endDate!, p.startDate!);
          return {
            id: p.id,
            result: `${years}년 / ${months}개월 / ${weeks}주 / ${days}일`
          };
        });
        setIndividualResults(newIndividualResults);

        // 총합 결과를 계산합니다.
        const totalDays = validPeriods.reduce((sum, p) => sum + differenceInDays(p.endDate!, p.startDate!), 0);
        const totalYears = Math.floor(totalDays / 365.25);
        const remainingDays = totalDays % 365.25;
        const totalMonths = Math.floor(remainingDays / 30.44);
        const totalDaysFinal = Math.floor(remainingDays % 30.44);
        
        setTotalDays(totalDays);
        setTotalResult(`${totalYears}년 ${totalMonths}개월 ${totalDaysFinal}일`);
      } else {
        setTotalDays(null);
        setTotalResult(null);
        setIndividualResults([]);
      }
    }
  }, [mode, startDate, endDate, periods]);

  // 새로운 기간 입력란을 추가하는 함수
  const addPeriod = () => {
    setPeriods(prev => [...prev, { id: prev.length + 1, startDate: undefined, endDate: undefined }]);
  };

  // 특정 기간의 날짜를 업데이트하는 함수
  const updatePeriod = (id: number, type: 'start' | 'end', date: Date | undefined) => {
    setPeriods(prev => prev.map(p => {
      if (p.id === id) {
        return type === 'start' ? { ...p, startDate: date } : { ...p, endDate: date };
      }
      return p;
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">날짜 차이 계산기</CardTitle>
        <ToggleGroup type="single" value={mode} onValueChange={setMode}>
          <ToggleGroupItem value="single" aria-label="Toggle single mode">
            단일 기간
          </ToggleGroupItem>
          <ToggleGroupItem value="multiple" aria-label="Toggle multiple mode">
            복수 기간
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      
      <CardContent>
        {/* 단일 기간 모드 UI */}
        {mode === 'single' && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 flex flex-col gap-4">
              <Label>시작 날짜</Label>
              <DatePicker date={startDate} setDate={setStartDate} />
            </div>
            <div className="md:w-1/2 flex flex-col gap-4">
              <Label>종료 날짜</Label>
              <DatePicker date={endDate} setDate={setEndDate} />
            </div>
          </div>
        )}
        
        {/* 복수 기간 모드 UI */}
        {mode === 'multiple' && (
          <div className="flex flex-col gap-4">
            {periods.map(period => (
              <div key={period.id} className="flex flex-col md:flex-row gap-4 border rounded-md p-4">
                <div className="md:w-1/2 flex flex-col gap-2">
                  <Label>기간 {period.id} 시작 날짜</Label>
                  <DatePicker date={period.startDate} setDate={(date) => updatePeriod(period.id, 'start', date)} />
                </div>
                <div className="md:w-1/2 flex flex-col gap-2">
                  <Label>기간 {period.id} 종료 날짜</Label>
                  <DatePicker date={period.endDate} setDate={(date) => updatePeriod(period.id, 'end', date)} />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addPeriod} className="w-fit">
              <Plus className="mr-2 h-4 w-4" />
              기간 추가
            </Button>
          </div>
        )}

        {/* 결과 섹션 */}
        <div className="mt-6 p-6 border rounded-md min-h-[150px] flex items-center justify-center text-center">
          {mode === 'single' && result !== null && (
            <div className="whitespace-pre-wrap font-bold text-xl text-foreground">{result}</div>
          )}
          {mode === 'single' && result === null && (
            <p className="text-muted-foreground">날짜 두 개를 선택해주세요.</p>
          )}
          
          {/* 복수 기간 결과 표시 */}
          {mode === 'multiple' && totalResult !== null && (
            <div className="flex flex-col gap-4 w-full">
              <div className="w-full text-left">
                <h3 className="text-xl font-bold mb-2">개별 기간 결과</h3>
                {individualResults.map(res => (
                  <p key={res.id} className="text-base text-muted-foreground">
                    기간 {res.id}: {res.result}
                  </p>
                ))}
              </div>
              <div className="w-full text-center">
                <h3 className="text-xl font-bold mb-2">총 기간 합산 결과</h3>
                <p className="text-xl font-bold">{totalResult}</p>
                <p className="text-lg text-muted-foreground mt-2">(총 {totalDays}일)</p>
              </div>
            </div>
          )}
          {mode === 'multiple' && totalResult === null && (
            <p className="text-muted-foreground">기간을 선택해주세요.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}