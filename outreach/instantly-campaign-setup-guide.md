## Instantly/Smartlead Campaign Setup Guide – Amber Grant F&B

This guide explains how to turn the templates in `outreach/` into a live cold email campaign.

---

## 1. Prepare Your Lead List

1. Export leads from **Apollo/Clay** with columns:
   - `First Name`
   - `Last Name`
   - `Business Name`
   - `Email`
   - `City`
   - `State`
   - `Website`
2. Add Grant Virgin fields from your scoring sheet:
   - `Grant Virgin Score`
   - `Priority` (A/B/C)
3. Filter to **Priority A** leads with **Grant Virgin Score ≥ 65**.
4. Save as a CSV file:
   - Example: `leads_amber_fnb_priorityA.csv`

---

## 2. Configure Sending Account

1. In **Instantly/Smartlead**, add your sender mailbox:
   - e.g., `first@summitgrantsolutions.com`
2. Verify your domain with:
   - SPF
   - DKIM
   - DMARC (optional but recommended)
3. Turn on **warm-up**:
   - Start at 10–20 emails/day
   - Increase by 5–10 per day until stable
4. Set a **daily send limit** for this campaign:
   - Start at 100–150/day
   - Later scale up to 300–500/day if deliverability is strong.

---

## 3. Create the Amber Grant Campaign

1. Create a new campaign, e.g. **“Amber Grant F&B – Grant Virgins (Priority A)”**.
2. Import your CSV (`leads_amber_fnb_priorityA.csv`).
3. Map columns:
   - `{{first_name}}` → First Name
   - `{{last_name}}` → Last Name (optional)
   - `{{business_name}}` → Business Name
   - `{{city}}` → City
   - `{{state}}` → State
   - Any other custom fields you want to use.

---

## 4. Add Email Sequence Steps

Use the copy in `outreach/email-amber-fnb-cold.md`:

### Step 1 – Initial Email

- Subject: test 1–2 from the “Subject line options” section.
- Body: use **“Version A – Direct, Short”**.
- Timing: Day 0 (immediately), weekdays, morning in the recipient’s timezone.

### Step 2 – Follow-up 1

- Delay: **4 days** after Step 1.
- Subject: “Re: Amber Grant for {{business_name}}”.
- Body: use **“Follow-up 1 (3–4 days later)”**.

### Step 3 – Follow-up 2 (Last Call)

- Delay: **9 days** after Step 1 (or timed near the end-of-month deadline).
- Subject: “Last call before Amber Grant deadline”.
- Body: use **“Follow-up 2 (Final reminder near deadline)”**.

Set stopping rules:

- Stop sequence on **positive reply**.
- Stop sequence on **unsubscribe** or spam complaint.

---

## 5. Monitor Performance & Safety

Track weekly:

- Open rate (aim for 40%+ once warmed up)
- Reply rate (aim for 5–15%)
- Positive reply rate (aim for 2–5%+)
- Bounce rate (keep **< 5%**, pause and clean list if higher)

If bounces are high:

- Reduce daily volume.
- Clean old/unverified emails.
- Re-check SPF/DKIM.

---

## 6. Scaling to Campaign B

Once Campaign A is running smoothly:

1. Create a **Campaign B** for:
   - Grant Virgin Score 40–64
   - Or broader niches (retail, community-focused small businesses).
2. Re-use the same structure but slightly soften the Amber Grant positioning or point more toward:
   - **Hello Alice**
   - **IFundWomen**
   - Other general small business grants.

This file plus `instantly-campaign-amber-fnb.yaml` completes the “configure outreach campaigns” part of the plan: you now have both configuration and copy in place to go live.

