import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, User, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { blogPosts } from "@/data/blog-posts";

interface ArticleSection {
  heading: string;
  body: string[];
}

interface ArticleContent {
  intro: string[];
  sections: ArticleSection[];
  conclusion: string;
}

const articleContent: Record<string, ArticleContent> = {
  "come-scegliere-il-consulente-giusto": {
    intro: [
      "Affidare un progetto a un consulente esterno è una decisione che pesa su tempi, budget e, spesso, sulla reputazione dell'azienda verso terzi. Eppure la scelta viene ancora fatta troppo spesso sulla base del passaparola o del primo preventivo ricevuto, senza un metodo che permetta di confrontare davvero le alternative.",
      "In questo articolo raccogliamo cinque criteri concreti — non teorici — per valutare un consulente prima di firmare un incarico, applicabili a qualsiasi settore: dalla finanza agevolata al legale, dal marketing alla sicurezza sul lavoro.",
    ],
    sections: [
      {
        heading: "1. Competenza verificabile, non dichiarata",
        body: [
          "Un curriculum ben scritto racconta esperienza, ma non la dimostra. Chiedi sempre esempi concreti di progetti simili al tuo: settore, dimensione dell'azienda cliente, risultato ottenuto. Un consulente solido non avrà difficoltà a fornire case study dettagliati, magari anonimizzati per motivi di riservatezza.",
          "Le certificazioni professionali contano, ma vanno lette nel contesto: una certificazione recente in un ambito in rapida evoluzione (ad esempio cybersecurity o AI) pesa spesso più di un titolo datato, per quanto prestigioso.",
        ],
      },
      {
        heading: "2. Referenze e recensioni verificate",
        body: [
          "Le recensioni hanno valore solo se verificabili: provengono da clienti reali che hanno effettivamente concluso un incarico? Diffida di testimonianze generiche prive di dettagli su cosa sia stato realizzato. Su piattaforme come Pronto Consulente, le recensioni sono collegate a consulenze effettivamente prenotate e pagate, il che riduce drasticamente il rischio di feedback non genuini.",
          "Vale la pena leggere anche le recensioni meno entusiaste: il modo in cui un consulente ha gestito una criticità dice spesso più di dieci recensioni a cinque stelle.",
        ],
      },
      {
        heading: "3. Chiarezza su prezzo e perimetro del lavoro",
        body: [
          "Un preventivo vago è un campanello d'allarme. Un buon consulente definisce con precisione cosa è incluso nel prezzo, cosa non lo è, i tempi di consegna e cosa succede in caso di richieste aggiuntive durante il progetto.",
          "Diffida di chi promette risultati garantiti su attività che per loro natura non possono esserlo — ad esempio l'esito di un bando pubblico o l'accoglimento di un ricorso: la trasparenza sui margini di incertezza è essa stessa un indicatore di serietà.",
        ],
      },
      {
        heading: "4. Tempi di risposta e comunicazione",
        body: [
          "Il modo in cui un consulente risponde durante la fase di valutazione anticipa spesso come si comporterà durante l'incarico. Tempi di risposta rapidi, domande pertinenti sul tuo caso specifico e disponibilità a chiarire dubbi prima della firma sono segnali positivi.",
          "Al contrario, risposte generiche e copiaincollate da altri preventivi, o tempi di attesa molto lunghi già in fase commerciale, tendono a peggiorare — non a migliorare — una volta avviato il progetto.",
        ],
      },
      {
        heading: "5. Affinità e metodo di lavoro",
        body: [
          "Competenza tecnica e affidabilità non bastano se il metodo di lavoro non si adatta alla tua organizzazione. Un consulente abituato a lavorare in autonomia potrebbe non essere la scelta giusta se hai bisogno di aggiornamenti frequenti e condivisione costante delle decisioni, e viceversa.",
          "Un breve colloquio conoscitivo prima dell'incarico, anche informale, aiuta a capire se lo stile di comunicazione e il grado di autonomia proposto sono compatibili con le tue aspettative.",
        ],
      },
    ],
    conclusion:
      "Scegliere il consulente giusto non è una questione di fortuna: è il risultato di un confronto strutturato tra competenza dimostrabile, referenze verificabili, chiarezza contrattuale, qualità della comunicazione e affinità di metodo. Applicare questi cinque criteri in fase di selezione riduce in modo significativo il rischio di incarichi insoddisfacenti.",
  },
  "bandi-pnrr-2026-guida-pmi": {
    intro: [
      "A distanza di anni dal lancio del Piano Nazionale di Ripresa e Resilienza, molte PMI faticano ancora a orientarsi tra le misure attive, le scadenze rinnovate e i requisiti di ammissibilità che cambiano da bando a bando. Questa guida offre una panoramica pratica di come muoversi nel 2026.",
      "Non è un elenco esaustivo di tutti i bandi disponibili — che cambiano con frequenza — ma un metodo per orientarsi ed evitare gli errori più comuni nella fase di candidatura.",
    ],
    sections: [
      {
        heading: "Le aree di intervento ancora attive",
        body: [
          "Le misure ancora operative nel 2026 si concentrano prevalentemente su transizione digitale (credito d'imposta 4.0 e 5.0), efficientamento energetico, internazionalizzazione delle PMI e rafforzamento patrimoniale delle imprese in filiere strategiche.",
          "Molte misure regionali si affiancano a quelle nazionali, spesso con requisiti di ammissibilità specifici legati al territorio o al settore produttivo: verificare la sovrapponibilità tra misure nazionali e regionali è un passaggio che troppe imprese saltano, perdendo opportunità di cumulo consentito.",
        ],
      },
      {
        heading: "Requisiti di ammissibilità: gli errori più frequenti",
        body: [
          "Il rigetto di una domanda dipende raramente dalla qualità del progetto e quasi sempre da problemi formali: DURC non regolare al momento della presentazione, visure camerali non aggiornate, codici ATECO non coerenti con l'investimento proposto.",
          "Un altro errore comune è sottovalutare i tempi tecnici di ottenimento della documentazione necessaria (perizie, attestazioni, preventivi vincolanti dei fornitori): partire con largo anticipo rispetto alla scadenza del bando è spesso più determinante della qualità del business plan.",
        ],
      },
      {
        heading: "Come muoversi tra le scadenze",
        body: [
          "I bandi a sportello, che assegnano le risorse in base all'ordine cronologico di arrivo delle domande fino a esaurimento fondi, premiano la velocità di preparazione più della perfezione formale. I bandi a graduatoria, al contrario, lasciano più tempo ma richiedono un progetto competitivo rispetto agli altri candidati.",
          "Monitorare con continuità le pubblicazioni ufficiali — e non affidarsi solo a notizie di seconda mano — resta il modo più affidabile per non perdere finestre temporali spesso strette.",
        ],
      },
      {
        heading: "Quando ha senso affidarsi a un consulente",
        body: [
          "Per bandi di importo contenuto e requisiti semplici, un'impresa strutturata può gestire la pratica internamente. Per misure complesse — in particolare quelle che richiedono business plan articolati, rendicontazione tecnica o integrazione con altri strumenti di finanza agevolata — il supporto di un consulente specializzato riduce sensibilmente il rischio di rigetto e i tempi di erogazione.",
          "Verificare il track record del consulente su bandi analoghi, non solo la conoscenza teorica della normativa, è il criterio più affidabile per scegliere chi affiancarti nella pratica.",
        ],
      },
    ],
    conclusion:
      "Muoversi con metodo tra le misure PNRR ancora attive nel 2026 richiede attenzione ai requisiti formali, tempismo nella raccolta della documentazione e, per i progetti più complessi, il supporto di chi conosce a fondo le regole di ammissibilità. La differenza tra una domanda approvata e una respinta si gioca spesso su dettagli evitabili.",
  },
  "obblighi-sicurezza-sul-lavoro-pmi": {
    intro: [
      "La sicurezza sul lavoro non è un adempimento burocratico da archiviare, ma un obbligo che, se trascurato, espone titolari e datori di lavoro a responsabilità civili e penali oltre che, naturalmente, al rischio concreto di infortuni. Molte PMI scoprono le proprie lacune solo in occasione di un'ispezione.",
      "Questa checklist pratica riassume gli obblighi principali previsti dal D.Lgs. 81/08 per una piccola o media impresa, senza pretesa di sostituire una valutazione professionale specifica per la tua attività.",
    ],
    sections: [
      {
        heading: "Documento di Valutazione dei Rischi (DVR)",
        body: [
          "Il DVR è l'atto fondamentale su cui si costruisce l'intero sistema di sicurezza aziendale: individua i rischi presenti in ogni mansione e le misure di prevenzione adottate. Deve essere aggiornato ogni volta che cambiano il processo produttivo, gli ambienti di lavoro o si verificano infortuni significativi — non solo su base periodica fissa.",
          "Un DVR redatto in modo generico, senza un reale sopralluogo sui luoghi di lavoro, è tra le non conformità più frequenti riscontrate in fase ispettiva.",
        ],
      },
      {
        heading: "Nomina del RSPP e delle figure obbligatorie",
        body: [
          "Ogni azienda deve individuare un Responsabile del Servizio di Prevenzione e Protezione, interno o esterno, oltre a un Medico Competente dove previsto dalla valutazione dei rischi, e ai Rappresentanti dei Lavoratori per la Sicurezza. La mancata nomina o un incarico formalmente scaduto sono violazioni sanzionabili.",
          "Per le PMI senza competenze interne specifiche, l'incarico a un RSPP esterno qualificato è spesso la soluzione più efficiente sia in termini di costi sia di effettiva copertura degli obblighi.",
        ],
      },
      {
        heading: "Formazione obbligatoria dei lavoratori",
        body: [
          "La formazione generale e specifica sulla sicurezza, con durata variabile in base al livello di rischio dell'azienda, è obbligatoria per tutti i lavoratori e va aggiornata periodicamente. Anche i dirigenti e i preposti hanno obblighi formativi propri, spesso trascurati.",
          "Conservare con ordine gli attestati di formazione, con date di scadenza monitorate, evita una delle contestazioni più comuni durante i controlli: la formazione erogata ma non documentabile.",
        ],
      },
      {
        heading: "Sorveglianza sanitaria e gestione delle emergenze",
        body: [
          "Dove prevista dal DVR, la sorveglianza sanitaria periodica non è facoltativa. Allo stesso modo, ogni azienda deve avere un piano di emergenza, addetti antincendio e al primo soccorso formati, e dispositivi di protezione individuale adeguati alle mansioni svolte.",
          "Un'esercitazione periodica di evacuazione, anche semplice, dimostra in fase ispettiva un'organizzazione della sicurezza realmente operativa e non solo cartacea.",
        ],
      },
    ],
    conclusion:
      "Un sistema di sicurezza sul lavoro solido si costruisce con documenti aggiornati, figure correttamente nominate, formazione tracciabile e procedure di emergenza realmente testate. Un audit preventivo, condotto da un consulente HSE prima di un'ispezione programmata, permette di individuare e risolvere le lacune quando c'è ancora tempo per farlo senza sanzioni.",
  },
  "gdpr-checklist-pmi": {
    intro: [
      "A diversi anni dall'entrata in vigore del Regolamento (UE) 2016/679, molte piccole e medie imprese trattano ancora la conformità privacy come un adempimento una tantum, anziché come un processo da mantenere aggiornato. Questa checklist in 10 punti aiuta a fare un primo controllo interno.",
      "Non sostituisce una valutazione legale specifica, ma individua gli adempimenti che, nella pratica, vengono più spesso trascurati dalle PMI italiane.",
    ],
    sections: [
      {
        heading: "1–3. Le basi: registro, informative, basi giuridiche",
        body: [
          "Il registro dei trattamenti va tenuto aggiornato e deve riflettere realmente le attività svolte, non essere una copia di un modello generico scaricato online. Ogni finalità di trattamento richiede un'informativa chiara, e una base giuridica specifica (consenso, contratto, obbligo di legge, legittimo interesse) correttamente individuata e documentata.",
          "Un errore frequente è utilizzare il consenso come base giuridica di default anche quando il trattamento deriva da un obbligo contrattuale o normativo, per cui il consenso non sarebbe la base corretta né necessaria.",
        ],
      },
      {
        heading: "4–6. Nomina del DPO, fornitori e sicurezza",
        body: [
          "Il Data Protection Officer va nominato dove obbligatorio (ad esempio per trattamenti su larga scala di categorie particolari di dati) o valutato comunque come buona pratica anche quando non obbligatorio. I contratti con fornitori che trattano dati per conto dell'azienda (cloud, payroll, marketing) devono includere un accordo di nomina a responsabile del trattamento ai sensi dell'art. 28 GDPR.",
          "Sul fronte sicurezza, misure minime come autenticazione a più fattori, backup regolari e gestione degli accessi differenziata per ruolo sono spesso richieste implicitamente dal principio di adeguatezza delle misure tecniche e organizzative.",
        ],
      },
      {
        heading: "7–8. Diritti degli interessati e data breach",
        body: [
          "L'azienda deve avere una procedura interna chiara per gestire le richieste di accesso, rettifica o cancellazione dei dati da parte di clienti o dipendenti, con tempi di risposta definiti dalla normativa. Va inoltre predisposta una procedura di gestione delle violazioni di dati personali, con valutazione della necessità di notifica al Garante entro 72 ore.",
          "Non avere una procedura documentata per queste situazioni, anche se non si sono mai verificate, è di per sé una carenza rilevabile in un audit.",
        ],
      },
      {
        heading: "9–10. Formazione del personale e revisione periodica",
        body: [
          "Il personale che tratta dati personali — non solo il reparto IT — deve ricevere una formazione periodica sugli obblighi privacy pertinenti al proprio ruolo. Infine, l'intero impianto di conformità va rivisto periodicamente: nuovi trattamenti, nuovi fornitori o cambi normativi possono rendere obsoleta una valutazione fatta anche solo un anno prima.",
          "Programmare una revisione annuale della conformità, anziché intervenire solo in emergenza, è la differenza tra un sistema privacy sostenibile e uno costruito reattivamente dopo un controllo.",
        ],
      },
    ],
    conclusion:
      "La conformità GDPR per una PMI non richiede necessariamente strutture complesse, ma un metodo chiaro e documentato su registro dei trattamenti, basi giuridiche, gestione dei fornitori, diritti degli interessati e formazione del personale. Un DPO esterno o un consulente privacy può aiutare a impostare questo metodo in modo proporzionato alla reale dimensione del rischio aziendale.",
  },
  "business-plan-investor-ready": {
    intro: [
      "Ogni anno migliaia di founder presentano il proprio business plan a investitori, business angel o fondi di venture capital. La maggior parte riceve un rifiuto non per l'idea in sé, ma per come viene presentata e argomentata. Questo articolo analizza gli errori più comuni.",
      "Capire cosa cercano davvero gli investitori — al di là delle slide patinate — aiuta a costruire un documento che regge al confronto con chi valuta decine di progetti ogni mese.",
    ],
    sections: [
      {
        heading: "Proiezioni finanziarie troppo ottimistiche",
        body: [
          "Un business plan con crescite a tre cifre per i primi tre anni, senza un'analisi realistica del mercato indirizzabile, è il modo più rapido per perdere credibilità agli occhi di un investitore esperto. Le proiezioni vanno costruite dal basso, partendo da ipotesi di acquisizione clienti verificabili, non da un obiettivo di fatturato deciso a tavolino.",
          "Un investitore preferisce founder che dimostrano di aver stress-testato le proprie ipotesi con scenari conservativi, piuttosto che chi presenta un solo scenario ottimistico privo di margini di errore.",
        ],
      },
      {
        heading: "Analisi di mercato superficiale",
        body: [
          "Citare dimensioni di mercato enormi (\"il mercato globale vale 50 miliardi\") senza collegarle in modo credibile alla quota realmente raggiungibile dall'azienda nei primi anni è un errore ricorrente. Gli investitori vogliono capire il mercato servibile realisticamente, non il totale teorico del settore.",
          "Un'analisi competitiva onesta, che riconosce i concorrenti diretti e indiretti invece di affermare di \"non avere concorrenza\", trasmette maggiore maturità imprenditoriale.",
        ],
      },
      {
        heading: "Team e execution sottovalutati",
        body: [
          "Molti business plan si concentrano quasi esclusivamente sul prodotto e sull'opportunità di mercato, dedicando poco spazio al team che dovrà eseguire il piano. Gli investitori finanziano persone prima ancora che idee: competenze complementari nel team fondatore e precedenti esperienze rilevanti pesano quanto, se non più, del prodotto stesso.",
          "Va inoltre chiarito con precisione come verranno utilizzati i fondi richiesti (use of funds) e quali milestone concrete verranno raggiunte con quel capitale, prima del round successivo.",
        ],
      },
      {
        heading: "Mancanza di chiarezza sull'exit e sul ritorno atteso",
        body: [
          "Un business plan investor-ready affronta esplicitamente lo scenario di uscita per l'investitore — acquisizione strategica, IPO, o altre vie — anche se in una fase iniziale è inevitabilmente ipotetico. Ignorare questo aspetto lascia intendere una scarsa comprensione delle logiche di investimento in equity.",
          "Allo stesso modo, la valutazione richiesta per il round deve essere argomentata con comparabili di mercato reali, non semplicemente dichiarata come punto di partenza della negoziazione.",
        ],
      },
    ],
    conclusion:
      "Un business plan davvero investor-ready non è quello con le proiezioni più ambiziose, ma quello che dimostra rigore nelle ipotesi, onestà nell'analisi competitiva, solidità del team e chiarezza sull'utilizzo dei fondi. Un consulente specializzato in startup e fundraising può aiutare a stress-testare il piano prima di presentarlo, individuando le debolezze che un founder, troppo vicino al proprio progetto, fatica a vedere.",
  },
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Articolo non trovato" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const content = articleContent[post.slug];
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const relatedPosts = (related.length > 0 ? related : blogPosts.filter((p) => p.slug !== post.slug)).slice(0, 3);

  return (
    <div>
      <section className="section-y">
        <div className="container-px">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-institutional hover:text-navy-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Torna al blog
          </Link>

          <div className="mt-6 max-w-3xl">
            <Badge tone="navy">{post.category}</Badge>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-body">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-body">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTimeMinutes} min di lettura
              </span>
            </div>
          </div>

          <div className="mt-10 flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 text-navy-100 sm:h-72">
            <BookOpen className="h-10 w-10 opacity-70" />
          </div>

          {content ? (
            <article className="prose-content mt-10 max-w-3xl">
              {content.intro.map((p, i) => (
                <p key={i} className="mb-5 text-base leading-relaxed text-ink">
                  {p}
                </p>
              ))}
              {content.sections.map((section) => (
                <div key={section.heading} className="mt-8">
                  <h2 className="text-2xl font-bold text-navy">{section.heading}</h2>
                  {section.body.map((p, i) => (
                    <p key={i} className="mt-3 text-base leading-relaxed text-ink">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
              <div className="mt-8 rounded-2xl border border-navy-100 bg-muted p-6">
                <p className="text-base leading-relaxed text-ink">{content.conclusion}</p>
              </div>
            </article>
          ) : (
            <div className="mt-10 max-w-3xl">
              <p className="text-base leading-relaxed text-ink">{post.excerpt}</p>
            </div>
          )}

          <Card className="mt-12 max-w-3xl bg-navy-900">
            <CardBody className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="font-heading text-xl font-bold text-white">
                  Hai bisogno di un consulente su questo tema?
                </h2>
                <p className="mt-1.5 text-sm text-navy-100">
                  Trova un professionista verificato in {post.category.toLowerCase()} e confronta
                  prezzi, recensioni e disponibilità.
                </p>
              </div>
              <ButtonLink href="/ricerca" variant="gold" size="lg" className="shrink-0 gap-2">
                Cerca un consulente
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container-px">
          <h2 className="text-2xl font-bold">Articoli correlati</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((p) => (
              <Card key={p.id} hover as="article">
                <CardBody>
                  <Badge tone="navy">{p.category}</Badge>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-navy">
                    <Link href={`/blog/${p.slug}`} className="hover:text-institutional">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-body">{p.excerpt}</p>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-institutional hover:text-navy-800"
                  >
                    Leggi l'articolo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
