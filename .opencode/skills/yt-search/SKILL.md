---
name: yt-search
description: Search YouTube videos directly from opencode. Returns structured results with titles, channels, view counts, duration, and upload dates.
triggers:
  - youtube
  - yt-search
  - search video
---

# YouTube Search Skill

Search YouTube videos directly from opencode. Returns structured results with titles, channels, view counts, duration, and upload dates.

## Prerequisites

- Python 3.8+
- yt-dlp (`pip install yt-dlp`)

## How to Use

Simply ask to search YouTube:

```
Search YouTube for "react tutorials"
Find YouTube videos about machine learning
yt-search AI agents --count 10
```

## Parameters

- `--count N` - Number of results (default: 20)
- `--months N` - Filter videos from last N months (default: 6)
- `--no-date-filter` - Show all results regardless of date

## Output Format

Each video shows:
- Title
- Channel (with subscriber count)
- View count
- Duration
- Upload date
- Direct YouTube link
- Views/Subscribers ratio (viral indicator)

## Example Results

```
────────────────────────────────────────────────────────────
  1. React Tutorial for Beginners 2024
     Programming with Mosh (2.5M subs) · 1,234,567 views · 45:30 · Jan 15, 2026
     https://youtube.com/watch?v=abc123
────────────────────────────────────────────────────────────
```

## Technical Details

The skill uses yt-dlp to search YouTube without API keys. Results are filtered by date and formatted for easy reading.

Base directory: `.opencode/skills/yt-search`
Script: `scripts/search.py`