from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSETS = [
    ROOT / "src/assets/brand/backgrounds/hero-retrieval-field.png",
    ROOT / "src/assets/brand/case-studies/kamiwaza-infrastructure.png",
    ROOT / "src/assets/brand/case-studies/context-graph.png",
    ROOT / "src/assets/brand/case-studies/solo-unicorn-toolbox.png",
]


for source in ASSETS:
    image = Image.open(source).convert("RGB")
    image.save(source.with_suffix(".webp"), "WEBP", quality=86, method=6)
