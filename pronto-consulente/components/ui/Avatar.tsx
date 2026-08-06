"use client";

import { useState } from "react";
import Image from "next/image";
import { cn, initials } from "@/lib/utils";

/**
 * Avatar con fallback automatico alle iniziali.
 *
 * Le foto demo arrivano da un servizio esterno di placeholder: se la rete
 * lo blocca (proxy aziendali, reti ospiti) o il servizio è irraggiungibile,
 * mostriamo le iniziali su fondo brand invece di un riquadro vuoto — così
 * la demo resta presentabile ovunque.
 */
export function Avatar({
  src,
  name,
  size = 48,
  className,
  ring = false,
}: {
  src?: string;
  name: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy-100 text-navy-700 font-semibold",
        ring && "ring-2 ring-white shadow-sm",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-cover"
          onError={() => setFailed(true)}
          unoptimized
        />
      ) : (
        <span aria-label={name}>{initials(name)}</span>
      )}
    </span>
  );
}
