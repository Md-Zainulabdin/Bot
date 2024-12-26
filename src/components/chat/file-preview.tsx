"use client";

import Image from "next/image";
import { FileIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilePreviewProps {
  files: FileList;
  removeFile: (index: number) => void;
}

export function FilePreview({ files, removeFile }: FilePreviewProps) {
  const getFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <ScrollArea className="mb-4 max-h-[200px]">
      <div className="space-y-2 pr-4">
        {Array.from(files).map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800">
                {getFilePreview(file) ? (
                  <Image
                    src={getFilePreview(file) || ""}
                    alt={file.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                ) : (
                  <FileIcon className="h-5 w-5 text-zinc-400" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-zinc-200">{file.name}</span>
                <span className="text-xs text-zinc-400">
                  {formatFileSize(file.size)}
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8 rounded-full hover:bg-zinc-800"
              onClick={() => removeFile(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
