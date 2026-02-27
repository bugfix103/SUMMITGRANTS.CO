## Summit Grant Admin Dashboard

Local dashboard to manage **leads, clients, and KPIs** for Summit Grant Solutions.

### Structure

- `admin-api/` – Node + Express + SQLite API
  - `server.js` – REST API for `/api/leads`, `/api/clients`, `/api/kpi-events`
  - `data/summit.db` – SQLite database (auto-created)
- `admin-web/` – React + Vite frontend
  - Tabs for **Leads**, **Clients**, and **KPIs** backed by the API

---

## How to Run Locally

From the project root (`SUMMITGRANTsolutions.com`):

### 1. Start the API

```bash
cd admin-api
npm install    # first time only
npm start
```

This starts the API at `http://localhost:4000`.

### 2. Start the Admin UI

Open a second terminal:

```bash
cd admin-web
npm install    # first time only
npm run dev
```

Vite will show a local URL like `http://localhost:5173`. Open it in your browser.

---

## What You’ll See

- **Leads tab**
  - Pulls from `GET /api/leads`
  - Shows ID, business name, owner, email, state, sector, Grant Virgin score, priority, and status.

- **Clients tab**
  - Pulls from `GET /api/clients`
  - Shows package type, intake status, draft status, upsell status, and notes, joined with business name where available.

- **KPIs tab**
  - Pulls from `GET /api/kpi-events`
  - Shows per-day/channel metrics and a simple total revenue summary.

At the moment, the UI is **read-only** – use it to monitor what’s in the database. You can extend it later with forms to add/edit entries.

---

## Sharing With a Partner

Everything is committed into this repo, so your partner just needs to:

```bash
git clone https://github.com/bugfix103/SUMMITGRANTsolutions.com.git
cd SUMMITGRANTsolutions.com
```

Then they can run the same commands:

```bash
cd admin-api && npm install && npm start
cd ../admin-web && npm install && npm run dev
```

Each of you will have your **own local SQLite database**, so if you want to share data, either:

- Export/import from the database, or
- Later connect this API to a shared hosted database.

