"use client";

import { FileText, FileImage, Download, FolderOpen } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";

interface DocumentItem {
  id: string;
  name: string;
  source: string;
  type: "pdf" | "img";
  direction: "ricevuto" | "inviato";
  date: string;
  size: string;
}

const documents: DocumentItem[] = [
  { id: "d-01", name: "CV_Alessandro_Ferretti.pdf", source: "Alessandro Ferretti", type: "pdf", direction: "ricevuto", date: "2026-08-02", size: "412 KB" },
  { id: "d-02", name: "Contratto_revisionato_Marco_Rinaldi.pdf", source: "Avv. Marco Rinaldi", type: "pdf", direction: "ricevuto", date: "2026-07-14", size: "1,1 MB" },
  { id: "d-03", name: "Verbale_consulenza_HSE_Chiara_Bellini.pdf", source: "Chiara Bellini", type: "pdf", direction: "ricevuto", date: "2026-06-30", size: "268 KB" },
  { id: "d-04", name: "preventivo-macchinari.pdf", source: "Inviato ad Alessandro Ferretti", type: "pdf", direction: "inviato", date: "2026-08-03", size: "740 KB" },
  { id: "d-05", name: "Report_analisi_bando_industria40.pdf", source: "Alessandro Ferretti", type: "pdf", direction: "ricevuto", date: "2026-08-04", size: "890 KB" },
];

export default function DocumentiPage() {
  const { push } = useToast();

  function download(name: string) {
    push({ kind: "success", title: "Download avviato", description: `${name} (demo — nessun file reale scaricato).` });
  }

  return (
    <div>
      <PageHeader title="Documenti" description="CV, report e allegati scambiati con i consulenti." />

      {documents.length === 0 ? (
        <EmptyState icon={FolderOpen} title="Nessun documento" description="Qui troverai i documenti scambiati con i consulenti." />
      ) : (
        <Card>
          <div className="divide-y divide-navy-50">
            {documents.map((d) => {
              const Icon = d.type === "pdf" ? FileText : FileImage;
              return (
                <div key={d.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{d.name}</p>
                      <p className="text-xs text-body">
                        {d.direction === "ricevuto" ? "Ricevuto da" : "Inviato a"} {d.source.replace("Inviato ad ", "")} · {formatDate(d.date)} · {d.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => download(d.name)} className="shrink-0">
                    <Download className="h-4 w-4" /> Scarica
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
