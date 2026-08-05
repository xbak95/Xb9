import { Label, Input } from "@/components/ui/Field";
import type { StepProps } from "./types";

export function Step1PersonalInfo({ data, update }: StepProps) {
  const { personal } = data;

  function set(patch: Partial<typeof personal>) {
    update({ personal: { ...personal, ...patch } });
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <Label htmlFor="ob-firstName" required>
          Nome
        </Label>
        <Input
          id="ob-firstName"
          value={personal.firstName}
          onChange={(e) => set({ firstName: e.target.value })}
          autoComplete="given-name"
        />
      </div>
      <div>
        <Label htmlFor="ob-lastName" required>
          Cognome
        </Label>
        <Input
          id="ob-lastName"
          value={personal.lastName}
          onChange={(e) => set({ lastName: e.target.value })}
          autoComplete="family-name"
        />
      </div>
      <div>
        <Label htmlFor="ob-email" required>
          Email
        </Label>
        <Input
          id="ob-email"
          type="email"
          value={personal.email}
          onChange={(e) => set({ email: e.target.value })}
          autoComplete="email"
          placeholder="nome@esempio.it"
        />
      </div>
      <div>
        <Label htmlFor="ob-phone" required>
          Telefono
        </Label>
        <Input
          id="ob-phone"
          type="tel"
          value={personal.phone}
          onChange={(e) => set({ phone: e.target.value })}
          autoComplete="tel"
          placeholder="+39 3xx xxx xxxx"
        />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="ob-city" required>
          Città
        </Label>
        <Input
          id="ob-city"
          value={personal.city}
          onChange={(e) => set({ city: e.target.value })}
          placeholder="es. Milano"
          autoComplete="address-level2"
        />
      </div>
    </div>
  );
}
