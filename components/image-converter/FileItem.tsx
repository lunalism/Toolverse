// components/FileItem.tsx
import { X } from "lucide-react";

type Props = {
    file: File;
    outputFormat: string;
    onRemove: () => void;
};

export default function FileItem({ file, outputFormat, onRemove }: Props) {
    const inputExt = file.name.split(".").pop()?.toUpperCase() ?? "IMG";
    const sizeMB = (file.size / 1024 / 1024).toFixed(2);

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-xs">{inputExt}</span>
                    <span className="text-xl">→</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">
                        {outputFormat.toUpperCase()}
                    </span>
                </div>
                <div>
                    <div className="font-medium text-sm truncate max-w-[180px]">{file.name}</div>
                    <div className="text-xs text-muted-foreground">원본: {inputExt} ({sizeMB} MB)</div>
                </div>
            </div>

            <button
                onClick={onRemove}
                className="ml-4 rounded-full bg-red-500 hover:bg-red-600 text-white p-1.5 transition"
                aria-label="Remove"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
