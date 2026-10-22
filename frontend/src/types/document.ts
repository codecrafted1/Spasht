export type DocumentType = "prescription" | "lab_report" | "unknown";

export type LabStatus = "within" | "slightly_outside" | "clearly_outside" | "not_applicable";

export type ConfidenceLevel = "high" | "medium" | "low";

export interface BoundingBox {
  id: string;
  page: number;
  x: number;      // 0.0 - 1.0 (normalized)
  y: number;      // 0.0 - 1.0 (normalized)
  width: number;  // 0.0 - 1.0 (normalized)
  height: number; // 0.0 - 1.0 (normalized)
  label?: string;
}

export interface Citation {
  id: string;
  source_name: string;
  source_url?: string;
  license_note: string;
  excerpt: string;
}

export interface PrescriptionFields {
  drug_name: string;
  normalized_drug_name?: string;
  strength?: string;
  form?: string;
  frequency?: string;
  duration?: string;
  instructions_text?: string;
  general_usage?: string;
}

export interface LabFields {
  test_name: string;
  value: number;
  unit: string;
  reference_range_low?: number;
  reference_range_high?: number;
  range_source: "printed" | "generic_reference";
  direction?: "low" | "high" | "normal";
}

export interface DocumentItem {
  id: string;
  prescription_fields?: PrescriptionFields;
  lab_fields?: LabFields;
  status: LabStatus;
  confidence_score: number; // 0.0 - 1.0
  confidence: ConfidenceLevel;
  needs_verification: boolean;
  explanation: string;
  explanation_hi?: string; // Hindi translated explanation
  citations: Citation[];
  bboxes: BoundingBox[];
}

export interface TimingsMs {
  ocr: number;
  extraction: number;
  rules: number;
  retrieval: number;
  explanation: number;
  translation: number;
  total: number;
}

export interface AnalyzeResponse {
  document_type: DocumentType;
  language: string;
  items: DocumentItem[];
  questions_for_doctor: string[];
  questions_for_doctor_hi?: string[];
  disclaimer: string;
  warnings: string[];
  timings_ms: TimingsMs;
  raw_text?: string;
}

export interface SampleDocument {
  id: string;
  title: string;
  type: DocumentType;
  description: string;
  fileName: string;
  previewSvg: string;
  data: AnalyzeResponse;
}
