import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfrontaView } from "@/components/search/ConfrontaView";

export const metadata: Metadata = {
  title: "Confronta consulenti",
  description: "Confronta fianco a fianco prezzi, valutazioni, esperienza e competenze dei consulenti selezionati.",
};

export default function ConfrontaPage() {
  return (
    <Suspense fallback={<div className="container-px py-16 text-center text-body">Caricamento…</div>}>
      <ConfrontaView />
    </Suspense>
  );
}
