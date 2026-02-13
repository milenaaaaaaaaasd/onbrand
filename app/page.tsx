"use client";

import { useState } from "react";
import { VerificationModal } from "@/components/VerificationModal";
import Image from "next/image";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div
      className="relative flex min-h-screen w-full justify-center"
      style={{ minHeight: "100vh" }}
    >
      {/* Scrollable content area - extends to fit modal + top margin */}
      <div
        className="relative flex w-[1440px] flex-col items-center"
        style={{ minHeight: 928, paddingTop: 32 }}
      >
        {/* Background - fills content area */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1440&h=1024&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          aria-hidden
        />

        {/* Modal - top-aligned (NOT vertically centered), horizontally centered */}
        {modalOpen && (
          <div className="flex w-full justify-center">
            <VerificationModal onClose={() => setModalOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
