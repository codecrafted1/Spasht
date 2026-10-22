import React from "react";
import { APP_CONFIG } from "../../config/appConfig";
import { ScrambleText } from "../common/ScrambleText";
import { ArrowDownRight } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-rule bg-paper py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Headlines & Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small uppercase tag */}
            <div className="inline-flex items-center gap-2 border border-rule px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-ink/70 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-vermilion"></span>
              <span>PATIENT HEALTHCARE LITERACY & AGENCY</span>
            </div>

            {/* Giant Serif Headline with Scrambled Cycling Word */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-ink">
              Understand your{" "}
              <span className="inline-block border-b-2 border-vermilion pb-0.5 text-vermilion">
                <ScrambleText
                  cyclingWords={["prescriptions", "lab reports", "discharge notes", "test panels"]}
                  cycleIntervalMs={3400}
                  speed={28}
                  className="font-serif italic font-black"
                />
              </span>{" "}
              in your own language.
            </h1>

            {/* Subline */}
            <p className="font-sans text-lg sm:text-xl text-ink/80 leading-relaxed max-w-2xl">
              {APP_CONFIG.oneLinePitch}
            </p>

            {/* CTAs & Disclaimers */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="#demo"
                data-cursor="link"
                className="inline-flex items-center justify-center gap-2 border border-vermilion bg-vermilion px-7 py-3.5 font-mono text-sm font-bold text-paper transition-all hover:bg-ink hover:border-ink shadow-sm"
              >
                TRY THE DEMO <ArrowDownRight className="h-4 w-4" />
              </a>

              <div className="flex items-center gap-2 font-mono text-xs text-ink/65">
                <span className="h-1.5 w-1.5 rounded-full bg-ochre"></span>
                <span>Information only. Never a medical diagnosis.</span>
              </div>
            </div>

            {/* Pill features checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-rule font-mono text-[11px] text-ink/70">
              <div className="flex items-center gap-1.5">
                <span className="text-sage font-bold">✔</span>
                <span>Plain-language grade 6–8</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sage font-bold">✔</span>
                <span>Every sentence cited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sage font-bold">✔</span>
                <span>Zero diagnostic claims</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Flat Medical Stationery Illustration */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-none border border-ink bg-[#FAF7F0] p-6 shadow-paper-lg">
              {/* Slip Header */}
              <div className="flex items-start justify-between border-b border-rule pb-3">
                <div>
                  <div className="font-serif text-sm font-black tracking-tight text-ink">
                    SAMPLE OUTPATIENT CLINIC SLIP
                  </div>
                  <div className="font-mono text-[9px] text-ink/60">
                    ID: SYN-REF-092 • DISPENSING MEMORANDUM
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-vermilion">℞</div>
              </div>

              {/* Body Lines with vermilion scanner sweep */}
              <div className="relative my-4 space-y-3.5 font-mono text-xs">
                {/* Line 1 */}
                <div className="flex justify-between border-b border-rule/50 pb-2">
                  <span className="font-bold text-ink">Tab. Metformin 500mg</span>
                  <span className="text-ink/60">1-0-1 (after meals)</span>
                </div>

                {/* Line 2 with sweeping vermilion highlight */}
                <div className="relative overflow-hidden rounded bg-vermilion/10 p-2 border border-vermilion/40">
                  <div className="flex justify-between font-bold text-vermilion">
                    <span>Tab. Atorvastatin 10mg</span>
                    <span>0-0-1 (bedtime)</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-ink/70">
                    <span className="text-sage font-bold">● Grounded in WHO-EML</span>
                    <span className="font-mono text-[9px] bg-paper px-1 border border-rule">CONFIDENCE 94%</span>
                  </div>
                  {/* Subtle sweep animation simulation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vermilion/15 to-transparent animate-pulse pointer-events-none" />
                </div>

                {/* Line 3 */}
                <div className="flex justify-between border-b border-rule/50 pb-2">
                  <span className="font-bold text-ink">Cap. Amoxicillin 625mg</span>
                  <span className="text-ink/60">1-1-1 × 5 days</span>
                </div>

                {/* Line 4 - low confidence demo preview */}
                <div className="flex justify-between p-1.5 bg-ochre/10 border border-ochre/30 text-ink/70">
                  <span className="italic">[Uncertain cursive: Azithro... 250]</span>
                  <span className="text-ochre font-bold text-[10px]">Verification Gate</span>
                </div>
              </div>

              {/* Slip Bottom */}
              <div className="border-t border-rule pt-3 flex items-center justify-between font-mono text-[9px] text-ink/50">
                <span>VERIFIED CLINICAL KNOWLEDGE BASE</span>
                <span className="text-vermilion font-bold">100% AUDITABLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
