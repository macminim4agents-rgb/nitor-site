"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const optiuni = [
  "Nu știu încă — vreau să discutăm",
  "Pachetul Lansare",
  "Pachetul Lansare + Programări",
  "Pachetul Prezență continuă",
  "Un serviciu anume (video, automatizări, chatbot…)",
];

/**
 * Formularul de contact — FormSubmit livrează mesajul pe email; site-ul
 * rămâne static, fără backend. ?pachet=... preselectează opțiunea
 * (linkurile „Cereți ofertă” din /pachete).
 *
 * Preselecția se face în useEffect, NU cu useSearchParams(): într-un export
 * static acela scoate componenta din prerender, iar formularul dispărea cu
 * totul din HTML (0 <form>, 0 <input> în out/contact/index.html — măsurat
 * 2026-07-15). FormSubmit e un POST HTML simplu, deci trebuie să meargă și
 * cu JS blocat; în plus, formularul care apărea abia la hidratare mișca
 * pagina sub ochii vizitatorului.
 */
export default function ContactForm() {
  const select = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const pachet = new URLSearchParams(window.location.search).get("pachet");
    if (!pachet || !select.current) return;
    const gasit = optiuni.find((o) => o.toLowerCase().includes(pachet.toLowerCase()));
    if (gasit) select.current.value = gasit;
  }, []);

  return (
    <form
      className="contact-form"
      action={`https://formsubmit.co/${site.formEndpoint}`}
      method="POST"
    >
      {/* setări FormSubmit — nu se văd în pagină */}
      <input type="hidden" name="_subject" value={`Mesaj nou de pe site-ul ${site.brand}`} />
      <input type="hidden" name="_next" value={`${site.url}/multumim/`} />
      <input type="hidden" name="_captcha" value="false" />
      <input
        type="text"
        name="_honey"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="row-2">
        <div className="field">
          <label htmlFor="f-nume">Numele dumneavoastră *</label>
          <input id="f-nume" name="nume" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="f-firma">Firma (opțional)</label>
          <input id="f-firma" name="firma" type="text" autoComplete="organization" />
        </div>
      </div>
      <div className="row-2">
        <div className="field">
          <label htmlFor="f-email">Email *</label>
          <input id="f-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="f-telefon">Telefon (opțional)</label>
          <input id="f-telefon" name="telefon" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-pachet">Ce vă interesează?</label>
        <select id="f-pachet" name="pachet" ref={select} defaultValue={optiuni[0]}>
          {optiuni.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-mesaj">Mesajul dumneavoastră *</label>
        <textarea id="f-mesaj" name="mesaj" required />
      </div>
      <label className="consent">
        <input type="checkbox" required name="acord_gdpr" value="da" />
        <span>
          Sunt de acord ca datele din acest formular să fie folosite pentru a-mi
          răspunde, conform{" "}
          <a href="/confidentialitate/">politicii de confidențialitate</a>. *
        </span>
      </label>
      <div>
        <button className="btn" type="submit">
          <span>Trimiteți mesajul</span>
        </button>
      </div>
    </form>
  );
}
