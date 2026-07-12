# AI usage sync

The public dashboard lives at `/ai-usage`. It reads one Vercel Blob JSON snapshot per computer.

## Daily scheduled command

Run this from the repository on the first computer:

```bash
npm run sync:ai-usage -- \
  --endpoint=https://www.jesseqin.me/api/ai-usage-sync \
  --machine-id=jesse-mbp \
  --machine-label="Jesse's MacBook Pro" \
  --start-date=2026-01-01 \
  --confirm-zero-from=2026-07-12
```

Use `jesse-desktop` and the correct label on the second computer. Before running, use `vercel link` and `vercel env pull .env.local --environment development --yes` so the ignored `.env.local` contains `AI_USAGE_SYNC_SECRET`.

## Add the second computer

On the second computer, clone the repository and run:

```bash
npm install
vercel link --project jesse-blogs-website --scope jesse-workspace --yes
vercel env pull .env.local --environment development --yes --scope jesse-workspace
```

Test its local history without uploading:

```bash
npm run sync:ai-usage -- \
  --dry-run \
  --endpoint=https://www.jesseqin.me/api/ai-usage-sync \
  --machine-id=jesse-desktop \
  --machine-label="Source 2" \
  --start-date=2026-01-01 \
  --confirm-zero-from=2026-07-12
```

Remove `--dry-run` for the first upload. Use that same command in the computer's daily ChatGPT/Codex scheduled task. The public dashboard never displays `machine-id` or `machine-label`; they are only used server-side to keep uploads separate before aggregation.

`confirmZeroFrom` is the first date when the scheduled collector is considered reliable. Before it, absent local records stay as placeholders. On and after it, a scanned day with no records becomes a confirmed-zero day.

Add `--dry-run` to inspect the scan without uploading.

Add `--output=/path/to/payload.json` to write the normalized payload for inspection or a direct Blob import. The file is created with owner-only permissions because it contains machine-level usage metadata.
