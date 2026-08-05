import { PageHeader } from "@/components/dashboard/PageHeader";
import { MessagesPanel } from "@/components/dashboard/MessagesPanel";

export default function MessaggiConsulentePage() {
  return (
    <div>
      <PageHeader title="Messaggi" description="Conversazioni con i clienti che ti hanno contattato o prenotato." />
      <MessagesPanel viewerRole="consulente" />
    </div>
  );
}
