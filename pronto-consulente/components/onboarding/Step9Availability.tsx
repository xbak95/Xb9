import { Checkbox } from "@/components/ui/Field";
import { WEEK_DAYS, type StepProps } from "./types";

export function Step9Availability({ data, update }: StepProps) {
  function toggle(day: (typeof WEEK_DAYS)[number], slot: "morning" | "afternoon") {
    update({
      availability: {
        ...data.availability,
        [day]: { ...data.availability[day], [slot]: !data.availability[day][slot] },
      },
    });
  }

  return (
    <div>
      <p className="mb-4 text-sm text-body">
        Seleziona i giorni e le fasce orarie in cui sei generalmente disponibile a ricevere prenotazioni.
        Potrai affinare il calendario in qualsiasi momento dalla dashboard.
      </p>
      <div className="overflow-x-auto rounded-xl border border-navy-100">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="bg-muted text-left text-xs font-semibold uppercase tracking-wide text-body">
              <th className="px-4 py-3">Giorno</th>
              <th className="px-4 py-3">Mattina (9:00–13:00)</th>
              <th className="px-4 py-3">Pomeriggio (14:00–18:00)</th>
            </tr>
          </thead>
          <tbody>
            {WEEK_DAYS.map((day, i) => (
              <tr key={day} className={i % 2 === 1 ? "bg-muted/40" : undefined}>
                <td className="px-4 py-3 font-medium text-ink">{day}</td>
                <td className="px-4 py-3">
                  <Checkbox
                    label="Disponibile"
                    checked={data.availability[day].morning}
                    onChange={() => toggle(day, "morning")}
                  />
                </td>
                <td className="px-4 py-3">
                  <Checkbox
                    label="Disponibile"
                    checked={data.availability[day].afternoon}
                    onChange={() => toggle(day, "afternoon")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
