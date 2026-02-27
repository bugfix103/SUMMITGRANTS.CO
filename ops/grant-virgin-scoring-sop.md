## Grant Virgin Scoring SOP – Summit Grant Solutions

**Purpose:** Quickly identify women-owned food/retail businesses that are highly likely to be eligible for private grants but have **never** applied (“Grant Virgins”). We use this to prioritize leads for outreach.

---

## 1. Inputs You Need

For each business, gather:

- Business name
- Owner name (if available)
- Website URL
- Email address
- State (US only)
- Sector:
  - `Food` – cafes, bakeries, restaurants, food trucks, catering
  - `Retail` – small shops, boutiques, markets
  - `Other` – de-prioritized unless clearly a good fit for private grants

Record everything in `templates/grant-virgin-scoring-template.csv` or a matching Google Sheet.

---

## 2. Scoring Rules

We assign points based on three categories:

- **Red Flags** – strong signals of disorganization / no grant history  
  - **25 points each**, up to a maximum of **100 points from red flags**
- **Yellow Flags** – softer signals of under-optimization  
  - **10 points each**
- **Green Bonuses** – extra hints they haven’t optimized for funding yet  
  - **5 points each**

### 2.1 Red Flags (25 pts each)

Add **25 points** for each that applies:

- Outdated or free-tier website:
  - Free Wix/Weebly subdomain (`.wixsite.com`, etc.)
  - No SSL (`http://` or browser shows “Not secure”)
  - Very old copyright date (e.g., 2018–2020)
- Google Business Profile:
  - Not claimed or incomplete
  - 0–3 reviews total
- Email:
  - Business contact is `@gmail.com`, `@hotmail.com`, or `@yahoo.com`
- Socials:
  - Instagram/Facebook last post > 6 months ago
  - No LinkedIn company page

### 2.2 Yellow Flags (10 pts each)

Add **10 points** for each that applies:

- Business age is **2–8 years** (past survival, still scrappy)
- Owner background is non-business (e.g., former chef, teacher, nurse) where paperwork is unlikely to be their strength
- No visible mention of **grants, awards, or investors** on the website or socials
- No dedicated finance/operations/accounting person listed anywhere

### 2.3 Green Bonuses (5 pts each)

Add **5 points** for each that applies:

- Business name is “[Owner First Name] Bakery/Cafe/Shop” (very personal brand)
- Only a mobile phone number in contacts, no landline/office number
- No news/press articles appear when you Google “[Business Name] + grant” or “[Business Name] + award”

---

## 3. How to Score a Business (Under 3 Minutes)

1. **Open website**
   - Check domain (free subdomain vs custom).
   - Look for SSL (“https” vs “http”) and copyright year.
2. **Check Google**
   - Search `[Business Name] + city` and find their Google Business Profile.
   - Note review count and whether profile seems claimed.
3. **Scan socials**
   - Look at Instagram/Facebook for last post date.
   - Look for any mentions of grants/awards.
4. **Look at email + contact info**
   - Is the main email a free provider (`@gmail.com`, etc.)?
   - Phone number type (mobile only vs proper business contact).
5. **Fill in scoring fields**
   - In the sheet, list each red/yellow/green item in its column (separated by `;`).
   - Manually compute **Total Score**:
     - `Total = 25 × (#Red) + 10 × (#Yellow) + 5 × (#Green)`

You can later automate the total, but manual entry is fine to start.

---

## 4. Interpreting Scores

- **65+ points** → **Ideal Grant Virgin** (Priority A)
  - Add to **Campaign A** in Instantly/Smartlead.
  - Expect higher reply and close rates.
- **40–64 points** → **Good Prospect** (Priority B)
  - Add to **Campaign B** with slightly softer targeting or broader grants (e.g., Hello Alice).
- **< 40 points** → **De-prioritize**
  - Only contact if you need volume or they match a very specific new grant.

---

## 5. Applying to Initial Leads

1. Export 50–100 leads from Apollo/Clay that match your ICP (women-owned food/retail in the US).
2. Copy them into your scoring sheet based on `grant-virgin-scoring-template.csv`.
3. Spend ~1–2 hours scoring:
   - You should be able to score **20–30 leads per hour** once you’re familiar.
4. Tag each lead with:
   - `Grant Virgin Score`
   - `Priority` (A/B/C based on thresholds above)
5. When you build outreach campaigns, **only upload Priority A** leads into your first high-intent campaign.

---

## 6. Future Automation Ideas

Once scoring manually is working:

- Use a **simple script** or formulas to:
  - Parse `Red Flags`, `Yellow Flags`, `Green Bonuses` columns.
  - Auto-calculate the **Total Score**.
- Have an assistant in PH follow this SOP to score leads in bulk.
- Eventually, integrate with your lead sourcing tool so scoring happens as part of enrichment.

This SOP plus the CSV template completes the “practical spreadsheet + SOP” part of the Grant Virgin scoring todo.

