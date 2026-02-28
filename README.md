## Summit Grant Solutions – Repo Guide

This repo contains everything needed to run the **Summit Grant Solutions** hustle and the local **admin dashboard**.

It is designed so you and your partners can clone it from GitHub and be productive in minutes.

---

## 1. What’s Inside

- `NOTES.MD`, `NOTES2.MD` – high-level business notes and niche research.
- `docs/` – offer, positioning, and internal thinking.
- `ops/` – SOPs for:
  - Grant Virgin scoring
  - Tools/infrastructure setup
  - Client workflow from “yes” to upsell
- `outreach/` – email + LinkedIn templates and Instantly/Smartlead campaign configs.
- `templates/` – CSV templates for Grant Virgin scoring, etc.
- `analytics/` – KPI tracking template + scaling guide.
- `admin-api/` – Node + Express + SQLite API for leads, clients, KPIs.
- `admin-web/` – React + Vite admin dashboard UI.
- `ADMIN_DASHBOARD.md` – focused docs for the dashboard.

---

## 2. Prerequisites

On each machine (you and partners), install:

- **Node.js** 18+ (includes `npm`)
- **Git**

Clone the repo:

```bash
git clone https://github.com/bugfix103/SUMMITGRANTsolutions.com.git
cd SUMMITGRANTsolutions.com
```

---

## 3. Running the Local Admin Dashboard

The dashboard has two parts: API + web UI.

### 3.1 Start the API

```bash
cd admin-api
npm install    # first time only
npm start      # starts on http://localhost:4000
```

### 3.2 Start the Admin UI

Open a second terminal:

```bash
cd admin-web
npm install    # first time only
npm run dev
```

Vite will print a URL like `http://localhost:5173`. Open it in your browser.

You’ll see three tabs:

- **Leads** – list of leads with Grant Virgin score, priority, status.
- **Clients** – list of clients and their workflow status.
- **KPIs** – events and total revenue summary.

Right now the UI is primarily read-only; you can extend it with forms later.

For more detail, see `ADMIN_DASHBOARD.md`.

---

## 4. Using the SOPs and Templates

- Read `docs/offer-and-positioning.md` to understand the core offer and ideal client.
- Follow `ops/tools-infrastructure-setup.md` to set up:
  - Domain + email
  - Stripe/Airwallex
  - AI tools and Zapier
- Use `ops/grant-virgin-scoring-sop.md` with `templates/grant-virgin-scoring-template.csv` to score leads.
- Use the outreach files in `outreach/` to configure Instantly/Smartlead and LinkedIn outreach.
- Track pipeline metrics using `analytics/kpi-tracking-template.csv` and `analytics/kpi-and-scaling-guide.md`.

---

## 5. Working With a Partner

Recommended workflow:

1. Both of you clone this repo from GitHub.
2. Each person runs the **admin dashboard** locally on their machine.
3. Make changes in feature branches, then:
   - `git add ...`
   - `git commit -m "message"`
   - `git push`
4. Open pull requests on GitHub for review if you want extra safety.

Each person has their **own local SQLite DB** by default. If you want to share live data in the future, you can:

- Point the API at a shared database (e.g., hosted Postgres), or
- Sync data by exporting/importing CSVs.

This setup keeps things simple today while giving you a clear path to more automation and shared infrastructure later.

