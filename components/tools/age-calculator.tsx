// src/components/tools/age-calculator.tsx

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { differenceInYears, differenceInDays, differenceInHours, isValid } from 'date-fns';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Person 데이터 타입을 정의합니다.
interface Person {
  id: number;
  birthdate: Date | undefined;
}

export function AgeCalculator() {
  const [mode, setMode] = useState('one-person');
  const [myBirthdate, setMyBirthdate] = useState<Date | undefined>(undefined);
  const [people, setPeople] = useState<Person[]>([
    { id: 1, birthdate: undefined },
  ]);
  const [myAge, setMyAge] = useState<number | null>(null);
  const [daysOld, setDaysOld] = useState<number | null>(null);
  const [hoursOld, setHoursOld] = useState<number | null>(null);
  const [results, setResults] = useState<{ age: number; id: number }[]>([]);

  useEffect(() => {
    const today = new Date();

    if (mode === 'one-person') {
      if (myBirthdate && isValid(myBirthdate)) {
        setMyAge(differenceInYears(today, myBirthdate));
        setDaysOld(differenceInDays(today, myBirthdate));
        setHoursOld(differenceInHours(today, myBirthdate));
      } else {
        setMyAge(null);
        setDaysOld(null);
        setHoursOld(null);
      }
    } else { // 여러 명 모드
      const calculatedResults = people.map(person => {
        if (person.birthdate && isValid(person.birthdate)) {
          return {
            id: person.id,
            age: differenceInYears(today, person.birthdate)
          };
        }
        return { id: person.id, age: -1 };
      }).filter(result => result.age !== -1);
      setResults(calculatedResults);
    }
  }, [mode, myBirthdate, people]);

  const addPerson = () => {
    setPeople(prevPeople => [
      ...prevPeople,
      { id: prevPeople.length + 1, birthdate: undefined },
    ]);
  };

  const updatePersonDate = (id: number, date: Date | undefined) => {
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.id === id ? { ...person, birthdate: date } : person
      )
    );
  };
  
  const renderResult = () => {
    if (mode === 'one-person') {
      if (myAge !== null) {
        return (
          <div className="flex flex-col gap-2 w-full text-center">
            <p className="text-3xl font-bold">{myAge}세</p>
            <p className="text-lg text-muted-foreground">
              태어난 지 {daysOld?.toLocaleString()}일, 약 {hoursOld?.toLocaleString()}시간이 지났습니다.
            </p>
          </div>
        );
      }
      return <p className="text-muted-foreground">생년월일을 선택해주세요.</p>;
    } else { // 여러 명 모드
      if (results.length > 0) {
        return (
          <div className="flex flex-col gap-2 w-full text-left">
            {results.map(result => (
              <p key={result.id} className="text-xl font-bold">
                사람 {result.id}: {result.age}세
              </p>
            ))}
          </div>
        );
      }
      return <p className="text-muted-foreground">생년월일을 선택해주세요.</p>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">나이 계산기</CardTitle>
        <ToggleGroup type="single" value={mode} onValueChange={setMode}>
          <ToggleGroupItem value="one-person" aria-label="Toggle one-person">
            나 혼자
          </ToggleGroupItem>
          <ToggleGroupItem value="multiple" aria-label="Toggle multiple">
            여러 명
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        {mode === 'one-person' && (
          <div className="flex flex-col gap-4">
            <Label htmlFor="my-birthdate">생년월일</Label>
            <DatePicker date={myBirthdate} setDate={setMyBirthdate} />
          </div>
        )}

        {mode === 'multiple' && (
          <div className="flex flex-col gap-4">
            {people.map(person => (
              <div key={person.id} className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  <Label>사람 {person.id}의 생년월일</Label>
                  <DatePicker date={person.birthdate} setDate={(date) => updatePersonDate(person.id, date)} />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addPerson} className="w-fit">
              <Plus className="mr-2 h-4 w-4" />
              추가하기
            </Button>
          </div>
        )}

        <div className="mt-6 p-6 border rounded-md min-h-[150px] flex items-center justify-center text-center">
          {renderResult()}
        </div>
      </CardContent>
    </Card>
  );
}