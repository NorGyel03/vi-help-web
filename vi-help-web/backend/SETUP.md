# VIHelp Backend — Setup Guide

## 1. Install dependencies

Open a terminal, navigate to the `backend` folder, and run:

```bash
cd backend
npm install
```

---

## 2. Configure environment variables

Copy `.env.example` to `.env`:

```bash
copy .env.example .env
```

Then edit `.env` and fill in your values:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx   ← your Resend API key (see below)
NOTIFY_EMAIL=vihelp.ai@gmail.com
ADMIN_PASSWORD=choose_a_strong_password
JWT_SECRET=any_long_random_string_here
FRONTEND_URL=http://localhost:5173
```

### How to get a Resend API key (free, 2 minutes)

1. Sign up at [resend.com](https://resend.com) (free — 3,000 emails/month)
2. Go to **API Keys** → **Create API Key** → name it "VIHelp"
3. Copy the key (starts with `re_`) → paste as `RESEND_API_KEY`

**That's it.** Emails will be sent from `onboarding@resend.dev` initially.
Once you have a custom domain (e.g. `vihelp.bt`), verify it in the Resend dashboard
and set `RESEND_FROM=VIHelp <hello@vihelp.bt>` in your `.env`.

---

## 3. Start the backend

```bash
# Production
npm start

# Development (auto-restarts on file changes — requires nodemon)
npm run dev
```

The server starts at **http://localhost:3001**

| URL | Purpose |
|-----|---------|
| `http://localhost:3001/admin` | Admin dashboard |
| `http://localhost:3001/api/health` | Health check |
| `POST /api/contact` | Contact form submissions |
| `POST /api/waitlist` | Waitlist signups |

---

## 4. Start the frontend

In a **separate terminal**:

```bash
cd ..          # back to vi-help-web root
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## 5. Admin dashboard

Open **http://localhost:3001/admin** and log in with your `ADMIN_PASSWORD`.

Features:
- View all contact form messages (unread highlighted)
- Mark messages as read / delete them
- View + manage waitlist subscribers
- Export contacts or waitlist to CSV
- Live stats (total, unread, today's signups)

---

## 6. Deploy to production (later)

When you're ready to go live:

1. Deploy backend to **Railway**, **Render**, or **Fly.io** (all have free tiers)
2. Set environment variables in the platform's dashboard
3. Update `VITE_API_URL` in the frontend (create `vi-help-web/.env`):
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
4. Update `FRONTEND_URL` in the backend `.env` to your live frontend domain
5. Rebuild and deploy the frontend to **Vercel** or **Netlify**

---

## Database

The SQLite database file (`vihelp.db`) is created automatically in the `backend/` folder on first run. No setup needed.

To back it up: just copy `vihelp.db` anywhere.
