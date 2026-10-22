import React from "react";
import type { DocumentItem, Citation } from "../../types/document";
import { Volume2, ShieldCheck, AlertTriangle, Edit3 } from "lucide-react";
import { useSpeech } from "../../hooks/useSpeech";

interface PrescriptionResultsProps {
  items: DocumentItem[];
  hoveredItemId: string | null;
  onHoverItem: (id: string | null) => void;
  onOpenSource: (citation: Citation) => void;
  onOpenVerification: (item: DocumentItem) => void;
  language: string;
}

export const PrescriptionResults: React.FC<PrescriptionResultsProps> = ({
  items,
  hoveredItemId,
  onHoverItem,
  onOpenSource,
  onOpenVerification,
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

  return (
    <div className="space-y-4">
      {/* Table of Prescribed Medicines */}
      <div className="overflow-x-auto rounded border border-rule bg-paper shadow-sm">
        <table className="w-full text-left font-sans text-xs">
          {/* Table Header */}
          <thead className="border-b border-rule bg-[#FAF7F0] font-mono text-[10px] uppercase tracking-wider text-ink/70">
            <tr>
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">Medicine & Strength</th>
              <th className="py-2.5 px-3">Schedule (Frequency)</th>
              <th className="py-2.5 px-3">Duration</th>
              <th className="py-2.5 px-3 text-right">Confidence</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-rule">
            {items.map((item, idx) => {
              const rx = item.prescription_fields;
              if (!rx) return null;
              const isHovered = hoveredItemId === item.id;
              const isLow = item.needs_verification;

              return (
                <tr
                  key={item.id}
                  onMouseEnter={() => onHoverItem(item.id)}
                  onMouseLeave={() => onHoverItem(null)}
                  className={`transition-colors ${
                    isHovered
                      ? "bg-vermilion/5"
                      : isLow
                      ? "bg-ochre/5"
                      : "hover:bg-[#FAF7F0]"
                  }`}
                >
                  <td className="py-3 px-3 font-mono font-bold text-ink/50">
                    {idx + 1}
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-bold text-ink font-mono text-xs">{rx.drug_name}</div>
                    {rx.normalized_drug_name && (
                      <div className="font-mono text-[10px] text-ink/60">
                        Generic: {rx.normalized_drug_name}
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-3 font-mono text-ink/80">
                    {rx.frequency || "As instructed"}
                  </td>

                  <td className="py-3 px-3 font-mono text-ink/80">
                    {rx.duration || "As advised"}
                  </td>

                  <td className="py-3 px-3 text-right">
                    {isLow ? (
                      <button
                        onClick={() => onOpenVerification(item)}
                        data-cursor="link"
                        className="inline-flex items-center gap-1 rounded bg-ochre/20 px-2 py-0.5 font-mono text-[10px] font-bold text-ochre hover:bg-ochre hover:text-paper transition-colors"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        <span>Verify</span>
                      </button>
                    ) : (
                      <span
                        className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                          item.confidence === "high"
                            ? "bg-sage/15 text-sage"
                            : "bg-ochre/15 text-ochre"
                        }`}
                      >
                        {Math.round(item.confidence_score * 100)}% {item.confidence.toUpperCase()}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Plain Language Explanations per item */}
      <div className="space-y-3 pt-2">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70">
          PLAIN-LANGUAGE EXPLANATION (GROUNDED IN MEDICAL SOURCES)
        </h4>

        {items.map((item, idx) => {
          const rx = item.prescription_fields;
          if (!rx) return null;
          const isHovered = hoveredItemId === item.id;
          const currentExplanation =
            language === "hi" && item.explanation_hi ? item.explanation_hi : item.explanation;

          return (
            <div
              key={`exp-${item.id}`}
              onMouseEnter={() => onHoverItem(item.id)}
              onMouseLeave={() => onHoverItem(null)}
              className={`rounded border p-4 transition-all duration-150 ${
                isHovered
                  ? "border-vermilion bg-paper shadow-sm ring-1 ring-vermilion"
                  : "border-rule bg-[#FAF7F0]"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-rule/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-ink">
                    Item {idx + 1}: {rx.drug_name}
                  </span>
                  {rx.form && (
                    <span className="rounded bg-paper border border-rule px-1.5 py-0.2 font-mono text-[9px] text-ink/60">
                      {rx.form}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Read Aloud button */}
                  {!item.needs_verification && (
                    <button
                      onClick={() => handleReadAloud(currentExplanation)}
                      data-cursor="link"
                      aria-label="Read this plain-language explanation aloud"
                      className="flex items-center gap-1 rounded border border-rule bg-paper px-2 py-1 font-mono text-[10px] text-ink hover:text-vermilion hover:border-vermilion transition-colors"
                    >
                      <Volume2 className="h-3 w-3" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>
              </div>

              {/* General Usage from Medical Reference */}
              {rx.general_usage && !item.needs_verification && (
                <div className="mt-2 text-[11px] font-sans text-ink/70 italic">
                  <strong>Common Purpose:</strong> {rx.general_usage}
                </div>
              )}

              {/* Main Explanation or Low Confidence Gate */}
              <div className="mt-2 text-xs font-sans leading-relaxed text-ink/90">
                {item.needs_verification ? (
                  <div className="rounded border border-ochre/40 bg-ochre/10 p-3 text-ink">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-ochre">
                      <AlertTriangle className="h-4 w-4" />
                      <span>SAFETY VERIFICATION REQUIRED</span>
                    </div>
                    <p className="mt-1 font-sans text-xs text-ink/80">
                      {currentExplanation}
                    </p>
                    <button
                      onClick={() => onOpenVerification(item)}
                      data-cursor="link"
                      className="mt-3 inline-flex items-center gap-1.5 rounded border border-ink bg-ink px-3 py-1 font-mono text-[11px] font-bold text-paper hover:bg-vermilion hover:border-vermilion"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>Confirm or Correct Handwriting</span>
                    </button>
                  </div>
                ) : (
                  <p>{currentExplanation}</p>
                )}
              </div>

              {/* Citations List */}
              {item.citations && item.citations.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-rule/50 pt-2 font-mono text-[10px]">
                  <span className="text-ink/50 uppercase tracking-wider">Grounding:</span>
                  {item.citations.map((cit, cIdx) => (
                    <button
                      key={cit.id}
                      onClick={() => onOpenSource(cit)}
                      data-cursor="source"
                      className="inline-flex items-center gap-1 rounded border border-rule bg-paper px-2 py-0.5 text-ink/80 hover:border-vermilion hover:text-vermilion hover:bg-vermilion/5 transition-colors"
                    >
                      <ShieldCheck className="h-3 w-3 text-sage" />
                      <span>[{cIdx + 1}] {cit.source_name.split("(")[0].trim()}</span>
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
