import { Label, Textarea, FieldHint } from "@/components/ui/Field";
import type { StepProps } from "./types";

const MAX_LENGTH = 800;

export function Step7Bio({ data, update }: StepProps) {
  const remaining = MAX_LENGTH - data.bio.length;

  return (
    <div>
      <Label htmlFor="ob-bio" required>
        Descrizione personale
      </Label>
      <Textarea
        id="ob-bio"
        rows={8}
        maxLength={MAX_LENGTH}
        value={data.bio}
        onChange={(e) => update({ bio: e.target.value })}
        placeholder="Racconta la tua esperienza, i settori in cui operi e come puoi aiutare i clienti a risolvere i loro problemi..."
      />
      <div className="mt-1.5 flex items-center justify-between">
        <FieldHint>Questa descrizione comparirà nella sezione "Chi sono" del tuo profilo pubblico.</FieldHint>
        <span className="shrink-0 text-xs text-body">{remaining} caratteri rimanenti</span>
      </div>
    </div>
  );
}
