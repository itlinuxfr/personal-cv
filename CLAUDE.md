# AI Assistant Guidelines (Claude)

## Project Context

This is the personal interactive CV website for Benjamin Martineau, a Tech Lead OpenShift/Kubernetes and DevOps Engineer with strong infrastructure experience.
The tone of the project should remain professional but modern, reflecting a senior engineering profile.

## Tech Stack

- Next.js (App Router)
- TypeScript (Strict mode enabled)
- Tailwind CSS
- Framer Motion

## Architectural Rules

1. **Component Separation**: Keep UI components isolated in `src/components`.
2. **Data Management**: All dynamic CV content (Experiences, Skills, Stats, Links) must reside in `src/lib/data.ts`. Do not hardcode personal data within React components.
3. **Styling**: Always utilize Tailwind CSS classes for styling. Avoid inline `style` tags unless managing complex dynamic values (such as Framer Motion variants).
4. **Tone in Codebase**: Comments and internal naming conventions should remain professional.
5. **No Emojis**: Do not add unnecessary emojis to documentation or string contents unless explicitly requested by the user.

## Common Tasks

- When updating experiences or skills, directly modify the arrays in `src/lib/data.ts`.
- When adding new "Tech Pods" to the background canvas, add their SimpleIcons slug to the `TECHS` array in `data.ts`.
