"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Gleam } from "./Icons";

const links = [
  { href: "/servicii", label: "Servicii" },
  { href: "/pachete", label: "Pachete" },
  { href: "/proces", label: "Cum lucrăm" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      // header-ul se retrage la derulare în jos și revine la derulare în sus
      if (y > 420 && y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 4 || y < 420) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // meniul mobil se închide la navigare și blochează scroll-ul cât e deschis
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const current = (href: string) =>
    pathname.replace(/\/$/, "") === href || pathname.startsWith(href + "/")
      ? "page"
      : undefined;

  return (
    <>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <header
        className={`site-header ${scrolled ? "scrolled" : ""} ${
          hidden && !open ? "hidden-up" : ""
        }`}
      >
        <div className="container nav">
          <Link className="brand" href="/" aria-label={`${site.brand} — pagina principală`}>
            <Gleam size={17} className="brand-gleam" />
            <span className="brand-word">{site.brandShort}</span>
            <span className="brand-sub">Digital</span>
          </Link>
          <nav aria-label="Meniu principal">
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={current(l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="btn" href="/contact">
                  <span>Programați un apel</span>
                </Link>
              </li>
            </ul>
            <button
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="meniu-mobil"
              onClick={() => setOpen(!open)}
            >
              {open ? "Închide" : "Meniu"}
            </button>
          </nav>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`} id="meniu-mobil">
        <ul>
          <li>
            <Link href="/">Acasă</Link>
          </li>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <Link className="btn" href="/contact">
          <span>Programați un apel de 15 minute</span>
        </Link>
      </div>
    </>
  );
}
