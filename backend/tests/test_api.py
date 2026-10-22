"""
Integration tests for FastAPI endpoints using TestClient.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert data["app"] == "Samjho"

def test_get_source():
    res = client.get("/v1/sources/WHO-EML-MET-01")
    assert res.status_code == 200
    data = res.json()
    assert "Metformin" in data["excerpt"]

def test_get_nonexistent_source():
    res = client.get("/v1/sources/NON-EXISTENT-ID")
    assert res.status_code == 404

def test_confirm_prescription_item():
    payload = {
        "item_id": "item-rx-4",
        "corrected_prescription_fields": {
            "drug_name": "Azithromycin",
            "strength": "250 mg",
            "frequency": "Once daily (1-0-0)"
        },
        "language": "en"
    }
    res = client.post("/v1/confirm", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["needs_verification"] is False
    assert data["confidence"] == "high"
    assert "Azithromycin" in data["explanation"]
