import { useEffect, useState } from "react";
import "./App.css";

type Lead = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  business_name: string;
  email: string | null;
  state: string | null;
  sector: string | null;
  grant_virgin_score: number | null;
  priority: string | null;
  status: string | null;
};

type Client = {
  id: number;
  lead_id: number;
  business_name?: string;
  package_type: string | null;
  intake_status: string | null;
  draft_status: string | null;
  upsell_status: string | null;
  notes: string | null;
};

type KpiEvent = {
  id: number;
  date: string;
  channel: string | null;
  leads_contacted: number | null;
  positive_replies: number | null;
  payments_collected: number | null;
  clients_count: number | null;
  drafts_delivered: number | null;
  reported_wins: number | null;
  revenue: number | null;
  notes: string | null;
};

type Tab = "leads" | "clients" | "kpi";

const API_BASE = "http://localhost:4000/api";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("leads");

  return (
    <div className="app">
      <header className="app-header">
        <h1>Summit Grant Admin</h1>
        <p>Local dashboard for leads, clients, and KPIs.</p>
      </header>
      <nav className="tabs">
        <button
          className={activeTab === "leads" ? "tab active" : "tab"}
          onClick={() => setActiveTab("leads")}
        >
          Leads
        </button>
        <button
          className={activeTab === "clients" ? "tab active" : "tab"}
          onClick={() => setActiveTab("clients")}
        >
          Clients
        </button>
        <button
          className={activeTab === "kpi" ? "tab active" : "tab"}
          onClick={() => setActiveTab("kpi")}
        >
          KPIs
        </button>
      </nav>
      <main className="app-main">
        {activeTab === "leads" && <LeadsView />}
        {activeTab === "clients" && <ClientsView />}
        {activeTab === "kpi" && <KpiView />}
      </main>
    </div>
  );
}

function LeadsView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/leads`);
      const data = await res.json();
      setLeads(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <section>
      <div className="section-header">
        <h2>Leads</h2>
        <button onClick={fetchLeads}>Refresh</button>
      </div>
      {loading && <p>Loading leads…</p>}
      {!loading && leads.length === 0 && <p>No leads yet.</p>}
      {!loading && leads.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Business</th>
                <th>Owner</th>
                <th>Email</th>
                <th>State</th>
                <th>Sector</th>
                <th>GV Score</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.business_name}</td>
                  <td>
                    {[lead.first_name, lead.last_name].filter(Boolean).join(" ")}
                  </td>
                  <td>{lead.email}</td>
                  <td>{lead.state}</td>
                  <td>{lead.sector}</td>
                  <td>{lead.grant_virgin_score ?? ""}</td>
                  <td>{lead.priority}</td>
                  <td>{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function ClientsView() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/clients`);
      const data = await res.json();
      setClients(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <section>
      <div className="section-header">
        <h2>Clients</h2>
        <button onClick={fetchClients}>Refresh</button>
      </div>
      {loading && <p>Loading clients…</p>}
      {!loading && clients.length === 0 && <p>No clients yet.</p>}
      {!loading && clients.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Business</th>
                <th>Package</th>
                <th>Intake</th>
                <th>Draft</th>
                <th>Upsell</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.business_name ?? c.lead_id}</td>
                  <td>{c.package_type}</td>
                  <td>{c.intake_status}</td>
                  <td>{c.draft_status}</td>
                  <td>{c.upsell_status}</td>
                  <td>{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function KpiView() {
  const [events, setEvents] = useState<KpiEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchKpis = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/kpi-events`);
      const data = await res.json();
      setEvents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKpis();
  }, []);

  const totalRevenue = events.reduce(
    (sum, e) => sum + (e.revenue || 0),
    0
  );

  return (
    <section>
      <div className="section-header">
        <h2>KPIs</h2>
        <button onClick={fetchKpis}>Refresh</button>
      </div>
      {events.length > 0 && (
        <p className="kpi-summary">
          Total recorded revenue: <strong>${totalRevenue.toFixed(2)}</strong>
        </p>
      )}
      {loading && <p>Loading KPI events…</p>}
      {!loading && events.length === 0 && <p>No KPI events yet.</p>}
      {!loading && events.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Channel</th>
                <th>Leads</th>
                <th>Positive</th>
                <th>Payments</th>
                <th>Clients</th>
                <th>Drafts</th>
                <th>Wins</th>
                <th>Revenue</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td>{e.channel}</td>
                  <td>{e.leads_contacted ?? ""}</td>
                  <td>{e.positive_replies ?? ""}</td>
                  <td>{e.payments_collected ?? ""}</td>
                  <td>{e.clients_count ?? ""}</td>
                  <td>{e.drafts_delivered ?? ""}</td>
                  <td>{e.reported_wins ?? ""}</td>
                  <td>{e.revenue != null ? `$${e.revenue.toFixed(2)}` : ""}</td>
                  <td>{e.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default App;
