# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a Next.js 15 application using the App Router architecture:
- `my-app/app/` - Contains all pages and layouts using the App Router pattern
- `my-app/public/` - Static assets 
- `my-app/` - Main application directory

## Development Commands

```bash
cd my-app

# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start
```

## Technology Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Build Tool**: Turbopack (enabled by default)
- **Styling**: Tailwind CSS v4 with PostCSS
- **TypeScript**: Configured with strict mode
- **Fonts**: Geist Sans and Geist Mono via next/font
- **React**: Version 19.1.0

## Key Configuration

- TypeScript path mapping configured for `@/*` imports pointing to the root
- Tailwind CSS v4 uses inline theme configuration in `globals.css`
- Dark mode support via CSS custom properties and `prefers-color-scheme`
- Next.js configuration is minimal with default settings

## Development Notes

- The app uses Next.js App Router (not Pages Router)
- Main entry point is `app/page.tsx` with layout in `app/layout.tsx`
- CSS variables are used for theming with automatic dark mode detection
- All build and dev commands use Turbopack for faster compilation