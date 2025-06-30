"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
    format: string;
    onFormatChange: (val: string) => void;
    optimize: boolean;
    onOptimizeToggle: (val: boolean) => void;
};

export default function FormatSelector({ format, onFormatChange, optimize, onOptimizeToggle }: Props) {
    return (
        <div className="mt-10 p-6 rounded-xl border bg-white shadow-sm space-y-4">
            <div className="space-y-2">
                <Label className="text-base">출력 포맷</Label>
                <Select value={format} onValueChange={onFormatChange}>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="포맷 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="jpg">JPG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WEBP</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-start space-x-2">
                <Checkbox
                    id="optimize"
                    checked={optimize}
                    onCheckedChange={(val) => onOptimizeToggle(!!val)}
                />
                <div className="space-y-0.5 leading-tight">
                    <Label htmlFor="optimize">파일 크기 최적화 (큰 이미지 자동 리사이징)</Label>
                    <p className="text-xs text-muted-foreground">
                        체크하면 4K 이상의 큰 이미지는 적절한 크기로 줄여서 파일 크기를 최적화합니다
                    </p>
                </div>
            </div>
        </div>
    );
}
