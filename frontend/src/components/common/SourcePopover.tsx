import React, { useEffect, useRef } from "react";
import type { Citation } from "../../types/document";
import { ExternalLink, X, ShieldCheck } from "lucide-react";

interface SourcePopoverProps {
  citation: Citation | null;
  onClose: () => void;
}

export const SourcePopover: React.FC<SourcePopoverProps> = ({ citation, onClose }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (citation) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [citation, onClose]);

  if (!citation) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-popover-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        ref={popoverRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-none border border-ink bg-paper p-6 shadow-paper-lg transition-all animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-rule pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage/20 text-sage text-xs">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-ink uppercase">
              GROUNDED SOURCE CITATION
            </span>
          </div>
          <button
            onClick={onClose}
            data-cursor="link"
            aria-label="Close source view"
            className="rounded p-1 text-ink/60 hover:bg-rule/40 hover:text-ink focus:outline-none focus:ring-2 focus:ring-vermilion"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Source Meta */}
        <div className="mt-4 space-y-3">
          <div>
            <div className="font-mono text-[10px] text-ink/60 uppercase tracking-wider">Citation Key</div>
            <div className="font-mono text-xs font-bold text-vermilion">{citation.id}</div>
          </div>

          <div>
            <div className="font-mono text-[10px] text-ink/60 uppercase tracking-wider">Authoritative Source</div>
            <h3 id="source-popover-title" className="font-serif text-lg font-bold text-ink">
              {citation.source_name}
            </h3>
          </div>

          {/* Excerpt */}
          <div className="rounded border border-rule bg-[#FAF7F0] p-3">
            <div className="font-mono text-[10px] text-ink/50 uppercase tracking-wider mb-1">
              Cited Clinical Reference Excerpt
            </div>
            <p className="font-mono text-xs text-ink/80 leading-relaxed italic">
              "{citation.excerpt}"
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-ink/70">
            <span className="text-sage font-medium">● {citation.license_note}</span>
            {citation.source_url && (
              <a
                href={citation.source_url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-1 text-vermilion underline hover:opacity-80"
              >
                Verify source <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Footer Notice */}
        <div className="mt-5 border-t border-rule pt-3 text-[10px] font-mono text-ink/50">
          Source grounding ensures every plain-language sentence is anchored to published medical guidelines.
        </div>
      </div>
    </div>
  );
};
