"""
Confidence scoring module.
Combines OCR clarity, extraction validity, and drug/lab lookup relevance into an auditable score.
"""

from typing import Tuple, Literal

ConfidenceLevel = Literal["high", "medium", "low"]

def compute_item_confidence(
    ocr_confidence: float,
    match_score: float,
    has_retrieval: bool,
    fields_complete: bool
) -> Tuple[float, ConfidenceLevel, bool]:
    """
    Computes weighted confidence score:
    - OCR score: 35% weight
    - Database match score: 35% weight
    - Retrieval grounding: 15% weight
    - Field completeness: 15% weight
    
    Returns (score, level, needs_verification)
    """
    retrieval_weight = 1.0 if has_retrieval else 0.4
    completeness_weight = 1.0 if fields_complete else 0.5

    weighted_score = (
        (ocr_confidence * 0.35) +
        (match_score * 0.35) +
        (retrieval_weight * 0.15) +
        (completeness_weight * 0.15)
    )

    final_score = round(min(max(weighted_score, 0.0), 1.0), 2)

    if final_score >= 0.85:
        level: ConfidenceLevel = "high"
        needs_verification = False
    elif final_score >= 0.65:
        level = "medium"
        needs_verification = False
    else:
        level = "low"
        needs_verification = True

    return final_score, level, needs_verification
