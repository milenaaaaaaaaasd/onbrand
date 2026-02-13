"use client";

const MUTED_GRAY = "#637381";

function StarIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "#5865FD" : "white"} stroke="#5865FD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export interface Step3FormState {
  productRating: number;
  productUse: string | null;
  productOpinion: string;
  tasteRating: number;
  loveBrand: "yes" | "no" | null;
  firstTime: "yes" | "no" | null;
  snowboardUse: string | null;
  snowboardFeel: string;
}

export function Step3SummaryContent({ formState }: { formState: Step3FormState }) {
  const { productRating, productUse, productOpinion, tasteRating, loveBrand, firstTime, snowboardUse, snowboardFeel } = formState;

  const formatAnswer = (value: string | number | null | undefined, fallback = "—") =>
    value !== null && value !== undefined && value !== "" ? String(value) : fallback;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Top centered icon */}
      <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-green/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Submit.png" alt="" className="h-20 w-20 object-contain" />
      </div>

      {/* Title */}
      <h3 className="text-center text-lg font-bold text-figma-primary">
        Feedback submitted successfully
      </h3>

      {/* Subtitle */}
      <p className="text-center text-sm" style={{ color: MUTED_GRAY }}>
        Your answers help brands improve future samples and launches.
      </p>

      {/* Summary of answers */}
      <div className="w-full space-y-6">
        {/* Block 1: rate + use + opinion */}
        <div className="overflow-hidden" style={{ border: "1px solid #DFDFDF", borderRadius: 8 }}>
          <div className="flex w-full items-center justify-between px-4 py-4">
            <span className="text-sm font-medium text-figma-primary">You rated the products</span>
            <div className="flex shrink-0 gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#E8EFFD" }}
                >
                  <StarIcon filled={n <= productRating} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #DFDFDF" }} />
          <div className="flex w-full items-center justify-between px-4 py-4">
            <span className="text-sm font-medium text-figma-primary">How did you use the product?</span>
            <span className="shrink-0 rounded-xl border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-figma-primary">
              {formatAnswer(productUse)}
            </span>
          </div>
          <div style={{ borderTop: "1px solid #DFDFDF" }} />
          <div className="px-4 py-4">
            <span className="block text-sm font-medium text-figma-primary">Your opinion about the product</span>
            <p className="mt-2 text-sm text-figma-secondary">{formatAnswer(productOpinion)}</p>
          </div>
        </div>

        {/* Block 2: taste + love brand + first time */}
        <div className="overflow-hidden" style={{ border: "1px solid #DFDFDF", borderRadius: 8 }}>
          <div className="flex w-full items-center justify-between px-4 py-4">
            <span className="text-sm font-medium text-figma-primary">Did you like the taste?</span>
            <div className="flex shrink-0 gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#E8EFFD" }}
                >
                  <StarIcon filled={n <= tasteRating} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #DFDFDF" }} />
          <div className="flex w-full items-center justify-between px-4 py-4">
            <span className="text-sm font-medium text-figma-primary">Do you love my brand?</span>
            <span className="shrink-0 rounded-xl border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-figma-primary">
              {formatAnswer(loveBrand)}
            </span>
          </div>
          <div style={{ borderTop: "1px solid #DFDFDF" }} />
          <div className="flex w-full items-center justify-between px-4 py-4">
            <span className="text-sm font-medium text-figma-primary">Is this your first time drinking it?</span>
            <span className="shrink-0 rounded-xl border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-figma-primary">
              {formatAnswer(firstTime)}
            </span>
          </div>
        </div>

        {/* Block 3: Feedback about products + Where use snowboard + How did it feel */}
        <div className="overflow-hidden" style={{ border: "1px solid #DFDFDF", borderRadius: 8 }}>
          <div className="px-4 py-4">
            <h4 className="text-base font-semibold text-figma-primary">Feedback about our products</h4>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-200" />
              <p className="font-medium text-figma-primary">The Collection Snowboard: Liquid</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #DFDFDF" }} />
          <div className="flex w-full items-center justify-between px-4 py-4">
            <span className="text-sm font-medium text-figma-primary">Where are you going to use this snowboard?</span>
            <span className="shrink-0 rounded-xl border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-figma-primary">
              {formatAnswer(snowboardUse)}
            </span>
          </div>
          <div style={{ borderTop: "1px solid #DFDFDF" }} />
          <div className="px-4 py-4">
            <span className="block text-sm font-medium text-figma-primary">How did it feel to use the snowboard?</span>
            <p className="mt-2 text-sm text-figma-secondary">{formatAnswer(snowboardFeel)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
