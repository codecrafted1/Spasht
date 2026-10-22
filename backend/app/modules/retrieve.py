"""
RAG Retrieval Module for Samjho Knowledge Base.
Provides grounded passages and citations for medicines and laboratory investigations.
"""

import json
from pathlib import Path
from typing import List, Optional, Dict, Any
from app.schemas.document import Citation
from rapidfuzz import fuzz, process

KB_DIR = Path(__file__).resolve().parent.parent / "data" / "kb"

MEDICINES_DATA: List[Dict[str, Any]] = []
LABS_DATA: List[Dict[str, Any]] = []

def load_kb():
    global MEDICINES_DATA, LABS_DATA
    med_file = KB_DIR / "medicines.json"
    lab_file = KB_DIR / "lab_tests.json"

    if med_file.exists():
        with open(med_file, "r", encoding="utf-8") as f:
            MEDICINES_DATA = json.load(f)
    if lab_file.exists():
        with open(lab_file, "r", encoding="utf-8") as f:
            LABS_DATA = json.load(f)

load_kb()

def retrieve_medicine_citations(drug_name: str, top_k: int = 2) -> List[Citation]:
    """Retrieves relevant citations from the WHO-EML and NLEM knowledge base for a drug."""
    if not MEDICINES_DATA or not drug_name:
        return []

    clean_name = drug_name.lower().strip()
    best_entry = None
    best_score = 0.0

    for entry in MEDICINES_DATA:
        # Check generic name and aliases
        candidates = [entry["generic_name"]] + entry.get("aliases", [])
        for c in candidates:
            score = fuzz.token_set_ratio(clean_name, c.lower())
            if score > best_score:
                best_score = score
                best_entry = entry

    if best_entry and best_score >= 60.0:
        c_dict = best_entry["citation"]
        return [
            Citation(
                id=c_dict["id"],
                source_name=c_dict["source_name"],
                source_url=c_dict.get("source_url"),
                license_note=c_dict.get("license_note", "Open Public Reference"),
                excerpt=c_dict["excerpt"]
            )
        ]

    return []

def retrieve_lab_citations(test_name: str) -> List[Citation]:
    """Retrieves relevant citations from standard clinical reference tables for a lab test."""
    if not LABS_DATA or not test_name:
        return []

    clean_name = test_name.lower().strip()
    best_entry = None
    best_score = 0.0

    for entry in LABS_DATA:
        candidates = [entry["name"]] + entry.get("aliases", [])
        for c in candidates:
            score = fuzz.token_set_ratio(clean_name, c.lower())
            if score > best_score:
                best_score = score
                best_entry = entry

    if best_entry and best_score >= 60.0:
        c_dict = best_entry["citation"]
        return [
            Citation(
                id=c_dict["id"],
                source_name=c_dict["source_name"],
                source_url=c_dict.get("source_url"),
                license_note=c_dict.get("license_note", "Clinical Reference Guidelines"),
                excerpt=c_dict["excerpt"]
            )
        ]

    return []

def get_medicine_kb_entry(generic_name: str) -> Optional[Dict[str, Any]]:
    for entry in MEDICINES_DATA:
        if fuzz.token_set_ratio(generic_name.lower(), entry["generic_name"].lower()) > 80:
            return entry
    return None

def get_lab_kb_entry(test_name: str) -> Optional[Dict[str, Any]]:
    for entry in LABS_DATA:
        candidates = [entry["name"]] + entry.get("aliases", [])
        for c in candidates:
            if fuzz.token_set_ratio(test_name.lower(), c.lower()) > 80:
                return entry
    return None
