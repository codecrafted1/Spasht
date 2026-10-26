export const APP_CONFIG = {
  name:"Spasht",
  tagline: "Understand your health documents in plain words, grounded in verified medical references.",
  oneLinePitch: "Upload a prescription or lab report and get a plain-language explanation in your own language, with every statement traced back to its source. Information only. No diagnosis.",
  disclaimer: "Information only. Not a diagnosis or dosage recommendation. Never alter medicines or doses without consulting your doctor or pharmacist.",
  privacyNote: "Processed in your session. Nothing is stored. Use sample or synthetic documents only.",
  apiBaseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
  defaultLanguage: "en",
  supportedLanguages: [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" }
  ],
  bannedDiagnosticPhrases: [
    "you have",
    "diagnosed with",
    "you suffer from",
    "increase the dose",
    "decrease the dose",
    "stop taking",
    "start taking",
    "substitute this medicine"
  ]
};
