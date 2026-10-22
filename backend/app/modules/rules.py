"""
Deterministic Lab Range Rules Engine.
NO LLM - pure arithmetic rules with documented thresholds.
"""

from typing import Tuple, Optional, Literal
from app.config import settings

LabStatus = Literal["within", "slightly_outside", "clearly_outside", "not_applicable"]
Direction = Literal["low", "high", "normal"]

def evaluate_lab_value(
    value: float,
    low: Optional[float],
    high: Optional[float],
    threshold_fraction: float = settings.SLIGHTLY_OUTSIDE_THRESHOLD
) -> Tuple[LabStatus, Direction, str]:
    """
    Evaluates a lab result against low and high reference bounds.
    
    Threshold rule:
    - If low <= value <= high -> within, normal
    - If value < low:
        diff = low - value
        margin = low * threshold_fraction
        if diff <= margin -> slightly_outside, low
        else -> clearly_outside, low
    - If value > high:
        diff = value - high
        margin = high * threshold_fraction
        if diff <= margin -> slightly_outside, high
        else -> clearly_outside, high
    """
    if low is None and high is None:
        return "not_applicable", "normal", "No reference range printed on report."

    # Only high bound specified (e.g. < 200)
    if low is None and high is not None:
        if value <= high:
            return "within", "normal", f"Value is at or below upper reference limit of {high}."
        diff = value - high
        margin = high * threshold_fraction
        if diff <= margin:
            pct = round((diff / high) * 100, 1)
            return "slightly_outside", "high", f"Slightly above upper limit of {high} (+{pct}%)."
        return "clearly_outside", "high", f"Above upper reference limit of {high}."

    # Only low bound specified (e.g. > 40)
    if high is None and low is not None:
        if value >= low:
            return "within", "normal", f"Value is at or above lower reference limit of {low}."
        diff = low - value
        margin = low * threshold_fraction
        if diff <= margin:
            pct = round((diff / low) * 100, 1)
            return "slightly_outside", "low", f"Slightly below lower limit of {low} (-{pct}%)."
        return "clearly_outside", "low", f"Below lower reference limit of {low}."

    # Both low and high specified
    assert low is not None and high is not None
    
    # Boundary inclusivity: exact match on bound is considered within
    if low <= value <= high:
        return "within", "normal", f"Within standard reference interval ({low} - {high})."

    if value < low:
        diff = low - value
        # Margin calculated as percentage of lower bound (or span if low is near 0)
        base = low if low > 0 else (high - low)
        margin = base * threshold_fraction
        if diff <= margin:
            pct = round((diff / base) * 100, 1) if base > 0 else 0
            return "slightly_outside", "low", f"Slightly below lower interval limit of {low} (-{pct}%)."
        return "clearly_outside", "low", f"Below lower reference limit of {low}."

    if value > high:
        diff = value - high
        margin = high * threshold_fraction
        if diff <= margin:
            pct = round((diff / high) * 100, 1)
            return "slightly_outside", "high", f"Slightly above upper interval limit of {high} (+{pct}%)."
        return "clearly_outside", "high", f"Above upper reference limit of {high}."

    return "not_applicable", "normal", "Unable to compare with reference range."
