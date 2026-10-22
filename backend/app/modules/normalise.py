"""
Normalization module for drug names and lab units using RapidFuzz.
"""

import json
from pathlib import Path
from typing import Optional, Tuple, Dict, Any
from rapidfuzz import fuzz, process
from app.config import settings

# Load standard medicines list
KB_PATH = Path(__file__).resolve().parent.parent / "data" / "kb" / "medicines.json"
MEDICINES_DB = []
if KB_PATH.exists():
    with open(KB_PATH, "r", encoding="utf-8") as f:
        MEDICINES_DB = json.load(f)

# Build lookup mapping of all aliases and brand names to generic names
NAME_TO_GENERIC: Dict[str, str] = {}
for entry in MEDICINES_DB:
    gen = entry["generic_name"]
    NAME_TO_GENERIC[gen.lower()] = gen
    for alias in entry.get("aliases", []):
        NAME_TO_GENERIC[alias.lower()] = gen

CANDIDATE_KEYS = list(NAME_TO_GENERIC.keys())

def match_drug_name(raw_name: str, threshold: float = settings.DRUG_MATCH_THRESHOLD) -> Tuple[Optional[str], float]:
    """
    Matches raw drug text to standard generic name using RapidFuzz token sort ratio.
    Returns (normalized_name, confidence_ratio_0_to_1)
    """
    clean_raw = raw_name.lower().strip()
    # Strip common doctor slip prefixes
    for prefix in ["tab.", "tab ", "cap.", "cap ", "syr.", "syr ", "inj.", "inj ", "1.", "2.", "3.", "4."]:
        if clean_raw.startswith(prefix):
            clean_raw = clean_raw[len(prefix):].strip()

    if not clean_raw or not CANDIDATE_KEYS:
        return None, 0.0

    match_result = process.extractOne(
        clean_raw,
        CANDIDATE_KEYS,
        scorer=fuzz.token_set_ratio
    )

    if match_result:
        best_candidate, score, _ = match_result
        if score >= threshold:
            normalized_name = NAME_TO_GENERIC[best_candidate]
            return normalized_name, round(score / 100.0, 3)

    return None, 0.0

# Unit standardizer
UNIT_MAP = {
    "mg/dl": "mg/dL",
    "mg/100ml": "mg/dL",
    "g/dl": "g/dL",
    "gm/dl": "g/dL",
    "mmol/l": "mmol/L",
    "umol/l": "µmol/L",
    "iu/l": "IU/L",
    "u/l": "U/L",
    "miu/l": "mIU/L",
    "%": "%",
    "cells/cumm": "cells/µL",
    "10^3/mcL": "10^3/µL"
}

def normalize_unit(unit: str) -> str:
    cleaned = unit.strip().lower()
    return UNIT_MAP.get(cleaned, unit.strip())

def is_plausible_lab_value(test_name: str, value: float) -> bool:
    """Rejects extreme biologically implausible values (e.g. negative numbers or physiological impossibility)."""
    if value < 0:
        return False
    lower = test_name.lower()
    if "glucose" in lower or "sugar" in lower:
        return 10.0 <= value <= 1500.0
    if "hba1c" in lower:
        return 2.5 <= value <= 25.0
    if "creatinine" in lower:
        return 0.1 <= value <= 30.0
    if "potassium" in lower:
        return 1.0 <= value <= 12.0
    if "hemoglobin" in lower or "hb" in lower:
        return 2.0 <= value <= 28.0
    return True
