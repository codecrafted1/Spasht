"""
Application Configuration for Samjho Backend.
"""

from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "Samjho"
    ENVIRONMENT: str = "development"
    VERSION: str = "1.0.0"
    
    # Security & Limits
    MAX_FILE_SIZE_BYTES: int = 10 * 1024 * 1024  # 10 MB
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ]
    RATE_LIMIT_STRING: str = "30/minute"
    
    # Lab Rule Engine Thresholds
    # "Slightly outside" defined as within 10% of the nearest bound
    SLIGHTLY_OUTSIDE_THRESHOLD: float = 0.10
    
    # Drug Matcher Threshold (RapidFuzz partial/token sort ratio)
    DRUG_MATCH_THRESHOLD: float = 75.0
    
    # Guardrails: Prohibited diagnostic and dosage phrases
    BANNED_PHRASES: List[str] = [
        "you have",
        "diagnosed with",
        "you suffer from",
        "this indicates you have",
        "increase the dose",
        "decrease the dose",
        "stop taking",
        "start taking",
        "substitute this medicine",
        "change your medication"
    ]
    
    # Red-flag urgent care patterns
    RED_FLAG_PATTERNS: List[str] = [
        "chest pain",
        "shortness of breath",
        "difficulty breathing",
        "severe allergic reaction",
        "anaphylaxis",
        "loss of consciousness"
    ]
    
    # Disclaimer
    FIXED_DISCLAIMER: str = (
        "Information only. Not a diagnosis or prescription. Do not alter medicines "
        "or doses without consulting your doctor or pharmacist."
    )
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
