"use client";

import { useEffect, useRef, useState } from "react";
import { useBrandStore } from "./store";
import { BrandData } from "./types";

/**
 * Binds a slice of a brand's draftData to local component state with explicit
 * save semantics (Saved / Unsaved changes), matching the CMS's save model.
 */
export function useSectionForm<T>(
  brandId: string,
  select: (data: BrandData) => T,
  patch: (data: BrandData, value: T) => BrandData
) {
  const brand = useBrandStore((s) => s.brands.find((b) => b.id === brandId));
  const updateDraft = useBrandStore((s) => s.updateDraft);
  const [value, setValue] = useState<T | null>(null);
  const savedJson = useRef<string>("");
  const loadedFor = useRef<string | null>(null);

  useEffect(() => {
    if (brand && loadedFor.current !== brand.id) {
      const selected = select(brand.draftData);
      setValue(selected);
      savedJson.current = JSON.stringify(selected);
      loadedFor.current = brand.id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand?.id]);

  const dirty = value !== null && JSON.stringify(value) !== savedJson.current;

  function save() {
    if (!brand || value === null) return;
    updateDraft(brand.id, (data) => patch(data, value));
    savedJson.current = JSON.stringify(value);
  }

  return { brand, value, setValue, dirty, save };
}
