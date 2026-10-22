"""
Unit tests for Indian PII Redaction module.
"""

import pytest
from app.modules.masking import mask_pii

def test_aadhaar_masking():
    raw = "Patient Aadhaar: 9876 5432 1098 presented for general checkup."
    masked = mask_pii(raw)
    assert "9876 5432 1098" not in masked
    assert "[REDACTED_AADHAAR]" in masked

def test_indian_phone_masking():
    raw = "Contact relative at +91 9845012345 or 9876543210 for test collection."
    masked = mask_pii(raw)
    assert "9845012345" not in masked
    assert "9876543210" not in masked
    assert "[REDACTED_PHONE]" in masked

def test_patient_name_header_masking():
    raw = "SEVA CLINIC\nPatient: Rajesh Kumar Sharma\nAge: 54 Y / M\nRx: Metformin"
    masked = mask_pii(raw)
    assert "Rajesh Kumar Sharma" not in masked
    assert "[REDACTED_PATIENT_NAME]" in masked

def test_email_masking():
    raw = "Send reports to patient.care@domain.com promptly."
    masked = mask_pii(raw)
    assert "patient.care@domain.com" not in masked
    assert "[REDACTED_EMAIL]" in masked
