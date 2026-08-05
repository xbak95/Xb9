"use client";

import { useState } from "react";
import { Plus, Ticket as TicketIcon } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { PageHeader, statusTone } from "@/app/admin/_components/KpiCard";
import { coupons as seed, type Coupon } from "@/data/admin-demo";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(seed);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [type, setType] = useState<Coupon["discountType"]>("percentuale");
  const [value, setValue] = useState("10");
  const [expiry, setExpiry] = useState("2026-12-31");
  const { push } = useToast();

  function createCoupon() {
    if (!code.trim()) return;
    const newCoupon: Coupon = {
      id: `cp-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discountType: type,
      value: Number(value) || 0,
      status: "attivo",
      usageCount: 0,
      usageLimit: 500,
      expiryDate: expiry,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    push({ kind: "success", title: "Coupon creato", description: `Il codice ${newCoupon.code} è ora attivo (demo, non persistente).` });
    setOpen(false);
    setCode("");
    setValue("10");
  }

  return (
    <div>
      <PageHeader
        title="Coupon"
        description={`${coupons.filter((c) => c.status === "attivo").length} coupon attivi su ${coupons.length} totali.`}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Crea coupon
          </Button>
        }
      />

      {coupons.length === 0 ? (
        <EmptyState icon={TicketIcon} title="Nessun coupon" description="Crea il primo coupon promozionale." />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-body">
                  <th className="px-5 py-3">Codice</th>
                  <th className="px-5 py-3">Sconto</th>
                  <th className="px-5 py-3">Utilizzi</th>
                  <th className="px-5 py-3">Scadenza</th>
                  <th className="px-5 py-3">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {coupons.map((c) => (
                  <tr key={c.id}>
                    <td className="px-5 py-3.5 font-mono text-sm font-semibold text-ink">{c.code}</td>
                    <td className="px-5 py-3.5 text-body">
                      {c.discountType === "percentuale" ? `-${c.value}%` : `-${c.value}€`}
                    </td>
                    <td className="px-5 py-3.5 text-body">
                      {c.usageCount} / {c.usageLimit}
                    </td>
                    <td className="px-5 py-3.5 text-body">{formatDate(c.expiryDate)}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={statusTone(c.status)}>{c.status === "attivo" ? "Attivo" : "Scaduto"}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Crea nuovo coupon"
        description="Il coupon verrà aggiunto solo nello stato locale di questa sessione."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button onClick={createCoupon} disabled={!code.trim()}>
              Crea coupon
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="cp-code" required>
              Codice coupon
            </Label>
            <Input id="cp-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Es. AUTUNNO15" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="cp-type">Tipo sconto</Label>
              <Select id="cp-type" value={type} onChange={(e) => setType(e.target.value as Coupon["discountType"])}>
                <option value="percentuale">Percentuale (%)</option>
                <option value="importo">Importo fisso (€)</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="cp-value">Valore</Label>
              <Input id="cp-value" type="number" min={0} value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="cp-expiry">Data di scadenza</Label>
            <Input id="cp-expiry" type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
