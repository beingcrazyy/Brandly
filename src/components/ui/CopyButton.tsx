"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useToast } from "./Toast";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const notify = useToast();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    notify("Copied");
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-current/15 px-3 py-1.5 text-[12px] font-medium transition-colors hover:border-current/30"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : label}
    </button>
  );
}
