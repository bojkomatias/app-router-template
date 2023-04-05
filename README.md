## App Router Starter

Welcome, this is a App Router Starter with configuration to get a full type-safe project and easily customizable styles.

- ESLint & { eslint-plugins }
- Typescript
- Tailwind
- Prettier & { prettier-tailwind-plugin }

** More coming soon **

### Get Started

First, run the development server:

```bash
pnpm dev
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `app/api/hello.ts`.

This project uses [`next/font`](https://beta.nextjs.org/docs/optimizing/fonts) to automatically optimize and load Bagnard, a custom font. This configuration is easily replaced by any other local font or a Google Font.

Create new nested pages and layouts as your application grows. Use `modules/` directory for custom elements that are reused through your application. The ts-path is already configured as _@module_

A general rule, if a component is tightly coupled with a functionality on a `segment` consider placing it on `app/` if not, place it on `modules/`.
