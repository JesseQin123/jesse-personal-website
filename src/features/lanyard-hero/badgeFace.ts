import { badgeContent, HERO_FONT } from "./badgeContent";

// Paper insert ratio matches PAPER_W / PAPER_H in BadgeScene.
export const FACE_WIDTH = 1024;
export const FACE_HEIGHT = 1568;

const PAPER = "#F2F2F0";
const INK = "#0B0B0B";

const font = (style: string, weight: number, size: number) =>
  `${style} ${weight} ${size}px "${HERO_FONT}", Georgia, serif`;

export async function loadBadgeFonts() {
  if (typeof document === "undefined" || !document.fonts) return;
  await Promise.allSettled([
    document.fonts.load(font("normal", 500, 200)),
    document.fonts.load(font("italic", 500, 40)),
    document.fonts.load(font("normal", 400, 40)),
  ]);
}

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = FACE_WIDTH;
  canvas.height = FACE_HEIGHT;
  return canvas;
}

// Deterministic noise so the card looks the same on every load.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function paintPaper(ctx: CanvasRenderingContext2D, seed: number) {
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, FACE_WIDTH, FACE_HEIGHT);
  const rand = mulberry32(seed);
  const image = ctx.getImageData(0, 0, FACE_WIDTH, FACE_HEIGHT);
  const data = image.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (rand() - 0.5) * 9;
    data[i] += grain;
    data[i + 1] += grain;
    data[i + 2] += grain;
  }
  ctx.putImageData(image, 0, 0);
}

// Pressed-ink look: jitter each pixel's source and break up the alpha so the
// letter edges feather like toner on uncoated stock.
function inkify(source: HTMLCanvasElement, seed: number) {
  const { width, height } = source;
  const sctx = source.getContext("2d")!;
  const src = sctx.getImageData(0, 0, width, height).data;
  const out = sctx.createImageData(width, height);
  const dst = out.data;
  const rand = mulberry32(seed);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sx = Math.min(width - 1, Math.max(0, x + Math.round((rand() - 0.5) * 4)));
      const sy = Math.min(height - 1, Math.max(0, y + Math.round((rand() - 0.5) * 4)));
      const si = (sy * width + sx) * 4;
      const di = (y * width + x) * 4;
      let alpha = src[si + 3];
      if (alpha === 0) continue;
      alpha *= 0.78 + rand() * 0.34;
      if (rand() < 0.035) alpha *= 0.45;
      dst[di] = src[si];
      dst[di + 1] = src[si + 1];
      dst[di + 2] = src[si + 2];
      dst[di + 3] = Math.min(255, alpha);
    }
  }
  sctx.putImageData(out, 0, 0);
  return source;
}

function drawPill(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, color: string) {
  const height = 56;
  ctx.font = font("normal", 600, 33);
  const width = ctx.measureText(label).width + 44;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y - height / 2, width, height, height / 2);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + 22, y + 2);
  ctx.textBaseline = "alphabetic";
  return width;
}

export function drawBadgeFront() {
  const canvas = createCanvas();
  const ctx = canvas.getContext("2d")!;
  paintPaper(ctx, 7);

  const name = createCanvas();
  const nctx = name.getContext("2d")!;
  nctx.font = font("normal", 500, 372);
  nctx.fillStyle = INK;
  nctx.fillText(badgeContent.firstName, 92, 408);
  nctx.fillStyle = badgeContent.accent;
  nctx.fillText(badgeContent.lastName, 100, 706);
  ctx.drawImage(inkify(name, 11), 0, 0);

  const left = 112;
  ctx.fillStyle = "#1A1A1A";
  ctx.font = font("italic", 500, 34);
  ctx.fillText(badgeContent.currentlyLabel, left, 1160);
  ctx.fillStyle = "#4A4A48";
  ctx.font = font("normal", 400, 35);
  ctx.fillText(badgeContent.currently, left, 1218);

  ctx.fillStyle = "#1A1A1A";
  ctx.font = font("italic", 500, 34);
  ctx.fillText(badgeContent.previouslyLabel, left, 1346);

  let x = left;
  for (const pill of badgeContent.pills) {
    x += drawPill(ctx, x, 1408, pill.label, pill.color) + 18;
  }

  return canvas;
}

export function drawBadgeBack() {
  const canvas = createCanvas();
  const ctx = canvas.getContext("2d")!;
  paintPaper(ctx, 23);

  const mark = createCanvas();
  const mctx = mark.getContext("2d")!;
  mctx.font = font("normal", 500, 420);
  mctx.fillStyle = INK;
  mctx.textAlign = "center";
  mctx.fillText("J", FACE_WIDTH / 2 - 70, 880);
  mctx.fillStyle = badgeContent.accent;
  mctx.fillText("Q", FACE_WIDTH / 2 + 90, 880);
  ctx.drawImage(inkify(mark, 29), 0, 0);

  ctx.fillStyle = "#4A4A48";
  ctx.font = font("normal", 400, 35);
  ctx.textAlign = "center";
  ctx.fillText(badgeContent.backLine, FACE_WIDTH / 2, 1420);
  return canvas;
}
