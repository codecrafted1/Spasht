import React, { useState } from "react";
import { ScrambleText } from "../common/ScrambleText";

interface Step {
  step: string;
  title: string;
  desc: string;
  tech: string;
  techDetail: string;
}

export const HowItWorks: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps: Step[] = [
    {
      step: "01",
      title: "Upload",
      desc: "Upload photo, scanned PDF, or mobile snapshot. In-memory processing only.",
      tech: "Ingest & Deskew",
      techDetail: "FastAPI multipart in-memory validator; zero disk persistence; OpenCV auto-contrast and deskew"
    },
    {
      step: "02",
      title: "Read",
      desc: "Extract text lines and spatial bounding boxes across printed and cursive text.",
      tech: "OCR / VLM Hybrid",
      techDetail: "PaddleOCR + EasyOCR fallback with normalized [0..1] coordinates; VLM routing for handwritten lines"
    },
    {
      step: "03",
      title: "Extract",
      desc: "Parse into structured medicine dosages or lab ranges with strict schema enforcement.",
      tech: "Constrained Pydantic Extraction",
      techDetail: "Schema-enforced JSON parsing; Indian PII redaction (Aadhaar/phone); RapidFuzz drug normalization"
    },
    {
      step: "04",
      title: "Ground in sources",
      desc: "Match every medicine and lab marker to authoritative medical guidelines.",
      tech: "Vector & Lexical RAG",
      techDetail: "ChromaDB/FAISS indexed with WHO Model List of Essential Medicines (EML) and NLEM India"
    },
    {
      step: "05",
      title: "Explain in language",
      desc: "Generate plain-words explanations with sentence citations, speech audio, and Hindi.",
      tech: "Deterministic Guardrails + Speech",
      techDetail: "Strict diagnostic refusal filter; IndicTrans2 translation; Web Speech API read-aloud"
    }
  ];

  return (
    <section id="how-it-works" className="border-b border-rule bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex items-baseline justify-between border-b border-rule pb-4">
          <div className="font-mono text-xs font-bold tracking-widest text-vermilion uppercase">
            <ScrambleText text="02 / HOW IT WORKS" triggerOnView />
          </div>
          <span className="font-mono text-xs text-ink/50 uppercase tracking-wider">
            Deterministic Pipeline Architecture
          </span>
        </div>

        {/* Ruled Timeline (Horizontal on desktop, stacked on mobile) */}
        <div className="relative border-t border-b border-rule py-12">
          {/* Subtle connecting centerline */}
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-rule pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={item.step}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  data-cursor="link"
                  className="group relative flex flex-col justify-between rounded p-4 transition-all duration-200 hover:bg-[#FAF7F0] border border-transparent hover:border-rule"
                >
                  {/* Step Num & Marker */}
                  <div className="flex items-center justify-between pb-4">
                    <span className="font-mono text-xs font-bold text-ink/40 group-hover:text-vermilion transition-colors">
                      {item.step}
                    </span>
                    <span className="h-2 w-2 rounded-full border border-ink/40 bg-paper group-hover:bg-vermilion group-hover:border-vermilion transition-all" />
                  </div>

                  {/* Step Title */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-ink group-hover:text-vermilion transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-ink/70 leading-relaxed min-h-[50px]">
                      {item.desc}
                    </p>
                  </div>

                  {/* Technique Tag / Tooltip */}
                  <div className="mt-6 pt-3 border-t border-rule/60">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-ink/80 group-hover:text-vermilion font-semibold uppercase tracking-wider">
                      <span>⚡</span>
                      <span>{item.tech}</span>
                    </div>

                    {/* Popover detail on hover */}
                    <div
                      className={`mt-2 rounded bg-ink p-2.5 font-mono text-[10px] text-paper transition-all duration-200 shadow-sm ${
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none hidden lg:block"
                      }`}
                    >
                      <span className="text-ochre">ARCH: </span>{item.techDetail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipeline summary line */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-ink/60">
          <span>* Latency budget: &lt; 900ms end-to-end on synthetic 2-page documents</span>
          <span className="text-sage font-medium">● 100% PII scrubbed before model reasoning</span>
        </div>
      </div>
    </section>
  );
};
