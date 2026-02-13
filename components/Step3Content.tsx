"use client";

import { useState } from "react";

const MUTED_GRAY = "#637381";

function ChatStarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M12 8v4l2 2" />
      <path d="M12 3l1.5 3 3 .5-2 2 .5 3L12 10l-2 1.5.5-3-2-2 3-.5z" />
    </svg>
  );
}

function StarIcon({ filled, className, style }: { filled?: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
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

export function Step3Content() {
  const [productRating, setProductRating] = useState<number>(0);
  const [productUse, setProductUse] = useState<string | null>("Personal use");
  const [productOpinion, setProductOpinion] = useState("");
  const [tasteRating, setTasteRating] = useState<number>(0);
  const [loveBrand, setLoveBrand] = useState<"yes" | "no" | null>(null);
  const [firstTime, setFirstTime] = useState<"yes" | "no" | null>(null);
  const [snowboardUse, setSnowboardUse] = useState<string | null>("Ski Station");
  const [snowboardFeel, setSnowboardFeel] = useState("");

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
          <ChatStarIcon className="h-6 w-6 text-brand-green" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-figma-primary">Feedback for the brand</h3>
          <p className="mt-1 text-sm" style={{ color: MUTED_GRAY }}>
            Your answers help brands improve future samples and launches.
          </p>
        </div>
      </div>

      <div className="space-y-6 border-t border-gray-100 pt-6">
        {/* Star rating - How would you rate their products? */}
        <div>
          <label className="block text-sm font-medium text-figma-primary">
            How would you rate their products?
          </label>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setProductRating(n)}
                className="p-1 text-figma-secondary transition-colors hover:text-brand-green"
                aria-label={`Rate ${n} stars`}
              >
                <StarIcon filled={n <= productRating} className="h-8 w-8" style={{ color: n <= productRating ? "#a78bfa" : undefined }} />
              </button>
            ))}
          </div>
        </div>

        {/* How did you use the product? */}
        <div>
          <label className="block text-sm font-medium text-figma-primary">
            How did you use the product?
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {productUseOptions.map((opt) => (
              <Chip
                key={opt}
                label={opt}
                selected={productUse === opt}
                onClick={() => setProductUse(opt)}
              />
            ))}
          </div>
        </div>

        {/* Please share your opinion */}
        <div>
          <label className="block text-sm font-medium text-figma-primary">
            Please share your opinion about the product
          </label>
          <textarea
            value={productOpinion}
            onChange={(e) => setProductOpinion(e.target.value)}
            placeholder="Click to write..."
            rows={4}
            className="mt-2 w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-figma-primary placeholder:text-figma-secondary focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          />
        </div>

        {/* Did you like the taste? */}
        <div>
          <label className="block text-sm font-medium text-figma-primary">
            Did you like the taste?
          </label>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setTasteRating(n)}
                className="p-1 text-figma-secondary transition-colors hover:text-brand-green"
                aria-label={`Rate ${n} stars`}
              >
                <StarIcon filled={n <= tasteRating} className="h-8 w-8" style={{ color: n <= tasteRating ? "#a78bfa" : undefined }} />
              </button>
            ))}
          </div>
        </div>

        {/* Do you love my brand? */}
        <div>
          <label className="block text-sm font-medium text-figma-primary">
            Do you love my brand?
          </label>
          <div className="mt-2">
            <YesNoToggle value={loveBrand} onChange={setLoveBrand} />
          </div>
        </div>

        {/* Is this your first time drinking it? */}
        <div>
          <label className="block text-sm font-medium text-figma-primary">
            Is this your first time drinking it?
          </label>
          <div className="mt-2">
            <YesNoToggle value={firstTime} onChange={setFirstTime} />
          </div>
        </div>

        {/* Feedback about our products - Product card */}
        <div>
          <h4 className="text-base font-semibold text-figma-primary">
            Feedback about our products
          </h4>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-200" />
            <p className="font-medium text-figma-primary">The Collection Snowboard: Liquid</p>
          </div>
        </div>

        {/* Where are you going to use this snowboard? */}
        <div>
          <label className="block text-sm font-medium text-figma-primary">
            Where are you going to use this snowboard?
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {snowboardUseOptions.map((opt) => (
              <Chip
                key={opt}
                label={opt}
                selected={snowboardUse === opt}
                onClick={() => setSnowboardUse(opt)}
              />
            ))}
          </div>
        </div>

        {/* How did it feel to use the snowboard? */}
        <div>
          <label className="block text-sm font-medium text-figma-primary">
            How did it feel to use the snowboard?
          </label>
          <textarea
            value={snowboardFeel}
            onChange={(e) => setSnowboardFeel(e.target.value)}
            placeholder="Click to write..."
            rows={4}
            className="mt-2 w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-figma-primary placeholder:text-figma-secondary focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          />
        </div>
      </div>
    </div>
  );
}
