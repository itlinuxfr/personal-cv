# Benjamin Martineau - Curriculum Vitae

Interactive and responsive curriculum vitae developed using modern web technologies.

## Tech Stack

This project is built using:

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion
- UI Icons: Lucide React & Simple Icons

## Project Architecture

The codebase adheres to the Next.js App Router guidelines:

- `src/app`: Contains the global layout, routing definitions, global stylesheets, and the main page.
- `src/components`: Houses the React components split into structural parts (Hero, About, Experience, Skills, Navbar, Contact) and sub-components (Background canvases, containers).
- `src/lib`: Contains data structures (`data.ts`) separating content from rendering logic, and utility functions (`utils.ts`).

## Running Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

This application is designed as a Single Page Application (SPA). By setting `output: 'export'` in the Next.js configuration, it can be deployed as static files to any static hosting provider, including GitHub Pages or Vercel.
