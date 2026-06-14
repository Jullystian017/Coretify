# AGENTS.md

## Project Principles

This project must prioritize:

1. Performance
2. Scalability
3. Security
4. Maintainability
5. Developer Experience

Never sacrifice architecture quality for short-term speed.

---

# Architecture Rules

## Code Quality

* Follow clean architecture principles.
* Use modular and reusable components.
* Avoid duplicate code (DRY).
* Keep functions small and single-purpose.
* Prefer composition over inheritance.
* Use TypeScript strict mode.
* No `any` unless absolutely necessary.

---

# Folder Structure

Organize code by feature, not by file type.

Example:

src/
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── projects/
│   └── ai/
├── components/
├── hooks/
├── lib/
├── services/
├── types/
├── utils/

---

# Performance Rules

* Server Components by default.
* Client Components only when necessary.
* Lazy load heavy components.
* Use dynamic imports.
* Avoid unnecessary re-renders.
* Use pagination for large datasets.
* Implement caching where possible.
* Optimize images.
* Avoid N+1 queries.
* Use database indexes.

Performance target:

* Lighthouse > 90
* First Load JS < 200KB if possible.

---

# Database Rules

* Always use migrations.
* Use proper indexes.
* Avoid SELECT * queries.
* Prevent N+1 queries.
* Use transactions when needed.
* Never expose database credentials.

---

# API Rules

* Use REST or tRPC consistently.
* Validate every request.
* Return typed responses.
* Implement rate limiting.
* Add request logging.
* Use idempotency for critical actions.

---

# Security Rules

## Authentication

* Use secure sessions.
* Store secrets in environment variables.
* Never hardcode secrets.
* Enable MFA if applicable.

## Authorization

* Role Based Access Control (RBAC).
* Permission checks on every sensitive action.
* Never trust client-side authorization.

## Input Validation

* Validate all inputs.
* Sanitize user-generated content.
* Protect against:

  * SQL Injection
  * XSS
  * CSRF
  * SSRF
  * Command Injection

## Security Headers

Enable:

* CSP
* X-Frame-Options
* X-Content-Type-Options
* Referrer-Policy

---

# AI Rules

* Never expose API keys to frontend.
* Never send sensitive data to LLMs without user consent.
* Implement token usage limits.
* Log AI errors.
* Cache AI responses where possible.
* Use background jobs for long-running AI tasks.

---

# Background Jobs

Use queues for:

* Email sending
* AI processing
* Embedding generation
* File processing
* Notifications

Never block user requests.

---

# Logging

Implement:

* Error logging
* Audit logs
* Authentication logs
* AI activity logs

---

# Monitoring

Track:

* API latency
* Error rate
* Database performance
* Queue performance
* AI cost
* Token usage

---

# Testing

Minimum requirements:

* Unit Tests
* Integration Tests
* End-to-End Tests for critical flows.

Critical flows:

* Authentication
* Payments
* AI workflows
* Data synchronization

---

# Documentation

Every feature must include:

* Purpose
* Architecture notes
* API documentation
* Environment variables

---

# Accessibility

* Semantic HTML.
* Keyboard navigation.
* Proper labels.
* Sufficient color contrast.

---

# Production Rules

* Feature flags for risky features.
* Environment separation.
* Database backups.
* Error monitoring.
* Rollback strategy.

---

# Core Principle

Build for 10 users as if it will serve 1 million users.

Optimize for simplicity first, then scalability.

Never introduce unnecessary complexity.
