"use client";

import { useEffect, useState } from "react";
import { useBrandStore } from "@/lib/store";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { Link2, Trash2, UserPlus, Users } from "lucide-react";
import type { ClientAccess } from "@/lib/types";

function AccessRow({
  access,
  onRevoke,
}: {
  access: ClientAccess;
  onRevoke: () => void;
}) {
  const initial = access.email[0].toUpperCase();
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#E4DFD3] bg-[#F7F5F0] px-3.5 py-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#14140F]/10 text-[12px] font-medium text-[#14140F]">
        {initial}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-[#14140F]">{access.email}</p>
        <p className="text-[11px] text-neutral-400">
          Granted {new Date(access.grantedAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
          {access.grantedBy ? ` · by ${access.grantedBy}` : ""}
        </p>
      </div>
      <button
        onClick={onRevoke}
        aria-label={`Remove access for ${access.email}`}
        className="focus-ring flex-shrink-0 rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}

export function SharePanel({
  open,
  onClose,
  brandId,
}: {
  open: boolean;
  onClose: () => void;
  brandId: string;
}) {
  const notify = useToast();
  const allAccess = useBrandStore((s) => s.clientAccess);
  const accesses = allAccess.filter((a) => a.brandId === brandId);
  const grantAccess = useBrandStore((s) => s.grantAccess);
  const revokeAccess = useBrandStore((s) => s.revokeAccess);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => { if (!open) { setEmail(""); setEmailError(""); } }, [open]);

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function handleInvite() {
    const normalised = email.trim().toLowerCase();
    if (!isValidEmail(normalised)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    const already = accesses.some((a) => a.email === normalised);
    if (already) {
      setEmailError("This email already has access.");
      return;
    }
    grantAccess(brandId, normalised);
    notify("Access granted");
    setEmail("");
    setEmailError("");
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Share Brand Portal"
      description="Invite clients to view this brand. They sign in at /login with their email."
      width="md"
    >
      <div className="flex flex-col gap-6">
        {/* People with access */}
        <div>
          <div className="mb-2.5 flex items-center gap-1.5">
            <Users size={13} className="text-neutral-400" />
            <p className="text-[12.5px] font-medium text-neutral-500 uppercase tracking-wide">
              People with access
            </p>
          </div>
          {accesses.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-[#DDD6C6] py-8 text-center">
              <Link2 size={20} className="text-neutral-300" />
              <p className="text-[13.5px] font-medium text-[#14140F]">No one yet</p>
              <p className="max-w-[240px] text-[12.5px] text-neutral-500">
                Invite a client below — they&apos;ll sign in to view this brand portal.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {accesses.map((a) => (
                <AccessRow
                  key={a.email}
                  access={a}
                  onRevoke={() => {
                    revokeAccess(brandId, a.email);
                    notify("Access revoked");
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Invite form */}
        <div className="border-t border-[#E4DFD3] pt-5">
          <div className="mb-3 flex items-center gap-1.5">
            <UserPlus size={13} className="text-neutral-400" />
            <p className="text-[12.5px] font-medium text-neutral-500 uppercase tracking-wide">
              Invite someone
            </p>
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                placeholder="client@company.com"
                onKeyDown={(e) => { if (e.key === "Enter") handleInvite(); }}
                helper={emailError || undefined}
              />
            </div>
            <Button onClick={handleInvite} disabled={!email.trim()} className="h-9 flex-shrink-0 self-end">
              <UserPlus size={14} /> Invite
            </Button>
          </div>
          <p className="mt-3 text-[11.5px] text-neutral-400">
            Anyone with access can also invite others. They sign in at{" "}
            <span className="font-mono">/login/client</span> with password{" "}
            <span className="font-mono">client123</span>.
          </p>
        </div>
      </div>
    </Modal>
  );
}
