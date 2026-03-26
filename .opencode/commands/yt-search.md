---
description: "Search YouTube videos with structured results"
argument-hint: "<query> [--count N] [--months N] [--no-date-filter]"
allowed-tools:
  - Bash
---

Search YouTube and return structured video results with titles, channels, views, duration, and dates.

Execute:
```bash
.venv/Scripts/python .opencode/skills/yt-search/scripts/search.py {{ARGUMENTS}}
```

Show the results directly to the user.

## Examples
- `Search YouTube for "react tutorials"`
- `Find videos about machine learning --count 10`
- `YouTube search "AI agents" --months 3`

## Options
- `--count N` - Number of results (default: 20)
- `--months N` - Filter to last N months (default: 6)
- `--no-date-filter` - Show all results regardless of date

## Prerequisites (Already Installed)
- yt-dlp: `.venv/Scripts/yt-dlp.exe` ✅
- Python: `.venv/Scripts/python.exe` ✅