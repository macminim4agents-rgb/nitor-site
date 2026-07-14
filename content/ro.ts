/**
 * TOT conținutul în limba română. Faza 2 (EN): se creează content/en.ts cu
 * aceeași structură + rute /en — componentele primesc conținutul ca date,
 * deci nu se rescrie nimic din cod.
 *
 * Regula #3 se aplică și aici: nicio cifră, statistică sau afirmație despre
 * clienți/rezultate care nu poate fi susținută. De aceea nu există
 * testimoniale, loguri de clienți sau „peste X proiecte livrate”.
 */

export type IconName =
  | "site" | "seo" | "continut" | "social" | "video"
  | "automatizari" | "chatbot" | "programari";

export type Serviciu = {
  slug: string;
  nume: string;          // numele scurt (meniu, carduri)
  titlu: string;         // H1 al paginii
  meta: string;          // meta description
  scurt: string;         // descrierea de pe card
  lead: string;          // paragraful de deschidere al paginii
  primiti: string[];     // „Ce primiți”
  pasi: { t: string; d: string }[];
  onest: string;         // caseta „Pe șleau” — onestitate, marca noastră
  faq: { q: string; a: string }[];
  icon: IconName;
};

export const servicii: Serviciu[] = [
  {
    slug: "site-uri",
    nume: "Site-uri",
    titlu: "Site-uri care se lansează fără să vă consume timpul",
    meta: "Site de prezentare complet, cu texte, imagini și structură pregătite de noi. Publicat în 7 zile de la acord. Dumneavoastră doar aprobați.",
    scurt: "Site-uri de prezentare și landing page-uri — rapide, corecte tehnic, cu tot conținutul inclus.",
    lead: "Un site de prezentare complet — structură, texte, imagini, formular, pagină GDPR — pregătit integral de noi. Dumneavoastră îl vedeți într-un link privat, cereți modificările dorite și aprobați. În 7 zile de la acord, e publicat.",
    primiti: [
      "Structură și design pe specificul firmei dumneavoastră — nu un șablon umplut în grabă",
      "Toate textele scrise de noi, în tonul firmei, verificate înainte de publicare",
      "Imagini alese sau pregătite de noi, consecvente cu identitatea firmei",
      "Formular de contact funcțional și pagină de confidențialitate conformă GDPR",
      "Viteză pe care o puteți măsura oricând în Google PageSpeed — instrumentul oficial, nu cifrele noastre",
      "Programări online integrate, dacă activitatea dumneavoastră lucrează pe programări",
      "O instruire scurtă de administrare, pe înțeles",
    ],
    pasi: [
      { t: "Un apel de 15 minute", d: "Ne spuneți ce face firma, cine sunt clienții și ce vă nemulțumește la situația de acum. Fără teme de casă." },
      { t: "Pregătim tot", d: "Structura, textele fiecărei pagini, imaginile, formularul, pagina GDPR — pe specificul firmei dumneavoastră." },
      { t: "Previzualizare privată", d: "Primiți un link. Citiți, comentați, cereți modificări — le facem până sunteți mulțumit." },
      { t: "Aprobați. Ziua 7: publicare", d: "Nimic nu devine public fără acordul dumneavoastră. După el, site-ul e live." },
    ],
    onest: "Cele 7 zile se numără de la acordul dumneavoastră pe ofertă, nu de la primul mesaj. Iar dacă la previzualizare cereți multe modificări, termenul se mișcă odată cu ele — preferăm să știți asta de la început decât să descoperiți pe parcurs.",
    faq: [
      { q: "Chiar nu trebuie să vă dau texte și poze?", a: "Nu. Le pregătim noi, din discuția inițială și din informațiile publice ale firmei dumneavoastră. Rolul dumneavoastră este să le citiți și să le aprobați — sau să cereți modificări." },
      { q: "Pe ce e construit site-ul?", a: "Pe tehnologii web moderne, ca site static — adică rapid, sigur și fără abonamente obligatorii la platforme terțe. Site-ul este al dumneavoastră." },
      { q: "Ce se întâmplă după lansare?", a: "Alegeți: rămâneți cu site-ul așa cum e, fără nicio obligație, sau continuăm cu un abonament de întreținere și conținut (pachetul „Prezență continuă”)." },
    ],
    icon: "site",
  },
  {
    slug: "seo",
    nume: "SEO tehnic",
    titlu: "Fundația SEO: viteză, structură, date pe care Google le înțelege",
    meta: "SEO tehnic făcut corect din prima zi: viteză, structură semantică, date structurate, Search Console. Onest despre termene: rezultatele se văd în luni.",
    scurt: "Viteză, structură, date pe care Google le înțelege. Onest: rezultatele SEO se văd în luni, nu în zile — fundația însă se pune din prima zi.",
    lead: "SEO nu începe cu articole — începe cu un site pe care Google îl poate citi ușor: rapid, structurat corect, cu date tehnice complete. Această fundație o punem din prima zi și o puteți măsura imediat.",
    primiti: [
      "Audit tehnic complet al site-ului existent — ce e bine, ce frânează, negru pe alb",
      "Viteză optimizată, măsurabilă public în Google PageSpeed",
      "Structură semantică corectă: titluri, meta description, H1–H2, linkuri interne",
      "Date structurate schema.org, sitemap.xml și robots.txt configurate corect",
      "Google Search Console configurat, cu site-ul trimis la indexare",
      "Raport lunar pe înțeles: ce s-a făcut, ce s-a schimbat, ce urmează",
    ],
    pasi: [
      { t: "Audit", d: "Măsurăm situația de acum cu instrumente publice, verificabile — nu cu scoruri proprietare pe care nu le poate confirma nimeni." },
      { t: "Corecturi tehnice", d: "Viteză, structură, date structurate, indexare — lucrurile care țin de noi se rezolvă primele." },
      { t: "Măsurare și continuare", d: "Urmărim indexarea și pozițiile în timp; conținutul nou (articole, pagini de servicii) se adaugă pe fundația deja corectă." },
    ],
    onest: "Rezultatele SEO se văd în luni, nu în zile — cine vă promite „prima pagină în Google” săptămâna viitoare nu vă spune adevărul. Ce se poate garanta e fundația tehnică corectă și măsurarea onestă a evoluției. Atât promitem, pentru că atât se poate promite.",
    faq: [
      { q: "Garantați prima poziție în Google?", a: "Nu — și nimeni serios nu poate. Poziția depinde de concurență, de istoricul domeniului și de algoritmi pe care nu îi controlează nicio agenție. Garantăm fundația tehnică corectă și raportare onestă." },
      { q: "Care e diferența dintre SEO tehnic și conținut SEO?", a: "SEO tehnic = site-ul poate fi citit și înțeles de Google (viteză, structură, date). Conținutul SEO = paginile și articolele care răspund căutărilor clienților. Primul e condiția pentru al doilea; le oferim pe ambele." },
      { q: "Cât durează până se văd rezultate?", a: "Efectele tehnice (indexare corectă, viteză) — imediat. Creșterea în poziții — de regulă luni; depinde de concurența din domeniul dumneavoastră. Vă arătăm evoluția în fiecare raport lunar." },
    ],
    icon: "seo",
  },
  {
    slug: "continut",
    nume: "Conținut",
    titlu: "Texte și imagini gata de publicat — scrise de noi, aprobate de dumneavoastră",
    meta: "Texte de site, articole, descrieri de servicii și imagini — pregătite integral de noi, verificate uman, publicate doar cu aprobarea dumneavoastră.",
    scurt: "Texte de site, articole, descrieri de servicii — scrise de noi, în tonul firmei, verificate înainte de publicare.",
    lead: "Partea la care se blochează orice proiect digital: „trimiteți-ne textele”. Noi am eliminat-o. Scriem noi textele site-ului, articolele și descrierile serviciilor, pregătim imaginile — iar dumneavoastră doar aprobați.",
    primiti: [
      "Textele complete ale site-ului: pagina principală, servicii, despre, contact",
      "Articole pentru blog, pe subiectele pe care clienții dumneavoastră chiar le caută",
      "Descrieri de servicii clare, fără jargon inutil",
      "Imagini selectate sau pregătite de noi, consecvente cu identitatea firmei",
      "Un ton unitar, stabilit împreună la început și păstrat peste tot",
      "Verificare umană pe fiecare material, înainte să ajungă la dumneavoastră",
    ],
    pasi: [
      { t: "Discutăm tonul", d: "Formal sau apropiat? Tehnic sau simplu? Stabilim vocea firmei într-o discuție scurtă." },
      { t: "Scriem și pregătim", d: "Texte și imagini, pe baza discuției și a informațiilor publice despre firma dumneavoastră." },
      { t: "Aprobați", d: "Nimic nu se publică fără acordul dumneavoastră, pe fiecare material în parte." },
    ],
    onest: "Folosim și instrumente moderne (inclusiv AI) ca să lucrăm repede — dar fiecare material trece printr-o verificare umană și prin aprobarea dumneavoastră. Și o regulă de la care nu ne abatem: nu publicăm despre firma dumneavoastră afirmații pe care nu le putem susține cu o sursă — nici recenzii fabricate, nici cifre inventate.",
    faq: [
      { q: "De unde știți ce să scrieți despre firma mea?", a: "Din apelul inițial și din sursele publice: site-ul actual, profilul Google Business, rețelele sociale ale firmei. Ce nu știm, întrebăm — nu inventăm." },
      { q: "Textele sunt scrise de AI?", a: "Sunt pregătite cu unelte moderne și verificate de un om, apoi de dumneavoastră. Contează rezultatul: texte corecte, în tonul firmei, cu informații reale. Răspunderea pentru fiecare afirmație rămâne a noastră." },
      { q: "Pot cere modificări?", a: "Da, acesta e chiar procesul: primiți materialele, comentați, le refacem până sunteți mulțumit. Abia apoi se publică." },
    ],
    icon: "continut",
  },
  {
    slug: "social-media",
    nume: "Social media",
    titlu: "Prezență constantă pe Facebook și Instagram, fără să vă ocupe serile",
    meta: "Calendar lunar de postări pentru Facebook și Instagram, pregătit integral de noi — texte și imagini incluse. Aprobați totul într-o singură ședere.",
    scurt: "Calendar lunar de postări pentru Facebook și Instagram, pregătit integral și aprobat de dumneavoastră.",
    lead: "Pagina de Facebook pe care scrie „ultima postare: acum 7 luni” nu ajută pe nimeni. Pregătim un calendar lunar de postări — texte și imagini incluse — pe care îl aprobați într-o singură ședere. Apoi postările se publică singure, la timp.",
    primiti: [
      "Calendar lunar de postări pentru Facebook și Instagram",
      "Texte și imagini incluse — nu vă cerem nici poze, nici idei",
      "Aprobarea întregii luni dintr-o singură ședere, pe un document clar",
      "Publicare programată — postările apar la timp, fără să vă gândiți la ele",
      "Raport lunar simplu: ce s-a postat, ce a mers mai bine",
    ],
    pasi: [
      { t: "Stabilim direcția", d: "Ce vrem să afle clienții despre firmă luna aceasta? Servicii, noutăți, răspunsuri la întrebări frecvente." },
      { t: "Pregătim calendarul", d: "Toate postările lunii — text + imagine — într-un singur document, ușor de parcurs." },
      { t: "Aprobați și publicăm", d: "Comentați, modificăm, aprobați. Postările se programează și apar singure." },
    ],
    onest: "Social media organic construiește încredere și prezență — dar rareori aduce clienți peste noapte. Pentru rezultate rapide există promovarea plătită, care e alt subiect și alt buget; dacă are sens pentru firma dumneavoastră, v-o spunem deschis, cu costuri estimate înainte să cheltuiți un leu.",
    faq: [
      { q: "Postați și în numele meu?", a: "Publicarea se face pe paginile firmei dumneavoastră, cu materiale aprobate de dumneavoastră în prealabil — nimic nu pleacă fără acordul dumneavoastră explicit." },
      { q: "Câte postări pe lună?", a: "Depinde de pachet și de specificul firmei — stabilim împreună un ritm sustenabil. Mai bine 8 postări bune decât 30 de umplutură." },
      { q: "Îmi garantați urmăritori sau vânzări?", a: "Nu. Vă garantăm prezență constantă, materiale de calitate și raportare onestă. Cine vă garantează urmăritori de obicei îi cumpără — iar asta vă distruge pagina." },
    ],
    icon: "social",
  },
  {
    slug: "video",
    nume: "Video",
    titlu: "Materiale video scurte, pregătite pentru site și social media",
    meta: "Clipuri scurte de prezentare pentru site, Facebook și Instagram — montate de noi din materialele existente sau create de noi, cu subtitrări incluse.",
    scurt: "Materiale video scurte pentru prezentare și social media, pe baza materialelor existente sau create de noi.",
    lead: "Video-ul e formatul la care se oprește privirea — dar și cel pe care firmele îl amână la nesfârșit, pentru că pare complicat. Îl facem noi simplu: clipuri scurte, montate din materialele pe care le aveți deja sau create de noi.",
    primiti: [
      "Clipuri scurte de prezentare pentru site și social media",
      "Formate corecte pentru fiecare platformă (orizontal pentru site, vertical pentru Instagram/Facebook)",
      "Subtitrări incluse — mulți oameni se uită fără sonor",
      "Montaj din materialele dumneavoastră existente sau materiale create de noi",
      "Aprobarea dumneavoastră înainte de orice publicare, ca la orice alt material",
    ],
    pasi: [
      { t: "Alegem subiectul", d: "Prezentarea firmei, a echipei, a unui serviciu frecvent căutat — ce aduce cel mai mult pentru clienții dumneavoastră." },
      { t: "Montăm", d: "Din materiale existente (poze, filmări de telefon) sau din materiale pregătite de noi." },
      { t: "Aprobați și publicăm", d: "Vedeți clipul, cereți modificări, aprobați. Apoi ajunge pe site și pe rețele." },
    ],
    onest: "Un clip bun nu cere echipă de filmare ca să-și facă treaba — dar nici nu face minuni singur. Vă recomandăm video acolo unde chiar ajută: prezentarea locației și a echipei (construiește încredere înainte de prima vizită) și răspunsuri la întrebările frecvente. Nu vă vindem „video viral” — nimeni nu poate promite așa ceva.",
    faq: [
      { q: "Trebuie să filmez eu ceva?", a: "Nu neapărat. Pornim de la ce există: poze, filmări scurte de telefon, imaginile din spațiul firmei. Dacă e nevoie de filmare dedicată, v-o propunem separat, cu costul spus dinainte." },
      { q: "Ce lungime au clipurile?", a: "Scurte — de regulă sub un minut. Atât rabdă privitorul pe social media, și atât e nevoie ca să transmiteți esențialul." },
      { q: "Cine deține materialele?", a: "Dumneavoastră. Toate materialele finale vă aparțin și le puteți folosi oriunde." },
    ],
    icon: "video",
  },
  {
    slug: "automatizari",
    nume: "Automatizări",
    titlu: "Fluxuri care economisesc ore: programări, confirmări, notificări",
    meta: "Automatizăm fluxurile care vă mănâncă timpul: programări, confirmări, reamintiri, colectarea cererilor într-un singur loc. Simplu și documentat.",
    scurt: "Fluxuri care economisesc timp: programări, confirmări, notificări, colectarea cererilor într-un singur loc.",
    lead: "Orele pierdute pe confirmări telefonice, mesaje repetitive și cereri notate pe bilețele se adună. Automatizăm exact aceste fluxuri — mărunte în aparență, mari în timpul pe care vi-l înapoiază.",
    primiti: [
      "Programări confirmate automat, cu reamintiri înainte de întâlnire",
      "Cererile din toate canalele (formular, email) adunate într-un singur loc",
      "Notificări către dumneavoastră sau echipă când apare o cerere nouă",
      "Răspunsuri automate de primire („am primit mesajul, revenim într-o zi lucrătoare”)",
      "Documentație simplă: ce face fiecare automatizare și cum o opriți",
    ],
    pasi: [
      { t: "Găsim hoțul de timp", d: "O discuție scurtă: ce activitate repetitivă vă consumă cel mai mult? De acolo începem." },
      { t: "Construim fluxul", d: "Cel mai simplu flux care rezolvă problema — nu un sistem stufos de dragul tehnologiei." },
      { t: "Testăm împreună și predăm", d: "Îl vedeți funcționând, îl înțelegeți, primiți documentația. Abia apoi îl considerăm livrat." },
    ],
    onest: "Automatizăm doar procese pe care le înțelegem împreună cap-coadă — o automatizare pusă peste un proces confuz doar mută haosul mai repede. Și nu automatizăm niciodată mesaje trimise în numele dumneavoastră fără aprobarea dumneavoastră pe conținut.",
    faq: [
      { q: "Am nevoie de programe speciale?", a: "De regulă nu — folosim unelte web existente și le legăm între ele. Dacă un abonament la o unealtă e necesar, vă spunem costul lui exact, înainte." },
      { q: "Ce se întâmplă dacă se strică ceva?", a: "Fiecare automatizare vine cu documentație: ce face și cum se oprește. La abonamentele de întreținere, monitorizăm și reparăm noi." },
      { q: "Puteți automatiza WhatsApp?", a: "Pentru mesaje automate prin WhatsApp există doar calea oficială (WhatsApp Business API), cu reguli stricte și acordul destinatarului. Nu folosim trucuri neoficiale — riscă blocarea numărului dumneavoastră. Vă spunem deschis ce se poate și ce nu." },
    ],
    icon: "automatizari",
  },
  {
    slug: "chatbot",
    nume: "Chatbot & asistență",
    titlu: "Răspunsuri automate la întrebările frecvente — cu predare către om",
    meta: "Chatbot pe site care răspunde la întrebările frecvente ale clienților — program, servicii, locație — și predă conversația către om când e nevoie.",
    scurt: "Răspunsuri automate la întrebările frecvente ale clienților, pe site — cu predare către om când e nevoie.",
    lead: "„Care e programul?”, „Unde vă găsesc?”, „Cât costă o consultație?” — aceleași întrebări, în fiecare zi. Un asistent pe site le răspunde instant, politicos și corect, iar ce nu știe predă omului.",
    primiti: [
      "Asistent pe site care răspunde la întrebările frecvente ale clienților dumneavoastră",
      "Conținut construit din informațiile reale ale firmei — și doar din ele",
      "Predare către om: ce nu știe sigur, nu inventează — vă transmite întrebarea",
      "Aprobarea dumneavoastră pe setul de răspunsuri, înainte de pornire",
      "Actualizare când se schimbă informațiile (program, servicii, prețuri publice)",
    ],
    pasi: [
      { t: "Adunăm întrebările", d: "Ce vă întreabă clienții cel mai des? Din experiența dumneavoastră și din mesajele existente." },
      { t: "Construim răspunsurile", d: "Corecte, în tonul firmei, aprobate de dumneavoastră înainte de pornire." },
      { t: "Pornim și urmărim", d: "Vedem ce întreabă vizitatorii real și completăm răspunsurile lună de lună." },
    ],
    onest: "Un chatbot e exact atât de bun cât informația pe care i-o dăm — răspunde bine la întrebările frecvente și predă omului restul. Nu vă promitem un robot care vinde singur; vă promitem mai puține telefoane cu „care e programul?” și niciun client lăsat fără răspuns la 11 noaptea.",
    faq: [
      { q: "Chatbot-ul poate da informații greșite?", a: "Riscul există la orice sistem automat — de aceea al nostru răspunde doar din setul de informații aprobat de dumneavoastră, iar la întrebări în afara lui predă conversația către om în loc să improvizeze." },
      { q: "Ce se întâmplă cu întrebările la care nu știe răspunsul?", a: "Ajung la dumneavoastră (email sau alt canal ales), iar clientului i se spune politicos că un coleg îi va răspunde. Nimic nu se pierde." },
      { q: "Pot vedea ce întreabă vizitatorii?", a: "Da — și e una dintre cele mai utile părți: aflați ce își doresc clienții cu adevărat, în cuvintele lor." },
    ],
    icon: "chatbot",
  },
  {
    slug: "programari-online",
    nume: "Programări online",
    titlu: "Programări online pe site: clienții aleg ora, sistemul confirmă",
    meta: "Sistem de programări online integrat pe site: clienții aleg ora liberă, primesc confirmare și reamintiri automate. Mai puține telefoane, mai puține absențe.",
    scurt: "Clienții își aleg singuri ora pe site, primesc confirmare și reamintiri automate — mai puține telefoane, mai puține absențe.",
    lead: "Jumătate din telefoanele unei firme cu programări sună cam așa: „aveți ceva liber joi?”. Un sistem de programări pe site răspunde singur la întrebarea asta, la orice oră — iar reamintirile automate reduc absențele.",
    primiti: [
      "Calendar de programări integrat pe site — clienții văd orele libere și aleg",
      "Confirmare automată pe email, imediat după programare",
      "Reamintiri automate înainte de întâlnire — mai puține absențe",
      "Sincronizare cu calendarul dumneavoastră — fără suprapuneri",
      "Reguli pe care le controlați: program, pauze, durata fiecărui tip de întâlnire",
      "Instruire scurtă: cum modificați programul și cum vedeți programările",
    ],
    pasi: [
      { t: "Stabilim regulile", d: "Programul de lucru, tipurile de întâlniri, duratele, pauzele — regulile dumneavoastră, în sistem." },
      { t: "Integrăm pe site", d: "Calendarul apare pe site-ul dumneavoastră, în identitatea firmei, ușor de folosit de pe telefon." },
      { t: "Testați și pornim", d: "Faceți câteva programări de probă, vedeți confirmările, ajustăm. Apoi e live." },
    ],
    onest: "Folosim exact sistemul de programări pe care îl vedeți funcționând pe pagina noastră de contact — îl puteți testa la noi înainte să-l cumpărați. Iar dacă firma dumneavoastră primește programările mai ales telefonic și așa vă e bine, v-o spunem sincer: nu aveți nevoie de el.",
    faq: [
      { q: "Clienții mai în vârstă se vor descurca?", a: "Sistemul e simplu — alegi ziua, alegi ora, scrii numele — dar telefonul rămâne mereu o opțiune. Programările online se adaugă peste, nu înlocuiesc nimic." },
      { q: "Ce se întâmplă dacă mi se schimbă programul?", a: "Îl modificați dumneavoastră în câteva clicuri (vă arătăm cum) sau ni-l spuneți nouă și îl modificăm noi — cum preferați." },
      { q: "Primesc notificare la fiecare programare?", a: "Da — email la fiecare programare nouă, modificare sau anulare, plus lista completă în calendar." },
    ],
    icon: "programari",
  },
];

export const pachete = [
  {
    nume: "Lansare",
    descriere: "Pentru firma care are nevoie de un site corect, repede, fără bătăi de cap.",
    include: [
      "Site de prezentare complet",
      "Texte, imagini și structură — incluse",
      "SEO tehnic de bază",
      "Formular de contact și pagină GDPR",
      "Publicat în 7 zile de la acord",
    ],
    recomandat: false,
  },
  {
    nume: "Lansare + Programări",
    descriere: "Pentru cabinete, clinici, saloane — orice firmă care trăiește din programări.",
    include: [
      "Tot ce cuprinde Lansare",
      "Programări online integrate pe site",
      "Confirmări și reamintiri automate",
      "Buton WhatsApp pentru clienți",
      "Instruire scurtă de administrare",
    ],
    recomandat: true,
  },
  {
    nume: "Prezență continuă",
    descriere: "Pentru firma care vrea să crească lună de lună, fără să se ocupe de asta.",
    include: [
      "Abonament lunar, după lansare",
      "SEO tehnic continuu",
      "Articole și conținut de site",
      "Social media lunar",
      "Raport lunar, pe înțeles",
    ],
    recomandat: false,
  },
];

export const procesPasi = [
  {
    t: "Un apel de 15 minute",
    d: "Ne spuneți ce face firma, cine sunt clienții și ce vă nemulțumește la situația de acum. Atât — fără teme de casă, fără chestionare de 40 de întrebări.",
    alDvs: false,
  },
  {
    t: "Cercetăm și pregătim",
    d: "Structura, textele fiecărei pagini, imaginile, formularul, pagina GDPR — toate pregătite de noi, pe specificul firmei dumneavoastră, din discuția inițială și din informațiile publice ale firmei.",
    alDvs: false,
  },
  {
    t: "Vă prezentăm rezultatul, în privat",
    d: "Primiți un link de previzualizare pe care îl vedeți doar dumneavoastră. Citiți, comentați, cereți modificări — le facem până sunteți mulțumit.",
    alDvs: false,
  },
  {
    t: "Aprobați",
    d: "Pasul care vă aparține în întregime. Nimic nu devine public fără acest acord — nicio pagină, niciun text, nicio postare. Regula e absolută.",
    alDvs: true,
  },
  {
    t: "Ziua 7: publicare",
    d: "Site-ul e live, cu programare online funcțională, pagină de confidențialitate corectă și viteză pe care o puteți măsura oricând, public, în Google PageSpeed.",
    alDvs: false,
  },
];

export const principii = [
  {
    t: "Zero teme pentru dumneavoastră",
    d: "Nu vă cerem materiale — le pregătim noi, cu instrumente moderne și verificare umană, din informațiile publice ale firmei și din discuția inițială. Dumneavoastră doar aprobați.",
  },
  {
    t: "Viteză dovedită, nu promisă",
    d: "Acest site este construit cu procesul pe care vi-l propunem — și îl puteți măsura chiar acum în Google PageSpeed, instrumentul oficial Google, nu în cifrele noastre.",
  },
  {
    t: "Date verificate, nu inventate",
    d: "Orice informație publicată despre firma dumneavoastră are o sursă: fie vine de la dumneavoastră, fie e verificată public. Nu publicăm recenzii fabricate, cifre nesusținute sau promisiuni fără acoperire.",
  },
  {
    t: "Dumneavoastră aveți ultimul cuvânt",
    d: "Nimic nu se publică și nimic nu se trimite în numele firmei dumneavoastră fără acordul dumneavoastră explicit, pe fiecare material în parte.",
  },
];
