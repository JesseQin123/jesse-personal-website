# AI usage sync

The public dashboard lives at `/ai-usage`. It keeps one Vercel Blob snapshot per computer and aggregates each calendar day across those sources.

## Consistency model

- Every computer must have a unique `machine-id` such as `jesse-mbp` or `jesse-desktop`.
- The collector creates a permanent random source identity in `~/.config/jesse-ai-usage/<machine-id>.source-id`. The server binds that identity to the machine ID. A second computer that accidentally reuses the same machine ID receives `409` instead of overwriting the first source.
- Synchronization is a sparse daily upsert. The collector compares local ccusage days with the stored source snapshot, then sends today, yesterday, missing dates, and dates whose values changed.
- The server merges by date and preserves all unsent history. Retries are idempotent, and Blob ETags prevent concurrent runs from losing each other's updates.
- Historical changes larger than 3x are blocked unless the operator explicitly passes `--allow-historical-rewrite` after inspecting the data. That flag performs a deliberate full-source replacement so stale dates and incorrectly confirmed-zero history are removed as part of the repair.
- The dashboard counts each machine once per day, then sums token totals across machines.

Do not sync the same Claude/Codex/Hermes log directory onto two computers. The collector receives daily aggregates from ccusage, not event IDs, so identical logs uploaded under two different machine IDs cannot be distinguished and would be counted twice.

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

Use `jesse-desktop` and the correct label on the second computer. Never copy the generated `.source-id` file between machines. Before running, use `vercel link` and `vercel env pull .env.local --environment development --yes` so the ignored `.env.local` contains `AI_USAGE_SYNC_SECRET`.

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

Remove `--dry-run` for the first upload. Use that same command in the computer's daily ChatGPT/Codex scheduled task. Machine IDs, machine labels, model names, and source-level totals remain in private storage; the public API returns one synthetic aggregate source.

`confirmZeroFrom` is the first date when the scheduled collector is considered reliable. Before it, absent local records stay as placeholders. On and after it, a scanned day with no records becomes a confirmed-zero day.

Add `--dry-run` to inspect the scan without uploading.

Add `--output=/path/to/payload.json` to write the incremental API payload for inspection. The file is created with owner-only permissions because it contains machine-level usage metadata. Upload through `/api/ai-usage-sync`; do not write directly to Blob because direct writes bypass source binding, merge protection, and historical sanity checks.
