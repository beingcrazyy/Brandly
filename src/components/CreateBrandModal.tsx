"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./ui/Modal";
import { Input, Textarea } from "./ui/Field";
import { UploadField } from "./ui/UploadField";
import { Button } from "./ui/Button";
import { useBrandStore, slugify } from "@/lib/store";
import { FileRef } from "@/lib/types";

export function CreateBrandModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const createBrand = useBrandStore((s) => s.createBrand);
  const brands = useBrandStore((s) => s.brands);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [coverImage, setCoverImage] = useState<FileRef | null>(null);

  const slugTaken = brands.some((b) => b.draftData.slug === slug);
  const canCreate = name.trim().length > 0 && slug.trim().length > 0 && !slugTaken;

  function reset() {
    setName("");
    setSlug("");
    setSlugTouched(false);
    setDescription("");
    setWebsite("");
    setIndustry("");
    setCoverImage(null);
  }

  function handleCreate() {
    if (!canCreate) return;
    const id = createBrand({ name: name.trim(), slug: slug.trim(), description, website, industry, coverImage });
    reset();
    onClose();
    router.push(`/brands/${id}/overview`);
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Create a new brand"
      description="Start with the essentials — you'll build out the full brand system next."
      width="md"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!canCreate}>
            Create Brand
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Brand Name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          placeholder="e.g. AURA"
        />
        <Input
          label="Brand Slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          helper={slugTaken ? "That slug is already in use." : `Portal will be published at /brand/${slug || "your-slug"}`}
          className={slugTaken ? "border-red-300" : ""}
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A one-line summary of the brand"
          rows={2}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" />
          <Input label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. Premium Skincare" />
        </div>
        <UploadField label="Brand Cover Image" value={coverImage} onChange={setCoverImage} helper="Used on the dashboard card and portal hero." />
      </div>
    </Modal>
  );
}
