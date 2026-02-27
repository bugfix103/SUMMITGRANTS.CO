const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "data", "summit.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      business_name TEXT NOT NULL,
      email TEXT,
      state TEXT,
      sector TEXT,
      grant_virgin_score INTEGER,
      priority TEXT,
      status TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id INTEGER,
      package_type TEXT,
      intake_status TEXT,
      draft_status TEXT,
      upsell_status TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(id)
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS kpi_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      channel TEXT,
      leads_contacted INTEGER,
      positive_replies INTEGER,
      payments_collected INTEGER,
      clients_count INTEGER,
      drafts_delivered INTEGER,
      reported_wins INTEGER,
      revenue REAL,
      notes TEXT
    )`
  );
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/leads", (req, res) => {
  db.all("SELECT * FROM leads ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch leads" });
    }
    res.json(rows);
  });
});

app.post("/api/leads", (req, res) => {
  const {
    first_name,
    last_name,
    business_name,
    email,
    state,
    sector,
    grant_virgin_score,
    priority,
    status,
  } = req.body;

  if (!business_name) {
    return res.status(400).json({ error: "business_name is required" });
  }

  const stmt = db.prepare(
    `INSERT INTO leads
     (first_name, last_name, business_name, email, state, sector, grant_virgin_score, priority, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  stmt.run(
    first_name || null,
    last_name || null,
    business_name,
    email || null,
    state || null,
    sector || null,
    grant_virgin_score != null ? grant_virgin_score : null,
    priority || null,
    status || "new",
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to create lead" });
      }
      db.get("SELECT * FROM leads WHERE id = ?", [this.lastID], (err2, row) => {
        if (err2) {
          return res
            .status(500)
            .json({ error: "Lead created but failed to fetch" });
        }
        res.status(201).json(row);
      });
    }
  );

  stmt.finalize();
});

app.put("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    business_name,
    email,
    state,
    sector,
    grant_virgin_score,
    priority,
    status,
  } = req.body;

  db.run(
    `UPDATE leads
     SET first_name = ?, last_name = ?, business_name = ?, email = ?, state = ?, sector = ?,
         grant_virgin_score = ?, priority = ?, status = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      first_name || null,
      last_name || null,
      business_name,
      email || null,
      state || null,
      sector || null,
      grant_virgin_score != null ? grant_virgin_score : null,
      priority || null,
      status || null,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to update lead" });
      }
      db.get("SELECT * FROM leads WHERE id = ?", [id], (err2, row) => {
        if (err2 || !row) {
          return res.status(404).json({ error: "Lead not found after update" });
        }
        res.json(row);
      });
    }
  );
});

app.get("/api/clients", (req, res) => {
  db.all(
    `SELECT c.*, l.business_name
     FROM clients c
     LEFT JOIN leads l ON c.lead_id = l.id
     ORDER BY c.created_at DESC`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch clients" });
      }
      res.json(rows);
    }
  );
});

app.post("/api/clients", (req, res) => {
  const {
    lead_id,
    package_type,
    intake_status,
    draft_status,
    upsell_status,
    notes,
  } = req.body;

  if (!lead_id) {
    return res.status(400).json({ error: "lead_id is required" });
  }

  const stmt = db.prepare(
    `INSERT INTO clients
     (lead_id, package_type, intake_status, draft_status, upsell_status, notes)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  stmt.run(
    lead_id,
    package_type || "basic",
    intake_status || "not_started",
    draft_status || "not_started",
    upsell_status || "not_offered",
    notes || null,
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to create client" });
      }
      db.get("SELECT * FROM clients WHERE id = ?", [this.lastID], (err2, row) => {
        if (err2 || !row) {
          return res
            .status(500)
            .json({ error: "Client created but failed to fetch" });
        }
        res.status(201).json(row);
      });
    }
  );

  stmt.finalize();
});

app.put("/api/clients/:id", (req, res) => {
  const { id } = req.params;
  const {
    package_type,
    intake_status,
    draft_status,
    upsell_status,
    notes,
  } = req.body;

  db.run(
    `UPDATE clients
     SET package_type = ?, intake_status = ?, draft_status = ?, upsell_status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      package_type || null,
      intake_status || null,
      draft_status || null,
      upsell_status || null,
      notes || null,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to update client" });
      }
      db.get("SELECT * FROM clients WHERE id = ?", [id], (err2, row) => {
        if (err2 || !row) {
          return res
            .status(404)
            .json({ error: "Client not found after update" });
        }
        res.json(row);
      });
    }
  );
});

app.get("/api/kpi-events", (req, res) => {
  db.all("SELECT * FROM kpi_events ORDER BY date DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch KPI events" });
    }
    res.json(rows);
  });
});

app.post("/api/kpi-events", (req, res) => {
  const {
    date,
    channel,
    leads_contacted,
    positive_replies,
    payments_collected,
    clients_count,
    drafts_delivered,
    reported_wins,
    revenue,
    notes,
  } = req.body;

  if (!date) {
    return res.status(400).json({ error: "date is required" });
  }

  const stmt = db.prepare(
    `INSERT INTO kpi_events
     (date, channel, leads_contacted, positive_replies, payments_collected, clients_count,
      drafts_delivered, reported_wins, revenue, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  stmt.run(
    date,
    channel || null,
    leads_contacted != null ? leads_contacted : null,
    positive_replies != null ? positive_replies : null,
    payments_collected != null ? payments_collected : null,
    clients_count != null ? clients_count : null,
    drafts_delivered != null ? drafts_delivered : null,
    reported_wins != null ? reported_wins : null,
    revenue != null ? revenue : null,
    notes || null,
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to create KPI event" });
      }
      db.get(
        "SELECT * FROM kpi_events WHERE id = ?",
        [this.lastID],
        (err2, row) => {
          if (err2 || !row) {
            return res
              .status(500)
              .json({ error: "KPI event created but failed to fetch" });
          }
          res.status(201).json(row);
        }
      );
    }
  );

  stmt.finalize();
});

app.listen(PORT, () => {
  console.log(`Admin API listening on http://localhost:${PORT}`);
});

