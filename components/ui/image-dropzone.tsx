"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/lib/hooks/use-image-upload";
import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  subline?: string;
  height?: number;
  onUpload?: (url: string, file: File) => void;
  className?: string;
  accept?: string;
}

export function ImageDropzone({
  label = "Click to select",
  subline = "or drag & drop · JPG / PNG up to 10 MB",
  height = 256,
  onUpload,
  className,
  accept = "image/*",
}: Props) {
  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload({ onUpload });

  const [dragging, setDragging] = useState(false);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f && f.type.startsWith("image/")) {
        const fakeEvent = {
          target: { files: [f] },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileChange(fakeEvent);
      }
    },
    [handleFileChange],
  );

  return (
    <div className={className}>
      <input
        type="file"
        accept={accept}
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {!previewUrl ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragging(false);
          }}
          onDrop={onDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-soft cursor-pointer transition-colors hover:bg-white",
            dragging ? "border-ink bg-white" : "border-border",
          )}
          style={{ height }}
        >
          <div className="rounded-full bg-white border border-border w-10 h-10 flex items-center justify-center">
            <ImagePlus size={18} className="text-muted" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">{label}</p>
            <p className="text-xs text-muted mt-0.5">{subline}</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="group relative overflow-hidden rounded-2xl border border-border" style={{ height }}>
            <Image
              src={previewUrl}
              alt={fileName ?? "Uploaded"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="secondary"
                type="button"
                onClick={handleThumbnailClick}
                className="!h-9 !w-9 !p-0"
                aria-label="Replace"
              >
                <Upload size={14} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                type="button"
                onClick={handleRemove}
                className="!h-9 !w-9 !p-0"
                aria-label="Remove"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
          {fileName && (
            <div className="mt-2 flex items-center gap-2 text-xs text-muted">
              <span className="truncate">{fileName}</span>
              <button
                onClick={handleRemove}
                className="ml-auto rounded-full p-1 hover:bg-soft"
                aria-label="Clear"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
