"use client";

import type { Step3FormState } from "./Step3SummaryContent";

const MUTED_GRAY = "#637381";

function StarIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "#5865FD" : "white"} stroke="#5865FD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 items-center rounded-xl border px-4 text-sm font-medium transition-colors ${
        selected
          ? "border-gray-300 bg-gray-200 text-figma-primary"
          : "border-gray-200 bg-white text-figma-secondary hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function YesNoToggle({
  value,
  onChange,
}: {
  value: "yes" | "no" | null;
  onChange: (v: "yes" | "no") => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange("yes")}
        className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
          value === "yes"
            ? "border-gray-300 bg-gray-200 text-figma-primary"
            : "border-gray-200 bg-white text-figma-secondary hover:bg-gray-50"
        }`}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange("no")}
        className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
          value === "no"
            ? "border-gray-300 bg-gray-200 text-figma-primary"
            : "border-gray-200 bg-white text-figma-secondary hover:bg-gray-50"
        }`}
      >
        No
      </button>
    </div>
  );
}

export const DEFAULT_STEP3_FORM: Step3FormState = {
  productRating: 0,
  productUse: null,
  productOpinion: "",
  tasteRating: 0,
  loveBrand: null,
  firstTime: null,
  snowboardUse: null,
  snowboardFeel: "",
};

export function Step3Content({
  formState,
  onFormChange,
}: {
  formState: Step3FormState;
  onFormChange: (updates: Partial<Step3FormState>) => void;
}) {
  const {
    productRating,
    productUse,
    productOpinion,
    tasteRating,
    loveBrand,
    firstTime,
    snowboardUse,
    snowboardFeel,
  } = formState;

  const productUseOptions = [
    "Personal use",
    "Event sampling/distribution",
    "Content creation",
    "Gifted to others",
    "Other",
  ];
  const snowboardUseOptions = ["Ski Station", "In my yard", "With my grandparents", "Other"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Feedback.png" alt="" className="h-6 w-6 object-contain" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-figma-primary">Feedback for the brand</h3>
          <p className="mt-1 text-sm" style={{ color: MUTED_GRAY }}>
            Your answers help brands improve future samples and launches.
          </p>
        </div>
      </div>

      <div className="space-y-6 border-t border-gray-100 pt-6">
        {/* Grouped container: rate + use + opinion */}
        <div
          className="overflow-hidden"
          style={{ border: "1px solid #DFDFDF", borderRadius: 8 }}
        >
          {/* a) How would you rate their products? */}
          <div className="flex w-full items-center justify-between px-4 py-4">
            <label className="text-sm font-medium text-figma-primary shrink-0">
              How would you rate their products?
            </label>
            <div className="flex shrink-0 gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onFormChange({ productRating: n })}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors"
                  style={{ backgroundColor: "#E8EFFD" }}
                  aria-label={`Rate ${n} stars`}
                >
                  <StarIcon filled={n <= productRating} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid #DFDFDF" }} />

          {/* b) How did you use the product? */}
          <div className="px-4 py-4">
            <label className="block text-sm font-medium text-figma-primary">
              How did you use the product?
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {productUseOptions.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={productUse === opt}
                  onClick={() => onFormChange({ productUse: opt })}
                />
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid #DFDFDF" }} />

          {/* c) Please share your opinion about the product */}
          <div className="px-4 py-4">
            <label className="block text-sm font-medium text-figma-primary">
              Please share your opinion about the product
            </label>
            <textarea
              value={productOpinion}
              onChange={(e) => onFormChange({ productOpinion: e.target.value })}
              placeholder="Click to write..."
              rows={4}
              className="mt-2 w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-figma-primary placeholder:text-figma-secondary focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
            />
          </div>
        </div>

        {/* Second grouped block: taste + love brand + first time */}
        <div
          className="overflow-hidden"
          style={{ border: "1px solid #DFDFDF", borderRadius: 8 }}
        >
          {/* Did you like the taste? */}
          <div className="flex w-full items-center justify-between px-4 py-4">
            <label className="text-sm font-medium text-figma-primary shrink-0">
              Did you like the taste?
            </label>
            <div className="flex shrink-0 gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onFormChange({ tasteRating: n })}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors"
                  style={{ backgroundColor: "#E8EFFD" }}
                  aria-label={`Rate ${n} stars`}
                >
                  <StarIcon filled={n <= tasteRating} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid #DFDFDF" }} />

          {/* Do you love my brand? */}
          <div className="flex w-full items-center justify-between px-4 py-4">
            <label className="text-sm font-medium text-figma-primary shrink-0">
              Do you love my brand?
            </label>
            <div className="shrink-0">
              <YesNoToggle value={loveBrand} onChange={(v) => onFormChange({ loveBrand: v })} />
            </div>
          </div>

          <div style={{ borderTop: "1px solid #DFDFDF" }} />

          {/* Is this your first time drinking it? */}
          <div className="flex w-full items-center justify-between px-4 py-4">
            <label className="text-sm font-medium text-figma-primary shrink-0">
              Is this your first time drinking it?
            </label>
            <div className="shrink-0">
              <YesNoToggle value={firstTime} onChange={(v) => onFormChange({ firstTime: v })} />
            </div>
          </div>
        </div>

        {/* Third grouped block: Feedback about products + Where use snowboard + How did it feel */}
        <div
          className="overflow-hidden"
          style={{ border: "1px solid #DFDFDF", borderRadius: 8 }}
        >
          {/* Feedback about our products - Product card */}
          <div className="px-4 py-4">
            <h4 className="text-base font-semibold text-figma-primary">
              Feedback about our products
            </h4>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-200" />
              <p className="font-medium text-figma-primary">The Collection Snowboard: Liquid</p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #DFDFDF" }} />

          {/* Where are you going to use this snowboard? */}
          <div className="px-4 py-4">
            <label className="block text-sm font-medium text-figma-primary">
              Where are you going to use this snowboard?
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {snowboardUseOptions.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={snowboardUse === opt}
                  onClick={() => onFormChange({ snowboardUse: opt })}
                />
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid #DFDFDF" }} />

          {/* How did it feel to use the snowboard? */}
          <div className="px-4 py-4">
            <label className="block text-sm font-medium text-figma-primary">
              How did it feel to use the snowboard?
            </label>
            <textarea
              value={snowboardFeel}
              onChange={(e) => onFormChange({ snowboardFeel: e.target.value })}
              placeholder="Click to write..."
              rows={4}
              className="mt-2 w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-figma-primary placeholder:text-figma-secondary focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
