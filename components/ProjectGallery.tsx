"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden"
            aria-label={`Open photo ${i + 1} of ${title}`}
          >
            <Image
              src={src}
              alt={`${title} — photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          title={title}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
