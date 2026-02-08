---
type: user-journey
subtype: journey-idea
title: "Login Flow"
journey: "login-flow"
createdAt: "2026-02-08T01:36:21.062Z"
---

# Login Flow Journey

## User Profile
A developer who wants to access their RAP Manager projects securely. They may be working solo or on a small team and expect modern auth options.

## Goal
Authenticate the user so they can access their projects and documentation dashboard. Unauthenticated users should be redirected to a login page.

## Expected Flow

1. **Unauthenticated visit** — User navigates to any project page and is redirected to `/login`
2. **Choose auth method** — Login page presents email/password form and OAuth buttons (GitHub, Google)
3. **Email/password path** — User enters credentials → server validates → session cookie set → redirect to original page
4. **OAuth path** — User clicks "Continue with GitHub/Google" → redirected to provider → approves → callback creates/finds user → session set → redirect
5. **Session persistence** — Browser refresh preserves the session via httpOnly cookie
6. **Logout** — User clicks logout in navbar → confirmation → session cleared → redirect to `/login`

## Current Codebase State
- `better-auth` is already installed and configured in `src/lib/server/auth.ts`
- `hooks.server.ts` already resolves sessions and attaches `event.locals.user`
- Auth schema tables exist via `src/lib/server/db/auth.schema.ts`
- No login page UI exists yet
- No route protection middleware exists yet
