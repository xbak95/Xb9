import { PageHeader } from "@/components/dashboard/PageHeader";
import { MessagesPanel } from "@/components/dashboard/MessagesPanel";

export default function MessaggiClientePage() {
  return (
    <div>
      <PageHeader title="Messaggi" description="Conversazioni con i consulenti prenotati o contattati." />
      <MessagesPanel viewerRole="cliente" />
    </div>
  );
}
