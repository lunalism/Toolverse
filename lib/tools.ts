// lib/tools.ts
import {
  ImageIcon,
  TextIcon,
  CalendarIcon,
  FileTextIcon,
  RefreshCcw,
  Globe,
} from "lucide-react";

export const tools = [
  {
    name: "이미지 변환기",
    href: "/image-converter",
    icon: ImageIcon,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "글자 수 세기",
    href: "/text-counter",
    icon: TextIcon,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "날짜 계산기",
    href: "/date-calculator",
    icon: CalendarIcon,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "PDF 도구",
    href: "/pdf-tools",
    icon: FileTextIcon,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "이미지 ↔ PDF",
    href: "/image-pdf-converter",
    icon: RefreshCcw,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "IP 확인",
    href: "/ip-checker",
    icon: Globe,
    color: "bg-gray-100 text-gray-600",
  },
];
