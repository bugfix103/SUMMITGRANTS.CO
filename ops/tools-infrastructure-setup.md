## Tools & Infrastructure Setup – Summit Grant Solutions

This checklist turns the high-level plan into concrete steps you (or an assistant) can follow to get fully operational.

---

## 1. Domain & Email

**Goal:** Send outreach from a professional domain email (not @gmail/@yahoo) and host a simple landing page later.

1. **Choose domain** (examples):
   - `summitgrantsolutions.com`
   - `summitgrantstudio.com`
2. **Register** on your preferred provider (Namecheap, Google Domains, Cloudflare, etc.).
3. **Create main email identity**:
   - `first@summitgrantsolutions.com` (personal)
   - `hello@summitgrantsolutions.com` or `grants@summitgrantsolutions.com` (client-facing)
4. **Set up DNS records** for email provider (e.g., Google Workspace, Zoho, Fastmail):
   - MX records (mail routing)
   - SPF (TXT)
   - DKIM (TXT from email provider)
   - DMARC (optional but recommended)

Keep login + recovery info in a secure password manager.

---

## 2. Payments – Stripe / Airwallex

**Goal:** Have simple, reusable payment links you can drop into emails and DMs.

### 2.1 Stripe Setup

1. Create a **Stripe** account with your business details.
2. In **Products**, create:
   - `Amber Grant Draft – $99`
   - `Premium Grant Draft – $199` (optionally also $299 variant)
   - `Monthly Retainer – $199/month` (optionally also $399/month)
3. For each product:
   - Add a short description (who it’s for, what’s included).
   - Set currency (USD).
   - Create a **Payment Link**.
4. Copy all payment links into a secure doc (or a Notion page) so you can quickly paste:
   - `stripe_link_amber_99`
   - `stripe_link_premium_199`
   - `stripe_link_retainer_199_month`

### 2.2 Airwallex (Optional / International)

If you use **Airwallex**:

1. Create similar products in Airwallex (or generic payment links with clear titles).
2. Store these links alongside your Stripe links.
3. Decide a simple rule: default to **Stripe** for US clients unless they require a different option.

---

## 3. AI & Productivity Tools

**Goal:** Have a fast, reliable drafting environment plus a central place to track leads and clients.

### 3.1 Drafting AI

1. Make sure you have an active subscription to:
   - **Claude** or **Grok** (or equivalent, configurable in your stack).
2. Create a **saved system prompt** for Summit Grant Solutions including:
   - Who we serve (women-owned food/retail in US).
   - How we write (warm, professional, encouraging).
   - Pricing tiers and the “we draft, client submits” rule.
3. Create a **standard grant-drafting prompt template** that expects:
   - Business background
   - Owner story
   - Goals
   - Use of funds
   - Impact on community

Save these prompts in your AI tool and also as markdown files in this repo (e.g., `ops/prompts/`).

### 3.2 Tracking – Notion / Google Sheets

1. Create a **“Summit Pipeline”** database (Notion) or Google Sheet with tabs:
   - `Leads`
   - `Clients`
   - `Grants`
2. Minimum columns for `Leads`:
   - Business name
   - Owner name
   - Email
   - State
   - Sector (Food / Retail / Other)
   - Grant Virgin Score
   - Outreach status (Not Contacted / Contacted / Replied / Won / Lost)
3. Minimum columns for `Clients`:
   - Client name
   - Package purchased (Basic / Premium / Retainer)
   - Intake form status
   - Draft status (Not Started / In Progress / Delivered)
   - Upsell status

Store links to these workspaces in a central internal doc so you and any assistant can find them.

---

## 4. Outreach & Automation Platforms

**Goal:** Be able to source leads, send cold outreach at scale, and connect tools so follow-up is automatic.

### 4.1 Lead Sourcing – Apollo / Clay

1. Create an **Apollo.io** or **Clay** account.
2. Define saved searches for your ICP:
   - Title: Owner / Founder / CEO
   - Keywords: bakery, cafe, coffee, catering, food truck, shop, retail, women-owned
   - Geography: United States (with filters for CA/NY/TX/FL/IL when needed)
3. Set up export/enrichment to include:
   - Work email
   - Website
   - LinkedIn profile URL
   - Company industry and size
4. Export a small test list (e.g., 50–100 leads) before scaling to 500–1,000/day.

### 4.2 Outreach – Instantly.ai / Smartlead

1. Create an **Instantly.ai** or **Smartlead** account.
2. Connect your sender mailbox:
   - Add `name@summitgrantsolutions.com` (or similar).
   - Follow their instructions to verify **SPF/DKIM/DMARC**.
3. Configure **warm-up** if available:
   - Start with low daily send (10–20 emails/day).
   - Gradually increase over 2–3 weeks.
4. Create at least two **sending accounts** if possible:
   - Main: `first@summitgrantsolutions.com`
   - Backup/alt: `hello@summitgrantsolutions.com`

You’ll plug in templates from `outreach/` once they’re created.

### 4.3 Glue – Zapier

1. Create a **Zapier** account (free tier is fine to start).
2. Plan basic automations (“Zaps”) such as:
   - **Zap 1**: “Stripe payment → Add/Update Client row”
     - Trigger: New successful payment in Stripe.
     - Actions:
       - Find or create client in your `Clients` sheet/database.
       - Send a templated **“Thank you + Intake Form”** email.
   - **Zap 2**: “Intake form submitted → Internal notification”
     - Trigger: New response in Google Form.
     - Actions:
       - Update the relevant client’s status.
       - Send you a Slack/Email notification to start drafting.
3. Document these Zaps in a short internal SOP so they can be maintained by an assistant later.

---

## 5. Quick Setup Checklist (Copy/Paste Friendly)

- [ ] Domain purchased and DNS configured  
- [ ] Professional email created (and tested)  
- [ ] Stripe account live with 3 products + payment links saved  
- [ ] (Optional) Airwallex links created and saved  
- [ ] AI drafting environment configured with Summit Grant system prompt  
- [ ] Notion or Google Sheets pipeline created (Leads, Clients, Grants)  
- [ ] Apollo/Clay account set up with at least one saved search for ICP  
- [ ] Instantly/Smartlead account set up, sender mailbox connected, warm-up running  
- [ ] Zapier account created with at least:
  - [ ] Stripe → Client + Intake email zap
  - [ ] Intake form → Notification zap

Once all checkboxes are ticked, the infrastructure todo in the master plan is effectively complete.

