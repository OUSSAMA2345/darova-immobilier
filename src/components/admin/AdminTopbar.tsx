"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const TITLES: Record<string, string> = {
  "/admin": "Tableau de bord",
  "/admin/proprietes": "Propriétés",
  "/admin/proprietes/nouveau": "Ajouter une propriété",
  "/admin/leads": "Prospects",
  "/admin/analytics": "Statistiques",
  "/admin/utilisateurs": "Utilisateurs",
};

export default function AdminTopbar() {
  const pathname = usePathname();
  if (pathname === "/admin/login") return null;

  const title = TITLES[pathname || ""] || "Administration";

  return (
    <header className="flex h-16 items-center justify-between border-b border-navy-900/8 bg-white px-6 lg:px-8">
      <h1 className="font-display text-lg font-semibold text-navy-900">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative text-navy-500 hover:text-navy-900" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold-500" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-xs font-semibold text-white">
          DA
        </div>
      </div>
    </header>
  );
}
