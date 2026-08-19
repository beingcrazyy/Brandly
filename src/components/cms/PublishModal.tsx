"use client";

import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

export function PublishModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Publish latest brand system?"
      width="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Publish
          </Button>
        </>
      }
    >
      <p className="text-[14px] leading-relaxed text-neutral-600">
        This will make the current version available to the client at the published brand portal URL.
      </p>
    </Modal>
  );
}
