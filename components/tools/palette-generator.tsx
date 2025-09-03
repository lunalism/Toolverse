// src/components/tools/palette-generator.tsx (전체 코드)

"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { colord, extend, Colord } from 'colord';
import harmonies from 'colord/plugins/harmonies';
import { Plus, Minus, Lock, Unlock, Copy, Heart, Eye } from 'lucide-react';

extend([harmonies]);

interface ColorBlockProps {
  color: string;
  onColorChange: (newColor: string) => void;
  onRemove: () => void;
  onLock: () => void;
  isLocked: boolean;
}

// 각 색상 블록을 위한 독립적인 컴포넌트
function ColorBlock({ color, onColorChange, onRemove, onLock, isLocked }: ColorBlockProps) {
  const getContrastTextColor = (hex: string) => colord(hex).isLight() ? 'text-black' : 'text-white';
  const colorName = "색상 이름"; // TODO: 색상 이름 로직 추가

  return (
    <div
      className="relative flex-1 flex flex-col justify-end p-4 transition-all duration-300 group"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-4 left-4 right-4">
        <Button size="icon" variant="ghost" className="text-white hover:text-red-500" onClick={onRemove}>
          <Minus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="text-white hover:text-gray-300" onClick={onLock}>
          {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex flex-col items-center">
        <span className="font-mono text-lg font-bold transition-colors duration-300" style={{ color: getContrastTextColor(color) === 'text-white' ? 'white' : 'black' }}>
          {color.toUpperCase()}
        </span>
        <span className="font-normal text-sm font-sans transition-colors duration-300" style={{ color: getContrastTextColor(color) === 'text-white' ? 'white' : 'black' }}>
          {colorName}
        </span>
      </div>
    </div>
  );
}

export function PaletteGenerator() {
  const [palette, setPalette] = useState([
    { id: 1, hex: '#87A878', isLocked: false },
    { id: 2, hex: '#B0BC98', isLocked: false },
    { id: 3, hex: '#BCC4A9', isLocked: false },
    { id: 4, hex: '#C7CCB9', isLocked: false },
    { id: 5, hex: '#CAE2BC', isLocked: false },
    { id: 6, hex: '#DBF9B8', isLocked: false },
  ]);

  const generateRandomPalette = () => {
    const newPalette = palette.map(color => {
      if (color.isLocked) return color;
      return { ...color, hex: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}` };
    });
    setPalette(newPalette);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        generateRandomPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [palette]);

  const handleRemove = (id: number) => {
    setPalette(palette.filter(c => c.id !== id));
  };
  const handleLock = (id: number) => {
    setPalette(palette.map(c => c.id === id ? { ...c, isLocked: !c.isLocked } : c));
  };

  return (
    <div className="flex w-full h-[80vh]">
      {palette.map((color, index) => (
        <ColorBlock
          key={color.id}
          color={color.hex}
          onColorChange={() => {}}
          onRemove={() => handleRemove(color.id)}
          onLock={() => handleLock(color.id)}
          isLocked={color.isLocked}
        />
      ))}
    </div>
  );
}