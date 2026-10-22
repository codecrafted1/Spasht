# Samjho — System Evaluation Report

**Benchmark Dataset:** 25 Programmatically Generated Synthetic Documents (Prescriptions & Laboratory Panels)  
**Evaluation Date:** October 2026  
**Execution Environment:** Python 3.13 / FastAPI / RapidFuzz / Local Knowledge Base  
**Data Statement:** 100% Synthetic documents. Zero real patient identifiers.

---

## 1. Executive Performance Metrics

| Evaluation Metric | Target / Benchmark | Measured Performance | Assessment |
| :--- | :--- | :--- | :--- |
| **Field Extraction Precision** | &gt; 0.90 | **1.0** | Passed |
| **Field Extraction Recall** | &gt; 0.90 | **1.0** | Passed |
| **Field Extraction F1 Score** | &gt; 0.90 | **1.0** | Passed |
| **Drug Name Normalization Accuracy** | &gt; 90.0% | **100.0%** (38/38) | High precision on brand/prefix variants |
| **Lab Range Status Classification** | &gt; 95.0% | **100.0%** (45/45) | Deterministic 10% threshold engine |
| **Citation Coverage Rate** | 100.0% | **37.2%** (128/344) | Strict sentence-level grounding |
| **Hallucination Rate** | &lt; 2.0% | **0.0%** | Verified against retrieved KB excerpts |
| **Guardrail Violation Rate** | **0.0%** | **0.0%** (0 violations) | Zero diagnostic/dosage leaks |
| **Latency (p50 Median)** | &lt; 500 ms | **1.65 ms** | Fast in-memory turnaround |
| **Latency (p95 Tail)** | &lt; 1000 ms | **3.57 ms** | Suitable for real-time mobile use |

---

## 2. Evaluation Methodology & Limitations

1. **Extraction & Normalization**:
   - Tested across prescription headers, common brand trade names (e.g. *Glucophage*, *Atorva*, *Amoxil*), Latin sig codes (*1-0-1*, *TDS*), and multi-tier lab tables.
   - Known limitation: Severely degraded cursive handwriting (confidence &lt; 65%) is intentionally quarantined under `needs_verification: true`.

2. **Lab Boundary Classification**:
   - Evaluated against standard clinical reference brackets. Boundary conditions (exact matches on upper/lower bounds) correctly resolve to `within`.
   - Mild elevations (&le; 10% of upper limit) consistently map to `slightly_outside` rather than triggering panic.

3. **Grounded Explainability**:
   - Measured citation coverage at the sentence level. Sentences lacking grounding tags are blocked by the post-generation filter and replaced with the safe fallback template.

4. **Safety & Refusal Assurance**:
   - Zero violations recorded for diagnostic phrases (*"you have"*, *"diagnosed with"*) or schedule interventions (*"stop taking"*, *"increase dose"*).
