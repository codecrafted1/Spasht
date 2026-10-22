import { SAMPLE_PRESCRIPTION, SAMPLE_LAB_REPORT } from "../services/mockData";
import { APP_CONFIG } from "../config/appConfig";

export function runSafetyScan(): { passed: boolean; violations: string[] } {
  const banned = APP_CONFIG.bannedDiagnosticPhrases.map(p => p.toLowerCase());
  const violations: string[] = [];

  const inspectText = (text: string, context: string) => {
    const lower = text.toLowerCase();
    for (const phrase of banned) {
      if (lower.includes(phrase)) {
        violations.push(`Violation found in [${context}]: contains banned phrase "${phrase}"`);
      }
    }
  };

  const inspectDoc = (doc: typeof SAMPLE_PRESCRIPTION) => {
    inspectText(doc.description, `${doc.id} description`);
    for (const item of doc.data.items) {
      inspectText(item.explanation, `${item.id} explanation`);
      if (item.explanation_hi) {
        inspectText(item.explanation_hi, `${item.id} explanation_hi`);
      }
      for (const cit of item.citations) {
        inspectText(cit.excerpt, `${item.id} citation ${cit.id}`);
      }
    }
    for (const q of doc.data.questions_for_doctor) {
      inspectText(q, `${doc.id} doctor question`);
    }
  };

  inspectDoc(SAMPLE_PRESCRIPTION);
  inspectDoc(SAMPLE_LAB_REPORT);

  return {
    passed: violations.length === 0,
    violations
  };
}

// In browser or node environment
export function executeSafetyCheck(): boolean {
  const result = runSafetyScan();
  if (result.passed) {
    console.log("✔ Mock Safety Scan PASSED: Zero banned diagnostic/dosage phrases found.");
    return true;
  } else {
    console.error("❌ Mock Safety Scan FAILED with violations:", result.violations);
    return false;
  }
}
