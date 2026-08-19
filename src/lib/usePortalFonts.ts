"use client";

import { useEffect } from "react";
import { Typography } from "./types";
import { ensureGoogleFont } from "./fonts";

export function usePortalFonts(typography: Typography) {
  const primaryKey = `${typography.primary.family}:${typography.primary.weights.join(",")}`;
  const secondaryKey = `${typography.secondary.family}:${typography.secondary.weights.join(",")}`;

  useEffect(() => {
    if (typography.primary.source === "google") ensureGoogleFont(typography.primary.family, typography.primary.weights);
    if (typography.secondary.source === "google") ensureGoogleFont(typography.secondary.family, typography.secondary.weights);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryKey, secondaryKey, typography.primary.source, typography.secondary.source]);
}
