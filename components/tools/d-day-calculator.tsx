// src/components/tools/d-day-calculator.tsx

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { differenceInDays, differenceInYears, differenceInMonths, differenceInHours, differenceInMinutes, isValid } from 'date-fns';

export function DDayCalculator() {
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);
  const [dDayResult, setDDayResult] = useState<string | null>(null);
  const [detailedDiff, setDetailedDiff] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    if (targetDate && isValid(targetDate)) {
      const today = new Date();
      const diff = differenceInDays(targetDate, today);
      
      const years = differenceInYears(targetDate, today);
      const months = differenceInMonths(targetDate, today) % 12;
      const days = differenceInDays(targetDate, today) % 365.25; // 근사치 계산
      const hours = differenceInHours(targetDate, today) % 24;
      const minutes = differenceInMinutes(targetDate, today) % 60;
      
      setDetailedDiff({
        years: Math.abs(years),
        months: Math.abs(months),
        days: Math.abs(days),
        hours: Math.abs(hours),
        minutes: Math.abs(minutes),
      });

      if (diff > 0) {
        setDDayResult(`D-${diff}`);
      } else if (diff < 0) {
        setDDayResult(`D+${Math.abs(diff)}`);
      } else {
        setDDayResult('D-DAY');
      }
    } else {
      setDDayResult(null);
      setDetailedDiff({ years: 0, months: 0, days: 0, hours: 0, minutes: 0 });
    }
  }, [targetDate]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">디데이 계산기</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 flex flex-col gap-4">
            <Label htmlFor="target-date">목표 날짜</Label>
            <DatePicker date={targetDate} setDate={setTargetDate} />
          </div>

          <div className="md:w-1/2 flex items-center justify-center p-6 border rounded-md min-h-[150px]">
            {dDayResult !== null ? (
              <div className="flex items-center gap-4 text-center">
                <p className="text-4xl font-bold">{dDayResult}</p>
                <div className="flex flex-col text-left">
                  <p className="text-lg text-muted-foreground">
                    {detailedDiff.years}년 {detailedDiff.months}개월 {detailedDiff.days}일
                  </p>
                  <p className="text-lg text-muted-foreground">
                    {detailedDiff.hours}시간 {detailedDiff.minutes}분
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">날짜를 선택해주세요.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}