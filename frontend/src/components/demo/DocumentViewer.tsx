import React from "react";
import type { DocumentItem } from "../../types/document";

interface DocumentViewerProps {
  previewSvg: string;
  items: DocumentItem[];
  hoveredItemId: string | null;
  onHoverItem: (id: string | null) => void;
  onSelectItem: (id: string) => void;
  documentType: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  previewSvg,
  items,
  hoveredItemId,
  onHoverItem,
  onSelectItem,
  documentType
}) => {
  return (
    <div className="relative flex flex-col rounded border border-rule bg-[#FAF7F0] p-4 shadow-paper">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-rule pb-2 text-xs font-mono text-ink/70">
        <span className="font-semibold uppercase tracking-wider text-ink">
          DOCUMENT SCAN PREVIEW
        </span>
        <span className="rounded bg-paper px-2 py-0.5 text-[10px] border border-rule">
          INTERACTIVE REGIONS
        </span>
      </div>

      {/* SVG Container with Interactive Bounding Overlays */}
      <div className="relative mt-3 aspect-[4/5] w-full overflow-hidden rounded border border-rule/60 bg-[#FAF7F0]">
        {/* Render base SVG document */}
        <div
          className="h-full w-full pointer-events-none"
          dangerouslySetInnerHTML={{ __html: previewSvg }}
        />

        {/* Interactive Bounding Box Overlays */}
        {items.map((item) => {
          if (!item.bboxes || item.bboxes.length === 0) return null;
          const bbox = item.bboxes[0];
          const isHovered = hoveredItemId === item.id;
          const isLowConfidence = item.needs_verification;

          return (
            <button
              key={item.id}
              type="button"
              data-cursor="source"
              onClick={() => onSelectItem(item.id)}
              onMouseEnter={() => onHoverItem(item.id)}
              onMouseLeave={() => onHoverItem(null)}
              style={{
                left: `${bbox.x * 100}%`,
                top: `${bbox.y * 100}%`,
                width: `${bbox.width * 100}%`,
                height: `${bbox.height * 100}%`,
              }}
              aria-label={`Inspect region for ${bbox.label || item.id}`}
              className={`absolute transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-vermilion ${
                isHovered
                  ? "border-2 border-vermilion bg-vermilion/20 z-20 shadow-sm"
                  : isLowConfidence
                  ? "border border-dashed border-ochre bg-ochre/10 z-10"
                  : "border border-ink/40 bg-ink/5 hover:bg-vermilion/10 hover:border-vermilion z-10"
              }`}
            >
              {/* Region Label Tag */}
              <span
                className={`absolute -top-3 left-1 rounded px-1.5 py-0.2 font-mono text-[8px] font-bold uppercase tracking-wider transition-colors ${
                  isHovered
                    ? "bg-vermilion text-paper"
                    : isLowConfidence
                    ? "bg-ochre text-paper"
                    : "bg-ink/80 text-paper"
                }`}
              >
                {bbox.label ? bbox.label.slice(0, 22) : item.id}
              </span>
            </button>
          );
        })}
      </div>

      {/* Viewer Footer Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-2 font-mono text-[10px] text-ink/60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full border border-vermilion bg-vermilion/20" />
            <span>Hover to cross-reference</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full border border-dashed border-ochre bg-ochre/20" />
            <span>Needs verification</span>
          </span>
        </div>
        <span className="text-ink/40 font-bold uppercase">
          {documentType === "lab_report" ? "LAB DATA MATRIX" : "PRESCRIPTION SLIP"}
        </span>
      </div>
    </div>
  );
};
