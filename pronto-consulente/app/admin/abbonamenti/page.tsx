import { Crown, Check, Info } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { KpiCard, PageHeader } from "@/app/admin/_components/KpiCard";
import { pricingPlans } from "@/data/pricing-plans";
import { planDistribution } from "@/data/admin-demo";
import { consultants } from "@/data/consultants";

export const metadata = { title: "Abbonamenti" };

export default function AdminSubscriptionsPage() {
  const totalConsultants = consultants.length;

  return (
    <div>
      <PageHeader
        title="Abbonamenti consulenti"
        description="Distribuzione dei consulenti demo sui piani disponibili. Prezzi e commissioni sono da definire prima del lancio commerciale."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {pricingPlans.map((plan) => (
          <KpiCard
            key={plan.id}
            label={plan.name}
            value={`${planDistribution[plan.id] ?? 0} consulenti`}
            icon={Crown}
            trend={{ value: `${Math.round(((planDistribution[plan.id] ?? 0) / totalConsultants) * 100)}% del totale`, positive: true }}
          />
        ))}
      </div>

      <div className="mb-6 rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-gold-800">
        <div className="flex items-start gap-2.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>I prezzi dei piani Professional e Premium, così come le relative commissioni, sono ancora da definire e verranno confermati prima del lancio pubblico dei piani a pagamento.</p>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-body">
                <th className="px-5 py-3">Piano</th>
                <th className="px-5 py-3">Prezzo</th>
                <th className="px-5 py-3">Commissione</th>
                <th className="px-5 py-3">Consulenti</th>
                <th className="px-5 py-3">Caratteristiche principali</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {pricingPlans.map((plan) => (
                <tr key={plan.id}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink">{plan.name}</span>
                      {plan.featured && <Badge tone="gold">Più scelto</Badge>}
                    </div>
                    <p className="mt-0.5 text-xs text-body">{plan.tagline}</p>
                  </td>
                  <td className="px-5 py-3.5 text-body">{plan.price}</td>
                  <td className="px-5 py-3.5 text-body">{plan.commission}</td>
                  <td className="px-5 py-3.5 text-body">{planDistribution[plan.id] ?? 0}</td>
                  <td className="px-5 py-3.5">
                    <ul className="space-y-1">
                      {plan.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-body">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-verified" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
