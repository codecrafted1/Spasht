"""
Unit tests for deterministic lab rules engine.
Tests boundary conditions, threshold limits, and direction detection.
"""

import pytest
from app.modules.rules import evaluate_lab_value

def test_within_range():
    # Value in normal interval
    status, direction, desc = evaluate_lab_value(85.0, 70.0, 100.0)
    assert status == "within"
    assert direction == "normal"

def test_exact_bounds_inclusive():
    # Lower bound exact match
    status_low, dir_low, _ = evaluate_lab_value(70.0, 70.0, 100.0)
    assert status_low == "within"
    assert dir_low == "normal"

    # Upper bound exact match
    status_high, dir_high, _ = evaluate_lab_value(100.0, 70.0, 100.0)
    assert status_high == "within"
    assert dir_high == "normal"

def test_slightly_outside_upper():
    # Upper bound 5.0, 10% threshold margin is 0.5 (up to 5.5 is slightly outside)
    # Value 5.15 is +3% above upper bound -> slightly_outside
    status, direction, desc = evaluate_lab_value(5.15, 3.5, 5.0)
    assert status == "slightly_outside"
    assert direction == "high"

def test_clearly_outside_upper():
    # Value 6.2 is > 5.5 (+24%) -> clearly_outside
    status, direction, desc = evaluate_lab_value(6.2, 3.5, 5.0)
    assert status == "clearly_outside"
    assert direction == "high"

def test_slightly_outside_lower():
    # Lower bound 70.0, 10% margin is 7.0 (down to 63.0 is slightly outside)
    # Value 68.0 is -2.8% below 70 -> slightly_outside
    status, direction, desc = evaluate_lab_value(68.0, 70.0, 100.0)
    assert status == "slightly_outside"
    assert direction == "low"

def test_clearly_outside_lower():
    # Value 50.0 is well below 63.0 -> clearly_outside
    status, direction, desc = evaluate_lab_value(50.0, 70.0, 100.0)
    assert status == "clearly_outside"
    assert direction == "low"

def test_missing_range_graceful():
    status, direction, desc = evaluate_lab_value(15.0, None, None)
    assert status == "not_applicable"
    assert direction == "normal"
