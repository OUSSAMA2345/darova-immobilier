"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "agent" | "editeur";
  is_active: boolean;
}

const MOCK_USERS: AdminUser[] = [
  { id: "1", full_name: "Yasmine Alaoui", email: "yasmine@darova-immobilier.ma", role: "admin", is_active: true },
  { id: "2", full_name: "Karim Bennis", email: "karim@darova-immobilier.ma", role: "agent", is_active: true },
  { id: "3", full_name: "Salma Idrissi", email: "salma@darova-immobilier.ma", role: "agent", is_active: true },
  { id: "4", full_name: "Othmane Kabbaj", email: "othmane@darova-immobilier.ma", role: "editeur", is_active: false },
];

const ROLE_LABELS: Record<string, string> = { admin: "Administrateur", agent: "Agent", editeur: "Éditeur" };

export default function AdminUsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ full_name: "", email: "", role: "agent" as AdminUser["role"] });

  const handleAdd = () => {
    setUsers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), full_name: newUser.full_name, email: newUser.email, role: newUser.role, is_active: true },
    ]);
    setNewUser({ full_name: "", email: "", role: "agent" });
    setOpen(false);
  };

  const handleRemove = (id: string) => {
    if (confirm("Retirer cet utilisateur de l'équipe ?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="gold">
              <Plus className="h-4 w-4" />
              Inviter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="mb-5">Inviter un nouvel utilisateur</DialogTitle>
            <div className="space-y-4">
              <div>
                <Label>Nom complet</Label>
                <Input value={newUser.full_name} onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })} />
              </div>
              <div>
                <Label>E-mail professionnel</Label>
                <Input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <div>
                <Label>Rôle</Label>
                <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v as AdminUser["role"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="editeur">Éditeur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="gold" className="w-full" onClick={handleAdd} disabled={!newUser.full_name || !newUser.email}>
                Envoyer l&apos;invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-navy-50">
            <tr className="text-left text-xs uppercase tracking-wide text-navy-400">
              <th className="px-5 py-3 font-medium">Nom</th>
              <th className="px-5 py-3 font-medium">E-mail</th>
              <th className="px-5 py-3 font-medium">Rôle</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-navy-900/8">
                <td className="px-5 py-3 font-medium text-navy-900">{u.full_name}</td>
                <td className="px-5 py-3 text-navy-500">{u.email}</td>
                <td className="px-5 py-3"><Badge variant="outline">{ROLE_LABELS[u.role]}</Badge></td>
                <td className="px-5 py-3">
                  <Badge variant={u.is_active ? "success" : "danger"}>{u.is_active ? "Actif" : "Inactif"}</Badge>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-sm text-navy-500 hover:bg-navy-50 hover:text-navy-900" aria-label="Modifier">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleRemove(u.id)} className="flex h-8 w-8 items-center justify-center rounded-sm text-red-500 hover:bg-red-50" aria-label="Retirer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
