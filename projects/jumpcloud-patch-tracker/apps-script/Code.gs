/**
 * ==============================================================================
 * Google Apps Script - Enterprise Patch Telemetry & Drive Archiver
 * Author: Anu Sah (@Anusah99)
 * Purpose: Ingest JumpCloud JSON telemetry, populate styled Google Sheets,
 *          and archive daily reports in secure Google Drive folders.
 * ==============================================================================
 */

const CONFIG = {
  DRIVE_ARCHIVE_FOLDER_ID: "ENTERPRISE_DRIVE_FOLDER_ID",
  SPREADSHEET_ID: "YOUR_DASHBOARD_SPREADSHEET_ID",
  ALERT_EMAIL: "Code.anukrsah@gmail.com"
};

/**
 * Ingest daily JSON payload and update the executive dashboard.
 */
function ingestPatchTelemetry(jsonPayload) {
  const data = typeof jsonPayload === 'string' ? JSON.parse(jsonPayload) : jsonPayload;
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName("Live_Compliance_Feed");

  if (!sheet) {
    sheet = ss.insertSheet("Live_Compliance_Feed");
    setupSheetHeaders(sheet);
  }

  // Clear previous live records and retain headers
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 8).clearContent();
  }

  const rows = [];
  const systems = data.flagged_systems || [];

  for (let i = 0; i < systems.length; i++) {
    const s = systems[i];
    rows.push([
      new Date(),
      s.id,
      s.hostname,
      s.os,
      s.os_version,
      s.agent_version,
      s.days_inactive,
      s.status
    ]);
  }

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, 8).setValues(rows);
    applyCyberOpsStyling(sheet, rows.length);
  }

  // Archive snapshot to Google Drive
  archiveReportToDrive(data);
}

/**
 * Format headers with cyber dark-mode palette.
 */
function setupSheetHeaders(sheet) {
  const headers = [
    "Timestamp", "System ID", "Hostname", "Operating System",
    "OS Build", "JumpCloud Agent", "Days Inactive", "Compliance Status"
  ];
  sheet.getRange(1, 1, 1, 8).setValues([headers]);
  sheet.getRange(1, 1, 1, 8)
    .setBackground("#0F172A")
    .setFontColor("#06B6D4")
    .setFontWeight("bold")
    .setFontFamily("Space Grotesk");
  sheet.setFrozenRows(1);
}

/**
 * Apply conditional status color highlights.
 */
function applyCyberOpsStyling(sheet, count) {
  const statusRange = sheet.getRange(2, 8, count, 1);
  const values = statusRange.getValues();

  for (let r = 0; r < values.length; r++) {
    const cell = sheet.getRange(r + 2, 8);
    const val = values[r][0];
    if (val === "CRITICAL_OFFLINE") {
      cell.setBackground("#450A0A").setFontColor("#F87171").setFontWeight("bold");
    } else if (val === "WARNING_DRIFT") {
      cell.setBackground("#451A03").setFontColor("#FBBF24");
    } else {
      cell.setBackground("#064E3B").setFontColor("#34D399");
    }
  }
}

/**
 * Save snapshot as JSON artifact in designated Drive folder.
 */
function archiveReportToDrive(data) {
  try {
    const folder = DriveApp.getFolderById(CONFIG.DRIVE_ARCHIVE_FOLDER_ID);
    const dateStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd_HHmm");
    const fileName = `JumpCloud_Audit_${dateStr}.json`;
    folder.createFile(fileName, JSON.stringify(data, null, 2), MimeType.PLAIN_TEXT);
  } catch (err) {
    Logger.log("Drive archive error: " + err.toString());
  }
}
