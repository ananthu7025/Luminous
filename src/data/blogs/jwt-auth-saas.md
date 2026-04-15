---
title: 'JWT Authentication and Role-Based Access in Production SaaS Apps'
publishDate: 'April 12, 2024'
thumbnail: '/images/blog/blog-2.png'
tag: 'SaaS'
author: 'Luminous Team'
authorImage: '/images/avatar/avatar-1.png'
readTime: '7 min'
description: 'How to handle JWTs, httpOnly cookies, and multi-tenant roles securely in production.'
slug: 'jwt-auth-saas'
---

JWT authentication looks simple in tutorials. You issue a token, you verify a token, you're done. In production multi-tenant SaaS applications the reality is messier — token expiry, refresh flows, and the ever-present question of where to store tokens securely.

### Token Storage: The httpOnly Cookie Decision
We store JWTs in httpOnly cookies, not localStorage. localStorage is accessible to any JavaScript running on the page — including injected scripts from XSS attacks. httpOnly cookies are not accessible via JavaScript at all. The tradeoff is that you need to handle CSRF protection, but for most SaaS applications that's a more manageable attack surface.

### The Refresh Token Flow
Short-lived access tokens mean you need a silent refresh mechanism. Our implementation uses an Axios interceptor that catches 401 responses, attempts a token refresh using the httpOnly refresh token cookie, and if successful retries the original request transparently.

### Role-Based Access in Multi-Tenant Context
In multi-tenant SaaS, a user might be an Admin in Organisation A and a Viewer in Organisation B. We encode both the user ID and the organisation-scoped role into the JWT payload. Middleware extracts both, verifies the token signature, and injects the resolved permission set into the request context.
