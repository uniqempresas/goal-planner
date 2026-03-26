---
description: "Complete API for Google NotebookLM - create notebooks, add sources, generate podcasts, videos, infographics, quizzes, and more"
argument-hint: "<command> [arguments]"
allowed-tools:
  - Bash
---

Complete programmatic access to Google NotebookLM—including capabilities not exposed in the web UI.

**IMPORTANT:** Before using, authenticate with:
```bash
uv run notebooklm login
```

Execute:
```bash
uv run notebooklm {{ARGUMENTS}}
```

Show results directly to the user.

## Common Commands

### Authentication & Setup
- `login` - Authenticate with Google OAuth
- `list` - List all notebooks
- `create "Title"` - Create new notebook
- `use <notebook_id>` - Set context notebook
- `status` - Show current context

### Sources
- `source add "https://..."` - Add URL source
- `source add ./file.pdf` - Add local file
- `source add "https://youtube.com/..."` - Add YouTube video
- `source list` - List sources
- `source wait <source_id>` - Wait for processing
- `source add-research "query"` - Web research (fast)
- `source add-research "query" --mode deep` - Deep research

### Chat & Queries
- `ask "question"` - Chat with notebook
- `ask "question" -s src_id1 -s src_id2` - Chat specific sources
- `ask "question" --json` - Chat with references
- `ask "question" --save-as-note` - Save answer as note
- `history` - Show conversation history

### Generate Content
- `generate audio "instructions"` - Generate podcast
- `generate audio --format deep-dive` - Deep dive podcast
- `generate video "instructions"` - Generate video
- `generate video --style whiteboard` - Whiteboard style
- `generate slide-deck` - Generate presentation
- `generate infographic` - Generate infographic
- `generate report --format briefing-doc` - Generate report
- `generate quiz` - Generate quiz
- `generate flashcards` - Generate flashcards
- `generate mind-map` - Generate mind map

### Download & Export
- `download audio ./output.mp3` - Download podcast
- `download video ./output.mp4` - Download video
- `download slide-deck ./slides.pdf` - Download slides (PDF)
- `download slide-deck ./slides.pptx --format pptx` - Download slides (PPTX)
- `download report ./report.md` - Download report
- `artifact list` - Check artifact status
- `artifact wait <artifact_id>` - Wait for completion

### Language (Global Setting)
- `language list` - List supported languages
- `language get` - Show current language
- `language set pt_BR` - Set to Portuguese (Brazil)
- `language set en` - Set to English

## Examples
- `/notebooklm create "Research: AI Ethics"`
- `/notebooklm source add "https://example.com/article"`
- `/notebooklm ask "What are the main points?"`
- `/notebooklm generate audio "Focus on implications"`
- `/notebooklm download audio ./podcast.mp3`
- `/notebooklm language set pt_BR`

## Full Documentation
See `.opencode/skills/notebooklm/SKILL.md` for complete reference.
