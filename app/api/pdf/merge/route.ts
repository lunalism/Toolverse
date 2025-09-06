// src/app/api/pdf/merge/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files') as File[];

        if (!files || files.length < 2) {
            return NextResponse.json({ error: '병합할 파일이 2개 이상 필요합니다.' }, { status: 400 });
        }

        // 새로운 PDF 문서를 생성합니다.
        const mergedPdf = await PDFDocument.create();

        // 각 파일을 병합된 문서에 복사합니다.
        for (const file of files) {
            const fileBytes = await file.arrayBuffer();
            const pdf = await PDFDocument.load(fileBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }

        // 병합된 문서를 바이트 배열로 저장합니다.
        const mergedPdfBytes = await mergedPdf.save();

        return new NextResponse(mergedPdfBytes, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="merged.pdf"',
            },
        });
    } catch (error) {
        console.error('PDF 병합 중 오류 발생:', error);
        return NextResponse.json({ error: 'PDF 병합 중 오류가 발생했습니다.' }, { status: 500 });
    }
}