"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone() {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [],
        },
        multiple: true,
        onDrop,
    });

    return (
        <section>
            <div
                {...getRootProps()}
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white hover:bg-gray-50 transition"
            >
                <input {...getInputProps()} />
                <p className="text-gray-600">
                {isDragActive ? (
                    <span className="text-blue-500 font-semibold">이미지를 여기에 놓으세요...</span>
                ) : (
                    <>
                        <strong className="text-blue-600">클릭하거나 드래그</strong>하여 이미지를 업로드하세요
                    </>
                )}
                </p>
            </div>
        </section>
    );
}
