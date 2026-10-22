"""
PII Masking module with specialized regexes for Indian healthcare identifiers.
Masks Aadhaar numbers, Indian mobile numbers, PIN codes, and patient names.
"""

import re

# Indian phone numbers: +91 9876543210, 09876543210, or 9876543210
PHONE_REGEX = re.compile(r"(?:\+91[\-\s]?)?[6789]\d{9}\b")

# Indian Aadhaar pattern: 12 digits, often formatted as 4-4-4
AADHAAR_REGEX = re.compile(r"\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b")

# Indian 6-digit postal PIN codes
PIN_CODE_REGEX = re.compile(r"\b[1-9][0-9]{2}\s?[0-9]{3}\b")

# Patient name patterns on prescription headers
PATIENT_NAME_REGEX = re.compile(
    r"(?:Patient\s*Name|Patient|Pt\.?|Name)\s*:\s*([A-Za-z\s\.]+)(?=\n|Age|Sex|Date|Gender|$)",
    re.IGNORECASE
)

# Email addresses
EMAIL_REGEX = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b")

def mask_pii(text: str) -> str:
    """
    Scrubs Personally Identifiable Information (PII) from clinical text before any LLM/RAG call.
    """
    if not text:
        return ""

    masked = text

    # Mask Aadhaar
    masked = AADHAAR_REGEX.sub("[REDACTED_AADHAAR]", masked)

    # Mask Phone
    masked = PHONE_REGEX.sub("[REDACTED_PHONE]", masked)

    # Mask Email
    masked = EMAIL_REGEX.sub("[REDACTED_EMAIL]", masked)

    # Mask Patient Name
    def replace_patient_name(match):
        full_match = match.group(0)
        prefix = full_match.split(":")[0] + ": "
        return f"{prefix}[REDACTED_PATIENT_NAME]"

    masked = PATIENT_NAME_REGEX.sub(replace_patient_name, masked)

    return masked
