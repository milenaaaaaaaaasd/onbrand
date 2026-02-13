"use client";

import { useEffect, useState } from "react";
import { Step2Content, type Step2File } from "./Step2Content";
import { Step2SummaryContent } from "./Step2SummaryContent";
import { Step3Content } from "./Step3Content";

const STEPS = [
  { id: 1, title: "Products Shipment", subtitle: "Arrive today", completedStatus: "Delivered 22 January 2026" },
  { id: 2, title: "Products reception", subtitle: "2 photos required", icon: "image" },
  { id: 3, title: "Feedback for the brand", subtitle: "5 minutes", icon: "clock", optional: true },
  { id: 4, title: "Products usage at Event", subtitle: "2 photos required", icon: "image" },
] as const;

const TIMELINE_STEPS = [
  { title: "Order created", subtitle: "Mon, April 26 3:16 AM", completed: true, icon: "cart" },
  { title: "In preparation", subtitle: "The brand is preparing the products", completed: true, icon: "cart" },
  { title: "On its way", subtitle: "The delivery driver is on the way", completed: true, icon: "truck" },
  { title: "Arrives today", subtitle: "Your package is expected to arrive between 10 and 12 p.m.", current: true, icon: "box" },
] as const;

const LOGO_SRC = "/Bloom.png";
const MUTED_GRAY = "#637381";

function CartIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M1 3h15v13H1z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8h5l3 3v5h-8V8z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18.5" cy="18.5" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoxIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 22.08V12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
      {children}
    </div>
  );
}

export function VerificationModal({ onClose }: { onClose: () => void }) {
  const [selectedStep, setSelectedStep] = useState(2);
  const [stepsExpanded, setStepsExpanded] = useState(true);
  const [logoError, setLogoError] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  useEffect(() => {
    setOrderId(String(Math.floor(1000000 + Math.random() * 9000000)));
  }, []);
  const [step2Files, setStep2Files] = useState<Step2File[]>([]);
  const [step2Message, setStep2Message] = useState("");
  const [step2State, setStep2State] = useState<"upload" | "summary">("upload");
  const [step2CompletedViaExemption] = useState(false);
  const [, setStep3Skipped] = useState(false);

  const handleFooterCta = () => {
    if (selectedStep === 2 && step2State === "upload" && step2Files.length > 0) {
      setStep2State("summary");
    } else if (selectedStep === 2 && step2State === "summary") {
      setSelectedStep(3);
    } else if (selectedStep === 3) {
      setSelectedStep(4);
    }
  };

  const handleStep3Skip = () => {
    setStep3Skipped(true);
    setSelectedStep(4);
  };

  return (
    <div
      className="grid w-[1200px] rounded-2xl bg-white"
      style={{
        height: 864,
        boxShadow: "0 24px 48px -12px rgba(0,0,0,0.18), 0 0 2px rgba(0,0,0,0.05)",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateAreas: "'header' 'body' 'footer'",
      }}
    >
      {/* PART 1: Header - fixed row, NEVER scrolls */}
      <header
        style={{ gridArea: "header" }}
        className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-gray-200 px-6 py-4"
      >
        <h2 className="text-base font-semibold text-figma-primary">
          Reception and Usage Verification
        </h2>
        <p className="flex-1 text-right text-sm" style={{ color: MUTED_GRAY }}>
          Training for 4K order #{orderId || "…"}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-figma-secondary transition-colors hover:bg-gray-100 hover:text-figma-primary"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {/* PART 2: Body - ONLY this area scrolls */}
      <div
        style={{ gridArea: "body", minHeight: 0, overflow: "hidden" }}
        className="flex"
      >
        {/* Left column - 384px so "Feedback for the brand" + Optional chip fit on one line */}
        <aside className="flex w-[384px] flex-shrink-0 flex-col border-r border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            {logoError ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green">
                <span className="text-sm font-bold text-white">B</span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- dynamic fallback with onError
              <img
                src={LOGO_SRC}
                alt="Bloom"
                className="h-10 w-10 shrink-0 rounded-full object-cover"
                onError={() => setLogoError(true)}
              />
            )}
            <div>
              <p className="font-semibold text-figma-primary">Bloom Nutrition</p>
              <p className="text-sm text-figma-secondary">Partnership</p>
            </div>
          </div>

          <h3 className="mt-8 text-lg font-bold text-figma-primary">
            Stages in need of verification
          </h3>

          <nav className="mt-4 flex flex-col" aria-label="Verification stages">
            {STEPS.map((step, index) => {
              const isActive = selectedStep === step.id;
              const isCompleted = step.id < selectedStep;
              return (
                <div key={step.id}>
                  {index > 0 && (
                    <div className="flex justify-start">
                      <div className="ml-[30px] h-[22px] w-px bg-gray-200" aria-hidden />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedStep(step.id)}
                    className={`relative flex w-full items-start gap-3 overflow-hidden rounded-xl px-4 py-3 text-left transition-colors ${
                      isActive ? "bg-white" : "bg-transparent hover:bg-gray-50"
                    }`}
                    style={{
                      ...(isActive && {
                        border: "1px solid #10b981",
                        boxShadow: "0 16px 16px -8px rgba(28, 37, 34, 0.3)",
                      }),
                      ...(!isActive && { border: "1px solid rgba(0,0,0,0.2)" }),
                    }}
                  >
                    {/* Green accent - flush left, full height, clipped by overflow-hidden */}
                    {isActive && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[5px] rounded-l-xl"
                        style={{ backgroundColor: "#10b981" }}
                      />
                    )}
                    <div
                      className={`ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        isActive ? "bg-brand-green" : isCompleted ? "bg-figma-primary" : "bg-gray-400"
                      }`}
                    >
                      {(isActive || isCompleted) ? (
                        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <span className="text-sm font-semibold text-white">{step.id}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="whitespace-nowrap font-semibold text-figma-primary">{step.title}</p>
                      <p className="text-sm text-figma-secondary">
                        {isCompleted && step.id === 2 && step2CompletedViaExemption
                          ? "Exemption request under review"
                          : isCompleted && "completedStatus" in step && step.completedStatus
                            ? step.completedStatus
                            : step.subtitle}
                      </p>
                    </div>
                    {"optional" in step && step.optional && !isActive && (
                      <span className="shrink-0 rounded-md bg-gray-200 px-2 py-0.5 text-xs font-medium text-figma-secondary">
                        Optional
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Right column - scrollable content only */}
        <div
          className="flex min-w-0 flex-1 flex-col overflow-hidden"
          style={{ backgroundColor: "#F3F6F8" }}
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
            <div
              className={`rounded-2xl p-6 ${selectedStep === 2 && step2State === "summary" ? "flex min-h-full flex-col" : ""}`}
              style={{ backgroundColor: "#FFFFFF", borderRadius: 16 }}
            >
              {selectedStep === 1 ? (
                <>
                  {/* Shipment - title and "Arrives today..." on same line */}
                  <div className="flex items-center gap-3">
                    <IconContainer>
                      <CartIcon className="h-5 w-5 text-brand-green" />
                    </IconContainer>
                    <h3 className="text-lg font-bold">
                      <span className="text-figma-primary">Shipment → On its way, </span>
                      <span style={{ color: MUTED_GRAY }}>Arrives today between 10 and 12 p.m.</span>
                    </h3>
                  </div>

                  {/* Timeline - #F8FAFB, border-radius 16px */}
              <div
                className="mt-6 overflow-hidden"
                style={{ backgroundColor: "#F8FAFB", borderRadius: 16 }}
              >
                <button
                  type="button"
                  onClick={() => setStepsExpanded(!stepsExpanded)}
                  className="flex w-full items-center justify-center gap-2 px-4 py-3"
                  style={{ backgroundColor: "#F8FAFB", borderRadius: "16px 16px 0 0" }}
                >
                  <span className="text-sm font-medium" style={{ color: "#1c252e" }}>
                    {stepsExpanded ? "See less steps" : "See more steps"}
                  </span>
                  <svg
                    className={`h-4 w-4 text-figma-secondary transition-transform ${stepsExpanded ? "" : "rotate-180"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {selectedStep === 1 && stepsExpanded && (
                  <div className="relative border-t border-gray-200 px-4 pb-4 pt-2" style={{ backgroundColor: "#F8FAFB" }}>
                    {/* Vertical connector line - rgba(0,0,0,0.2), matches left nav divider style */}
                    <div
                      className="absolute top-12 bottom-12 w-px"
                      style={{ left: "31px", backgroundColor: "rgba(0,0,0,0.2)" }}
                      aria-hidden
                    />
                    {TIMELINE_STEPS.map((item) => {
                      const isCurrent = "current" in item && item.current;
                      const isCompleted = "completed" in item && item.completed;
                      return (
                      <div key={item.title} className="flex items-center gap-3 pb-6 last:pb-0">
                        <div className="relative z-10 flex flex-col items-center">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${!isCurrent && !isCompleted ? "bg-gray-300" : ""}`}
                            style={{
                              ...(isCurrent && { backgroundColor: "#10b981" }),
                              ...(isCompleted && !isCurrent && { backgroundColor: "#919EAB" }),
                            }}
                          >
                            {(isCompleted || isCurrent) && (
                              <svg
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        {/* Step card: icon + text grouped inside, fully contained */}
                        <div
                          className={`flex min-w-0 flex-1 items-center gap-3 overflow-hidden rounded-xl px-4 py-3 ${
                            isCurrent ? "border-2 border-brand-green bg-white" : "border-0 bg-transparent"
                          }`}
                          style={isCurrent ? { borderColor: "#10b981" } : undefined}
                        >
                          <IconContainer>
                            {item.icon === "cart" && <CartIcon style={{ width: 20, height: 20 }} className="text-figma-secondary" />}
                            {item.icon === "truck" && <TruckIcon style={{ width: 20, height: 20 }} className="text-figma-secondary" />}
                            {item.icon === "box" && <BoxIcon style={{ width: 20, height: 20 }} className="text-figma-secondary" />}
                          </IconContainer>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold leading-snug" style={{ color: isCurrent ? "#000000" : undefined }}>
                              {item.title}
                            </p>
                            <p className="text-sm leading-snug" style={{ color: isCurrent ? MUTED_GRAY : undefined }}>
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    );})}
                  </div>
                )}
              </div>
                </>
              ) : selectedStep === 2 ? (
                step2State === "summary" ? (
                  <Step2SummaryContent files={step2Files} />
                ) : (
                  <Step2Content
                    files={step2Files}
                    onFilesChange={setStep2Files}
                    message={step2Message}
                    onMessageChange={setStep2Message}
                  />
                )
              ) : selectedStep === 3 ? (
                <Step3Content />
              ) : (
                <div className="rounded-2xl p-6" style={{ backgroundColor: "#F8FAFB", borderRadius: 16 }}>
                  <p className="text-figma-secondary">Placeholder content for step {selectedStep}</p>
                </div>
              )}

              {selectedStep === 1 && (
                <div className="mt-6 rounded-2xl p-4" style={{ backgroundColor: "#F8FAFB", borderRadius: 16 }}>
                  <h4 className="text-lg font-bold text-figma-primary">Order summary</h4>
                  <label className="mt-2 block text-sm font-medium text-figma-secondary">Products</label>
                  <textarea
                    placeholder="Type products..."
                    rows={6}
                    className="mt-2 w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-figma-primary placeholder:text-figma-secondary focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PART 3: Footer - fixed row, NEVER scrolls */}
      <footer
        style={{ gridArea: "footer", backgroundColor: "#F3F6F8" }}
        className="flex flex-shrink-0 flex-col items-center gap-3 border-t border-gray-200 px-8 py-4"
      >
        <button
          type="button"
          disabled={selectedStep === 2 && step2State === "upload" && step2Files.length === 0}
          onClick={
            (selectedStep === 2 && (step2State === "upload" || step2State === "summary")) ||
            selectedStep === 3
              ? handleFooterCta
              : undefined
          }
          className="w-full rounded-lg py-3 font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 hover:opacity-90 disabled:hover:opacity-60"
          style={{
            backgroundColor:
              selectedStep === 2 && step2State === "upload" && step2Files.length === 0
                ? "#9ca3af"
                : "#1c252e",
          }}
        >
          {selectedStep === 2 && step2State === "upload" && step2Files.length === 0
            ? "Upload photos and you'll be able to submit"
            : selectedStep === 2 && step2State === "upload"
              ? "Submit photos"
              : selectedStep === 3
                ? "Submit feedback & continue"
                : "Continue to next stage"}
        </button>
        {selectedStep === 3 && (
          <button
            type="button"
            onClick={handleStep3Skip}
            className="text-sm font-medium text-figma-secondary hover:text-figma-primary transition-colors"
          >
            Skip for now
          </button>
        )}
      </footer>
    </div>
  );
}
