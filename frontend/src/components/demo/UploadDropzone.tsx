import React, { useRef, useState } from "react";
import { Upload, FileText, Activity, Mic, MicOff } from "lucide-react";
import { APP_CONFIG } from "../../config/appConfig";
import { useSpeech } from "../../hooks/useSpeech";

interface UploadDropzoneProps {
  onSelectSample: (type: "prescription" | "lab_report") => void;
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  currentStage: string;
  progressPercent: number;
  activeDocType: string;
  onVoiceQuestion: (query: string) => void;
  language: string;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onSelectSample,
  onFileUpload,
  isLoading,
  currentStage,
  progressPercent,
  activeDocType,
  onVoiceQuestion,
  language
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startListening, isListening, recognitionSupported } = useSpeech();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  const handleVoiceClick = () => {
    if (isListening) return;
    startListening((transcript) => {
      setQuestionText(transcript);
      onVoiceQuestion(transcript);
    }, language);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionText.trim()) {
      onVoiceQuestion(questionText.trim());
    }
  };

  // Map progress stage to plain label
  const stageLabels: Record<string, string> = {
    reading: "1/4 Reading text & bounding coordinates...",
    extracting: "2/4 Parsing structured clinical fields...",
    checking_sources: "3/4 Grounding in WHO-EML & NLEM guidelines...",
    translating: "4/4 Formatting plain explanation...",
    complete: "Analysis complete"
  };

  return (
    <div className="space-y-6">
      {/* Sample Document Selectors */}
      <div className="space-y-2">
        <label className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70">
          SELECT SYNTHETIC SAMPLE DOCUMENT
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            data-cursor="link"
            onClick={() => onSelectSample("prescription")}
            disabled={isLoading}
            className={`flex items-center gap-2.5 rounded border p-3 text-left transition-all ${
              activeDocType === "prescription"
                ? "border-vermilion bg-vermilion/5 ring-1 ring-vermilion text-ink"
                : "border-rule bg-[#FAF7F0] hover:border-ink/60 text-ink/80"
            }`}
          >
            <div className={`p-1.5 rounded ${activeDocType === "prescription" ? "bg-vermilion text-paper" : "bg-rule/40 text-ink"}`}>
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold">Sample Prescription</div>
              <div className="font-mono text-[10px] text-ink/60">Clinic Outpatient Slip (4 items)</div>
            </div>
          </button>

          <button
            type="button"
            data-cursor="link"
            onClick={() => onSelectSample("lab_report")}
            disabled={isLoading}
            className={`flex items-center gap-2.5 rounded border p-3 text-left transition-all ${
              activeDocType === "lab_report"
                ? "border-vermilion bg-vermilion/5 ring-1 ring-vermilion text-ink"
                : "border-rule bg-[#FAF7F0] hover:border-ink/60 text-ink/80"
            }`}
          >
            <div className={`p-1.5 rounded ${activeDocType === "lab_report" ? "bg-vermilion text-paper" : "bg-rule/40 text-ink"}`}>
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold">Sample Lab Report</div>
              <div className="font-mono text-[10px] text-ink/60">Metabolic & HbA1c Panel</div>
            </div>
          </button>
        </div>
      </div>

      {/* Upload Drop Zone */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70">
            OR UPLOAD HEALTH DOCUMENT
          </label>
          <span className="font-mono text-[10px] text-ink/50">PNG, JPG, PDF &lt; 10MB</span>
        </div>

        <div
          data-cursor="upload"
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center rounded border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
            isDragOver
              ? "border-vermilion bg-vermilion/10 scale-[1.01]"
              : "border-rule bg-[#FAF7F0] hover:border-ink/70 hover:bg-[#F5EFE6]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 bg-paper text-ink">
            <Upload className="h-5 w-5 text-ink/70" />
          </div>

          <div className="font-serif text-base font-bold text-ink">
            Drag & drop document here
          </div>
          <div className="mt-1 font-mono text-xs text-ink/60">
            or <span className="text-vermilion underline underline-offset-2">browse files</span> from your device
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded bg-paper px-2.5 py-1 border border-rule font-mono text-[10px] text-ink/60">
            <span className="h-1.5 w-1.5 rounded-full bg-sage"></span>
            <span>{APP_CONFIG.privacyNote}</span>
          </div>
        </div>
      </div>

      {/* Staged Progress Indicator */}
      {isLoading && (
        <div className="rounded border border-ink bg-paper p-4 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between font-mono text-xs mb-2">
            <span className="font-bold text-vermilion">{stageLabels[currentStage] || "Processing..."}</span>
            <span className="text-ink/60">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full bg-rule/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-vermilion transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Voice / Text Question Box */}
      <div className="rounded border border-rule bg-[#FAF7F0] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="voice-question-input" className="font-mono text-xs font-bold uppercase tracking-wider text-ink/80 flex items-center gap-1.5">
            <span>ASK A QUESTION ABOUT THIS DOCUMENT</span>
          </label>
          {recognitionSupported && (
            <span className="font-mono text-[10px] text-sage font-medium">● Voice ready</span>
          )}
        </div>

        <form onSubmit={handleQuestionSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              id="voice-question-input"
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="e.g. Can I take Metformin on an empty stomach?"
              className="w-full rounded border border-rule bg-paper px-3 py-2 text-xs font-mono text-ink placeholder-ink/40 focus:border-vermilion focus:outline-none"
            />
          </div>

          <button
            type="button"
            data-cursor="link"
            onClick={handleVoiceClick}
            aria-label={isListening ? "Listening... click to pause" : "Ask question by voice microphone"}
            className={`flex items-center justify-center rounded px-3 py-2 border transition-all ${
              isListening
                ? "bg-vermilion text-paper border-vermilion animate-pulse"
                : "bg-paper text-ink border-rule hover:border-ink hover:text-vermilion"
            }`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>

          <button
            type="submit"
            data-cursor="link"
            className="rounded border border-ink bg-ink px-4 py-2 font-mono text-xs font-bold text-paper hover:bg-vermilion hover:border-vermilion transition-colors"
          >
            ASK
          </button>
        </form>
        <p className="font-mono text-[10px] text-ink/50">
          Answers reference only the official knowledge base and never offer medical diagnostic advice.
        </p>
      </div>
    </div>
  );
};
