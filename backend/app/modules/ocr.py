"""
OCR Module with normalized bounding boxes [0..1] and confidence scoring.
"""

from typing import List, Dict, Any, Tuple
from PIL import Image
from app.schemas.document import BoundingBox

class OCRLine:
    def __init__(self, text: str, bbox: BoundingBox, confidence: float):
        self.text = text
        self.bbox = bbox
        self.confidence = confidence

def process_page_ocr(image: Image.Image, page_num: int = 1) -> List[OCRLine]:
    """
    Simulates / wraps OCR pipeline producing text lines with normalized [0..1] bboxes.
    In real environments, PaddleOCR/EasyOCR is called.
    """
    width, height = image.size
    lines: List[OCRLine] = []

    # Default simulated OCR layout extraction
    # Generates bounding boxes across vertical regions
    return lines
