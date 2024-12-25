"use client";

import { useState, useRef, useEffect } from "react";
import { Paperclip, ArrowUp, StopCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FilePreview } from "@/components/chat/file-preview";
import { Textarea } from "@/components/ui/textarea";

interface ChatProps {
  input: string;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    options?: { experimental_attachments?: FileList | undefined },
  ) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  stop?: () => void;
}

export default function ChatInput({
  input,
  handleSubmit,
  handleInputChange,
  isLoading,
  stop,
}: ChatProps) {
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to adjust height of textarea with a maximum limit
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to get the correct scrollHeight
      textarea.style.height = "0px";

      // Calculate new height with a maximum of 200px
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;

      // Add scrolling if content exceeds max height
      textarea.style.overflowY =
        textarea.scrollHeight > 200 ? "auto" : "hidden";
    }
  };

  // Adjust height on input change
  useEffect(() => {
    adjustHeight();
  }, [input]);

  const clearFiles = () => {
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    if (files) {
      const newFiles = Array.from(files).filter((_, i) => i !== index);
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      setFiles(dataTransfer.files);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-6">
      <div className="mx-auto max-w-3xl">
        {files && files.length > 0 && (
          <FilePreview files={files} removeFile={removeFile} />
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event, {
              experimental_attachments: files,
            });
            clearFiles();
          }}
          className="relative flex flex-col items-center rounded-xl border border-zinc-700 bg-zinc-900 shadow-md"
        >
          <Textarea
            ref={textareaRef}
            value={input}
            placeholder="Ask a follow up..."
            onChange={(e) => {
              handleInputChange(e);
              adjustHeight();
            }}
            disabled={isLoading}
            className="scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent w-full resize-none border-0 bg-transparent p-4 placeholder:text-zinc-400 focus-visible:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) {
                  const form = e.currentTarget.form;
                  form?.requestSubmit();
                }
              }
            }}
          />
          <div className="flex w-full items-center justify-between border-t border-zinc-700 p-3">
            <input
              type="file"
              onChange={(event) => {
                if (event.target.files) {
                  setFiles(event.target.files);
                }
              }}
              multiple
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              id="file-upload"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <Button
              type={isLoading ? "button" : "submit"}
              variant={input.trim() || isLoading ? "default" : "outline"}
              size="icon"
              className="h-9 w-9 rounded-xl"
              onClick={isLoading ? stop : undefined}
            >
              {isLoading ? (
                <StopCircle className="h-4 w-4" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
