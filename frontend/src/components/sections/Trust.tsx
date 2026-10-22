import React from "react";
import { ScrambleText } from "../common/ScrambleText";

export const Trust: React.FC = () => {
  return (
    <section id="trust" className="border-b border-rule bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 flex items-baseline justify-between border-b border-rule pb-4">
          <div className="font-mono text-xs font-bold tracking-widest text-vermilion uppercase">
            <ScrambleText text="04 / TRUST & RESPONSIBLE AI" triggerOnView />
          </div>
          <span className="font-mono text-xs text-ink/50 uppercase tracking-wider">
            Clinical Safety Architecture
          </span>
        </div>

        {/* Two-Column Editorial Layout with Ruled Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Column 1: Explainability & Auditing */}
          <div className="space-y-6">
            <div className="border-b border-rule pb-4">
              <span className="font-mono text-xs font-bold text-ink/40 uppercase">SECTION A</span>
              <h3 className="font-serif text-2xl font-bold text-ink mt-1">
                Explainability by Construction
              </h3>
              <p className="font-sans text-sm text-ink/70 mt-2 leading-relaxed">
                Rather than treating the machine learning model as an opaque oracle, Samjho treats every output as an audited extraction anchored directly to printed paper coordinates and public medical standards.
              </p>
            </div>

            <ol className="divide-y divide-rule font-sans text-xs">
              <li className="py-4 space-y-1">
                <div className="flex items-center gap-2 font-mono font-bold text-ink">
                  <span className="text-vermilion">1.1</span>
                  <span>Spatial Bounding Box Grounding</span>
                </div>
                <p className="text-ink/70 leading-relaxed pl-6">
                  Every dosage and test result maintains normalized polygon coordinates `[x, y, w, h]` pointing back to the physical source paper line. If a user questions any result, they can click to highlight the exact ink region.
                </p>
              </li>

              <li className="py-4 space-y-1">
                <div className="flex items-center gap-2 font-mono font-bold text-ink">
                  <span className="text-vermilion">1.2</span>
                  <span>Sentence-Level Medical Citations</span>
                </div>
                <p className="text-ink/70 leading-relaxed pl-6">
                  Explanations do not generate unanchored free text. Every explanatory assertion carries a citation ID linking directly to the WHO Model List of Essential Medicines (EML) or National List of Essential Medicines India.
                </p>
              </li>

              <li className="py-4 space-y-1">
                <div className="flex items-center gap-2 font-mono font-bold text-ink">
                  <span className="text-vermilion">1.3</span>
                  <span>Multi-Factor Confidence Scoring</span>
                </div>
                <p className="text-ink/70 leading-relaxed pl-6">
                  Confidence combines OCR pixel clarity, schema conformity, drug database string similarity (RapidFuzz), and vector retrieval distance. Low confidence items require user confirmation before any explanation is unlocked.
                </p>
              </li>
            </ol>
          </div>

          {/* Column 2: Responsible AI & Patient Safety */}
          <div className="space-y-6">
            <div className="border-b border-rule pb-4">
              <span className="font-mono text-xs font-bold text-ink/40 uppercase">SECTION B</span>
              <h3 className="font-serif text-2xl font-bold text-ink mt-1">
                Responsible AI & Patient Agency
              </h3>
              <p className="font-sans text-sm text-ink/70 mt-2 leading-relaxed">
                A health decision support system must be deliberately constrained. We refuse diagnostic authority to protect patient agency and strengthen clinician trust.
              </p>
            </div>

            <ol className="divide-y divide-rule font-sans text-xs">
              <li className="py-4 space-y-1">
                <div className="flex items-center gap-2 font-mono font-bold text-ink">
                  <span className="text-vermilion">2.1</span>
                  <span>Strict Diagnostic Refusal Policy</span>
                </div>
                <p className="text-ink/70 leading-relaxed pl-6">
                  Our pipeline contains hard regex and semantic filters blocking phrases such as "you have", "you suffer from", "start taking", or "stop taking". The system explains standard medical usage only.
                </p>
              </li>

              <li className="py-4 space-y-1">
                <div className="flex items-center gap-2 font-mono font-bold text-ink">
                  <span className="text-vermilion">2.2</span>
                  <span>Mandatory PII Scrubbing in Memory</span>
                </div>
                <p className="text-ink/70 leading-relaxed pl-6">
                  Patient identifiers, Aadhaar-like 12-digit numbers, Indian phone numbers, and clinic addresses are stripped in transient memory before any text is evaluated. Zero uploads or images are ever persisted to disk.
                </p>
              </li>

              <li className="py-4 space-y-1">
                <div className="flex items-center gap-2 font-mono font-bold text-ink">
                  <span className="text-vermilion">2.3</span>
                  <span>Clinician In-The-Loop Empowerment</span>
                </div>
                <p className="text-ink/70 leading-relaxed pl-6">
                  Instead of replacing doctors, the platform prepares patients with tailored "Questions to ask your doctor," turning passive anxiety into active, informed clinical dialogue.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
