# Product Guidelines

## Prose Style

- **Tone**: Technical, clear, and encouraging.
- **Clarity**: Use active voice and concise sentences.
- **Consistency**: Use consistent terminology (e.g., always use "sighting" for a recorded observation).

## Branding & Visual Identity

- **Aesthetic**: Minimalist, modern, and high-contrast.
- **Naming**: Use "Avian-AI" or similar bird-themed naming where appropriate.
- **Typography**: Clean, sans-serif fonts for readability (e.g., Inter, system-sans).

## UX Principles

- **Mobile-First**: Ensure the dashboard and history pages are fully responsive.
- **Immediate Feedback**: Show loading states and success/error messages for all asynchronous operations (e.g., image upload, inference).
- **Accessibility**: Adhere to WCAG 2.1 AA standards for color contrast and keyboard navigation.

## Design System (Tailwind + Shadcn UI)

- **Components**: Leverage Shadcn UI for standard elements (Buttons, Alerts, Data Tables).
- **Colors**: Use a neutral palette with nature-inspired accents (e.g., forest green, sky blue).
- **Spacing**: Maintain generous whitespace to prevent clutter.

## Data Handling & Privacy

- **Local Storage**: Prioritize local storage (SQLite) for sighting history.
- **Transparency**: Clearly inform users when their data is being used for model training or inference.

## FastAPI API documentation reference

For backend API exploration and testing during development:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI schema: `http://localhost:8000/openapi.json`
