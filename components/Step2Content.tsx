"use client";

import { useCallback, useRef, useState } from "react";

const MUTED_GRAY = "#637381";
const ACCEPTED_TYPES = [".jpg", ".jpeg", ".png", ".pdf"];
const ACCEPTED_MIME = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
const MAX_FILES = 6;
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export interface Step2File {
  file: File;
  id: string;
  preview?: string;
}

function BoxCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function isValidFile(file: File): boolean {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  const validExt = ACCEPTED_TYPES.includes(ext);
  const validMime = ACCEPTED_MIME.includes(file.type);
  const validSize = file.size <= MAX_SIZE_BYTES;
  return (validExt || validMime) && validSize;
}

export function Step2Content({
  files,
  onFilesChange,
  message,
  onMessageChange,
}: {
  files: Step2File[];
  onFilesChange: (files: Step2File[]) => void;
  message: string;
  onMessageChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const addFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const current = files;
      const remaining = MAX_FILES - current.length;
      if (remaining <= 0) return;

      const toAdd: Step2File[] = [];
      for (let i = 0; i < Math.min(newFiles.length, remaining); i++) {
        const file = newFiles[i];
        if (!isValidFile(file)) continue;
        const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
        toAdd.push({ file, id: `${Date.now()}-${i}-${file.name}`, preview });
      }
      if (toAdd.length > 0) {
        onFilesChange([...current, ...toAdd]);
      }
    },
    [files, onFilesChange]
  );

  const removeFile = useCallback(
    (id: string) => {
      const f = files.find((x) => x.id === id);
      if (f?.preview) URL.revokeObjectURL(f.preview);
      onFilesChange(files.filter((x) => x.id !== id));
    },
    [files, onFilesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only clear when leaving the container (not moving to a child)
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  }, []);

  const handleBrowse = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      addFiles(e.target.files);
      e.target.value = "";
    },
    [addFiles]
  );

  return (
    <div className="space-y-6">
      {/* Photo upload section - dashed container full width for edge-to-edge alignment */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/20">
            <BoxCheckIcon className="h-5 w-5 text-brand-green" />
          </div>
          <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-figma-primary">
            Share a photo/s to verify the products arrived correctly
          </h3>
          <p className="mt-1 text-sm" style={{ color: MUTED_GRAY }}>
            If there is a problem with the products please complete an{" "}
            <a href="#" className="underline" style={{ color: "#d97706" }}>
              exemption request
            </a>
          </p>
          </div>
        </div>

        {/* Upload zone - dashed border (includes Product Guidelines), full width edge-to-edge */}
          <div
            className={`mt-4 w-full rounded-xl border-2 border-dashed p-0 transition-all duration-150 ${
              isDragOver ? "ring-2 ring-brand-green ring-offset-1" : ""
            }`}
            style={{ borderColor: isDragOver ? "#059669" : "#10b981" }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              multiple
              className="hidden"
              onChange={handleInputChange}
            />

            {/* Top drag area - background #F2FAF8, stronger tint when dragging over */}
            <div
              className="rounded-t-xl p-6 transition-colors duration-150"
              style={{ backgroundColor: isDragOver ? "#D1FAE5" : "#F2FAF8" }}
            >
            {files.length === 0 ? (
              <div className="flex items-start gap-6 text-left">
                <button
                  type="button"
                  onClick={handleBrowse}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/20 text-brand-green transition-colors hover:bg-brand-green/30"
                  title="Add files"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-figma-primary">
                    Drag and drop up to 6 photos to share them with the brand, or{" "}
                    <button
                      type="button"
                      onClick={handleBrowse}
                      className="font-medium underline hover:no-underline"
                      style={{ color: "#1c252e" }}
                    >
                      browse files in device
                    </button>
                    .
                  </p>
                  <p className="text-xs" style={{ color: MUTED_GRAY }}>
                    JPG, PNG or PDF, file size no more than 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-6">
                  {files.length < MAX_FILES && (
                    <button
                      type="button"
                      onClick={handleBrowse}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white text-gray-500 transition-colors hover:border-brand-green hover:bg-brand-green/5 hover:text-brand-green"
                      title="Add more files"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  )}
                  <div className="min-w-0 flex-1 rounded-lg bg-white p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #e5e7eb" }}>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {files.map((f) => (
                        <div
                          key={f.id}
                          className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                        >
                          {f.preview ? (
                            // eslint-disable-next-line @next/next/no-img-element -- blob URL from user upload
                            <img src={f.preview} alt={f.file.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-figma-secondary">
                              PDF
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(f.id)}
                            aria-label="Remove file"
                            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs" style={{ color: MUTED_GRAY }}>
                  {files.length}/{MAX_FILES} files. JPG, PNG or PDF, max 10MB each.
                </p>
              </div>
            )}
            </div>

            {/* Product Guidelines - inside dashed container, white background */}
            <div className="flex flex-wrap items-start gap-4 rounded-b-xl border-t border-gray-100 bg-white px-6 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-figma-primary">Product Guidelines:</p>
                <p className="mt-1 text-sm" style={{ color: MUTED_GRAY }}>
                  Show the product and its packaging/label. Include a delivery note or shipping label with legible
                  information (order number, address, etc.)
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                {["product1", "product2", "product3"].map((name) => (
                  <div key={name} className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/${name}.png`}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>

      {/* Feedback message - optional */}
      <div>
        <h4 className="text-base font-semibold text-figma-primary">
          Want to share more about your experience?{" "}
          <span className="font-normal" style={{ color: MUTED_GRAY }}>
            (Optional)
          </span>
        </h4>
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Message"
          rows={4}
          className="mt-2 w-full resize-y rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-figma-primary placeholder:text-figma-secondary focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
        />
      </div>
    </div>
  );
}
