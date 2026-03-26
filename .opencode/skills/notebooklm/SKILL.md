---
name: notebooklm
description: Complete API for Google NotebookLM - create notebooks, add sources, generate podcasts, videos, infographics, quizzes, and more. Full programmatic access including features not in the web UI.
triggers:
  - notebooklm
  - notebook
  - criar notebook
  - gerar podcast
  - gerar video
  - gerar infografico
  - adicionar fonte
  - fazer pergunta
  - pesquisa
  - download
---

# NotebookLM Automation

Complete programmatic access to Google NotebookLM—including capabilities not exposed in the web UI. Create notebooks, add sources (URLs, YouTube, PDFs, audio, video, images), chat with content, generate all artifact types, and download results in multiple formats.

## Prerequisites

**IMPORTANT:** Before using any command, authentication is required:

```bash
uv run notebooklm login          # Opens browser for Google OAuth
uv run notebooklm list           # Verify authentication works
```

If commands fail with authentication errors, re-run `uv run notebooklm login`.

## Quick Reference

| Task | Command |
|------|---------|
| Authenticate | `uv run notebooklm login` |
| Diagnose auth issues | `uv run notebooklm auth check` |
| List notebooks | `uv run notebooklm list` |
| Create notebook | `uv run notebooklm create "Title"` |
| Set context | `uv run notebooklm use <notebook_id>` |
| Show context | `uv run notebooklm status` |
| Add URL source | `uv run notebooklm source add "https://..."` |
| Add file | `uv run notebooklm source add ./file.pdf` |
| Add YouTube | `uv run notebooklm source add "https://youtube.com/..."` |
| List sources | `uv run notebooklm source list` |
| Wait for source processing | `uv run notebooklm source wait <source_id>` |
| Web research (fast) | `uv run notebooklm source add-research "query"` |
| Web research (deep) | `uv run notebooklm source add-research "query" --mode deep --no-wait` |
| Check research status | `uv run notebooklm research status` |
| Wait for research | `uv run notebooklm research wait --import-all` |
| Chat | `uv run notebooklm ask "question"` |
| Chat (specific sources) | `uv run notebooklm ask "question" -s src_id1 -s src_id2` |
| Chat (with references) | `uv run notebooklm ask "question" --json` |
| Chat (save answer as note) | `uv run notebooklm ask "question" --save-as-note` |
| Show conversation history | `uv run notebooklm history` |
| Save all history as note | `uv run notebooklm history --save` |
| Continue specific conversation | `uv run notebooklm ask "question" -c <conversation_id>` |
| Get source fulltext | `uv run notebooklm source fulltext <source_id>` |
| Get source guide | `uv run notebooklm source guide <source_id>` |
| Generate podcast | `uv run notebooklm generate audio "instructions"` |
| Generate podcast (JSON) | `uv run notebooklm generate audio --json` |
| Generate podcast (specific sources) | `uv run notebooklm generate audio -s src_id1 -s src_id2` |
| Generate video | `uv run notebooklm generate video "instructions"` |
| Generate report | `uv run notebooklm generate report --format briefing-doc` |
| Generate report (append instructions) | `uv run notebooklm generate report --format study-guide --append "Target audience: beginners"` |
| Generate quiz | `uv run notebooklm generate quiz` |
| Revise a slide | `uv run notebooklm generate revise-slide "prompt" --artifact <id> --slide 0` |
| Check artifact status | `uv run notebooklm artifact list` |
| Wait for completion | `uv run notebooklm artifact wait <artifact_id>` |
| Download audio | `uv run notebooklm download audio ./output.mp3` |
| Download video | `uv run notebooklm download video ./output.mp4` |
| Download slide deck (PDF) | `uv run notebooklm download slide-deck ./slides.pdf` |
| Download slide deck (PPTX) | `uv run notebooklm download slide-deck ./slides.pptx --format pptx` |
| Download report | `uv run notebooklm download report ./report.md` |
| Download mind map | `uv run notebooklm download mind-map ./map.json` |
| Download data table | `uv run notebooklm download data-table ./data.csv` |
| Download quiz | `uv run notebooklm download quiz quiz.json` |
| Download quiz (markdown) | `uv run notebooklm download quiz --format markdown quiz.md` |
| Download flashcards | `uv run notebooklm download flashcards cards.json` |
| Download flashcards (markdown) | `uv run notebooklm download flashcards --format markdown cards.md` |
| Delete notebook | `uv run notebooklm notebook delete <id>` |
| List languages | `uv run notebooklm language list` |
| Get language | `uv run notebooklm language get` |
| Set language | `uv run notebooklm language set pt_BR` |

## Generation Types

All generate commands support:
- `-s, --source` to use specific source(s) instead of all sources
- `--language` to set output language (defaults to configured language or 'en')
- `--json` for machine-readable output (returns `task_id` and `status`)
- `--retry N` to automatically retry on rate limits with exponential backoff

| Type | Command | Options | Download |
|------|---------|---------|----------|
| Podcast | `generate audio` | `--format [deep-dive\|brief\|critique\|debate]`, `--length [short\|default\|long]` | .mp3 |
| Video | `generate video` | `--format [explainer\|brief]`, `--style [auto\|classic\|whiteboard\|kawaii\|anime\|watercolor\|retro-print\|heritage\|paper-craft]` | .mp4 |
| Slide Deck | `generate slide-deck` | `--format [detailed\|presenter]`, `--length [default\|short]` | .pdf / .pptx |
| Slide Revision | `generate revise-slide "prompt" --artifact <id> --slide N` | `--wait`, `--notebook` | *(re-downloads parent deck)* |
| Infographic | `generate infographic` | `--orientation [landscape\|portrait\|square]`, `--detail [concise\|standard\|detailed]` | .png |
| Report | `generate report` | `--format [briefing-doc\|study-guide\|blog-post\|custom]`, `--append "extra instructions"` | .md |
| Mind Map | `generate mind-map` | *(sync, instant)* | .json |
| Data Table | `generate data-table` | description required | .csv |
| Quiz | `generate quiz` | `--difficulty [easy\|medium\|hard]`, `--quantity [fewer\|standard\|more]` | .json/.md/.html |
| Flashcards | `generate flashcards` | `--difficulty [easy\|medium\|hard]`, `--quantity [fewer\|standard\|more]` | .json/.md/.html |

## Common Workflows

### Research to Podcast

1. `uv run notebooklm create "Research: [topic]"` — create notebook
2. `uv run notebooklm source add` for each URL/document — add sources
3. Wait for sources: `uv run notebooklm source list --json` until all status=READY
4. `uv run notebooklm generate audio "Focus on [specific angle]"` — generate podcast
5. Note the artifact ID returned
6. Check `uv run notebooklm artifact list` for status
7. `uv run notebooklm download audio ./podcast.mp3` when complete

### Document Analysis

1. `uv run notebooklm create "Analysis: [project]"`
2. `uv run notebooklm source add ./doc.pdf` (or URLs)
3. `uv run notebooklm ask "Summarize the key points"`
4. `uv run notebooklm ask "What are the main arguments?"`
5. Continue chatting as needed

### Bulk Import

1. `uv run notebooklm create "Collection: [name]"`
2. Add multiple sources:
   ```bash
   uv run notebooklm source add "https://url1.com"
   uv run notebooklm source add "https://url2.com"
   uv run notebooklm source add ./local-file.pdf
   ```
3. `uv run notebooklm source list` to verify

## Features Beyond the Web UI

| Feature | Command | Description |
|---------|---------|-------------|
| **Batch downloads** | `download <type> --all` | Download all artifacts of a type at once |
| **Quiz/Flashcard export** | `download quiz --format json` | Export as JSON, Markdown, or HTML |
| **Mind map extraction** | `download mind-map` | Export hierarchical JSON |
| **Data table export** | `download data-table` | Download structured tables as CSV |
| **Slide deck as PPTX** | `download slide-deck --format pptx` | Download as editable .pptx |
| **Slide revision** | `generate revise-slide "prompt" --artifact <id> --slide N` | Modify individual slides |
| **Source fulltext** | `source fulltext <id>` | Retrieve indexed text content |
| **Save chat to note** | `ask "..." --save-as-note` / `history --save` | Save Q&A as notes |

## Command Output Formats

Commands with `--json` return structured data for parsing:

**Create notebook:**
```bash
$ uv run notebooklm create "Research" --json
{"id": "abc123de-...", "title": "Research"}
```

**Add source:**
```bash
$ uv run notebooklm source add "https://example.com" --json
{"source_id": "def456...", "title": "Example", "status": "processing"}
```

**Generate artifact:**
```bash
$ uv run notebooklm generate audio "Focus on key points" --json
{"task_id": "xyz789...", "status": "pending"}
```

**Chat with references:**
```bash
$ uv run notebooklm ask "What is X?" --json
{"answer": "X is... [1] [2]", "conversation_id": "...", "turn_number": 1, "is_follow_up": false, "references": [{"source_id": "abc123...", "citation_number": 1, "cited_text": "Relevant passage..."}]}
```

## Language Configuration

Language setting controls the output language for generated artifacts.

**Important:** Language is a **GLOBAL** setting that affects all notebooks in your account.

```bash
# List all 80+ supported languages
uv run notebooklm language list

# Show current language setting
uv run notebooklm language get

# Set language for artifact generation
uv run notebooklm language set pt_BR  # Portuguese (Brazil)
uv run notebooklm language set en       # English (default)
uv run notebooklm language set es       # Spanish
```

**Override per command:** Use `--language` flag on generate commands:
```bash
uv run notebooklm generate audio --language pt_BR   # Portuguese podcast
uv run notebooklm generate video --language es       # Spanish video
```

## Error Handling

| Error | Cause | Action |
|-------|-------|--------|
| Auth/cookie error | Session expired | Run `uv run notebooklm auth check` then `uv run notebooklm login` |
| "No notebook context" | Context not set | Use `-n <id>` or `--notebook <id>` flag |
| "No result found for RPC ID" | Rate limiting | Wait 5-10 min, retry |
| `GENERATION_FAILED` | Google rate limit | Wait and retry later |
| Download fails | Generation incomplete | Check `artifact list` for status |
| Invalid notebook/source ID | Wrong ID | Run `uv run notebooklm list` to verify |

## Exit Codes

| Code | Meaning | Action |
|------|---------|--------|
| 0 | Success | Continue |
| 1 | Error (not found, processing failed) | Check stderr |
| 2 | Timeout (wait commands only) | Extend timeout or check status manually |

## Known Limitations

**Rate limiting:** Audio, video, quiz, flashcards, infographic, and slide deck generation may fail due to Google's rate limits.

**Reliable operations:**
- Notebooks (list, create, delete, rename)
- Sources (add, list, delete)
- Chat/queries
- Mind-map, study-guide, report, data-table generation

**Unreliable operations:**
- Audio (podcast) generation
- Video generation
- Quiz and flashcard generation
- Infographic and slide deck generation

**Workaround:** If generation fails:
1. Check status: `uv run notebooklm artifact list`
2. Retry after 5-10 minutes
3. Use the NotebookLM web UI as fallback

**Processing times vary significantly:**

| Operation | Typical time | Suggested timeout |
|-----------|--------------|-------------------|
| Source processing | 30s - 10 min | 600s |
| Research (fast) | 30s - 2 min | 180s |
| Research (deep) | 15 - 30+ min | 1800s |
| Notes | instant | n/a |
| Mind-map | instant (sync) | n/a |
| Quiz, flashcards | 5 - 15 min | 900s |
| Report, data-table | 5 - 15 min | 900s |
| Audio generation | 10 - 20 min | 1200s |
| Video generation | 15 - 45 min | 2700s |

## Troubleshooting

```bash
uv run notebooklm --help              # Main commands
uv run notebooklm auth check          # Diagnose auth issues
uv run notebooklm auth check --test   # Full auth validation with network test
uv run notebooklm notebook --help     # Notebook management
uv run notebooklm source --help       # Source management
uv run notebooklm research --help     # Research status/wait
uv run notebooklm generate --help     # Content generation
uv run notebooklm artifact --help     # Artifact management
uv run notebooklm download --help     # Download content
uv run notebooklm language --help     # Language settings
```

**Diagnose auth:** `uv run notebooklm auth check`
**Re-authenticate:** `uv run notebooklm login`
**Check version:** `uv run notebooklm --version`
