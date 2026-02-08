---
type: user-journey
subtype: journey-wbs
title: "login-flow - WBS"
journey: "login-flow"
createdAt: "2026-02-08T01:36:21.062Z"
---

# Login Flow — Work Breakdown Structure

## 1. Authentication Provider Setup

### 1.1 Configure better-auth providers
- **Task:** Enable email/password, GitHub OAuth, and Google OAuth in `src/lib/server/auth.ts`
- **Acceptance Criteria:** All three providers are registered and return valid config
- **Dependencies:** None (foundation task)

### 1.2 Environment variables
- **Task:** Add `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` to `.env`
- **Acceptance Criteria:** Auth server starts without errors; secrets are not committed to git
- **Dependencies:** 1.1

### 1.3 Database auth schema
- **Task:** Run `npm run auth:schema` to generate/update auth tables (user, session, account)
- **Acceptance Criteria:** `db:push` succeeds; tables exist in SQLite
- **Dependencies:** 1.1

---

## 2. Login Page UI

### 2.1 Create login route
- **Task:** Create `src/routes/login/+page.svelte` with a centered login card
- **Acceptance Criteria:** Page renders at `/login` with a clean, responsive layout
- **Dependencies:** None

### 2.2 Email/password form
- **Task:** Add email + password fields with client-side validation (required, email format, min-length password)
- **Acceptance Criteria:** Form submits via POST; validation errors display inline
- **Dependencies:** 2.1

### 2.3 OAuth buttons
- **Task:** Add "Continue with GitHub" and "Continue with Google" buttons that initiate OAuth redirect
- **Acceptance Criteria:** Clicking each button redirects to the provider's auth page
- **Dependencies:** 2.1, 1.1

### 2.4 Error & loading states
- **Task:** Show loading spinner on submit; display server-returned errors (invalid credentials, OAuth failure)
- **Acceptance Criteria:** User sees feedback within 300ms of action; errors are human-readable
- **Dependencies:** 2.2, 2.3

---

## 3. Server-Side Auth Handlers

### 3.1 Login action (email/password)
- **Task:** Create `src/routes/login/+page.server.ts` with a `login` action that calls `auth.api.signInEmail`
- **Acceptance Criteria:** Valid credentials set session cookie and redirect to `/`; invalid credentials return 401 error
- **Dependencies:** 1.1, 1.3

### 3.2 OAuth callback handling
- **Task:** Verify `src/hooks.server.ts` correctly handles OAuth callback routes (`/api/auth/callback/github`, etc.)
- **Acceptance Criteria:** After provider approval, user is created/found, session is set, redirect to `/`
- **Dependencies:** 1.1, 1.2, 1.3

### 3.3 Session middleware
- **Task:** In `hooks.server.ts`, resolve the session on every request and attach `event.locals.user`
- **Acceptance Criteria:** `event.locals.user` is populated for authenticated requests, `null` otherwise
- **Dependencies:** 3.1 or 3.2

---

## 4. Session Persistence & Logout

### 4.1 Session cookie configuration
- **Task:** Configure cookie settings (httpOnly, secure, sameSite, maxAge) in better-auth config
- **Acceptance Criteria:** Session survives browser restart; cookie is httpOnly and secure in production
- **Dependencies:** 1.1

### 4.2 Logout action
- **Task:** Add a `POST /logout` action that calls `auth.api.signOut` and clears the session cookie
- **Acceptance Criteria:** After logout, user is redirected to `/login`; session cookie is removed
- **Dependencies:** 3.3

### 4.3 Logout UI
- **Task:** Add a logout button in the project layout navbar (visible when authenticated)
- **Acceptance Criteria:** Button triggers POST to logout action; confirms before logging out
- **Dependencies:** 4.2

---

## 5. Route Protection

### 5.1 Auth guard in hooks
- **Task:** In `hooks.server.ts`, redirect unauthenticated users to `/login` for protected routes
- **Acceptance Criteria:** Visiting `/` or `/{projectId}/*` without a session redirects to `/login`; `/login` is accessible without auth
- **Dependencies:** 3.3

### 5.2 Redirect after login
- **Task:** Store the originally requested URL and redirect back after successful login
- **Acceptance Criteria:** User lands on the page they originally tried to visit
- **Dependencies:** 5.1, 3.1

---

## 6. Testing & Verification

### 6.1 Manual smoke test
- **Task:** Test all three login methods end-to-end in dev environment
- **Acceptance Criteria:** Can sign up, log in, refresh (session persists), and log out for each method

### 6.2 E2E test
- **Task:** Add Playwright test covering: visit protected page → redirected to login → login → redirected back → logout → redirected to login
- **Acceptance Criteria:** `npm run test:e2e` passes
- **Dependencies:** 6.1

---

## Dependency Graph

```
1.1 → 1.2 → 3.2
 │         ↗
 ├→ 1.3 → 3.1 → 3.3 → 5.1 → 5.2
 │                 │
 ├→ 2.1 → 2.2     ├→ 4.2 → 4.3
 │    └→ 2.3      │
 │        └→ 2.4  └→ 6.1 → 6.2
 └→ 4.1
```

## Estimated Effort

| Phase | Estimate |
|---|---|
| 1. Provider Setup | ~30 min |
| 2. Login Page UI | ~45 min |
| 3. Server Handlers | ~30 min |
| 4. Session & Logout | ~20 min |
| 5. Route Protection | ~20 min |
| 6. Testing | ~30 min |
| **Total** | **~2.5 hours** |
