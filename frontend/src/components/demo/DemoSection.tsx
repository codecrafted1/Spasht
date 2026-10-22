import React, { useState } from "react";
import { ScrambleText } from "../common/ScrambleText";
import { UploadDropzone } from "./UploadDropzone";
import { DocumentViewer } from "./DocumentViewer";
import { PrescriptionResults } from "./PrescriptionResults";
import { LabResults } from "./LabResults";
import { QuestionsChecklist } from "./QuestionsChecklist";
import { SourcePopover } from "../common/SourcePopover";
import { VerificationModal } from "./VerificationModal";
import { SAMPLES, analyzeDocument, confirmItemVerification } from "../../services/analyzeDocument";
import type { AnalyzeResponse, Citation, DocumentItem, SampleDocument } from "../../types/document";
import { ShieldAlert, RefreshCw, Languages } from "lucide-react";
import { APP_CONFIG } from "../../config/appConfig";

interface DemoSectionProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ currentLang, onLanguageChange }) => {
  const [activeSampleKey, setActiveSampleKey] = useState<"prescription" | "lab_report">("prescription");
  const [currentSample, setCurrentSample] = useState<SampleDocument>(SAMPLES.prescription);
  const [analysisData, setAnalysisData] = useState<AnalyzeResponse>(SAMPLES.prescription.data);

  // Interaction states
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [verifyingItem, setVerifyingItem] = useState<DocumentItem | null>(null);

  // Analysis progress states
  const [isLoading, setIsLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState<string>("complete");
  const [progressPercent, setProgressPercent] = useState<number>(100);

  // Voice questions log
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);

  const handleSelectSample = async (type: "prescription" | "lab_report") => {
    setActiveSampleKey(type);
    setCurrentSample(SAMPLES[type]);
    setIsLoading(true);
    setCustomAnswer(null);

    const result = await analyzeDocument(
      { sampleKey: type },
      currentLang,
      (stage, pct) => {
        setCurrentStage(stage);
        setProgressPercent(pct);
      }
    );

    setAnalysisData(result);
    setIsLoading(false);
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setCustomAnswer(null);

    const result = await analyzeDocument(
      { file },
      currentLang,
      (stage, pct) => {
        setCurrentStage(stage);
        setProgressPercent(pct);
      }
    );

    // Update state to match uploaded document type
    const sampleKey = result.document_type === "lab_report" ? "lab_report" : "prescription";
    setActiveSampleKey(sampleKey);
    setCurrentSample(SAMPLES[sampleKey]);
    setAnalysisData(result);
    setIsLoading(false);
  };

  const handleConfirmVerification = async (
    itemId: string,
    updatedName: string,
    updatedDosage: string
  ) => {
    const updated = await confirmItemVerification(itemId, updatedName, updatedDosage, currentLang);

    setAnalysisData((prev) => {
      const items = prev.items.map((it) => {
        if (it.id === itemId) {
          return {
            ...it,
            needs_verification: false,
            confidence: "high" as const,
            confidence_score: 0.95,
            prescription_fields: it.prescription_fields
              ? {
                  ...it.prescription_fields,
                  drug_name: updatedName,
                  strength: updatedDosage,
                  general_usage: "Antibiotic indicated for bacterial infections under clinician direction."
                }
              : undefined,
            explanation: updated.explanation,
            explanation_hi: updated.explanation_hi,
            citations: [
              {
                id: "WHO-EML-AZI-01",
                source_name: "WHO Model List of Essential Medicines",
                source_url: "https://www.who.int/medicines/publications/essentialmedicines",
                license_note: "Open Access WHO Guidelines",
                excerpt: `${updatedName}: Antibacterial agent. Use strictly as directed for the completed course.`
              }
            ]
          };
        }
        return it;
      });
      return { ...prev, items };
    });
  };

  const handleVoiceQuestion = (query: string) => {
    // Grounded non-diagnostic answer simulation
    const lower = query.toLowerCase();
    if (lower.includes("metformin") || lower.includes("stomach") || lower.includes("food")) {
      setCustomAnswer(
        "According to the WHO Model List guidelines, Metformin is typically taken alongside or immediately following meals to minimize gastrointestinal discomfort. Always verify your specific instructions with your pharmacist."
      );
    } else if (lower.includes("potassium") || lower.includes("danger") || lower.includes("die")) {
      setCustomAnswer(
        "Your potassium reading is 5.15 mmol/L (slightly above standard 3.5–5.0 bracket). Slight elevations are common and often relate to hydration or collection time. Please share this with your doctor; no emergency self-treatment should be taken."
      );
    } else {
      setCustomAnswer(
        `Grounded Reference Response for "${query}": Clinical documentation advises discussing any dosage timing or bodily symptoms directly with your attending physician. Information presented here is for patient literacy only.`
      );
    }
  };

  return (
    <section id="demo" className="border-b border-rule bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-rule pb-4">
          <div>
            <div className="font-mono text-xs font-bold tracking-widest text-vermilion uppercase">
              <ScrambleText text="03 / WORKING DEMO PROTOTYPE" triggerOnView />
            </div>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-ink">
              Synthetic Document Analysis & Grounded Explanations
            </h2>
          </div>

          {/* Quick controls: Language & Reset */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded border border-rule bg-[#FAF7F0] px-3 py-1 font-mono text-xs text-ink/70">
              <Languages className="h-3.5 w-3.5 text-vermilion" />
              <span>Language:</span>
              <button
                onClick={() => onLanguageChange("en")}
                data-cursor="link"
                className={`font-bold ml-1 ${currentLang === "en" ? "text-vermilion underline" : "text-ink/60"}`}
              >
                EN
              </button>
              <span>/</span>
              <button
                onClick={() => onLanguageChange("hi")}
                data-cursor="link"
                className={`font-bold ${currentLang === "hi" ? "text-vermilion underline" : "text-ink/60"}`}
              >
                हिन्दी
              </button>
            </div>

            <button
              onClick={() => handleSelectSample(activeSampleKey)}
              data-cursor="link"
              title="Reset analysis"
              className="flex items-center gap-1 rounded border border-rule bg-[#FAF7F0] p-1.5 text-xs text-ink/70 hover:text-ink hover:border-ink transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Demo Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Dropzone & Document Preview Scan (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <UploadDropzone
              onSelectSample={handleSelectSample}
              onFileUpload={handleFileUpload}
              isLoading={isLoading}
              currentStage={currentStage}
              progressPercent={progressPercent}
              activeDocType={activeSampleKey}
              onVoiceQuestion={handleVoiceQuestion}
              language={currentLang}
            />

            {/* Document Scan with Interactive Bounding Boxes */}
            <DocumentViewer
              previewSvg={currentSample.previewSvg}
              items={analysisData.items}
              hoveredItemId={hoveredItemId}
              onHoverItem={setHoveredItemId}
              onSelectItem={(id) => {
                const item = analysisData.items.find((it) => it.id === id);
                if (item?.citations && item.citations[0]) {
                  setActiveCitation(item.citations[0]);
                } else if (item?.needs_verification) {
                  setVerifyingItem(item);
                }
              }}
              documentType={analysisData.document_type}
            />
          </div>

          {/* Right Column: Grounded Results & Doctor Questions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Custom Voice Question Answer Banner */}
            {customAnswer && (
              <div className="rounded border border-vermilion bg-vermilion/5 p-4 shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-vermilion mb-1">
                  <span>GROUNDED CLINICAL Q&A RESULT</span>
                </div>
                <p className="font-sans text-xs text-ink/90 leading-relaxed">
                  {customAnswer}
                </p>
              </div>
            )}

            {/* Main Result Items (Prescription vs Lab Mode) */}
            {analysisData.document_type === "prescription" ? (
              <PrescriptionResults
                items={analysisData.items}
                hoveredItemId={hoveredItemId}
                onHoverItem={setHoveredItemId}
                onOpenSource={setActiveCitation}
                onOpenVerification={setVerifyingItem}
                language={currentLang}
              />
            ) : (
              <LabResults
                items={analysisData.items}
                hoveredItemId={hoveredItemId}
                onHoverItem={setHoveredItemId}
                onOpenSource={setActiveCitation}
                language={currentLang}
              />
            )}

            {/* Doctor Questions Checklist */}
            <QuestionsChecklist
              questions={analysisData.questions_for_doctor}
              questionsHi={analysisData.questions_for_doctor_hi}
              language={currentLang}
            />

            {/* Persistent Disclaimer Strip */}
            <div className="flex items-center gap-3 rounded border border-ink/40 bg-paper p-3 text-xs font-mono text-ink shadow-sm">
              <ShieldAlert className="h-5 w-5 shrink-0 text-vermilion" />
              <div className="leading-snug">
                <strong>NON-DIAGNOSTIC NOTICE:</strong> {APP_CONFIG.disclaimer}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popovers and Modals */}
      <SourcePopover
        citation={activeCitation}
        onClose={() => setActiveCitation(null)}
      />

      <VerificationModal
        item={verifyingItem}
        onClose={() => setVerifyingItem(null)}
        onConfirm={handleConfirmVerification}
      />
    </section>
  );
};
