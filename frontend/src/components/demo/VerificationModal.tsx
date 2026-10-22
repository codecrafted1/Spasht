import React, { useState } from "react";
import type { DocumentItem } from "../../types/document";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

interface VerificationModalProps {
  item: DocumentItem | null;
  onClose: () => void;
  onConfirm: (itemId: string, updatedName: string, updatedDosage: string) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  item,
  onClose,
  onConfirm
}) => {
  if (!item) return null;

  const rx = item.prescription_fields;
  const [name, setName] = useState(rx?.drug_name.replace(/\[.*?\]/g, "").trim() || "Azithromycin");
  const [dosage, setDosage] = useState(rx?.strength || "250 mg");
  const [frequency, setFrequency] = useState(rx?.frequency || "Once daily (1-0-0)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(item.id, name, `${dosage} • ${frequency}`);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded border border-ink bg-paper p-6 shadow-paper-lg animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-rule pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ochre/20 text-ochre">
              <AlertTriangle className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
              VERIFY UNREADABLE HANDWRITING
            </span>
          </div>
          <button
            onClick={onClose}
            data-cursor="link"
            className="text-ink/60 hover:text-ink p-1 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Notice */}
        <div className="mt-3 rounded bg-ochre/10 p-3 text-xs font-sans text-ink/80 border border-ochre/20">
          The automatic system detected ambiguous handwriting on this line (Confidence: {Math.round(item.confidence_score * 100)}%). Please confirm the medicine name with your physical prescription or pharmacist before viewing explanations.
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 font-mono text-xs">
          <div>
            <label className="block text-ink/70 font-semibold mb-1 uppercase text-[10px]">
              Medicine Name (as printed on strip/bottle)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded border border-rule bg-[#FAF7F0] px-3 py-2 text-ink focus:border-vermilion focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-ink/70 font-semibold mb-1 uppercase text-[10px]">
                Strength
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
                className="w-full rounded border border-rule bg-[#FAF7F0] px-3 py-2 text-ink focus:border-vermilion focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-ink/70 font-semibold mb-1 uppercase text-[10px]">
                Frequency
              </label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                required
                className="w-full rounded border border-rule bg-[#FAF7F0] px-3 py-2 text-ink focus:border-vermilion focus:outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-rule">
            <button
              type="button"
              onClick={onClose}
              data-cursor="link"
              className="px-3 py-1.5 font-mono text-xs text-ink/70 hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-cursor="link"
              className="inline-flex items-center gap-1.5 rounded border border-ink bg-ink px-4 py-1.5 font-mono text-xs font-bold text-paper hover:bg-vermilion hover:border-vermilion transition-colors"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Confirm & Unlock Explanation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
