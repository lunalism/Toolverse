// src/components/tools/palette-generator.tsx

"use client";

import { useState, useEffect } from 'react';
import { Plus, Minus, Lock, Unlock, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { colord, extend, Colord } from 'colord';
import harmonies from 'colord/plugins/harmonies';
import mixPlugin from 'colord/plugins/mix';
import React from 'react';

extend([harmonies, mixPlugin]);

interface Color {
  id: number;
  hex: string;
  isLocked: boolean;
}

interface ColorBlockProps {
  color: Color;
  onRemove: (id: number) => void;
  onLock: (id: number) => void;
  onCopy: (hex: string) => void;
}

// 각 색상 블록을 위한 독립적인 컴포넌트
function ColorBlock({ color, onRemove, onLock, onCopy }: ColorBlockProps) {
  const getContrastTextColor = (hex: string) => colord(hex).isLight() ? 'text-black' : 'text-white';
  const colorName = "색상 이름"; // TODO: 색상 이름 로직 추가

  return (
    <div
      className="relative flex-1 flex flex-col justify-end p-4 transition-all duration-300 group"
      style={{ backgroundColor: color.hex }}
    >
      <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-4 left-4 right-4">
        <Button size="icon" variant="ghost" className="text-white hover:text-red-500" onClick={() => onRemove(color.id)}>
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <Button size="icon" variant="ghost" className="text-white hover:text-gray-300" onClick={() => onCopy(color.hex)}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="text-white hover:text-gray-300" onClick={() => onLock(color.id)}>
            {color.isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="font-mono text-lg font-bold transition-colors duration-300" style={{ color: getContrastTextColor(color.hex) === 'text-white' ? 'white' : 'black' }}>
          {color.hex.toUpperCase()}
        </span>
        <span className="font-normal text-sm font-sans transition-colors duration-300" style={{ color: getContrastTextColor(color.hex) === 'text-white' ? 'white' : 'black' }}>
          {colorName}
        </span>
      </div>
    </div>
  );
}

export function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#10b981');
  const [palette, setPalette] = useState<Color[]>([
    { id: 1, hex: '#87A878', isLocked: false },
    { id: 2, hex: '#B0BC98', isLocked: false },
    { id: 3, hex: '#BCC4A9', isLocked: false },
    { id: 4, hex: '#C7CCB9', isLocked: false },
    { id: 5, hex: '#CAE2BC', isLocked: false },
  ]);
  const [paletteType, setPaletteType] = useState('analogous');

  const generateRandomPalette = () => {
    setPalette(palette.map(color => {
      if (color.isLocked) return color;
      return { ...color, hex: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}` };
    }));
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
  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
  };
  
  const handleMix = (index: number) => {
    const color1 = colord(palette[index].hex);
    const color2 = colord(palette[index + 1].hex);
    const mixedColor = color1.mix(color2, 0.5).toHex();
    
    const newId = Math.max(...palette.map(c => c.id)) + 1;
    const newPalette = [
      ...palette.slice(0, index + 1),
      { id: newId, hex: mixedColor, isLocked: false },
      ...palette.slice(index + 1),
    ];
    
    setPalette(newPalette);
  };

  return (
    <div className="flex w-full h-[80vh] overflow-x-auto">
      {palette.map((color, index) => (
        <React.Fragment key={color.id}>
          <ColorBlock
            color={color}
            onRemove={handleRemove}
            onLock={handleLock}
            onCopy={handleCopy}
          />
          {index < palette.length - 1 && (
            <div className="relative flex items-center justify-center h-full w-0 opacity-0 hover:w-12 hover:opacity-100 transition-all duration-300">
              <Button size="icon" className="h-8 w-8 rounded-full z-10" onClick={() => handleMix(index)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}