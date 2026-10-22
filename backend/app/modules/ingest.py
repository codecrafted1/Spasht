"""
In-memory Ingestion and Preprocessing Module.
Accepts JPG, PNG, WEBP, and PDF files up to 10MB.
Never writes uploads to disk and never logs document text.
"""

import io
from typing import List, Tuple
from PIL import Image, ImageOps, ImageEnhance
import fitz  # PyMuPDF
from fastapi import HTTPException, UploadFile
from app.config import settings

ALLOWED_MIME_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf"
}

async def validate_and_ingest_file(upload_file: UploadFile) -> List[Image.Image]:
    """
    Validates file format and size in transient memory.
    Rasterizes PDF pages and applies light contrast/auto-level preprocessing.
    """
    content = await upload_file.read()

    # Size check
    if len(content) > settings.MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"Uploaded file exceeds maximum limit of {settings.MAX_FILE_SIZE_BYTES // (1024*1024)}MB."
        )

    # Content type check
    content_type = upload_file.content_type
    if content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{content_type}'. Please upload PNG, JPG, WEBP, or PDF."
        )

    images: List[Image.Image] = []

    if content_type == "application/pdf":
        try:
            doc = fitz.open(stream=content, filetype="pdf")
            for page_num in range(min(len(doc), 5)):  # Limit to first 5 pages for prototype
                page = doc.load_page(page_num)
                pix = page.get_pixmap(dpi=150)
                img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
                images.append(preprocess_image(img))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to rasterize PDF document: {str(e)}")
    else:
        try:
            img = Image.open(io.BytesIO(content)).convert("RGB")
            images.append(preprocess_image(img))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to decode image data: {str(e)}")

    if not images:
        raise HTTPException(status_code=400, detail="Document contains no readable pages.")

    return images

def preprocess_image(image: Image.Image) -> Image.Image:
    """Light image preprocessing: auto-contrast and mild sharpening for OCR clarity."""
    try:
        # Autocontrast
        contrast = ImageOps.autocontrast(image, cutoff=1)
        # Gentle enhancement
        enhancer = ImageEnhance.Sharpness(contrast)
        return enhancer.enhance(1.2)
    except Exception:
        return image
