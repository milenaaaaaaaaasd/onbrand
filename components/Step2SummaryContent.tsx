"use client";

import type { Step2File } from "./Step2Content";

const MUTED_GRAY = "#637381";
const SUMMARY_ICON_SRC = "/Icon.jpg";

export function Step2SummaryContent({ files }: { files: Step2File[] }) {
  return (
    <div className="flex min-h-full flex-col items-center py-4">
      {/* 1) Top centered icon block - 120x120px, image fits proportionally */}
      <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element -- local asset */}
        <img
          src={SUMMARY_ICON_SRC}
          alt="Under review"
          className="h-full w-full object-contain"
        />
      </div>

      {/* 2) Title (centered) */}
      <h3 className="mt-6 text-center text-lg font-bold text-figma-primary">
        Your product reception verification is under review.
      </h3>

      {/* 3) Subtitle (centered) */}
      <p className="mt-2 text-center text-base font-normal text-figma-primary">
        We&apos;ll let you know when finished.
      </p>

      {/* 4) Helper text (centered, light gray) */}
      <p className="mt-1 text-center text-sm" style={{ color: MUTED_GRAY }}>
        It usually takes no more than 24 hs.
      </p>

      {/* 5) Uploaded Photos container */}
      {files.length > 0 && (
        <div
          className="mt-8 w-full rounded-2xl p-4"
          style={{ backgroundColor: "#F8FAFB", borderRadius: 16 }}
        >
          <h4 className="text-base font-semibold text-figma-primary">
            Uploaded Photos ({files.length})
          </h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {files.map((f) => (
              <div
                key={f.id}
                className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100"
              >
                {f.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element -- blob URL from user upload
                  <img
                    src={f.preview}
                    alt={f.file.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-figma-secondary">
                    PDF
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
