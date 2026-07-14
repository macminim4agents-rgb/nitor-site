"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

declare global {
  interface Window {
    Cal?: any;
  }
}

/**
 * Programarea Cal.com. Scriptul Cal se încarcă DOAR la apăsarea butonului —
 * pagina rămâne fără niciun terț la încărcare (decizia D19).
 * Cât timp site.calLink e gol, arătăm mesajul de rezervă.
 */
export default function CalBooking() {
  const [loaded, setLoaded] = useState(false);

  if (!site.calLink) {
    return (
      <div className="cal-card">
        <p>
          <strong>Calendarul de programări se activează în curând.</strong>
        </p>
        <p>
          Până atunci, scrieți-ne prin <Link href="/contact#formular" className="link-line">formular</Link>{" "}
          — răspundem în cel mult o zi lucrătoare.
        </p>
      </div>
    );
  }

  const load = () => {
    setLoaded(true);
    // snippet-ul oficial de embed Cal.com
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    window.Cal("init", { origin: "https://cal.com" });
    window.Cal("inline", {
      elementOrSelector: "#cal-embed",
      calLink: site.calLink,
      layout: "month_view",
    });
    window.Cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
  };

  return loaded ? (
    <div id="cal-embed" />
  ) : (
    <div className="cal-card">
      <p>
        <strong>Alegeți ora care vă convine.</strong>
      </p>
      <p>
        Folosim exact sistemul de programări pe care îl instalăm clienților
        noștri. Apelul e gratuit și fără obligații.
      </p>
      <button className="btn" onClick={load}>
        <span>Deschideți calendarul</span>
      </button>
    </div>
  );
}
