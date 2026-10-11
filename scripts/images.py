"""Convert source screenshots to optimized WebP for public/work. Run: python -I scripts/images.py"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "assets-source"
OUT = ROOT / "public" / "work"
OUT.mkdir(parents=True, exist_ok=True)

# target name -> (source path, crop box or None). Crops are (left, top, right, bottom) in source pixels.
PLAN = {
    "chargehub": (SRC / "EVChargingHub" / "Screenshot 2026-09-01 200022.png", None),
    "chargehub-kpis": (SRC / "EVChargingHub" / "Screenshot 2026-09-01 201110.png", None),
    "chargehub-behaviour": (SRC / "EVChargingHub" / "Screenshot 2026-09-01 201211.png", None),
    "opticart": (SRC / "OptiCart" / "Screenshot 2026-09-01 201421.png", None),
    "insightflow": (SRC / "InsightFlow" / "Screenshot 2026-09-01 201920.png", None),
    "insightflow-forecast": (SRC / "InsightFlow" / "Screenshot 2026-09-01 202137.png", None),
    "insightflow-feed": (SRC / "InsightFlow" / "Screenshot 2026-09-01 202457.png", None),
    "tawzeevo": (SRC / "captures" / "tawzeevo-demo.png", None),
    "sobohnet": (SRC / "captures" / "sobohnet.png", None),
    "interview-lab": (SRC / "captures" / "interview-lab.png", None),
}

TARGET_W = 1600
RATIO = 16 / 10


def fit_16_10(im: Image.Image) -> Image.Image:
    """Resize to 1600 wide, then centre-crop (or pad with the edge colour) to 16:10."""
    im = im.convert("RGB")
    w, h = im.size
    scale = TARGET_W / w
    im = im.resize((TARGET_W, round(h * scale)), Image.LANCZOS)
    w, h = im.size
    target_h = round(TARGET_W / RATIO)
    if h > target_h:
        top = 0  # keep the top of app screenshots: navigation and title matter most
        im = im.crop((0, top, w, top + target_h))
    elif h < target_h:
        bg = im.getpixel((w - 2, h - 2))
        canvas = Image.new("RGB", (w, target_h), bg)
        canvas.paste(im, (0, 0))
        im = canvas
    return im


def main() -> None:
    for name, (src, box) in PLAN.items():
        if not src.exists():
            print(f"skip {name}: missing {src.name}")
            continue
        im = Image.open(src)
        if box:
            im = im.crop(box)
        im = fit_16_10(im)
        out = OUT / f"{name}.webp"
        im.save(out, "WEBP", quality=82, method=6)
        print(f"{name}.webp {im.size} {out.stat().st_size // 1024} KB")

    # Headshot: 640 px square, WebP
    head = SRC / "ProfilePic.png"
    if head.exists():
        im = Image.open(head).convert("RGB").resize((640, 640), Image.LANCZOS)
        im.save(ROOT / "public" / "malik.webp", "WEBP", quality=86, method=6)
        print("malik.webp 640x640")


if __name__ == "__main__":
    main()
