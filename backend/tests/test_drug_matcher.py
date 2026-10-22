"""
Unit tests for RapidFuzz drug name matcher and unit normalizer.
"""

import pytest
from app.modules.normalise import match_drug_name, normalize_unit, is_plausible_lab_value

def test_brand_name_to_generic():
    # Glucophage -> Metformin
    gen, score = match_drug_name("Glucophage 500mg")
    assert gen == "Metformin"
    assert score >= 0.75

def test_prescription_prefix_stripping():
    # "Tab. Metformin 500mg"
    gen, score = match_drug_name("Tab. Metformin 500mg")
    assert gen == "Metformin"
    assert score >= 0.85

    # "Cap. Amoxicillin"
    gen, score = match_drug_name("Cap. Amoxicillin 625")
    assert gen == "Amoxicillin"
    assert score >= 0.85

def test_unrecognized_gibberish():
    gen, score = match_drug_name("Xyloqwerty 9999mg")
    assert gen is None
    assert score == 0.0

def test_unit_normalization():
    assert normalize_unit("mg/dl") == "mg/dL"
    assert normalize_unit("g/dl") == "g/dL"
    assert normalize_unit("mmol/l") == "mmol/L"

def test_plausible_lab_values():
    assert is_plausible_lab_value("Fasting Blood Glucose", 138.0) is True
    assert is_plausible_lab_value("Fasting Blood Glucose", -5.0) is False
    assert is_plausible_lab_value("Serum Creatinine", 1.05) is True
