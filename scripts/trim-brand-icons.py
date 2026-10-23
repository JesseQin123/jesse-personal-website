"""Trim transparent margins from generated brand icons.

The source kit uses a 256px square canvas. Keeping that canvas in the site made
the line art look much smaller than the surrounding UI icons, so this script
crops both light and inverse variants to the same alpha bounds and adds a small,
consistent transparent safety margin.
"""

from pathlib import Path
import subprocess


ROOT = Path(__file__).resolve().parents[1]
ICON_ROOT = ROOT / "src/assets/brand/icons"
PADDING = 6

ICON_CROPS = {
    "agent-workflow.png": "214:40:20:108",
    "ai-systems-architecture.png": "180:204:36:26",
    "cache-reuse.png": "216:106:20:76",
    "context-graph.png": "212:188:22:34",
    "curated-toolbox.png": "216:146:20:54",
    "enterprise-deployment.png": "214:136:22:60",
    "governance-evaluation.png": "184:172:36:40",
    "information-retrieval.png": "212:126:22:64",
    "jesse-ai.png": "216:152:20:52",
    "ontology-semantic-model.png": "210:162:22:46",
    "research-to-product.png": "214:108:20:74",
    "token-throughput.png": "162:70:50:92",
}


for variant in ("light", "inverse"):
    for filename, crop in ICON_CROPS.items():
        source = ICON_ROOT / variant / filename
        temp = source.with_name(f"{source.stem}.trimmed.png")

        # The source canvas is the idempotency guard: already-trimmed files are
        # never processed a second time.
        probe = subprocess.run(
            [
                "ffprobe",
                "-v",
                "error",
                "-select_streams",
                "v:0",
                "-show_entries",
                "stream=width,height",
                "-of",
                "csv=s=x:p=0",
                str(source),
            ],
            check=True,
            capture_output=True,
            text=True,
        )
        if probe.stdout.strip() != "256x256":
            continue

        subprocess.run(
            [
                "ffmpeg",
                "-hide_banner",
                "-loglevel",
                "error",
                "-i",
                str(source),
                "-vf",
                (
                    f"crop={crop},"
                    f"pad=iw+{PADDING * 2}:ih+{PADDING * 2}:"
                    f"{PADDING}:{PADDING}:color=0x00000000"
                ),
                "-frames:v",
                "1",
                "-y",
                str(temp),
            ],
            check=True,
        )
        temp.replace(source)

