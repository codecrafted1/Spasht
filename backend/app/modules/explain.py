"""
Plain-language explanation engine (Grade 6-8 reading level).
Anchors every sentence to retrieved KB citations with non-diagnostic boundaries.
"""

from typing import List, Optional
from app.schemas.document import Citation, PrescriptionFields, LabFields
from app.modules.retrieve import get_medicine_kb_entry, get_lab_kb_entry
from app.modules.guardrails import sanitize_and_enforce_guardrails

def explain_prescription_item(
    fields: PrescriptionFields,
    citations: List[Citation]
) -> str:
    """Generates plain-language explanation for a prescription item."""
    if not citations:
        return "No verified medical reference found for this item. Please consult your prescribing doctor or pharmacist."

    drug_name = fields.normalized_drug_name or fields.drug_name
    entry = get_medicine_kb_entry(drug_name)

    if entry:
        summary = entry.get("plain_summary", "")
        admin = entry.get("administration_note", "")
        text = f"{drug_name} is documented in clinical health guidelines [1]. {summary} [1]. Commonly advised directions note: {admin} [1]."
    else:
        text = f"{drug_name} is listed in public essential medicine formularies [1]. Always follow the frequency and duration written by your physician [1]."

    return sanitize_and_enforce_guardrails(text, has_citation=len(citations) > 0)

def explain_lab_item(
    fields: LabFields,
    status: str,
    citations: List[Citation]
) -> str:
    """Generates non-diagnostic plain-language explanation for a lab test result."""
    if not citations:
        return "Standard reference information for this test is not available. Please discuss with your laboratory or physician."

    entry = get_lab_kb_entry(fields.test_name)
    summary = entry.get("plain_summary", "Measures specific physiological concentrations.") if entry else ""

    low = fields.reference_range_low
    high = fields.reference_range_high
    unit = fields.unit
    val = fields.value

    if status == "within":
        text = (
            f"The measured {fields.test_name} ({val} {unit}) falls within the typical reference interval "
            f"({low}–{high} {unit}) [1]. {summary} [1]. Numbers in this band are generally considered expected [1]."
        )
    elif status == "slightly_outside":
        direction_word = "above" if fields.direction == "high" else "below"
        text = (
            f"The measured {fields.test_name} ({val} {unit}) is slightly {direction_word} the typical bracket "
            f"({low}–{high} {unit}) [1]. {summary} [1]. Minor variations can occur due to hydration, diet, or sample timing; "
            f"discuss this reading with your doctor [1]."
        )
    else:  # clearly_outside
        direction_word = "higher than" if fields.direction == "high" else "lower than"
        text = (
            f"The recorded {fields.test_name} ({val} {unit}) is {direction_word} the printed reference range "
            f"({low}–{high} {unit}) [1]. {summary} [1]. Results outside typical brackets should be reviewed with your "
            f"doctor to decide if follow-up care or repeat testing is advised [1]."
        )

    return sanitize_and_enforce_guardrails(text, has_citation=len(citations) > 0)
