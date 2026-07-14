import Link from "next/link";
import type { Serviciu } from "@/content/ro";
import { IconArrow, ServiceIcon } from "./Icons";

export default function ServiceCard({ s, i }: { s: Serviciu; i: number }) {
  return (
    <Link className="svc-card" href={`/servicii/${s.slug}`}>
      <span className="num">{String(i + 1).padStart(2, "0")}</span>
      <ServiceIcon name={s.icon} className="icon" />
      <h3>{s.nume}</h3>
      <p>{s.scurt}</p>
      <span className="go">
        Detalii <IconArrow />
      </span>
    </Link>
  );
}
