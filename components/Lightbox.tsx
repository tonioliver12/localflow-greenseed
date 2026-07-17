"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  title: string;
  onClose: () => void;
  initialIndex?: number;
}

export default function Lightbox({ images, title, onClose, initialIndex = 0 }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 text-white/80 transition-colors hover:text-white"
      >
        <X size={32} />
      </button>

      <div className="relative flex h-full w-full max-w-5xl items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button
            onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
            aria-label="Previous photo"
            className="absolute left-0 z-10 p-3 text-white/70 hover:text-white"
          >
            <ChevronLeft size={36} />
          </button>
        )}

        <div className="relative h-[70vh] w-full">
          <Image
            src={images[current]}
            alt={`${title} — photo ${current + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={() => setCurrent((c) => (c + 1) % images.length)}
            aria-label="Next photo"
            className="absolute right-0 z-10 p-3 text-white/70 hover:text-white"
          >
            <ChevronRight size={36} />
          </button>
        )}
      </div>

      <p className="absolute bottom-6 font-body text-sm text-white/70">
        {title} — {current + 1}/{images.length}
      </p>
    </div>
  );
}
