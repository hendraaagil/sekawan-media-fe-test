# Sekawan Media Frontend Test

This is a dashboard app built with React.

## Stack

This project is using:

- [Vite v5](https://vitejs.dev/blog/announcing-vite5.html)
- [React v18](https://react.dev/)
- [Tailwind v3](https://tailwindcss.com/) with [tremor](https://www.tremor.so/)
- [React Router v6](https://reactrouter.com/en/6.20.0)
- [React Query v5](https://tanstack.com/query/v5)
- [React Table v8](https://tanstack.com/table/v8)
- And others utilities library, can found at [package.json](/package.json)

## Local Development Setup

Node.js `>= 18.x` is required and setup with [pnpm](https://pnpm.io/) is recommended.

```sh
# Install all dependencies
pnpm install

# Serve
pnpm dev

# Build for production
pnpm build
```

### Authentication

This app is using dummy / fake authentication. You can change it at [src/apis/auth.ts](src/apis/auth.ts#L9-L10).

Or you can use the existing one:

**Admin**

- Email: `admin@agil.dev`
- Password: `hendra123`

**Guest**

- Email: `guest@agil.dev`
- Password: `hendra123`
