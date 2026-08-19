"use client";

import { useEffect, useState } from "react";
import { resolveFileUrl } from "./files";

/** Resolves a fileId (or null) to a displayable object URL, re-resolving when the id changes. */
export function useFileUrl(fileId: string | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!fileId) {
      setUrl(null);
      return;
    }
    resolveFileUrl(fileId).then((resolved) => {
      if (!cancelled) setUrl(resolved);
    });
    return () => {
      cancelled = true;
    };
  }, [fileId]);

  return url;
}
