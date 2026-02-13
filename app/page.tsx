"use client";

import { useState } from "react";
import { VerificationModal } from "@/components/VerificationModal";
import Image from "next/image";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Background container - fixed, no scroll */}
      <div
        className="relative flex h-full w-[1440px] flex-col items-center justify-center"
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
