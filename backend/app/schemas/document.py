"""
Pydantic v2 schemas for Samjho API.
Matches the frontend TypeScript contracts at src/types/document.ts.
"""

from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field

DocumentType = Literal["prescription", "lab_report", "unknown"]
LabStatus = Literal["within", "slightly_outside", "clearly_outside", "not_applicable"]
ConfidenceLevel = Literal["high", "medium", "low"]

class BoundingBox(BaseModel):
    id: str = Field(..., description="Unique ID for region linking")
    page: int = Field(default=1, description="1-indexed page number")
    # Coordinates normalized from 0.0 to 1.0 (left, top, width, height)
    x: float = Field(..., ge=0.0, le=1.0)
    y: float = Field(..., ge=0.0, le=1.0)
    width: float = Field(..., ge=0.0, le=1.0)
    height: float = Field(..., ge=0.0, le=1.0)
    label: Optional[str] = Field(default=None, description="Optional brief text label")

class Citation(BaseModel):
    id: str = Field(..., description="Citation identifier, e.g. WHO-EML-MET-01")
    source_name: str = Field(..., description="Source authority e.g. WHO Model List of Essential Medicines")
    source_url: Optional[str] = Field(default=None, description="Public verification URL")
    license_note: str = Field(default="Public Reference / Open Access", description="License note")
    excerpt: str = Field(..., description="Grounding text passage")

class PrescriptionFields(BaseModel):
    drug_name: str = Field(..., description="Trade or generic drug name as written")
    normalized_drug_name: Optional[str] = Field(default=None, description="Standardized generic name")
    strength: Optional[str] = Field(default=None, description="e.g. 500 mg, 10 ml")
    form: Optional[str] = Field(default=None, description="Tablet, Capsule, Syrup, Ointment, Injection")
    frequency: Optional[str] = Field(default=None, description="e.g. Twice daily after meals, 1-0-1")
    duration: Optional[str] = Field(default=None, description="e.g. 5 days, 1 month")
    instructions_text: Optional[str] = Field(default=None, description="Raw instructions from doc")
    general_usage: Optional[str] = Field(default=None, description="Plain language purpose from KB")

class LabFields(BaseModel):
    test_name: str = Field(..., description="Standard test name e.g. Fasting Blood Glucose, Hemoglobin")
    value: float = Field(..., description="Numeric lab result value")
    unit: str = Field(..., description="Measurement unit e.g. mg/dL, g/dL, %")
    reference_range_low: Optional[float] = Field(default=None, description="Lower normal bound")
    reference_range_high: Optional[float] = Field(default=None, description="Upper normal bound")
    range_source: Literal["printed", "generic_reference"] = Field(default="printed", description="Source of reference range")
    direction: Optional[Literal["low", "high", "normal"]] = Field(default="normal", description="Direction if out of range")

class DocumentItem(BaseModel):
    id: str = Field(..., description="Unique item identifier")
    prescription_fields: Optional[PrescriptionFields] = None
    lab_fields: Optional[LabFields] = None
    status: LabStatus = Field(default="not_applicable")
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    confidence: ConfidenceLevel = Field(...)
    needs_verification: bool = Field(default=False, description="Flagged true if low confidence; explanation deferred")
    explanation: str = Field(..., description="Plain-language explanation with citation markers e.g. [1]")
    citations: List[Citation] = Field(default_factory=list)
    bboxes: List[BoundingBox] = Field(default_factory=list)

class TimingsMs(BaseModel):
    ocr: float = 0.0
    extraction: float = 0.0
    rules: float = 0.0
    retrieval: float = 0.0
    explanation: float = 0.0
    translation: float = 0.0
    total: float = 0.0

class AnalyzeResponse(BaseModel):
    document_type: DocumentType
    language: str = Field(default="en", description="Language code e.g. en, hi")
    items: List[DocumentItem] = Field(default_factory=list)
    questions_for_doctor: List[str] = Field(default_factory=list)
    disclaimer: str = Field(
        default="Information only. Not a diagnosis or prescription. Do not change medicines or doses without consulting your doctor or pharmacist."
    )
    warnings: List[str] = Field(default_factory=list)
    timings_ms: TimingsMs = Field(default_factory=TimingsMs)

class ConfirmItemRequest(BaseModel):
    item_id: str
    corrected_prescription_fields: Optional[PrescriptionFields] = None
    corrected_lab_fields: Optional[LabFields] = None
    language: str = "en"

class VoiceQuestionRequest(BaseModel):
    question: str
    context_item_ids: Optional[List[str]] = None
    language: str = "en"
