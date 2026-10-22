import React from "react";
import { APP_CONFIG } from "../../config/appConfig";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-rule bg-paper py-12 text-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 pb-8 border-b border-rule">
          <div className="md:col-span-5 space-y-3">
            <span className="font-serif text-2xl font-black text-ink">{APP_CONFIG.name}</span>
            <p className="font-sans text-xs text-ink/70 leading-relaxed max-w-md">
              A healthcare literacy decision-support prototype engineered to empower patients, caregivers, and elderly family members with understandable, source-grounded health documentation.
            </p>
            <div className="inline-flex items-center gap-2 border border-rule px-2.5 py-1 text-[10px] font-mono bg-[#FAF7F0]">
              <span className="h-1.5 w-1.5 rounded-full bg-sage"></span>
              <span>100% SYNTHETIC & ANONYMIZED TEST DATA ONLY</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 font-mono text-xs">
            <div className="font-bold uppercase tracking-wider text-ink/50 text-[10px]">Track & Submission</div>
            <p className="text-ink/80">Healthcare Literacy & Patient Agency Track</p>
            <p className="text-ink/60">Built for Open Clinical Hackathon 2026</p>
          </div>

          <div className="md:col-span-4 space-y-2 font-mono text-xs">
            <div className="font-bold uppercase tracking-wider text-ink/50 text-[10px]">Ethical Guardrails</div>
            <p className="text-ink/80">Zero Diagnostic Claims Policy</p>
            <p className="text-ink/80">Every Sentence Traced to Public Medical Guidelines</p>
            <p className="text-ink/60">Local Memory Only • No Cloud Patient Retention</p>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-8 flex flex-col gap-4 text-xs font-mono text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed">
            <strong className="text-ink">MANDATORY NOTICE:</strong> {APP_CONFIG.disclaimer} This application is not a licensed clinician, diagnostic device, or prescription dispensing service.
          </p>
          <div className="whitespace-nowrap text-right">
            © 2026 {APP_CONFIG.name} Team • All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
