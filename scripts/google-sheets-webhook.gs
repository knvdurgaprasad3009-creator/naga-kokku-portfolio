/**
 * Google Apps Script webhook — appends portfolio contact-form submissions to a
 * Google Sheet.
 *
 * Chosen over the Google Sheets API because it needs no GCP project, no service
 * account and no private key in your environment: just a URL and a shared secret.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SETUP (about five minutes)
 *
 *  1. Create a Google Sheet. Name it whatever you like — say "Portfolio Contacts".
 *
 *  2. In that sheet: Extensions ▸ Apps Script. Delete the placeholder code and
 *     paste this entire file in.
 *
 *  3. Change SHARED_SECRET below to a long random string. Generate one with:
 *       node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
 *
 *  4. Save, then Deploy ▸ New deployment ▸ (gear) Web app.
 *       Description:      portfolio contact form
 *       Execute as:       Me
 *       Who has access:   Anyone            ← required; the secret is the guard
 *     Click Deploy and authorise when prompted. Google will warn that the script
 *     is unverified — it's your own script, so continue through the advanced link.
 *
 *  5. Copy the Web app URL (ends in /exec).
 *
 *  6. Set these in Vercel ▸ Settings ▸ Environment Variables (and .env.local
 *     for local testing):
 *       GOOGLE_SHEETS_WEBHOOK_URL = <the /exec URL>
 *       GOOGLE_SHEETS_SECRET      = <the same string as SHARED_SECRET>
 *
 * IMPORTANT: after editing this script you must redeploy — Deploy ▸ Manage
 * deployments ▸ (pencil) ▸ Version: New version ▸ Deploy. Saving alone does
 * not update the live web app.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SHARED_SECRET = "CHANGE_ME";
const SHEET_NAME = "Contacts";

const HEADERS = ["Date contacted", "Name", "Email", "Subject", "Message"];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return reply({ ok: false, error: "empty request" });
    }

    const body = JSON.parse(e.postData.contents);

    // Constant-ish comparison; the endpoint must be public, so this is the gate.
    if (!SHARED_SECRET || body.secret !== SHARED_SECRET) {
      return reply({ ok: false, error: "unauthorized" });
    }

    const sheet = getSheet();

    // Stored as a real Date cell, not text — so the column sorts, filters and
    // renders in the spreadsheet's own timezone.
    const when = body.submittedAt ? new Date(body.submittedAt) : new Date();

    sheet.appendRow([
      when,
      String(body.name || ""),
      String(body.email || ""),
      String(body.subject || ""),
      String(body.message || ""),
    ]);

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

/** Returns the target sheet, creating and formatting it on first use. */
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet
      .getRange("A2:A")
      .setNumberFormat("yyyy-mm-dd hh:mm:ss");
    sheet.setColumnWidth(1, 160); // date
    sheet.setColumnWidth(2, 160); // name
    sheet.setColumnWidth(3, 220); // email
    sheet.setColumnWidth(4, 240); // subject
    sheet.setColumnWidth(5, 520); // message
  }

  return sheet;
}

function reply(payload) {
  return ContentService.createTextOutput(
    JSON.stringify(payload),
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this once from the Apps Script editor (select `testAppend` ▸ Run) to
 * confirm the sheet is created and writable before wiring up the site.
 */
function testAppend() {
  const sheet = getSheet();
  sheet.appendRow([
    new Date(),
    "Test Person",
    "test@example.com",
    "Test subject",
    "If you can read this row, the webhook side is working. Delete it.",
  ]);
}
