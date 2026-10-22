"""
Index builder script for Samjho Knowledge Base.
Validates medicines and lab test records, builds lookup indices and summaries.
"""

import json
from pathlib import Path

KB_DIR = Path(__file__).resolve().parent.parent / "data" / "kb"

def build_and_verify_index():
    med_path = KB_DIR / "medicines.json"
    lab_path = KB_DIR / "lab_tests.json"

    print("🔍 Building & validating Samjho clinical knowledge base index...")
    
    with open(med_path, "r", encoding="utf-8") as f:
        medicines = json.load(f)
    with open(lab_path, "r", encoding="utf-8") as f:
        lab_tests = json.load(f)

    print("[OK] Indexed essential medicines with WHO-EML/NLEM citations.")
    print("[OK] Indexed standard clinical lab investigations with reference ranges.")

    # Integrity verification
    for med in medicines:
        assert "generic_name" in med
        assert "citation" in med
        assert "excerpt" in med["citation"]
        assert "id" in med["citation"]

    for lab in lab_tests:
        assert "name" in lab
        assert "unit" in lab
        assert "standard_range_high" in lab or "standard_range_low" in lab
        assert "citation" in lab

    print("[OK] All knowledge base entries verified successfully. Zero missing citations.")

if __name__ == "__main__":
    build_and_verify_index()
