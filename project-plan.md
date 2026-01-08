# Project Plan: Stoic Reflection Web App

## 1. Overview
A local-first web application designed to facilitate weekly Stoic reviews. The app will provide a distraction-free environment to fill out reflections based on a structured template, store them locally as JSON files, and review past entries.

## 2. Goals
- **Digitalize the Stoic Review:** Convert the provided Markdown template into an interactive web form.
- **Local & Private:** Data resides solely on the user's machine (local JSON files).
- **Minimalistic UX:** A clean, typography-focused interface that encourages focus and reflection.

## 3. Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS (for modern, clean, utility-first styling)
- **Icons:** Lucide React or Heroicons (minimalist SVGs)
- **Routing:** React Router

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Storage:** Local File System (JSON files)

## 4. Architecture

The project will be a mono-repo containing both client and server code.

```
stoic-reflections-app/
├── client/         # React Frontend
├── server/         # Express Backend
├── data/           # Storage for review JSON files
└── ...
```

## 5. Data Structure
Each review will be saved as a separate JSON file in the `data/` directory. The filename will be the timestamp or ISO date (e.g., `2023-10-27-review.json`).

**JSON Schema Draft:**
```json
{
  "id": "uuid-v4",
  "date": "2023-10-27T10:00:00Z",
  "answers": {
    "orientation": {
      "sitQuietly": boolean,
      "noticeMood": boolean,
      "acknowledge": boolean
    },
    "attentionAudit": {
      "spentOn": ["Work", "Relationships"], // Checkbox values
      "reflection": {
        "wellSpent": "string",
        "wasted": "string",
        "patterns": "string"
      }
    },
    // ... mapped to other sections
  }
}
```

## 6. Key Features & Implementation Steps

### Phase 1: Setup & Backend
1.  Initialize project structure.
2.  Set up Express server.
3.  Implement API endpoints:
    -   `GET /api/reviews` - List all past reviews.
    -   `GET /api/reviews/:filename` - Retrieve a specific review.
    -   `POST /api/reviews` - Save a new review.
4.  Ensure `data/` directory exists and is secure (standard file permissions).

### Phase 2: Frontend - Dashboard
1.  Set up Vite + React + Tailwind.
2.  Create a "Dashboard" view:
    -   "New Review" button (prominent).
    -   List of previous reviews (sorted by date, newest first).

### Phase 3: Frontend - The Review Form
1.  Create the `ReviewForm` component.
2.  Implement sections corresponding to the markdown template:
    -   **1. Orientation:** Checkboxes.
    -   **2. Attention Audit:** Checkboxes + Text Areas.
    -   **3. Emotional Review:** Checkboxes + Text Areas.
    -   **4. Stoic Control Check:** Dynamic list or fixed inputs with Yes/No toggles.
    -   **5. Speech & Action Review:** Checkboxes + Text Area.
    -   **6. Self & Ego Check:** Text Areas.
    -   **7. Gratitude & Mortality:** Text Areas.
    -   **8. One Correction:** Structured sentence builder ("When [trigger] occurs, I will [action]").
    -   **9. Closing Reset:** Checkboxes.
3.  Add auto-save (optional) or clear "Save" action.

### Phase 4: Styling & Polish
1.  Apply a minimalist theme:
    -   **Fonts:** Serif for text (e.g., Merriweather or native serif) to feel "book-like". Sans-serif for UI elements.
    -   **Colors:** Monochrome or muted earth tones (Slate, Stone).
    -   **Whitespace:** Generous padding to reduce cognitive load.

## 7. Security Note
-   Data is stored in plain text JSON on the local disk.
-   Security relies on the operating system's user access controls.
-   Future enhancement: Encrypt JSON files using a user-provided password.
