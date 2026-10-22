import type { SampleDocument } from "../types/document";

export const SAMPLE_PRESCRIPTION: SampleDocument = {
  id: "sample-rx-01",
  title: "General Medicine Outpatient Slip",
  type: "prescription",
  description: "Synthetic outpatient prescription with oral anti-diabetic and cardiovascular maintenance items.",
  fileName: "synthetic_rx_clinic_alpha.png",
  previewSvg: `<svg viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg" class="w-full h-full bg-[#FAF7F0] text-[#1B1A17] font-mono text-[9px] p-4 select-none">
    <rect width="400" height="520" fill="#FAF7F0" rx="4" stroke="#D9D1BF" stroke-width="1.5"/>
    <!-- Clinic Header -->
    <text x="20" y="32" font-family="'Fraunces', serif" font-size="14" font-weight="bold" fill="#1B1A17">SEVA COMMUNITY HEALTH CLINIC</text>
    <text x="20" y="46" font-size="8" fill="#555">Reg. No: SYN-MED-2026/04 • 12, Ward No. 4, Civil Lines</text>
    <line x1="20" y1="56" x2="380" y2="56" stroke="#D9D1BF" stroke-width="1"/>
    
    <!-- Patient Info (Synthetic) -->
    <text x="20" y="74" fill="#333">Patient: [Patient ID: SYN-8821]</text>
    <text x="240" y="74" fill="#333">Age/Sex: 54 Y / F</text>
    <text x="20" y="88" fill="#333">Date: 14-Oct-2026</text>
    <text x="240" y="88" fill="#333">OPD Ref: 104-B</text>
    <line x1="20" y1="98" x2="380" y2="98" stroke="#D9D1BF" stroke-dasharray="3 3"/>

    <!-- Rx Symbol -->
    <text x="20" y="128" font-family="'Fraunces', serif" font-size="24" font-weight="bold" fill="#C8432B">℞</text>
    
    <!-- Medicine 1: Metformin -->
    <g id="rx-box-1">
      <rect x="20" y="140" width="360" height="52" fill="#C8432B" fill-opacity="0.06" stroke="#C8432B" stroke-dasharray="2 2" rx="2"/>
      <text x="30" y="158" font-size="11" font-weight="bold">1. Tab. Metformin 500mg</text>
      <text x="30" y="174" fill="#444">Sig: 1 tab twice daily after meals (1-0-1) × 30 days</text>
      <text x="30" y="186" fill="#666" font-style="italic">Take with food as advised</text>
    </g>

    <!-- Medicine 2: Atorvastatin -->
    <g id="rx-box-2">
      <rect x="20" y="202" width="360" height="52" fill="#5E7A5A" fill-opacity="0.06" stroke="#5E7A5A" stroke-dasharray="2 2" rx="2"/>
      <text x="30" y="220" font-size="11" font-weight="bold">2. Tab. Atorvastatin 10mg</text>
      <text x="30" y="236" fill="#444">Sig: 1 tab at bedtime (0-0-1) × 30 days</text>
      <text x="30" y="248" fill="#666" font-style="italic">Once at night</text>
    </g>

    <!-- Medicine 3: Amoxicillin -->
    <g id="rx-box-3">
      <rect x="20" y="264" width="360" height="52" fill="#C99A2E" fill-opacity="0.06" stroke="#C99A2E" stroke-dasharray="2 2" rx="2"/>
      <text x="30" y="282" font-size="11" font-weight="bold">3. Cap. Amoxicillin 625mg</text>
      <text x="30" y="298" fill="#444">Sig: 1 cap every 8 hours with water × 5 days</text>
      <text x="30" y="310" fill="#666" font-style="italic">Complete full 5-day course</text>
    </g>

    <!-- Medicine 4: Handwritten / Faded note (Low confidence test) -->
    <g id="rx-box-4">
      <rect x="20" y="326" width="360" height="52" fill="#C8432B" fill-opacity="0.12" stroke="#C8432B" rx="2"/>
      <text x="30" y="344" font-size="10" font-weight="bold" fill="#882211">4. [Illegible handwritten cursive] ~Azithro... 250?</text>
      <text x="30" y="360" fill="#882211">Sig: 1 cap OD? [Low OCR confidence - 41%]</text>
      <text x="30" y="372" fill="#C8432B" font-size="8" font-weight="bold">⚠️ Needs verification before explaining</text>
    </g>

    <!-- Doctor Signature Stamp -->
    <line x1="20" y1="420" x2="380" y2="420" stroke="#D9D1BF"/>
    <text x="240" y="445" font-family="'Fraunces', serif" font-size="10" font-weight="bold">Dr. R. K. Sharma, MD</text>
    <text x="240" y="458" font-size="8" fill="#666">Registration: MCI-98442-A</text>
    <rect x="236" y="466" width="130" height="26" fill="none" stroke="#5E7A5A" stroke-width="1" rx="2"/>
    <text x="246" y="482" font-size="7" fill="#5E7A5A" font-weight="bold">VERIFIED CLINIC COPY</text>
    
    <text x="20" y="505" font-size="7" fill="#888">SYNTHETIC DOCUMENT FOR HACKATHON DEMO ONLY • NOT A REAL PRESCRIPTION</text>
  </svg>`,
  data: {
    document_type: "prescription",
    language: "en",
    raw_text: "SEVA COMMUNITY HEALTH CLINIC\nPatient: SYN-8821 Age/Sex: 54 Y / F\n1. Tab. Metformin 500mg 1-0-1 x 30 days\n2. Tab. Atorvastatin 10mg 0-0-1 x 30 days\n3. Cap. Amoxicillin 625mg 1-1-1 x 5 days\n4. [Illegible] Azithro 250?",
    timings_ms: {
      ocr: 142,
      extraction: 210,
      rules: 12,
      retrieval: 78,
      explanation: 195,
      translation: 84,
      total: 721
    },
    items: [
      {
        id: "item-rx-01",
        prescription_fields: {
          drug_name: "Tab. Metformin 500mg",
          normalized_drug_name: "Metformin Hydrochloride",
          strength: "500 mg",
          form: "Tablet",
          frequency: "Twice daily after meals (1-0-1)",
          duration: "30 days",
          instructions_text: "Take with food as advised",
          general_usage: "Commonly prescribed to help manage blood sugar levels by improving how the body responds to insulin."
        },
        status: "not_applicable",
        confidence_score: 0.96,
        confidence: "high",
        needs_verification: false,
        explanation: "Metformin is a standard medicine used to help maintain balanced blood sugar levels [1]. It works primarily by decreasing sugar production in the liver and improving body tissue sensitivity to insulin [2]. It is usually taken alongside meals to minimize mild stomach discomfort [1].",
        explanation_hi: "मेटफॉर्मिन एक सामान्य दवा है जिसका उपयोग रक्त शर्करा (ब्लड शुगर) के स्तर को संतुलित रखने में मदद के लिए किया जाता है [1]। यह शरीर में इंसुलिन के प्रति संवेदनशीलता को बेहतर बनाता है [2]। पेट की परेशानी से बचने के लिए इसे भोजन के साथ लेने की सलाह दी जाती है [1]।",
        citations: [
          {
            id: "WHO-EML-MET-01",
            source_name: "WHO Model List of Essential Medicines (23rd List, 2023)",
            source_url: "https://www.who.int/publications/i/item/WHO-MHP-HPS-EML-2023.02",
            license_note: "Open Access WHO Guidelines",
            excerpt: "Metformin: Section 18.5 Medicines for diabetes. Core medicine for blood glucose management."
          },
          {
            id: "NLEM-IND-MET-02",
            source_name: "National List of Essential Medicines (NLEM) India",
            source_url: "https://cdsco.gov.in",
            license_note: "Govt. of India Public Healthcare Reference",
            excerpt: "Metformin tablets 500 mg: Indicated for glycemic management under qualified clinical guidance."
          }
        ],
        bboxes: [
          {
            id: "bbox-rx-1",
            page: 1,
            x: 0.05,
            y: 0.27,
            width: 0.9,
            height: 0.1,
            label: "Metformin 500mg"
          }
        ]
      },
      {
        id: "item-rx-02",
        prescription_fields: {
          drug_name: "Tab. Atorvastatin 10mg",
          normalized_drug_name: "Atorvastatin Calcium",
          strength: "10 mg",
          form: "Tablet",
          frequency: "Once daily at bedtime (0-0-1)",
          duration: "30 days",
          instructions_text: "Once at night",
          general_usage: "Commonly prescribed to help manage blood cholesterol levels and support cardiovascular wellness."
        },
        status: "not_applicable",
        confidence_score: 0.94,
        confidence: "high",
        needs_verification: false,
        explanation: "Atorvastatin belongs to a class of medicines that helps regulate cholesterol produced in the liver [1]. It helps lower low-density cholesterol ('LDL') to promote overall arterial health [2]. Doctors commonly recommend taking it in the evening [1].",
        explanation_hi: "एटोरवास्टेटिन एक ऐसी दवा है जो लिवर में बनने वाले कोलेस्ट्रॉल को नियंत्रित करने में मदद करती है [1]। यह हानिकारक कोलेस्ट्रॉल (एलडीएल) को संतुलित करने में सहायक है [2]। डॉक्टर अक्सर इसे शाम या रात को लेने की सलाह देते हैं [1]।",
        citations: [
          {
            id: "WHO-EML-ATO-01",
            source_name: "WHO Model List of Essential Medicines",
            source_url: "https://www.who.int/medicines/publications/essentialmedicines",
            license_note: "Open Access WHO Guidelines",
            excerpt: "Atorvastatin: Lipid-lowering agent. Indicated for individuals at elevated risk of cardiovascular events."
          },
          {
            id: "NLEM-IND-ATO-02",
            source_name: "National List of Essential Medicines India",
            source_url: "https://cdsco.gov.in",
            license_note: "Public Medical Reference",
            excerpt: "Atorvastatin tablets 10 mg / 20 mg: Primary lipid management agent in essential health packages."
          }
        ],
        bboxes: [
          {
            id: "bbox-rx-2",
            page: 1,
            x: 0.05,
            y: 0.39,
            width: 0.9,
            height: 0.1,
            label: "Atorvastatin 10mg"
          }
        ]
      },
      {
        id: "item-rx-03",
        prescription_fields: {
          drug_name: "Cap. Amoxicillin 625mg",
          normalized_drug_name: "Amoxicillin and Clavulanic Acid",
          strength: "625 mg (500mg/125mg)",
          form: "Capsule/Tablet",
          frequency: "Every 8 hours with water (1-1-1)",
          duration: "5 days",
          instructions_text: "Complete full 5-day course",
          general_usage: "An antibacterial medicine prescribed to treat specific bacterial infections as determined by a clinician."
        },
        status: "not_applicable",
        confidence_score: 0.88,
        confidence: "medium",
        needs_verification: false,
        explanation: "Amoxicillin is an antibiotic used to address susceptible bacterial infections [1]. Completing the entire course as written by your clinician is vital to ensure the infection resolves fully and to prevent bacteria from becoming resistant [2].",
        explanation_hi: "एमोक्सिसिलिन एक एंटीबायोटिक दवा है जिसका उपयोग जीवाणु (बैक्टीरियल) संक्रमण के इलाज के लिए किया जाता है [1]। संक्रमण को पूरी तरह ठीक करने और प्रतिरोध को रोकने के लिए डॉक्टर द्वारा बताए अनुसार पूरा 5-दिवसीय कोर्स समाप्त करना आवश्यक है [2]।",
        citations: [
          {
            id: "WHO-EML-AMX-01",
            source_name: "WHO Model List of Essential Medicines (Access Group)",
            source_url: "https://www.who.int/publications/i/item/WHO-MHP-HPS-EML-2023.02",
            license_note: "WHO AWaRe Antibiotic Categorisation",
            excerpt: "Amoxicillin + Clavulanic acid: Access group antibiotic for respiratory and skin-soft tissue bacterial infections."
          }
        ],
        bboxes: [
          {
            id: "bbox-rx-3",
            page: 1,
            x: 0.05,
            y: 0.51,
            width: 0.9,
            height: 0.1,
            label: "Amoxicillin 625mg"
          }
        ]
      },
      {
        id: "item-rx-04",
        prescription_fields: {
          drug_name: "[Uncertain handwriting] Azithro... 250?",
          normalized_drug_name: "Unverified - Azithromycin suspected",
          strength: "250 mg?",
          form: "Capsule",
          frequency: "1 OD?",
          duration: "Unclear",
          instructions_text: "Low OCR text confidence (41%)",
          general_usage: "Pending patient or pharmacist confirmation"
        },
        status: "not_applicable",
        confidence_score: 0.41,
        confidence: "low",
        needs_verification: true,
        explanation: "The handwriting on line 4 was not recognized with sufficient certainty. To protect your safety, we do not explain medicines until you or your pharmacist verifies the exact name and dosage written by the doctor.",
        explanation_hi: "पंक्ति 4 पर लिखी लिखावट को पर्याप्त स्पष्टता के साथ नहीं पढ़ा जा सका। आपकी सुरक्षा के लिए, जब तक आप या आपके फार्मासिस्ट सटीक नाम की पुष्टि नहीं करते, इस दवा का विवरण नहीं दिखाया जा रहा है।",
        citations: [],
        bboxes: [
          {
            id: "bbox-rx-4",
            page: 1,
            x: 0.05,
            y: 0.63,
            width: 0.9,
            height: 0.1,
            label: "Unclear text (needs verification)"
          }
        ]
      }
    ],
    questions_for_doctor: [
      "Should I take Metformin before, during, or immediately following meals?",
      "For how many days should I continue Atorvastatin before my next lipid check-up?",
      "Can the doctor or pharmacist clarify the handwriting on prescription item #4?"
    ],
    questions_for_doctor_hi: [
      "क्या मुझे मेटफॉर्मिन भोजन से पहले, भोजन के दौरान या भोजन के तुरंत बाद लेना चाहिए?",
      "अगली कोलेस्ट्रॉल जांच से पहले मुझे कितने दिनों तक एटोरवास्टेटिन जारी रखना चाहिए?",
      "क्या डॉक्टर या फार्मासिस्ट पर्चे की चौथी दवा के नाम को स्पष्ट कर सकते हैं?"
    ],
    disclaimer: "Information only. Not a diagnosis or prescription. Do not alter medicines or doses without consulting your doctor or pharmacist.",
    warnings: [
      "Item 4 has low text readability (41% confidence). Please verify with your pharmacist before taking."
    ]
  }
};

export const SAMPLE_LAB_REPORT: SampleDocument = {
  id: "sample-lab-01",
  title: "Comprehensive Metabolic & Glycemic Panel",
  type: "lab_report",
  description: "Synthetic laboratory test report including glucose, HbA1c, kidney markers, and electrolyte values.",
  fileName: "synthetic_lab_metabolic_panel.png",
  previewSvg: `<svg viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg" class="w-full h-full bg-[#FAF7F0] text-[#1B1A17] font-mono text-[9px] p-4 select-none">
    <rect width="400" height="520" fill="#FAF7F0" rx="4" stroke="#D9D1BF" stroke-width="1.5"/>
    <!-- Lab Header -->
    <text x="20" y="32" font-family="'Fraunces', serif" font-size="13" font-weight="bold" fill="#1B1A17">APEX DIAGNOSTIC SERVICES</text>
    <text x="20" y="46" font-size="8" fill="#555">NABL Accredited • Synthetic Clinical Reference Lab • Lic: LAB-2026-SYN</text>
    <line x1="20" y1="56" x2="380" y2="56" stroke="#D9D1BF" stroke-width="1"/>

    <!-- Patient Metadata -->
    <text x="20" y="74" fill="#333">Sample ID: SYN-LAB-992</text>
    <text x="220" y="74" fill="#333">Collection Date: 15-Oct-2026</text>
    <text x="20" y="88" fill="#333">Patient: Anonymous (Synthetic)</text>
    <text x="220" y="88" fill="#333">Ref. Clinician: Dr. R. K. Sharma</text>
    <line x1="20" y1="98" x2="380" y2="98" stroke="#D9D1BF"/>

    <!-- Table Header -->
    <rect x="20" y="105" width="360" height="18" fill="#EAE3D2"/>
    <text x="25" y="117" font-weight="bold" fill="#1B1A17">INVESTIGATION</text>
    <text x="175" y="117" font-weight="bold" fill="#1B1A17">RESULT</text>
    <text x="245" y="117" font-weight="bold" fill="#1B1A17">UNIT</text>
    <text x="300" y="117" font-weight="bold" fill="#1B1A17">REF. INTERVAL</text>

    <!-- Test 1: Fasting Blood Glucose (Clearly Outside - High) -->
    <g id="lab-box-1">
      <rect x="20" y="130" width="360" height="38" fill="#C8432B" fill-opacity="0.08" stroke="#C8432B" stroke-dasharray="2 2" rx="2"/>
      <text x="25" y="146" font-weight="bold">Fasting Blood Glucose</text>
      <text x="175" y="146" font-weight="bold" fill="#C8432B">138.0 *</text>
      <text x="245" y="146">mg/dL</text>
      <text x="300" y="146">70.0 - 100.0</text>
      <text x="25" y="160" font-size="7.5" fill="#882211">▲ Above standard reference range</text>
    </g>

    <!-- Test 2: HbA1c (Clearly Outside - High) -->
    <g id="lab-box-2">
      <rect x="20" y="174" width="360" height="38" fill="#C8432B" fill-opacity="0.08" stroke="#C8432B" stroke-dasharray="2 2" rx="2"/>
      <text x="25" y="190" font-weight="bold">Glycated Hemoglobin (HbA1c)</text>
      <text x="175" y="190" font-weight="bold" fill="#C8432B">6.8 *</text>
      <text x="245" y="190">%</text>
      <text x="300" y="190">4.0 - 5.6</text>
      <text x="25" y="204" font-size="7.5" fill="#882211">▲ Above standard reference range</text>
    </g>

    <!-- Test 3: Serum Creatinine (Within Normal) -->
    <g id="lab-box-3">
      <rect x="20" y="218" width="360" height="38" fill="#5E7A5A" fill-opacity="0.08" stroke="#5E7A5A" stroke-dasharray="2 2" rx="2"/>
      <text x="25" y="234" font-weight="bold">Serum Creatinine</text>
      <text x="175" y="234" font-weight="bold" fill="#5E7A5A">1.05</text>
      <text x="245" y="234">mg/dL</text>
      <text x="300" y="234">0.70 - 1.20</text>
      <text x="25" y="248" font-size="7.5" fill="#3D5C39">✔ Within usual reference range</text>
    </g>

    <!-- Test 4: Serum Potassium (Slightly Outside / Borderline High) -->
    <g id="lab-box-4">
      <rect x="20" y="262" width="360" height="38" fill="#C99A2E" fill-opacity="0.08" stroke="#C99A2E" stroke-dasharray="2 2" rx="2"/>
      <text x="25" y="278" font-weight="bold">Serum Potassium</text>
      <text x="175" y="278" font-weight="bold" fill="#C99A2E">5.15 !</text>
      <text x="245" y="278">mmol/L</text>
      <text x="300" y="278">3.5 - 5.0</text>
      <text x="25" y="292" font-size="7.5" fill="#8A6615">! Slightly above range (+3% above 5.0)</text>
    </g>

    <!-- Test 5: Hemoglobin (Within Normal) -->
    <g id="lab-box-5">
      <rect x="20" y="306" width="360" height="38" fill="#5E7A5A" fill-opacity="0.08" stroke="#5E7A5A" stroke-dasharray="2 2" rx="2"/>
      <text x="25" y="322" font-weight="bold">Hemoglobin (Hb)</text>
      <text x="175" y="322" font-weight="bold" fill="#5E7A5A">13.8</text>
      <text x="245" y="322">g/dL</text>
      <text x="300" y="322">12.0 - 15.5</text>
      <text x="25" y="336" font-size="7.5" fill="#3D5C39">✔ Within usual reference range</text>
    </g>

    <!-- Footer Notes -->
    <line x1="20" y1="365" x2="380" y2="365" stroke="#D9D1BF"/>
    <text x="20" y="385" font-size="7.5" fill="#555">Methodology: Hexokinase (Glucose), HPLC (HbA1c), Jaffe Rate Blanked (Creatinine), ISE (Potassium).</text>
    <text x="20" y="400" font-size="7.5" fill="#555">End of Report • Verified electronically by Dr. S. Patel, Biochemist</text>
    <text x="20" y="505" font-size="7" fill="#888">SYNTHETIC DOCUMENT FOR HACKATHON DEMO ONLY • NOT A REAL LAB REPORT</text>
  </svg>`,
  data: {
    document_type: "lab_report",
    language: "en",
    raw_text: "APEX DIAGNOSTIC SERVICES\nFasting Blood Glucose: 138.0 mg/dL (Ref: 70-100)\nHbA1c: 6.8 % (Ref: 4.0-5.6)\nSerum Creatinine: 1.05 mg/dL (Ref: 0.70-1.20)\nSerum Potassium: 5.15 mmol/L (Ref: 3.5-5.0)\nHemoglobin: 13.8 g/dL (Ref: 12.0-15.5)",
    timings_ms: {
      ocr: 128,
      extraction: 190,
      rules: 8,
      retrieval: 64,
      explanation: 182,
      translation: 76,
      total: 648
    },
    items: [
      {
        id: "item-lab-01",
        lab_fields: {
          test_name: "Fasting Blood Glucose",
          value: 138.0,
          unit: "mg/dL",
          reference_range_low: 70.0,
          reference_range_high: 100.0,
          range_source: "printed",
          direction: "high"
        },
        status: "clearly_outside",
        confidence_score: 0.98,
        confidence: "high",
        needs_verification: false,
        explanation: "The recorded fasting glucose value (138.0 mg/dL) is above the printed typical fasting reference interval of 70 to 100 mg/dL [1]. Glucose represents the amount of sugar present in the blood after an overnight fast [1]. Numbers above the expected bracket are routinely shared with a clinician to discuss dietary lifestyle and potential next steps [2].",
        explanation_hi: "दर्ज किया गया फास्टिंग ग्लूकोज स्तर (138.0 mg/dL) रिपोर्ट पर छपी सामान्य संदर्भ सीमा (70 से 100 mg/dL) से अधिक है [1]। ग्लूकोज रात भर उपवास के बाद रक्त में शर्करा की मात्रा को दर्शाता है [1]। सामान्य सीमा से बाहर के परिणामों पर आहार और आगे की देखभाल के लिए डॉक्टर से चर्चा करने की सलाह दी जाती है [2]।",
        citations: [
          {
            id: "REF-ADA-GLU-01",
            source_name: "American Diabetes Association Clinical Guidelines & Standard Ranges",
            source_url: "https://diabetesjournals.org/care",
            license_note: "Clinical Reference Standard",
            excerpt: "Fasting plasma glucose normal reference interval: 70-99 mg/dL. Values >= 100 mg/dL warrant clinical review."
          },
          {
            id: "WHO-NCD-GLU-02",
            source_name: "World Health Organization Guidelines on Glycemic Markers",
            source_url: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
            license_note: "Open Public Health Data",
            excerpt: "Fasting blood sugar measures circulating glucose. Levels above standard intervals indicate the need for clinical consultation."
          }
        ],
        bboxes: [
          {
            id: "bbox-lab-1",
            page: 1,
            x: 0.05,
            y: 0.25,
            width: 0.9,
            height: 0.08,
            label: "Fasting Blood Glucose 138.0"
          }
        ]
      },
      {
        id: "item-lab-02",
        lab_fields: {
          test_name: "Glycated Hemoglobin (HbA1c)",
          value: 6.8,
          unit: "%",
          reference_range_low: 4.0,
          reference_range_high: 5.6,
          range_source: "printed",
          direction: "high"
        },
        status: "clearly_outside",
        confidence_score: 0.97,
        confidence: "high",
        needs_verification: false,
        explanation: "The measured HbA1c value (6.8%) is higher than the printed reference interval (4.0% to 5.6%) [1]. HbA1c reflects the average proportion of red blood cells carrying glucose over the preceding 2 to 3 months [1]. A reading outside the usual bracket is routinely reviewed with your physician [2].",
        explanation_hi: "मापा गया HbA1c मान (6.8%) छपी हुई सामान्य संदर्भ सीमा (4.0% से 5.6%) से अधिक है [1]। HbA1c पिछले 2 से 3 महीनों में रक्त में ग्लूकोज के औसत स्तर को दर्शाता है [1]। इस परिणाम पर आगे के मार्गदर्शन के लिए अपने चिकित्सक से परामर्श लें [2]।",
        citations: [
          {
            id: "REF-CDC-A1C-01",
            source_name: "Centers for Disease Control & Prevention (CDC) - HbA1c Testing",
            source_url: "https://www.cdc.gov/diabetes/managing/managing-blood-sugar/a1c.html",
            license_note: "Public Domain U.S. Health Guidance",
            excerpt: "HbA1c normal range is typically below 5.7%. Higher values reflect higher average 3-month blood glucose levels."
          }
        ],
        bboxes: [
          {
            id: "bbox-lab-2",
            page: 1,
            x: 0.05,
            y: 0.33,
            width: 0.9,
            height: 0.08,
            label: "HbA1c 6.8%"
          }
        ]
      },
      {
        id: "item-lab-03",
        lab_fields: {
          test_name: "Serum Creatinine",
          value: 1.05,
          unit: "mg/dL",
          reference_range_low: 0.70,
          reference_range_high: 1.20,
          range_source: "printed",
          direction: "normal"
        },
        status: "within",
        confidence_score: 0.96,
        confidence: "high",
        needs_verification: false,
        explanation: "Serum creatinine (1.05 mg/dL) is within the usual printed laboratory reference interval of 0.70 to 1.20 mg/dL [1]. Creatinine is a natural byproduct of normal muscle activity cleared by the kidneys [1]. Values in this band are generally considered typical [2].",
        explanation_hi: "सीरम क्रिएटिनिन (1.05 mg/dL) प्रयोगशाला की सामान्य सीमा (0.70 से 1.20 mg/dL) के भीतर है [1]। क्रिएटिनिन मांसपेशियों की सामान्य गतिविधि का एक स्वाभाविक उत्पाद है जिसे गुर्दे शरीर से बाहर निकालते हैं [1]। इस सीमा के परिणाम सामान्य माने जाते हैं [2]।",
        citations: [
          {
            id: "REF-NKF-CRE-01",
            source_name: "National Kidney Foundation Clinical Reference",
            source_url: "https://www.kidney.org/atoz/content/gfr",
            license_note: "Clinical Reference Guidelines",
            excerpt: "Serum creatinine standard reference intervals generally fall between 0.7 to 1.3 mg/dL depending on laboratory calibration."
          }
        ],
        bboxes: [
          {
            id: "bbox-lab-3",
            page: 1,
            x: 0.05,
            y: 0.42,
            width: 0.9,
            height: 0.08,
            label: "Serum Creatinine 1.05"
          }
        ]
      },
      {
        id: "item-lab-04",
        lab_fields: {
          test_name: "Serum Potassium",
          value: 5.15,
          unit: "mmol/L",
          reference_range_low: 3.5,
          reference_range_high: 5.0,
          range_source: "printed",
          direction: "high"
        },
        status: "slightly_outside",
        confidence_score: 0.94,
        confidence: "high",
        needs_verification: false,
        explanation: "Potassium (5.15 mmol/L) is slightly outside the printed reference bracket (3.5 to 5.0 mmol/L), falling roughly 3% above the upper line [1]. Potassium is an electrolyte vital for cell function and muscle activity [1]. Minor variances can stem from hydration or sample handling, so discuss this reading with your clinician [2].",
        explanation_hi: "पोटेशियम (5.15 mmol/L) सामान्य सीमा (3.5 से 5.0 mmol/L) से थोड़ा सा ऊपर है (लगभग 3% अधिक) [1]। पोटेशियम शरीर के लिए एक आवश्यक इलेक्ट्रोलाइट है [1]। मामूली अंतर खान-पान या पानी की मात्रा से भी हो सकता है, इसलिए अपने डॉक्टर से चर्चा करें [2]।",
        citations: [
          {
            id: "REF-NIH-POT-01",
            source_name: "National Institutes of Health (NIH) Clinical Reference",
            source_url: "https://medlineplus.gov/ency/article/003484.htm",
            license_note: "U.S. National Library of Medicine",
            excerpt: "Standard potassium reference range in adults is typically 3.5 to 5.0 mmol/L. Mild elevations require clinical correlation."
          }
        ],
        bboxes: [
          {
            id: "bbox-lab-4",
            page: 1,
            x: 0.05,
            y: 0.50,
            width: 0.9,
            height: 0.08,
            label: "Serum Potassium 5.15"
          }
        ]
      },
      {
        id: "item-lab-05",
        lab_fields: {
          test_name: "Hemoglobin (Hb)",
          value: 13.8,
          unit: "g/dL",
          reference_range_low: 12.0,
          reference_range_high: 15.5,
          range_source: "printed",
          direction: "normal"
        },
        status: "within",
        confidence_score: 0.97,
        confidence: "high",
        needs_verification: false,
        explanation: "Hemoglobin (13.8 g/dL) is within the laboratory's printed reference range of 12.0 to 15.5 g/dL [1]. Hemoglobin is the protein in red blood cells that transports oxygen throughout the body [1]. This reading is within the expected bracket [2].",
        explanation_hi: "हीमोग्लोबिन (13.8 g/dL) प्रयोगशाला की सामान्य संदर्भ सीमा (12.0 से 15.5 g/dL) के भीतर है [1]। हीमोग्लोबिन लाल रक्त कोशिकाओं में पाया जाने वाला प्रोटीन है जो शरीर में ऑक्सीजन पहुंचाता है [1]। यह परिणाम सामान्य दायरे में है [2]।",
        citations: [
          {
            id: "REF-WHO-HGB-01",
            source_name: "WHO Haemoglobin Concentrations Guide",
            source_url: "https://www.who.int/publications/i/item/WHO-NMH-NHD-MNM-11.1",
            license_note: "Open Public Health Guidelines",
            excerpt: "Standard normal haemoglobin thresholds for adults typically span 12.0 to 16.0 g/dL."
          }
        ],
        bboxes: [
          {
            id: "bbox-lab-5",
            page: 1,
            x: 0.05,
            y: 0.59,
            width: 0.9,
            height: 0.08,
            label: "Hemoglobin 13.8"
          }
        ]
      }
    ],
    questions_for_doctor: [
      "Given my fasting blood sugar of 138 mg/dL and HbA1c of 6.8%, what lifestyle or follow-up tests do you advise?",
      "Does the slightly elevated potassium level (5.15 mmol/L) warrant a repeat check?",
      "Should I adhere to any specific fasting or dietary guidelines prior to my next blood draw?"
    ],
    questions_for_doctor_hi: [
      "मेरे 138 mg/dL फास्टिंग ब्लड शुगर और 6.8% HbA1c को देखते हुए, आप किस जीवनशैली या फॉलो-अप जांच की सलाह देते हैं?",
      "क्या थोड़े बढ़े हुए पोटेशियम (5.15 mmol/L) की दोबारा जांच कराने की आवश्यकता है?",
      "अगले टेस्ट से पहले क्या मुझे किसी विशेष उपवास या आहार नियमों का पालन करना चाहिए?"
    ],
    disclaimer: "Information only. Not a diagnosis. Talk to your doctor or pharmacist to interpret these lab numbers in light of your full medical history.",
    warnings: [
      "Fasting glucose and HbA1c are above standard intervals. Please schedule a clinical consultation."
    ]
  }
};
