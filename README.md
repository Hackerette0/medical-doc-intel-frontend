
---

#### **Frontend Repo README.md** (`medical-doc-intel-frontend/README.md`)

# Medical Document Intelligence Frontend

React/Vite UI for uploading medical PDFs, viewing analysis (5 points + tags), and Part 2 aggregation (multi-upload + summary PDF download). Connects to backend at localhost:8000.

## Overview
- **Part 1**: Upload PDF → Analyze → Animated cards with insights/tags (red for deficiencies, yellow for conditions).
- **Part 2**: Multi-upload (1-5 PDFs) → Per-file results → "Generate Summary" button → Download aggregated PDF.
- **Features**: PDF preview modal, hover animations (Framer Motion), responsive Tailwind UI, file-saver for downloads.

## Tech Stack
- React 18 + Vite (fast build/dev)
- Tailwind CSS (styling/animations)
- Axios (API calls)
- Framer Motion (animations)
- Headless UI (modals)
- Lucide React (icons)
- File-saver (PDF downloads)

## Project Structure

The frontend is organized for easy maintenance, with core UI logic in `App.tsx` and reusable components for upload/results.
medical-doc-intel-frontend/
├── src/
│   ├── App.tsx             
│   ├── components/         
│   │   ├── UploadSection.tsx  
│   │   └── ResultsSection.tsx 
│   ├── types.ts            
│   ├── index.css           
│   └── main.tsx            
├── public/                 
├── images/                 
├── tailwind.config.js      
├── vite.config.ts          
├── package.json            
└── README.md               

## Setup
1. **Clone Repo**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/medical-doc-intel-frontend.git
   cd medical-doc-intel-frontend
   ```
2. install Deps
3. Run Dev Server\
   ```bash
   npm run dev
   ```
   Open http://localhost:5173.

## Required Packages
Install all dependencies via npm (includes React, Tailwind, Axios, animations).

```bash
npm install axios lucide-react @headlessui/react framer-motion
npm install -D tailwindcss-animate
npx shadcn@latest init  
npx shadcn@latest add button card badge progress dialog 
```


## Visual reference 
![Figure 1](https://github.com/Hackerette0/medical-doc-intel-frontend/blob/main/images/image-1.png) 
*Screenshot Reference: Frontend testing input*

![Figure 2](https://github.com/Hackerette0/medical-doc-intel-frontend/blob/main/images/image-2.png) 

![Figure 3](https://github.com/Hackerette0/medical-doc-intel-frontend/blob/main/images/image-3.png) 
*Screenshot Reference: Frontend testing output*
