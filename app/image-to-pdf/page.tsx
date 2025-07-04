// app/image-to-pdf/page.tsx
'use client'

import { useCallback, useState, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileImage, XIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { DndContext, closestCenter, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import jsPDF from 'jspdf'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface UploadedImage {
  id: string
  file: File
  preview: string
}

function SortableImage({ image, onRemove }: { image: UploadedImage; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-36 h-36 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-move group"
    >
      <Image
        src={image.preview}
        alt={image.file.name}
        fill
        sizes="144px"
        className="object-cover"
      />
      <button
        className="absolute top-1 right-1 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
        onClick={onRemove}
      >
        <XIcon className="w-4 h-4 text-red-500" />
      </button>
    </div>
  )
}

export default function ImageToPdfPage() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [filename, setFilename] = useState('converted')
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [pageSize, setPageSize] = useState<'auto' | 'A4' | 'Letter'>('auto')
  const [quality, setQuality] = useState(90)
  const [resizeRatio, setResizeRatio] = useState(100)

  const sensors = useSensors(useSensor(PointerSensor))

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages((prev) => [...prev, ...newImages])
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: true })

  const handleRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    setActiveId(null)
    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id)
      const newIndex = images.findIndex((img) => img.id === over.id)
      setImages((items) => arrayMove(items, oldIndex, newIndex))
    }
  }

  const activeImage = images.find((img) => img.id === activeId)

  const totalImageBytes = useMemo(() => images.reduce((acc, img) => acc + img.file.size, 0), [images])
  const estimatedPdfSizeMB = useMemo(() => {
    const ratio = (resizeRatio / 100) * (quality / 100)
    return ((totalImageBytes * ratio) / (1024 * 1024)).toFixed(2)
  }, [totalImageBytes, resizeRatio, quality])

  const handleConvertToPdf = async () => {
    if (images.length === 0) return
    setIsConverting(true)
    setProgress(0)
    const pdf = new jsPDF({
      format: pageSize === 'A4' ? 'a4' : pageSize === 'Letter' ? 'letter' : undefined
    })

    const scale = resizeRatio / 100
    for (let i = 0; i < images.length; i++) {
      const img = images[i]
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(img.file)
      })

      const imgProps = pdf.getImageProperties(dataUrl)
      const pdfWidth = pdf.internal.pageSize.getWidth() * scale
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      if (i > 0) pdf.addPage()
      pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST')

      setProgress(Math.round(((i + 1) / images.length) * 100))
    }

    pdf.save(`${filename || 'converted'}.pdf`)
    setIsConverting(false)

    toast.success('✅ PDF 저장 완료', {
      description: `${filename || 'converted'}.pdf 파일이 저장되었습니다.`
    })
  }

  return (
    <main className="max-w-screen-md mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold mb-2">🖼️ 이미지 → PDF 변환기</h1>
      <p className="text-gray-600 mb-6">JPEG, PNG, WebP, GIF, BMP, TIFF 등 다양한 이미지 포맷 간 변환을 브라우저에서 직접 수행하세요.</p>

      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out
          ${isDragActive ? 'border-blue-500 border-dashed bg-blue-50' : 'border-gray-300 border-dashed hover:border-gray-400 hover:bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        <FileImage className="w-10 h-10 mb-3 text-gray-400" />
        <p className="text-lg font-medium text-gray-700">이미지를 여기에 드롭하세요</p>
        <p className="text-sm text-gray-500">또는 클릭하여 파일 선택</p>
        <p className="mt-2 text-xs text-gray-400">
          지원 포맷: JPEG, PNG, WebP, GIF, BMP, TIFF, SVG<br />
          최대 파일 크기: 50MB
        </p>
      </div>

      {images.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4">업로드된 이미지 ({images.length})</h2>

          <div className="flex flex-col gap-1 mb-4">
            <div className="flex gap-4">
              <div className="w-4/5">
                <label htmlFor="filename" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  PDF 파일 이름
                </label>
                <Input id="filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} placeholder="converted" />
              </div>
              <div className="w-1/5">
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  PDF 페이지 크기
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {pageSize === 'auto' ? '이미지에 맞게 자동' : pageSize}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => setPageSize('auto')}>이미지에 맞게 자동</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setPageSize('A4')}>A4</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setPageSize('Letter')}>Letter</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  이미지 품질 (압축률)
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">{quality}%</p>
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  리사이즈 비율
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={10}
                  value={resizeRatio}
                  onChange={(e) => setResizeRatio(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">{resizeRatio}%</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              예상 PDF 용량: <strong>{estimatedPdfSizeMB}MB</strong>{' '}
              {parseFloat(estimatedPdfSizeMB) > 50 && <span className="text-red-500 ml-2">❗ 50MB를 초과할 수 있습니다.</span>}
            </p>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <SortableContext items={images.map((img) => img.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-wrap gap-4">
                {images.map((image) => (
                  <SortableImage key={image.id} image={image} onRemove={() => handleRemove(image.id)} />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeImage ? (
                <div className="w-36 h-36 rounded-lg overflow-hidden border border-gray-200 shadow-md">
                  <Image src={activeImage.preview} alt={activeImage.file.name} fill sizes="144px" className="object-cover" />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

          <Button onClick={handleConvertToPdf} className="mt-6" disabled={isConverting}>
            {isConverting ? '변환 중...' : 'PDF로 저장'}
          </Button>

          {isConverting && (
            <div className="mt-4">
              <Progress value={progress} />
              <p className="text-sm text-gray-500 mt-2">진행률: {progress}%</p>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
