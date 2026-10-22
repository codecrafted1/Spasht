import React from "react";
import { ScrambleText } from "../common/ScrambleText";

export const Problem: React.FC = () => {
  return (
    <section id="problem" className="border-b border-rule bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex items-baseline justify-between border-b border-rule pb-4">
          <div className="font-mono text-xs font-bold tracking-widest text-vermilion uppercase">
            <ScrambleText text="01 / THE PROBLEM" triggerOnView />
          </div>
          <span className="font-mono text-xs text-ink/50 uppercase tracking-wider">
            Healthcare Literacy Gap
          </span>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule">
          {/* Statement 01 */}
          <div className="py-8 md:py-0 md:px-8 first:pl-0 space-y-4">
            <div className="font-mono text-5xl font-black text-ink tracking-tighter">
              <ScrambleText text="01" triggerOnView speed={40} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink leading-snug">
              Illegible handwriting and Latin shorthand obscure essential care instructions.
            </h3>
            <p className="font-sans text-sm text-ink/70 leading-relaxed">
              Prescriptions in India frequently rely on cursive abbreviations ("TDS", "OD PC", "1-0-1") that elderly patients and rural caregivers struggle to decipher. A misread frequency directly multiplies adverse drug reaction risks.
            </p>
            <div className="pt-2 font-mono text-[11px] text-ink/50">
              [Reference: WHO Global Patient Safety Action Plan]
            </div>
          </div>

          {/* Statement 02 */}
          <div className="py-8 md:py-0 md:px-8 space-y-4">
            <div className="font-mono text-5xl font-black text-vermilion tracking-tighter">
              <ScrambleText text="02" triggerOnView speed={40} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink leading-snug">
              Lab numbers induce acute panic without clear reference context.
            </h3>
            <p className="font-sans text-sm text-ink/70 leading-relaxed">
              When patients receive a metabolic panel with out-of-range flags, they frequently search unvetted forums, leading to unnecessary dread or unguided self-medication. Minor sample variations are mistaken for terminal diagnoses.
            </p>
            <div className="pt-2 font-mono text-[11px] text-ink/50">
              [Observed in community outpatient surveys]
            </div>
          </div>

          {/* Statement 03 */}
          <div className="py-8 md:py-0 md:px-8 last:pr-0 space-y-4">
            <div className="font-mono text-5xl font-black text-ink tracking-tighter">
              <ScrambleText text="03" triggerOnView speed={40} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink leading-snug">
              Language barriers lock patients out of their own clinical records.
            </h3>
            <p className="font-sans text-sm text-ink/70 leading-relaxed">
              Virtually all diagnostic software and electronic records in India are printed strictly in English. Non-English-speaking family heads and caregivers cannot independently verify what medicines their elders were given.
            </p>
            <div className="pt-2 font-mono text-[11px] text-ink/50">
              [Multilingual Healthcare Access gap analysis]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
