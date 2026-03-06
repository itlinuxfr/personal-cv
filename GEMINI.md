# AI Assistant Guidelines (Gemini)

## Project Context

This repository contains the interactive portfolio and CV for Benjamin Martineau, focusing heavily on his expertise as an OpenShift/Kubernetes Tech Lead and Senior Platform Engineer.

## Technologies Used

- Next.js 14+ (App Router paradigm)
- TypeScript
- Tailwind CSS (Utility-first styling)
- Framer Motion (Animations and interactive layouts)

## System Instructions for Gemini

1. **Data Source of Truth**: All configuration and textual data for the CV is extracted into `src/lib/data.ts`. If the user asks you to modify their career path, skills, or links, you must edit this file.
2. **File Structure**:
   - `src/app/globals.css`: Contains CSS variables acting as design tokens (colors, gradients) and complex custom animations.
   - `src/components/`: Modular React functional components.
3. **Coding Standards**:
   - Use TypeScript for all new files and components. Ensure type safety.
   - Prefer Tailwind utility classes over custom CSS.
   - When modifying components, ensure they remain responsive (using `sm:`, `md:`, `lg:` prefixes).
4. **Professionalism**: Do not introduce emojis (`✅`, `✨`, etc.) into markdown documentation or source code text unless specifically required for an easter egg.
5. **Animations**: Maintain the subtle, physics-based (springs/damping) feel introduced by Framer Motion. Avoid jarring or unnecessarily lengthy animations.
