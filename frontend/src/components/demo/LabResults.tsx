import React from "react";
import type { DocumentItem, Citation, LabStatus } from "../../types/document";
import { Volume2, ShieldCheck } from "lucide-react";
import { useSpeech } from "../../hooks/useSpeech";

interface LabResultsProps {
  items: DocumentItem[];
  hoveredItemId: string | null;
  onHoverItem: (id: string | null) => void;
  onOpenSource: (citation: Citation) => void;
  language: string;
}

export const LabResults: React.FC<LabResultsProps> = ({
  items,
  hoveredItemId,
  onHoverItem,
  onOpenSource,
  language
}) => {
  const { speakText, stopSpeaking, isSpeaking } = useSpeech();

  const handleReadAloud = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(text, language);
    }
  };

  // Status badges config
  const statusStyles: Record<LabStatus, { badgeBg: string; text: string; label: string; dot: string }> = {
    within: {
      badgeBg: "bg-sage/15 text-sage border-sage/30",
      text: "text-sage",
      label: "Within Expected Range",
      dot: "bg-sage"
    },
    slightly_outside: {
      badgeBg: "bg-ochre/15 text-ochre border-ochre/30",
      text: "text-ochre",
      label: "Slightly Outside Range",
      dot: "bg-ochre"
    },
    clearly_outside: {
      badgeBg: "bg-vermilion/15 text-vermilion border-vermilion/30",
      text: "text-vermilion",
      label: "Clearly Outside Range",
      dot: "bg-vermilion"
    },
    not_applicable: {
      badgeBg: "bg-rule/40 text-ink/70 border-rule",
      text: "text-ink/60",
      label: "Not Applicable",
      dot: "bg-ink/40"
    }
  };

  return (
    <div className="space-y-4">
      {/* Legend Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-rule bg-[#FAF7F0] p-3 text-[11px] font-mono text-ink/70">
        <span className="font-bold uppercase tracking-wider text-ink">
          REFERENCE INTERVAL MAPPING
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-sage" />
            <span>Within Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ochre" />
            <span>Slightly Outside (&le;10%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-vermilion" />
            <span>Clearly Outside</span>
          </div>
        </div>
      </div>

      {/* Lab Test Cards */}
      <div className="space-y-4">
        {items.map((item, idx) => {
          const lab = item.lab_fields;
          if (!lab) return null;
          const isHovered = hoveredItemId === item.id;
          const status = statusStyles[item.status] || statusStyles.not_applicable;
          const currentExplanation =
            language === "hi" && item.explanation_hi ? item.explanation_hi : item.explanation;

          // Calculate normalized percentage position for the horizontal value bar
          const low = lab.reference_range_low ?? 0;
          const high = lab.reference_range_high ?? (lab.value * 1.5);
          const rangeSpan = high - low;
          // Extend span slightly for visualization padding (20% on each side)
          const visualMin = Math.max(0, low - rangeSpan * 0.25);
          const visualMax = high + rangeSpan * 0.25;
          const visualSpan = visualMax - visualMin;
          const clampedVal = Math.min(Math.max(lab.value, visualMin), visualMax);
          const markerPercent = ((clampedVal - visualMin) / visualSpan) * 100;

          // Normal bracket range inside the visual bar
          const normalStartPercent = ((low - visualMin) / visualSpan) * 100;
          const normalWidthPercent = ((high - low) / visualSpan) * 100;

          return (
            <div
              key={item.id}
              onMouseEnter={() => onHoverItem(item.id)}
              onMouseLeave={() => onHoverItem(null)}
              className={`rounded border p-4 transition-all duration-150 ${
                isHovered
                  ? "border-vermilion bg-paper shadow-sm ring-1 ring-vermilion"
                  : "border-rule bg-[#FAF7F0]"
              }`}
            >
              {/* Card Title & Value */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rule/50 pb-3">
                <div>
                  <div className="font-serif text-base font-bold text-ink">
                    {idx + 1}. {lab.test_name}
                  </div>
                  <div className="font-mono text-[10px] text-ink/60">
                    Printed Range: {lab.reference_range_low ?? "—"} – {lab.reference_range_high ?? "—"} {lab.unit}
                    {lab.range_source === "printed" && " (Report calibrated)"}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-mono text-base font-black text-ink">
                      {lab.value} <span className="text-xs font-normal text-ink/60">{lab.unit}</span>
                    </div>
                  </div>

                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${status.badgeBg}`}
                  >
                    {status.label}
                  </span>

                  {/* Read aloud button */}
                  <button
                    onClick={() => handleReadAloud(currentExplanation)}
                    data-cursor="link"
                    aria-label={`Read explanation for ${lab.test_name}`}
                    className="flex items-center gap-1 rounded border border-rule bg-paper px-2 py-1 font-mono text-[10px] text-ink hover:text-vermilion hover:border-vermilion transition-colors"
                  >
                    <Volume2 className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Horizontal Reference-Range Bar */}
              <div className="my-4 space-y-1.5">
                <div className="relative h-4 w-full rounded bg-rule/40 overflow-hidden">
                  {/* Normal Range highlighted region (Sage fill) */}
                  <div
                    className="absolute top-0 bottom-0 bg-sage/30 border-x border-sage"
                    style={{
                      left: `${normalStartPercent}%`,
                      width: `${normalWidthPercent}%`
                    }}
                    title={`Standard Reference: ${low} - ${high} ${lab.unit}`}
                  />

                  {/* Value Marker */}
                  <div
                    className="absolute top-0 bottom-0 -ml-1 w-2 z-10 transition-all duration-300"
                    style={{ left: `${markerPercent}%` }}
                  >
                    <div
                      className={`h-full w-full rounded-sm shadow-sm ${
                        item.status === "within"
                          ? "bg-sage ring-2 ring-sage/40"
                          : item.status === "slightly_outside"
                          ? "bg-ochre ring-2 ring-ochre/40"
                          : "bg-vermilion ring-2 ring-vermilion/40"
                      }`}
                    />
                  </div>
                </div>

                {/* Range Labels underneath bar */}
                <div className="flex items-center justify-between font-mono text-[9px] text-ink/60">
                  <span>Below range</span>
                  <span className="font-bold text-sage">Normal interval: {low} to {high}</span>
                  <span>Above range</span>
                </div>
              </div>

              {/* Plain-Language Explanation */}
              <div className="text-xs font-sans leading-relaxed text-ink/90">
                <p>{currentExplanation}</p>
              </div>

              {/* Citations */}
              {item.citations && item.citations.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-rule/50 pt-2 font-mono text-[10px]">
                  <span className="text-ink/50 uppercase tracking-wider">Reference Source:</span>
                  {item.citations.map((cit, cIdx) => (
                    <button
                      key={cit.id}
                      onClick={() => onOpenSource(cit)}
                      data-cursor="source"
                      className="inline-flex items-center gap-1 rounded border border-rule bg-paper px-2 py-0.5 text-ink/80 hover:border-vermilion hover:text-vermilion hover:bg-vermilion/5 transition-colors"
                    >
                      <ShieldCheck className="h-3 w-3 text-sage" />
                      <span>[{cIdx + 1}] {cit.source_name.split("-")[0].trim()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
