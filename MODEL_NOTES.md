# Samjho — Model Cards & Architectural Notes

This document provides a comprehensive technical breakdown of every algorithmic component within Samjho, detailing rationale, known failure modes, and operational boundaries to support hackathon defense and clinical auditing.

---

## 1. System Philosophy: Determinism Over Hallucination

In clinical decision support, generating unanchored text presents unacceptable patient safety risks. Samjho replaces free-form chat with a multi-stage **Deterministic Pipeline Architecture**:
1. **PII Masking**: Transient regex scrubbing prevents private data leakage.
2. **Deterministic Rules Engine**: Lab intervals are evaluated strictly via numerical arithmetic (0% LLM hallucination risk).
3. **Fuzzy String Normalization**: Drug brand names map to generic international non-proprietary names (INN) using RapidFuzz token sorting.
4. **Constrained RAG**: Explanations are anchored strictly to verified entries in the WHO Model List of Essential Medicines (EML) and National List of Essential Medicines (NLEM) India.
5. **Hard Guardrail Interceptors**: Prohibited diagnostic and dosage alteration tokens trigger automatic fallback templates.

---

## 2. Component Specifications

### 2.1 Optical Character Recognition (OCR) & Region Mapping
- **Role**: Extracts textual lines and normalizes polygon coordinates `[x, y, w, h]` from 0.0 to 1.0.
- **Why Chosen**: PaddleOCR and EasyOCR offer lightweight, open-weight text detection without sending images to third-party cloud APIs.
- **Known Failure Modes**:
  - Heavily cursive physician handwriting.
  - Thermal receipt degradation or faded clinic dot-matrix printing.
- **Mitigation**: Confidence thresholding (< 65%) automatically trips `needs_verification: true`. Explanations remain locked until the patient or pharmacist confirms or corrects the text.

### 2.2 Normalization Module (RapidFuzz)
- **Role**: Normalizes diverse proprietary trade names (e.g. *Glucophage*, *Glycomet*) to standard generic entities (*Metformin*).
- **Why Chosen**: RapidFuzz provides sub-millisecond Levenshtein distance calculations with configurable token set scoring, preventing spelling mismatches.
- **Threshold**: Documented threshold of 75.0% prevents over-aggressive false-positive matching.
- **Known Failure Modes**:
  - Sound-alike/look-alike drugs (e.g. *Celebrex* vs *Celexa*).
- **Mitigation**: High ambiguity drops below threshold into low-confidence quarantine.

### 2.3 Deterministic Lab Status Rules Engine
- **Role**: Compares patient numeric results against low and high reference intervals.
- **Why Chosen**: Arithmetic rules provide 100% deterministic reproducibility with zero risk of conversational drift.
- **Threshold**: "Slightly outside" is documented at &le; 10% of the nearest bound.
  $$\text{margin} = \text{bound} \times 0.10$$
- **Known Failure Modes**:
  - Reports lacking printed reference intervals (resolved via standard fallback generic ranges).
  - Non-standard international unit conversions (mitigated by `normalize_unit`).

### 2.4 Grounded Retrieval & Plain-Language Engine
- **Role**: Converts clinical entries into Grade 6–8 readability with mandatory sentence-level citations (`[1]`, `[2]`).
- **Data Source**: WHO Model List of Essential Medicines (23rd List, 2023) and NLEM India.
- **Intended Use**: Patient literacy, family caregiver empowerment, and clinical visit preparation.
- **Out-of-Scope Use**: Diagnostic formulation, emergency triage, prescription verification.

---

## 3. Boundary & Safety Disclosures

| Feature | In Scope | Strictly Out of Scope |
| :--- | :--- | :--- |
| **Prescription Literacy** | Explaining standard purpose and administration directions | Recommending dosage changes or alternative medicines |
| **Laboratory Reports** | Explaining what test measures & mapping relative to standard range | Diagnosing underlying medical conditions |
| **Emergency Situations** | Referring patients to emergency care upon red-flag detection | Providing triage advice for acute chest pain or anaphylaxis |
| **Data Privacy** | In-memory transient processing; zero disk retention | Cloud storage of patient identities or scanned records |
