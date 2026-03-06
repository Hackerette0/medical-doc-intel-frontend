
---

#### **Frontend Repo README.md** (`medical-doc-intel-frontend/README.md`)

# Medical Document Intelligence Frontend

React/Vite UI for uploading medical PDFs, viewing analysis (5 points + tags), and Part 2 aggregation (multi-upload + summary PDF download). Connects to backend at localhost:8000.

## Overview
- **Part 1**: Upload PDF → Analyze → Animated cards with insights/tags (red for deficiencies, yellow for conditions).
- **Part 2**: Multi-upload (1-5 PDFs) → Per-file results → "Generate Summary" button → Download aggregated PDF.
- **Features**: PDF preview modal, hover animations (Framer Motion), responsive Tailwind UI, file-saver for downloads.

![Frontend UI](https://via.placeholder.com/800x400?text=Upload+PDF+%7C+Insights+Tags+%7C+Summary+Download) <!-- Add screenshot of upload/results -->

## Tech Stack
- React 18 + Vite (fast build/dev)
- Tailwind CSS (styling/animations)
- Axios (API calls)
- Framer Motion (animations)
- Headless UI (modals)
- Lucide React (icons)
- File-saver (PDF downloads)

## Setup
1. **Clone Repo**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/medical-doc-intel-frontend.git
   cd medical-doc-intel-frontend
