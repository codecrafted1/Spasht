"""
Synthetic Document Generator for Samjho Evaluation Harness.
Generates 25 synthetic prescription and lab test documents with matching ground-truth JSON labels.
Uses PIL to render varied layouts, headers, tables, noise, and handwriting cues.
NEVER uses real patient data.
"""

import json
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

EVAL_DIR = Path(__file__).resolve().parent.parent.parent / "eval" / "synthetic_dataset"
EVAL_DIR.mkdir(parents=True, exist_ok=True)

DOCTORS = ["Dr. R. K. Sharma, MD", "Dr. Anita Desai, MBBS DNB", "Dr. S. Mukherjee, MD Medicine", "Dr. V. Patel, MBBS"]
CLINICS = ["Seva Community Health Center", "Apex Care Polyclinic", "Janata Health Mission", "Metro Multispeciality Clinic"]

DRUGS_POOL = [
    ("Metformin 500mg", "Metformin", "1-0-1", "30 days"),
    ("Atorvastatin 10mg", "Atorvastatin", "0-0-1", "30 days"),
    ("Amoxicillin 625mg", "Amoxicillin", "1-1-1", "5 days"),
    ("Pantoprazole 40mg", "Pantoprazole", "1-0-0", "15 days"),
    ("Amlodipine 5mg", "Amlodipine", "1-0-0", "30 days"),
    ("Losartan 50mg", "Losartan", "0-1-0", "30 days"),
    ("Cetirizine 10mg", "Cetirizine", "0-0-1", "7 days"),
    ("Paracetamol 650mg", "Paracetamol (Acetaminophen)", "SOS", "3 days"),
    ("Azithromycin 500mg", "Azithromycin", "1-0-0", "3 days")
]

LABS_POOL = [
    ("Fasting Blood Glucose", 138.0, "mg/dL", 70.0, 100.0, "clearly_outside"),
    ("Glycated Hemoglobin (HbA1c)", 6.8, "%", 4.0, 5.6, "clearly_outside"),
    ("Serum Creatinine", 1.05, "mg/dL", 0.70, 1.20, "within"),
    ("Serum Potassium", 5.15, "mmol/L", 3.5, 5.0, "slightly_outside"),
    ("Hemoglobin (Hb)", 13.8, "g/dL", 12.0, 15.5, "within"),
    ("Total Cholesterol", 215.0, "mg/dL", 125.0, 200.0, "slightly_outside"),
    ("Serum Triglycerides", 140.0, "mg/dL", 50.0, 150.0, "within"),
    ("Thyroid Stimulating Hormone (TSH)", 2.4, "mIU/L", 0.45, 4.5, "within")
]

def generate_synthetic_documents(count: int = 25):
    manifest = []

    for i in range(1, count + 1):
        doc_id = f"SYN_DOC_{i:03d}"
        is_prescription = (i % 2 != 0)
        doc_type = "prescription" if is_prescription else "lab_report"
        
        # Create image
        img = Image.new("RGB", (800, 1050), color=(245 + random.randint(0, 8), 242 + random.randint(0, 8), 235))
        draw = ImageDraw.Draw(img)

        # Draw border
        draw.rectangle([20, 20, 780, 1030], outline=(200, 190, 175), width=2)

        ground_truth = {
            "doc_id": doc_id,
            "type": doc_type,
            "items": []
        }

        if is_prescription:
            # Render prescription header
            clinic = random.choice(CLINICS)
            doctor = random.choice(DOCTORS)
            draw.text((40, 50), clinic.upper(), fill=(25, 25, 25))
            draw.text((40, 75), f"Consultant: {doctor} • Reg: MCI-{random.randint(10000, 99999)}", fill=(80, 80, 80))
            draw.line([(40, 105), (760, 105)], fill=(200, 190, 175), width=1)
            draw.text((40, 120), f"Patient ID: SYN-PAT-{random.randint(100, 999)} | Age: {random.randint(25, 75)} Y", fill=(50, 50, 50))
            draw.text((40, 155), "Rx:", fill=(180, 40, 30))

            # Sample 2-4 medicines
            num_meds = random.randint(2, 4)
            chosen_meds = random.sample(DRUGS_POOL, num_meds)
            y_offset = 200

            for idx, (drug_text, gen_name, freq, dur) in enumerate(chosen_meds):
                draw.text((60, y_offset), f"{idx+1}. {drug_text}", fill=(20, 20, 20))
                draw.text((60, y_offset + 25), f"   Sig: {freq} x {dur}", fill=(90, 90, 90))
                ground_truth["items"].append({
                    "raw_text": drug_text,
                    "normalized_name": gen_name,
                    "frequency": freq,
                    "duration": dur
                })
                y_offset += 75

        else:
            # Render lab report header
            draw.text((40, 50), "APEX DIAGNOSTIC CLINICAL LABORATORIES", fill=(25, 25, 25))
            draw.text((40, 75), "NABL Accredited • ISO 15189 Reference Center", fill=(80, 80, 80))
            draw.line([(40, 105), (760, 105)], fill=(200, 190, 175), width=1)
            draw.text((40, 120), f"Sample: SYN-LAB-{random.randint(100, 999)} | Status: Final Validated", fill=(50, 50, 50))

            # Render Table Header
            draw.rectangle([40, 160, 760, 190], fill=(230, 225, 215))
            draw.text((50, 170), "TEST NAME", fill=(30, 30, 30))
            draw.text((380, 170), "RESULT", fill=(30, 30, 30))
            draw.text((480, 170), "UNIT", fill=(30, 30, 30))
            draw.text((580, 170), "REF INTERVAL", fill=(30, 30, 30))

            num_labs = random.randint(3, 5)
            chosen_labs = random.sample(LABS_POOL, num_labs)
            y_offset = 210

            for test_name, val, unit, low, high, expected_status in chosen_labs:
                draw.text((50, y_offset), test_name, fill=(20, 20, 20))
                draw.text((380, y_offset), str(val), fill=(20, 20, 20))
                draw.text((480, y_offset), unit, fill=(80, 80, 80))
                draw.text((580, y_offset), f"{low} - {high}", fill=(80, 80, 80))

                ground_truth["items"].append({
                    "test_name": test_name,
                    "value": val,
                    "unit": unit,
                    "low": low,
                    "high": high,
                    "expected_status": expected_status
                })
                y_offset += 45

        # Footer
        draw.line([(40, 950), (760, 950)], fill=(200, 190, 175), width=1)
        draw.text((40, 970), "SYNTHETIC SAMPLE EVALUATION CASE • NO REAL PATIENT DATA", fill=(140, 140, 140))

        # Add mild blur / noise simulation
        img = img.filter(ImageFilter.GaussianBlur(radius=0.4))

        img_path = EVAL_DIR / f"{doc_id}.png"
        json_path = EVAL_DIR / f"{doc_id}.json"
        img.save(img_path)

        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(ground_truth, f, indent=2)

        manifest.append({"doc_id": doc_id, "type": doc_type, "image": str(img_path), "label": str(json_path)})

    manifest_path = EVAL_DIR / "manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"[OK] Programmatically generated {count} synthetic test documents in {EVAL_DIR}")
    return manifest

if __name__ == "__main__":
    generate_synthetic_documents(25)
