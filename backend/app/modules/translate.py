"""
Multilingual translation module for Indian languages.
Protects drug names, units, and citation tokens during translation.
"""

import re
from typing import Dict, Tuple

# Pre-compiled common translation dictionary for core medical phrases
TRANSLATION_MAP_HI = {
    "is documented in clinical health guidelines": "चिकित्सीय स्वास्थ्य दिशानिर्देशों में प्रलेखित है",
    "Commonly advised directions note": "सामान्य निर्देशों के अनुसार",
    "falls within the typical reference interval": "सामान्य संदर्भ सीमा के भीतर है",
    "Numbers in this band are generally considered expected": "इस सीमा के भीतर के परिणामों को सामान्य माना जाता है",
    "is slightly above the typical bracket": "सामान्य सीमा से थोड़ा ऊपर है",
    "is slightly below the typical bracket": "सामान्य सीमा से थोड़ा नीचे है",
    "is higher than the printed reference range": "रिपोर्ट पर छपी संदर्भ सीमा से अधिक है",
    "is lower than the printed reference range": "रिपोर्ट पर छपी संदर्भ सीमा से कम है",
    "Minor variations can occur due to hydration, diet, or sample timing": "मामूली अंतर पानी की मात्रा, खान-पान या समय के कारण हो सकता है",
    "discuss this reading with your doctor": "इस परिणाम पर अपने डॉक्टर से चर्चा करें",
    "Results outside typical brackets should be reviewed with your doctor": "सामान्य सीमा से बाहर के परिणामों पर डॉक्टर से परामर्श लेना चाहिए",
    "Measures the concentration of sugar circulating in the bloodstream following an overnight fast": "रात भर के उपवास के बाद रक्त में ग्लूकोज की मात्रा को मापता है",
    "Shows the average percentage of red blood cells carrying glucose over the preceding 2 to 3 months": "पिछले 2 से 3 महीनों में रक्त में ग्लूकोज के औसत स्तर को दर्शाता है",
    "Creatinine is a standard compound formed from muscle turnover that healthy kidneys continuously filter": "क्रिएटिनिन मांसपेशियों की सामान्य गतिविधि का उत्पाद है जिसे गुर्दे शरीर से बाहर निकालते हैं",
    "Potassium is an essential mineral and electrolyte that helps nerves transmit signals and muscles": "पोटेशियम एक आवश्यक इलेक्ट्रोलाइट है जो तंत्रिका और मांसपेशियों के कार्य में मदद करता है",
    "Hemoglobin is the iron-rich protein in red blood cells responsible for carrying oxygen": "हीमोग्लोबिन लाल रक्त कोशिकाओं में पाया जाने वाला प्रोटीन है जो शरीर में ऑक्सीजन पहुंचाता है",
    "Metformin helps maintain balanced blood sugar levels by reducing glucose production in the liver": "मेटफॉर्मिन लिवर में ग्लूकोज उत्पादन को कम करके रक्त शर्करा को संतुलित रखने में मदद करता है",
    "Atorvastatin helps regulate blood cholesterol levels by slowing cholesterol formation": "एटोरवास्टेटिन लिवर में कोलेस्ट्रॉल के निर्माण को नियंत्रित करने में मदद करता है",
    "Amoxicillin is an antibacterial medicine used to treat bacterial infections": "एमोक्सिसिलिन एक एंटीबायोटिक दवा है जिसका उपयोग जीवाणु संक्रमण के इलाज के लिए किया जाता है",
    "Azithromycin is an antibiotic that stops bacterial growth in respiratory and skin infections": "एज़िथ्रोमाइसिन एक एंटीबायोटिक दवा है जो संक्रमण में जीवाणुओं की वृद्धि को रोकती है",
    "Paracetamol is commonly used to ease mild to moderate discomfort and help lower elevated body temperature": "पैरासिटामोल का उपयोग हल्के दर्द से राहत और बुखार को कम करने के लिए किया जाता है"
}

def protect_tokens(text: str) -> Tuple[str, Dict[str, str]]:
    """Protects numbers, citation markers [1], and units with alphanumeric tokens."""
    token_map = {}
    counter = 0

    def replacer(match):
        nonlocal counter
        token = f"__TOKEN_{counter}__"
        token_map[token] = match.group(0)
        counter += 1
        return token

    # Protect citations e.g. [1], [2]
    protected = re.sub(r"\[\d+\]", replacer, text)
    # Protect dosage values and numbers with units e.g. 500mg, 138.0 mg/dL
    protected = re.sub(r"\b\d+(?:\.\d+)?\s*(?:mg/dL|g/dL|mmol/L|mg|ml|%|IU/L)\b", replacer, protected)

    return protected, token_map

def restore_tokens(text: str, token_map: Dict[str, str]) -> str:
    """Restores protected tokens back to original values."""
    restored = text
    for token, original in token_map.items():
        restored = restored.replace(token, original)
    return restored

def translate_to_language(text: str, target_lang: str = "hi") -> str:
    """
    Translates English plain-language text into the target Indian language
    while safeguarding medical terms and numeric ranges.
    """
    if target_lang == "en" or not text:
        return text

    protected, token_map = protect_tokens(text)
    translated = protected

    if target_lang == "hi":
        for en_phrase, hi_phrase in TRANSLATION_MAP_HI.items():
            if en_phrase in translated:
                translated = translated.replace(en_phrase, hi_phrase)

    return restore_tokens(translated, token_map)
