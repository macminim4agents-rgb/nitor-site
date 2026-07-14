import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description: `Cum colectăm, folosim și protejăm datele personale — politica de confidențialitate ${site.brand}, conform GDPR.`,
  alternates: { canonical: "/confidentialitate/" },
  robots: { index: true, follow: true },
};

export default function Confidentialitate() {
  return (
    <section className="page-hero">
      <div className="container prose">
        <h1>Politica de confidențialitate</h1>
        <p>
          <em>Ultima actualizare: 14 iulie 2026.</em>
        </p>
        <p>
          Această politică explică, în limbaj simplu, ce date personale colectăm
          prin acest site și în activitatea noastră, de ce le colectăm, cât le
          păstrăm și ce drepturi aveți, conform Regulamentului (UE) 2016/679
          („GDPR”).
        </p>

        <h2>1. Cine suntem (operatorul de date)</h2>
        <p>
          <span className="todo">
            [De completat la înființarea entității juridice: denumirea completă,
            CUI, sediul social.]
          </span>{" "}
          Până la completare, ne puteți contacta pentru orice întrebare legată
          de datele dumneavoastră prin <Link href="/contact">pagina de contact</Link>.
        </p>

        <h2>2. Ce date colectăm prin acest site</h2>
        <ul>
          <li>
            <strong>Formularul de contact:</strong> numele, adresa de email,
            firma (opțional), telefonul (opțional), pachetul care vă interesează
            și conținutul mesajului — doar dacă ni le trimiteți dumneavoastră.
          </li>
          <li>
            <strong>Programarea unui apel:</strong> dacă folosiți calendarul de
            programare (Cal.com), datele pe care le introduceți acolo (nume,
            email, ora aleasă) sunt prelucrate de Cal.com conform politicii lor
            de confidențialitate. Calendarul se încarcă doar dacă apăsați pe el.
          </li>
          <li>
            <strong>WhatsApp (opțional):</strong> dacă alegeți să ne scrieți pe
            WhatsApp, conversația este prelucrată de WhatsApp (Meta) conform
            politicii lor de confidențialitate. Butonul de pe site doar deschide
            aplicația — nu trimitem noi mesaje automate și nu vă colectăm
            numărul fără să ne scrieți dumneavoastră.
          </li>
          <li>
            <strong>Găzduire:</strong> site-ul este găzduit de {site.gazduire},
            care poate înregistra în jurnalele tehnice de server adresa IP a
            vizitatorilor, ca orice serviciu de găzduire.
          </li>
        </ul>
        <p>
          <strong>
            Acest site NU folosește cookie-uri proprii, NU are trackere de
            publicitate și NU folosește instrumente de analiză a traficului.
          </strong>{" "}
          De aceea nu vă cerem acordul pentru cookie-uri — nu avem ce.
        </p>

        <h2>3. De ce folosim aceste date (scopul și temeiul legal)</h2>
        <ul>
          <li>
            <strong>Ca să vă răspundem</strong> la mesaje și să pregătim oferta
            cerută — temei: demersuri la cererea dumneavoastră înainte de
            încheierea unui contract (art. 6 alin. 1 lit. b GDPR) și
            consimțământul dat prin bifarea căsuței din formular (art. 6 alin. 1
            lit. a).
          </li>
          <li>
            <strong>Ca să ținem evidența</strong> corespondenței comerciale —
            temei: interesul nostru legitim de a ne administra activitatea
            (art. 6 alin. 1 lit. f).
          </li>
        </ul>

        <h2>4. Date despre companii, colectate din surse publice</h2>
        <p>
          În activitatea noastră de identificare a potențialilor clienți
          (companii, nu persoane fizice), colectăm date{" "}
          <strong>din surse publice</strong>: site-ul public al companiei,
          profiluri publice de afaceri (de exemplu Google Maps / Google Business
          Profile) și datele de contact pe care compania însăși le-a făcut
          publice.
        </p>
        <ul>
          <li>
            Pentru fiecare informație păstrăm <strong>sursa și data</strong> la
            care am colectat-o.
          </li>
          <li>
            Temeiul legal este <strong>interesul legitim</strong> (art. 6 alin.
            1 lit. f GDPR) de a contacta companii cu o propunere comercială
            relevantă pentru activitatea lor (comunicare business-to-business).
          </li>
          <li>
            <strong>Vă puteți opune oricând:</strong> răspundeți la orice mesaj
            al nostru cu „Nu mă mai contactați” sau scrieți-ne prin formular.
            Adresa dumneavoastră intră permanent pe lista noastră de excludere
            și nu o vom mai contacta.
          </li>
          <li>
            Nu cumpărăm baze de date, nu colectăm date din surse închise și nu
            folosim datele în alt scop decât contactul comercial descris mai
            sus.
          </li>
        </ul>

        <h2>5. Cui transmitem datele (persoane împuternicite)</h2>
        <ul>
          <li>
            <strong>FormSubmit</strong> — serviciul care ne livrează pe email
            mesajele din formularul de contact.
          </li>
          <li>
            <strong>Cal.com</strong> — sistemul de programare a apelurilor (doar
            dacă îl folosiți).
          </li>
          <li>
            <strong>WhatsApp (Meta)</strong> — doar dacă alegeți dumneavoastră
            acest canal de contact.
          </li>
          <li>
            <strong>{site.gazduire}</strong> — găzduirea acestui site.
          </li>
        </ul>
        <p>Nu vindem și nu închiriem datele dumneavoastră nimănui.</p>

        <h2>6. Cât păstrăm datele</h2>
        <ul>
          <li>
            Mesajele din formular: cât durează discuția comercială și, dacă nu
            devine contract, cel mult <strong>2 ani</strong> de la ultimul
            contact.
          </li>
          <li>
            Lista de excludere („nu mă mai contactați”): <strong>permanent</strong>{" "}
            — e singurul mod prin care putem garanta că nu vă mai contactăm.
          </li>
          <li>Datele din contracte: conform obligațiilor legale de arhivare.</li>
        </ul>

        <h2>7. Drepturile dumneavoastră</h2>
        <p>
          Aveți dreptul de acces la datele dumneavoastră, dreptul la
          rectificare, la ștergere, la restricționarea prelucrării, la
          portabilitate, dreptul de a vă opune prelucrării (inclusiv contactării
          comerciale) și dreptul de a vă retrage oricând consimțământul, fără a
          afecta prelucrările deja efectuate.
        </p>
        <p>
          Pentru orice cerere, scrieți-ne prin{" "}
          <Link href="/contact">formularul de contact</Link> — răspundem în cel
          mult 30 de zile, conform GDPR.
        </p>
        <p>
          Dacă apreciați că v-am încălcat drepturile, vă puteți adresa
          Autorității Naționale de Supraveghere a Prelucrării Datelor cu
          Caracter Personal (ANSPDCP):{" "}
          <a href="https://www.dataprotection.ro" rel="noopener" target="_blank">
            dataprotection.ro
          </a>
          .
        </p>

        <h2>8. Securitate</h2>
        <p>
          Site-ul folosește exclusiv conexiuni criptate (HTTPS). Datele primite
          prin formular ajung într-o căsuță de email protejată, accesibilă doar
          nouă. Nu stocăm date personale pe acest site.
        </p>

        <h2>9. Modificări ale acestei politici</h2>
        <p>
          Dacă politica se schimbă, publicăm aici versiunea nouă, cu data
          actualizării. Versiunea curentă este cea din 14 iulie 2026.
        </p>
      </div>
    </section>
  );
}
