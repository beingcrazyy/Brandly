"use client";

import { useEffect, useState } from "react";
import { useBrandStore } from "@/lib/store";

export function AppBootstrap({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const ensureSeeded = useBrandStore((s) => s.ensureSeeded);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      if (useBrandStore.persist.hasHydrated()) {
        await ensureSeeded();
      } else {
        await new Promise<void>((resolve) => {
          const unsub = useBrandStore.persist.onFinishHydration(() => {
            unsub();
            resolve();
          });
        });
        await ensureSeeded();
      }
      if (!cancelled) setReady(true);
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, [ensureSeeded]);

  if (!ready) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F7F5F0]">
        <div className="flex items-center gap-3 text-sm tracking-wide text-neutral-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-400" />
          Loading Brandly
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
