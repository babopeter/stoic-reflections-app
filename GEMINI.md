# Project Context: Stoic Reflection App

## Project Overview
This is a **local-first web application** designed for weekly Stoic reviews. It allows users to fill out a structured reflection template, saves the data as local JSON files, and provides a dashboard to review past entries.

**Architecture:** Monorepo containing:
*   **Client:** React (Vite) + Tailwind CSS
*   **Server:** Node.js + Express
*   **Data:** Local JSON storage

## Directory Structure
*   `client/`: Frontend source code.
*   `server/`: Backend API source code.
*   `data/`: Storage directory for review JSON files (ignored by git).
*   `weekly-stoic-review-template.md`: The original markdown template used as the design basis.

## Building and Running

### Prerequisites
*   Node.js installed.

### Installation
1.  Install dependencies for root, client, and server:
    ```bash
    npm install
    cd client && npm install
    cd ../server && npm install
    cd ..
    ```

### Development Server
Start both the backend (API) and frontend (Vite) concurrently:
```bash
npm start
```
*   **Frontend:** `http://localhost:5173`
*   **Backend:** `http://localhost:3001`

## Development Conventions

### Tech Stack
*   **Frontend:** React 19, Vite, Tailwind CSS v3, React Router v7, Lucide React.
*   **Backend:** Express 5, CORS, Body-Parser.
*   **Storage:** Local filesystem (JSON files in `./data`).

### Styling & UI
*   **Theme:** Minimalist, "paper-like" aesthetic using `stone` colors (e.g., `bg-stone-50`, `text-stone-800`).
*   **Typography:**
    *   **Serif:** 'Lora' (Body text, specific headers) - for a book-like feel.
    *   **Sans-Serif:** 'Inter' (UI elements, buttons, navigation).
*   **Icons:** `lucide-react` for consistent, minimal SVGs.

### API Endpoints
*   `GET /api/reviews`: List all reviews (sorted by date).
*   `GET /api/reviews/:id`: Get a specific review by UUID.
*   `POST /api/reviews`: Create a new review.
    *   **Payload:** `{ date: string, answers: object }`
    *   **Storage:** Saves to `data/{uuid}.json`.

### Key Components
*   `ReviewForm.jsx`: The main interactive form. Handles complex state for multiple sections (checklists, text areas).
*   `Dashboard.jsx`: Landing page listing past reviews.
*   `ReviewView.jsx`: Read-only view of a completed reflection.
