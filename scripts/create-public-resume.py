from __future__ import annotations

import shutil
import subprocess
import tempfile
from pathlib import Path

import pdfplumber
from docx import Document
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, NumberObject


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_DOCX = Path(
    "/Users/jesseqin/dev/job_resume/output/resume/"
    "Jesse_Yubo_Qin_Enterprise_AI_Deployment_Resume.docx"
)
OUTPUT_PDF = PROJECT_ROOT / "public/resume/Jesse_Yubo_Qin_Resume.pdf"
TEMP_ROOT = PROJECT_ROOT / "tmp/pdfs"

PRIVATE_PHONE_FRAGMENT = "201 713 1848"
PUBLIC_CONTACT_LINE = (
    "New York, NY | jesseqin.office@gmail.com | "
    "linkedin.com/in/jesseqin-phd | jesseqin.me"
)
PUBLIC_LINKS = {
    "jesseqin.office@gmail.com": "mailto:jesseqin.office@gmail.com",
    "linkedin.com/in/jesseqin-phd": "https://www.linkedin.com/in/jesseqin-phd/",
    "jesseqin.me": "https://jesseqin.me/",
}


def build_public_docx(destination: Path) -> None:
    document = Document(SOURCE_DOCX)
    contact_paragraph = next(
        (paragraph for paragraph in document.paragraphs if paragraph.text.startswith("New York, NY")),
        None,
    )
    if contact_paragraph is None or not contact_paragraph.runs:
        raise RuntimeError("Could not find the résumé contact line.")
    if PRIVATE_PHONE_FRAGMENT not in contact_paragraph.text:
        raise RuntimeError("The source résumé no longer contains the expected private phone number.")

    contact_paragraph.runs[0].text = PUBLIC_CONTACT_LINE
    for extra_run in contact_paragraph.runs[1:]:
        extra_run.text = ""
    document.save(destination)


def find_link_rectangles(pdf_path: Path) -> dict[str, tuple[float, float, float, float]]:
    with pdfplumber.open(pdf_path) as document:
        page = document.pages[0]
        page_height = float(page.height)
        words = page.extract_words()
        rectangles: dict[str, tuple[float, float, float, float]] = {}

        for label in PUBLIC_LINKS:
            match = next((word for word in words if word["text"] == label), None)
            if match is None:
                raise RuntimeError(f"Could not locate visible link text: {label}")
            rectangles[label] = (
                float(match["x0"]),
                page_height - float(match["bottom"]),
                float(match["x1"]),
                page_height - float(match["top"]),
            )

        return rectangles


def add_clickable_links(source_pdf: Path, destination_pdf: Path) -> None:
    rectangles = find_link_rectangles(source_pdf)
    reader = PdfReader(source_pdf)
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    writer.add_metadata(
        {
            "/Title": "Jesse (Yubo) Qin - Enterprise AI Deployment Leader",
            "/Author": "Jesse (Yubo) Qin",
            "/Subject": "Public resume",
        }
    )

    for label, uri in PUBLIC_LINKS.items():
        writer.add_uri(
            page_number=0,
            uri=uri,
            rect=rectangles[label],
            border=ArrayObject([NumberObject(0), NumberObject(0), NumberObject(0)]),
        )

    destination_pdf.parent.mkdir(parents=True, exist_ok=True)
    with destination_pdf.open("wb") as output_file:
        writer.write(output_file)


def validate_public_pdf(pdf_path: Path) -> None:
    reader = PdfReader(pdf_path)
    if len(reader.pages) != 1:
        raise RuntimeError(f"Expected a one-page résumé, found {len(reader.pages)} pages.")

    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    if PRIVATE_PHONE_FRAGMENT in text or "+1 201" in text:
        raise RuntimeError("The public résumé still exposes the private phone number.")
    for label in PUBLIC_LINKS:
        if label not in text:
            raise RuntimeError(f"The public résumé is missing contact text: {label}")

    annotations = reader.pages[0].get("/Annots") or []
    public_uris = {
        annotation.get_object().get("/A", {}).get("/URI")
        for annotation in annotations
        if annotation.get_object().get("/Subtype") == "/Link"
    }
    missing_uris = set(PUBLIC_LINKS.values()) - public_uris
    if missing_uris:
        raise RuntimeError(f"The public résumé is missing clickable links: {sorted(missing_uris)}")


def main() -> None:
    if not SOURCE_DOCX.exists():
        raise FileNotFoundError(SOURCE_DOCX)
    soffice = shutil.which("soffice")
    if soffice is None:
        raise RuntimeError("LibreOffice/soffice is required to render the public résumé.")

    TEMP_ROOT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="public-resume-", dir=TEMP_ROOT) as temp_dir_name:
        temp_dir = Path(temp_dir_name)
        public_docx = temp_dir / "Jesse_Yubo_Qin_Resume.docx"
        build_public_docx(public_docx)
        subprocess.run(
            [
                soffice,
                "--headless",
                "--convert-to",
                "pdf",
                "--outdir",
                str(temp_dir),
                str(public_docx),
            ],
            check=True,
            capture_output=True,
            text=True,
        )
        rendered_pdf = temp_dir / "Jesse_Yubo_Qin_Resume.pdf"
        if not rendered_pdf.exists():
            raise RuntimeError("LibreOffice did not produce the expected PDF.")
        add_clickable_links(rendered_pdf, OUTPUT_PDF)

    validate_public_pdf(OUTPUT_PDF)
    print(f"Created {OUTPUT_PDF}")


if __name__ == "__main__":
    main()
