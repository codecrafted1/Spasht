import React from "react";
import { ScrambleText } from "../common/ScrambleText";
import { AlertOctagon } from "lucide-react";

export const Limits: React.FC = () => {
  const limits = [
    {
      num: "01",
      title: "Not for Emergency Triage or Acute Crises",
      desc: "If a patient experiences chest pain, shortness of breath, acute allergic symptoms, or severe distress, do not upload documents to this tool. Seek emergency care immediately at the nearest hospital."
    },
    {
      num: "02",
      title: "Never Advises Dosage Changes or Discontinuation",
      desc: "This software will never recommend altering a medication schedule, increasing a dose, or stopping a prescribed therapy. All adjustments require direct clinician oversight."
    },
    {
      num: "03",
      title: "Does Not Formulate Differential Diagnoses",
      desc: "Abnormal lab markers (e.g. elevated blood sugar or potassium) are reported with respect to standard intervals. The software explicitly does not diagnose diseases such as diabetes or renal failure."
    },
    {
      num: "04",
      title: "Not a Verification Authority for Compound Counterfeiting",
      desc: "The system inspects paper text, not chemical composition. Confirming physical authenticity or batch purity requires licensed dispensing pharmacies and regulatory authorities."
    }
  ];

  return (
    <section id="limits" className="border-b border-ink bg-ink text-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex items-baseline justify-between border-b border-paper/20 pb-4">
          <div className="font-mono text-xs font-bold tracking-widest text-vermilion uppercase">
            <ScrambleText text="05 / SYSTEM BOUNDARIES & LIMITS" triggerOnView />
          </div>
          <span className="font-mono text-xs text-paper/50 uppercase tracking-wider">
            Mandatory Boundary Disclosures
          </span>
        </div>

        {/* Introduction */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-paper">
            What this system should never be used for.
          </h2>
          <p className="mt-4 font-sans text-sm text-paper/70 leading-relaxed">
            Honest engineering requires stating explicit operational limits. We refuse to exaggerate AI diagnostic capabilities or allow patients to rely on unassisted algorithmic outputs during critical medical events.
          </p>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 divide-paper/15">
          {limits.map((item) => (
            <div key={item.num} className="pt-6 md:pt-0 space-y-2 border-t md:border-t-0 md:border-b border-paper/15 pb-6">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-vermilion">
                <AlertOctagon className="h-4 w-4" />
                <span>RESTRICTION {item.num}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-paper">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-paper/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Repeated Legal Guardrail Strip */}
        <div className="mt-12 rounded border border-vermilion/50 bg-vermilion/10 p-4 font-mono text-xs text-paper/90">
          <strong className="text-vermilion">REGULATORY NOTICE:</strong> Samjho is a research and clinical literacy prototype created for educational and decision-support demonstration. It has not been evaluated by CDSCO or FDA as a medical device.
        </div>
      </div>
    </section>
  );
};
