"""
Safety Guardrails for Samjho.
Blocks diagnostic assertions, dosage changes, and ungrounded statements.
"""

import re
from typing import Tuple, List, Optional
from app.config import settings

SAFE_FALLBACK_EXPLANATION = (
    "This medication or test is documented in standard health guidelines. "
    "Please consult your prescribing clinician or pharmacist to discuss your personal treatment plan."
)

URGENT_CARE_NOTICE = (
    "URGENT HEALTH NOTICE: If you are experiencing symptoms like chest pain, shortness of breath, "
    "or severe allergic reaction, do not wait for online analysis. Contact local emergency emergency services "
    "or visit the nearest hospital casualty immediately."
)

class GuardrailViolation(Exception):
    """Raised when generated or input text violates clinical safety boundaries."""
    pass

def check_guardrails(text: str) -> Tuple[bool, List[str]]:
    """
    Scans text for banned diagnostic or prescriptive phrases.
    Returns (is_clean, list_of_violations).
    """
    lower = text.lower()
    violations: List[str] = []

    for phrase in settings.BANNED_PHRASES:
        if phrase in lower:
            violations.append(f"Prohibited phrase detected: '{phrase}'")

    return (len(violations) == 0, violations)

def check_urgent_symptoms(text: str) -> Optional[str]:
    """Detects acute red-flag symptoms and returns an urgent medical notice if found."""
    lower = text.lower()
    for pattern in settings.RED_FLAG_PATTERNS:
        if pattern in lower:
            return URGENT_CARE_NOTICE
    return None

def sanitize_and_enforce_guardrails(explanation: str, has_citation: bool = True) -> str:
    """
    Filters output through guardrails. If a violation is caught, replaces with safe fallback.
    """
    is_clean, violations = check_guardrails(explanation)
    if not is_clean:
        return SAFE_FALLBACK_EXPLANATION

    # Require citation grounding
    if not has_citation and "No reliable information" not in explanation:
        # Check if explanation contains reference marker like [1]
        if not re.search(r"\[\d+\]", explanation):
            return SAFE_FALLBACK_EXPLANATION

    return explanation
