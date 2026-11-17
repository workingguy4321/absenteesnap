/**
 * CR Attendance Express - Core Application Logic
 * Ultra-fast Absentee List Generator & WhatsApp Reporter
 */

// --- Default Seed Data (Cyber Security - 'A') ---
const DEFAULT_STUDENTS = [
  { roll: "01", reg: "RA2511030050001", name: "Hanley David" },
  { roll: "02", reg: "RA2511030050002", name: "Rakshana I" },
  { roll: "03", reg: "RA2511030050003", name: "Vishwa K" },
  { roll: "04", reg: "RA2511030050004", name: "Surya Narayanan K N" },
  { roll: "05", reg: "RA2511030050005", name: "R.Lokeshwaran" },
  { roll: "06", reg: "RA2511030050006", name: "Kaashnii J" },
  { roll: "07", reg: "RA2511030050007", name: "NIRANAJAN M S" },
  { roll: "08", reg: "RA2511030050008", name: "Roghith AR" },
  { roll: "09", reg: "RA2511030050009", name: "Vishnu A" },
  { roll: "11", reg: "RA2511030050011", name: "C.Bhavya Sree" },
  { roll: "12", reg: "RA2511030050012", name: "Priya suman" },
  { roll: "13", reg: "RA2511030050013", name: "Arya E" },
  { roll: "14", reg: "RA2511030050014", name: "Muhammed shafeer" },
  { roll: "15", reg: "RA2511030050015", name: "R.Arul Rathinavel" },
  { roll: "16", reg: "RA2511030050016", name: "P.R.Akhil" },
  { roll: "17", reg: "RA2511030050017", name: "Ritika M" },
  { roll: "18", reg: "RA2511030050018", name: "Sharan" },
  { roll: "19", reg: "RA2511030050019", name: "RITHANYA PRABHU" },
  { roll: "20", reg: "RA2511030050020", name: "VARNAPRIYAA S A" },
  { roll: "21", reg: "RA2511030050021", name: "M.BAGAVATHI HARI ESWAR" },
  { roll: "22", reg: "RA2511030050022", name: "AVVA RAM CHARAN TEJA" },
  { roll: "23", reg: "RA2511030050023", name: "Akshya.V" },
  { roll: "24", reg: "RA2511030050024", name: "Pavitha K" },
  { roll: "25", reg: "RA2511030050025", name: "Anbuchelvan E S" },
  { roll: "26", reg: "RA2511030050026", name: "Mohammed Suhail J" },
  { roll: "27", reg: "RA2511030050027", name: "VR.Lalitha shree" },
  { roll: "28", reg: "RA2511030050028", name: "Vikhyat Saini" },
  { roll: "29", reg: "RA2511030050029", name: "Ambati Veera Hemanth Reddy" },
  { roll: "30", reg: "RA2511030050030", name: "Swetcha.K" },
  { roll: "31", reg: "RA2511030050031", name: "Jayani M" },
  { roll: "32", reg: "RA2511030050032", name: "Renesh K" },
  { roll: "33", reg: "RA2511030050033", name: "Varshith T" },
  { roll: "34", reg: "RA2511030050034", name: "Adarsh Padmanabhan" },
  { roll: "35", reg: "RA2511030050035", name: "Kavuru Neha" },
  { roll: "36", reg: "RA2511030050036", name: "Y Nagasai" },
  { roll: "37", reg: "RA2511030050037", name: "Rongali Vijaya varshini" },
  { roll: "38", reg: "Ra2511030050038", name: "G. Sashidhar" },
  { roll: "39", reg: "RA2511030050039", name: "W. Allan jude" },
  { roll: "40", reg: "RA2511030050040", name: "DINESHRAJ" },
  { roll: "41", reg: "Ra2511030050041", name: "J.Rojar aro" },
  { roll: "42", reg: "RA2511030050042", name: "R.sriram" },
  { roll: "43", reg: "RA2511030050043", name: "SREEMAN NP" },
  { roll: "44", reg: "RA2511030050044", name: "S.Poovina" },
  { roll: "45", reg: "RA2511030050045", name: "RD Rohith Rahul" },
  { roll: "46", reg: "RA2511030050046", name: "K.Venkata Raghava" },
  { roll: "47", reg: "RA2511030050047", name: "R . Mithun Prajhan" },
  { roll: "48", reg: "RA2511030050048", name: "Devinath Eswar Sai" },
  { roll: "49", reg: "RA2511030050049", name: "Vasanth Kumar S" },
  { roll: "50", reg: "RA2511030050050", name: "SHELIN SHEBA S" },
  { roll: "51", reg: "RA2511030050051", name: "Srihari V" },
  { roll: "52", reg: "RA2511030050052", name: "Jayshtna sai Gorijavolu" },
  { roll: "53", reg: "RA2511030050053", name: "Gokul" },
  { roll: "54", reg: "RA2511030050054", name: "Rohini.R" },
  { roll: "55", reg: "RA2511030050055", name: "Yugesh" },
  { roll: "112", reg: "RA2511030050112", name: "Lateral Entry 112" },
  { roll: "114", reg: "RA2511030050114", name: "Dhiraj Kumar Thakur Lohar" }
];

const DEFAULT_SETTINGS = {
  className: "CYBER SECURITY - 'A'",
  crName: "SREEMAN NP",
  dept: "CYBER SECURITY",
  year: "3rd Year",
  sem: "Sem 5",
  sec: "A",
  totalStudents: 56,
  formatStyle: "bracket",
  mentorName: "Class Mentor",
  mentorPhone: ""
};

const PERIODS = [
  "1st Hour",
  "2nd Hour",
  "3rd Hour",
  "4th Hour",
  "5th Hour",
  "6th Hour",
  "FN Session",
  "AN Session",
  "Full Day"
];

// --- Application State ---
const state = {
  settings: { ...DEFAULT_SETTINGS },
  students: [...DEFAULT_STUDENTS],
  selectedPeriod: "1st Hour",
  currentDate: new Date().toISOString().split("T")[0],
  subjectName: "",
  absentRolls: new Set(),
  selectedFormat: "bracket",
  searchQuery: "",
  activeFilter: "all",
  history: []
};

// --- Storage Keys ---
const STORAGE_KEYS = {
  SETTINGS: "cr_absentee_settings_v1",
  ROSTER: "cr_absentee_roster_v1",
  HISTORY: "cr_absentee_history_v1",
  LAST_ABSENTEES: "cr_absentee_last_session_v1"
};

// --- Storage Helpers ---
function loadFromStorage() {
  try {
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) state.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };

    const savedRoster = localStorage.getItem(STORAGE_KEYS.ROSTER);
    if (savedRoster) state.students = JSON.parse(savedRoster);

    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (savedHistory) state.history = JSON.parse(savedHistory);

    const savedLast = localStorage.getItem(STORAGE_KEYS.LAST_ABSENTEES);
    if (savedLast) {
      const parsed = JSON.parse(savedLast);
      if (parsed.absentRolls && Array.isArray(parsed.absentRolls)) {
        state.absentRolls = new Set(parsed.absentRolls);
      }
      if (parsed.selectedPeriod) state.selectedPeriod = parsed.selectedPeriod;
      if (parsed.subjectName) state.subjectName = parsed.subjectName;
    }
  } catch (e) {
    console.error("Failed to load from storage:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
    localStorage.setItem(STORAGE_KEYS.ROSTER, JSON.stringify(state.students));
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
    localStorage.setItem(
      STORAGE_KEYS.LAST_ABSENTEES,
      JSON.stringify({
        absentRolls: Array.from(state.absentRolls),
        selectedPeriod: state.selectedPeriod,
        subjectName: state.subjectName
      })
    );
  } catch (e) {
    console.error("Failed to save state:", e);
  }
}

// --- DOM References ---
const elements = {
  classBadgeDisplay: document.getElementById("class-badge-display"),
  sessionDate: document.getElementById("session-date"),
  sessionSubject: document.getElementById("session-subject"),
  periodChipsContainer: document.getElementById("period-chips-container"),
  
  statTotal: document.getElementById("stat-total"),
  statPresent: document.getElementById("stat-present"),
  statAbsent: document.getElementById("stat-absent"),
  statPercent: document.getElementById("stat-percent"),

  quickRollInput: document.getElementById("quick-roll-input"),
  btnApplyQuickInput: document.getElementById("btn-apply-quick-input"),
  btnClearAbsentees: document.getElementById("btn-clear-absentees"),
  absenteeTagsContainer: document.getElementById("absentee-tags-container"),
  absentCountBadge: document.getElementById("absent-count-badge"),

  formatSelect: document.getElementById("format-select"),
  messagePreviewText: document.getElementById("message-preview-text"),
  btnSendWhatsapp: document.getElementById("btn-send-whatsapp"),
  btnCopyReport: document.getElementById("btn-copy-report"),
  copyBubble: document.getElementById("copy-bubble"),
  btnNextPeriod: document.getElementById("btn-next-period"),

  rosterCountLabel: document.getElementById("roster-count-label"),
  rosterSearch: document.getElementById("roster-search"),
  filterAllCount: document.getElementById("filter-all-count"),
  filterAbsentCount: document.getElementById("filter-absent-count"),
  filterPresentCount: document.getElementById("filter-present-count"),
  studentCardsGrid: document.getElementById("student-cards-grid"),

  // Dialogs
  settingsDialog: document.getElementById("settings-dialog"),
  rosterDialog: document.getElementById("roster-dialog"),
  historyDialog: document.getElementById("history-dialog"),

  btnOpenSettings: document.getElementById("btn-open-settings"),
  btnOpenRoster: document.getElementById("btn-open-roster"),
  btnOpenHistory: document.getElementById("btn-open-history"),

  // Settings form fields
  settingsForm: document.getElementById("settings-form"),
  settingClassName: document.getElementById("setting-class-name"),
  settingMentorName: document.getElementById("setting-mentor-name"),
  settingMentorPhone: document.getElementById("setting-mentor-phone"),
  settingCrName: document.getElementById("setting-cr-name"),
  settingDept: document.getElementById("setting-dept"),
  settingYear: document.getElementById("setting-year"),
  settingSem: document.getElementById("setting-sem"),
  settingSec: document.getElementById("setting-sec"),
  settingTotal: document.getElementById("setting-total"),
  settingFormatStyle: document.getElementById("setting-format-style"),

  // Roster modal
  tabBulkImport: document.getElementById("tab-bulk-import"),
  tabIndividualList: document.getElementById("tab-individual-list"),
  bulkPasteInput: document.getElementById("bulk-paste-input"),
  btnImportBulk: document.getElementById("btn-import-bulk"),
  btnGenerateDefault: document.getElementById("btn-generate-default"),
  newStudentRoll: document.getElementById("new-student-roll"),
  newStudentName: document.getElementById("new-student-name"),
  btnAddSingleStudent: document.getElementById("btn-add-single-student"),
  rosterTableBody: document.getElementById("roster-table-body"),

  // History modal
  historyListContainer: document.getElementById("history-list-container"),
  btnExportCsv: document.getElementById("btn-export-csv"),
  btnClearHistory: document.getElementById("btn-clear-history"),

  // PWA & Offline
  btnInstallApp: document.getElementById("btn-install-app"),
  offlineBadge: document.getElementById("offline-badge")
};

// --- Initialization ---
function init() {
  loadFromStorage();

  // Populate date input
  elements.sessionDate.value = state.currentDate;
  elements.sessionSubject.value = state.subjectName;

  // Setup UI components
  renderHeader();
  renderPeriodChips();
  renderStats();
  renderAbsenteeTags();
  renderStudentCards();
  renderMessagePreview();

  // Attach Event Listeners
  attachEventListeners();

  // PWA Offline Engine & Install Handler
  initPWA();
}

let deferredInstallPrompt;

function initPWA() {
  const btnInstall = elements.btnInstallApp || document.getElementById("btn-install-app");
  const offlineBadge = elements.offlineBadge || document.getElementById("offline-badge");
  const supportsWebInstall = typeof Navigator.prototype.install === "function";

  // Check if running in standalone mode (already installed on phone)
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  if (isStandalone && btnInstall) {
    btnInstall.hidden = true;
  } else if (supportsWebInstall && btnInstall) {
    btnInstall.hidden = false;
  }

  // Handle Android / Chrome install prompt event
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (btnInstall && !isStandalone) {
      btnInstall.hidden = false;
    }
  });

  if (btnInstall) {
    btnInstall.addEventListener("click", async () => {
      if (btnInstall.getAttribute("aria-disabled") === "true") return;
      btnInstall.setAttribute("aria-disabled", "true");

      try {
        if (supportsWebInstall) {
          await navigator.install();
          btnInstall.hidden = true;
        } else if (deferredInstallPrompt) {
          const promptEvent = deferredInstallPrompt;
          deferredInstallPrompt = undefined;
          await promptEvent.prompt();
          const { outcome } = await promptEvent.userChoice;
          if (outcome === "accepted") {
            btnInstall.hidden = true;
          }
        } else {
          // iOS Safari fallback instruction
          alert(
            "To install on iPhone/iPad (iOS):\n\n" +
            "1. Tap the Share button at the bottom of Safari (square with arrow up)\n" +
            "2. Scroll down and tap 'Add to Home Screen'\n" +
            "3. Tap 'Add' to launch AbsenteeSnap completely offline anytime!"
          );
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Install prompt error:", err);
        }
      } finally {
        btnInstall.removeAttribute("aria-disabled");
      }
    });
  }

  window.addEventListener("appinstalled", () => {
    if (btnInstall) btnInstall.hidden = true;
    deferredInstallPrompt = undefined;
  });

  // Offline / Online Status Indicator
  function updateNetworkStatus() {
    if (!offlineBadge) return;
    if (navigator.onLine) {
      offlineBadge.textContent = "⚡ Offline Ready";
      offlineBadge.title = "Cached & 100% ready for offline use";
      offlineBadge.classList.remove("is-disconnected");
    } else {
      offlineBadge.textContent = "⚡ Offline Mode";
      offlineBadge.title = "Operating completely offline. Data saved locally.";
      offlineBadge.classList.add("is-disconnected");
    }
  }

  window.addEventListener("online", updateNetworkStatus);
  window.addEventListener("offline", updateNetworkStatus);
  updateNetworkStatus();

  // Register Service Worker for 100% offline capability
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js", { scope: "./" })
        .then((reg) => {
          console.log("Service Worker registered successfully. App is 100% offline capable:", reg.scope);
        })
        .catch((err) => {
          console.warn("Service Worker registration notice:", err);
        });
    });
  }
}

// --- Render Functions ---
function renderHeader() {
  elements.classBadgeDisplay.textContent = state.settings.className || "Class Absentee Reporter";
}

function renderPeriodChips() {
  const chips = elements.periodChipsContainer.querySelectorAll(".period-chip");
  chips.forEach((chip) => {
    const isSelected = chip.dataset.period === state.selectedPeriod;
    chip.classList.toggle("active", isSelected);
    chip.setAttribute("aria-checked", isSelected ? "true" : "false");
  });
}

function renderStats() {
  const total = state.students.length;
  const absent = state.absentRolls.size;
  const present = Math.max(0, total - absent);
  const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : "100.0";

  elements.statTotal.textContent = total;
  elements.statPresent.textContent = present;
  elements.statAbsent.textContent = absent;
  elements.statPercent.textContent = `${percentage}%`;

  const progressFill = document.getElementById("progress-fill");
  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
    const numPct = parseFloat(percentage);
    if (numPct >= 90) {
      progressFill.style.background = "linear-gradient(90deg, #10b981 0%, #3b82f6 100%)";
    } else if (numPct >= 75) {
      progressFill.style.background = "linear-gradient(90deg, #f59e0b 0%, #3b82f6 100%)";
    } else {
      progressFill.style.background = "linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)";
    }
  }

  elements.absentCountBadge.textContent = absent;
  elements.rosterCountLabel.textContent = total;
  elements.filterAllCount.textContent = total;
  elements.filterAbsentCount.textContent = absent;
  elements.filterPresentCount.textContent = present;
}

function renderAbsenteeTags() {
  elements.absenteeTagsContainer.innerHTML = "";

  if (state.absentRolls.size === 0) {
    elements.absenteeTagsContainer.innerHTML = `<span class="empty-tag-note">All students present</span>`;
    return;
  }

  // Sort roll numbers numerically or alphabetically
  const sortedRolls = Array.from(state.absentRolls).sort(compareRolls);

  sortedRolls.forEach((roll) => {
    const student = state.students.find((s) => s.roll === roll);
    const chip = document.createElement("div");
    chip.className = "absent-badge-chip";
    chip.innerHTML = `
      <span>#${escapeHtml(roll)} ${student ? escapeHtml(student.name) : ""}</span>
      <button type="button" class="btn-remove-chip" data-roll="${escapeHtml(roll)}" aria-label="Remove absentee ${escapeHtml(roll)}">✕</button>
    `;
    elements.absenteeTagsContainer.appendChild(chip);
  });
}

function renderStudentCards() {
  elements.studentCardsGrid.innerHTML = "";

  let list = state.students;

  // Filter by search query
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(
      (s) => s.roll.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    );
  }

  // Filter by status pill
  if (state.activeFilter === "absent") {
    list = list.filter((s) => state.absentRolls.has(s.roll));
  } else if (state.activeFilter === "present") {
    list = list.filter((s) => !state.absentRolls.has(s.roll));
  }

  if (list.length === 0) {
    elements.studentCardsGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 30px;">No students match the criteria.</div>`;
    return;
  }

  list.forEach((student) => {
    const isAbsent = state.absentRolls.has(student.roll);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `student-card ${isAbsent ? "is-absent" : ""}`;
    card.dataset.roll = student.roll;
    card.setAttribute("aria-pressed", isAbsent ? "true" : "false");
    card.innerHTML = `
      <div class="student-card-header">
        <span class="student-roll">#${escapeHtml(student.roll)}</span>
        <span class="student-status-badge" aria-hidden="true"></span>
      </div>
      <div class="student-name" title="${escapeHtml(student.name)}">${escapeHtml(student.name)}</div>
    `;
    elements.studentCardsGrid.appendChild(card);
  });
}

// --- WhatsApp Message Generator ---
function generateFormattedReport() {
  const total = state.students.length;
  const absent = state.absentRolls.size;
  const present = Math.max(0, total - absent);
  const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : "100.0";
  
  const sortedRolls = Array.from(state.absentRolls).sort(compareRolls);
  const absenteeList = sortedRolls.map((roll) => {
    const st = state.students.find((s) => s.roll === roll);
    return { roll, name: st ? st.name : "Unknown" };
  });

  const formattedDate = formatDatePretty(state.currentDate);
  const subjectPart = state.subjectName.trim() ? ` (${state.subjectName.trim()})` : "";

  switch (state.selectedFormat) {
    case "bracket":
      {
        const shortDate = formatDateShort(state.currentDate);
        const headerLine = `||${state.settings.className} || ${shortDate}`;
        const statsLine = `Total: ${total} || Present: ${present} || *Absent: ${absent} ||`;
        const listText =
          absent === 0
            ? "All Present"
            : absenteeList.map((a) => `[${a.roll}, ${a.name}]`).join("\n");
        return `${headerLine}\n${statsLine}\n\n${listText}`;
      }

    case "roll_only":
      {
        const shortDate = formatDateShort(state.currentDate);
        const headerLine = `||${state.settings.className} || ${shortDate}`;
        const statsLine = `Total: ${total} || Present: ${present} || *Absent: ${absent} ||`;
        const listText =
          absent === 0
            ? "Nil"
            : sortedRolls.join(", ");
        return `${headerLine}\n${statsLine}\n\n${listText}`;
      }

    case "detailed":
      return (
        `📋 *DAILY ATTENDANCE / ABSENTEE REPORT*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📅 *Date:* ${formattedDate}\n` +
        `⏰ *Period:* ${state.selectedPeriod}${subjectPart}\n` +
        `🏫 *Class:* ${state.settings.className}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👥 *Total Strength:* ${total}\n` +
        `✅ *Present:* ${present}\n` +
        `❌ *Absent:* ${absent}\n` +
        `📊 *Attendance:* ${percentage}%\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        (absent === 0
          ? `🎉 *100% Full Attendance! No Absentees.*`
          : `🚫 *ABSENTEE ROLL NOS:*\n` +
            `${sortedRolls.join(", ")}\n\n` +
            `📝 *ABSENTEE DETAILS:*\n` +
            absenteeList.map((a, i) => `${i + 1}. #${a.roll} - ${a.name}`).join("\n")) +
        `\n━━━━━━━━━━━━━━━━━━━━━━\n` +
        `*Reported by:* ${state.settings.crName || "Class Rep"}`
      );

    case "compact":
      return (
        `*${state.settings.className}*\n` +
        `📅 ${formattedDate} | ⏰ ${state.selectedPeriod}${subjectPart}\n` +
        `📊 Total: ${total} | Present: ${present} | *Absent: ${absent}* (${percentage}%)\n\n` +
        (absent === 0
          ? `🎉 *All Present! No Absentees.*`
          : `🚫 *Absentees (${absent}):*\n` +
            absenteeList.map((a, i) => `${i + 1}. #${a.roll} - ${a.name}`).join("\n")) +
        `\n\n_Reported by ${state.settings.crName || "CR"}_`
      );

    case "minimal":
      return (
        `*${state.settings.className}*\n` +
        `Date: ${formattedDate} | ${state.selectedPeriod}${subjectPart}\n` +
        `Total: ${total} | Present: ${present} | Absent: ${absent}\n` +
        `*Absent Roll Nos:* ${sortedRolls.length > 0 ? sortedRolls.join(", ") : "Nil (100% Present)"}`
      );

    case "official":
      return (
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `    *ATTENDANCE STATEMENT*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Class: ${state.settings.className}\n` +
        `Date: ${state.currentDate}\n` +
        `Hour / Period: ${state.selectedPeriod}\n` +
        (state.subjectName.trim() ? `Subject / Faculty: ${state.subjectName.trim()}\n` : "") +
        `Mentor / In-charge: ${state.settings.mentorName || "N/A"}\n\n` +
        `Total Strength: ${total}\n` +
        `Students Present: ${present}\n` +
        `Students Absent: ${absent}\n` +
        `Percentage: ${percentage}%\n\n` +
        `Absentee Roll Numbers:\n` +
        (sortedRolls.length > 0 ? sortedRolls.join(", ") : "None") +
        `\n\nAbsentee Nominal Roll:\n` +
        (absenteeList.length > 0
          ? absenteeList.map((a, i) => ` ${i + 1}. [Roll ${a.roll}] ${a.name}`).join("\n")
          : " Nil (All students present)\n") +
        `\n━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Submitted by: ${state.settings.crName || "Class Representative"}`
      );

    case "mentor_standard":
    default: {
      const shortDate = formatDateShort(state.currentDate);
      const headerLine = `||${state.settings.className} || ${shortDate}`;
      const statsLine = `Total: ${total} || Present: ${present} || *Absent: ${absent} ||`;
      const listText =
        absent === 0
          ? "All Present"
          : absenteeList.map((a) => `${a.roll} - ${a.name}`).join("\n");
      return `${headerLine}\n${statsLine}\n\n${listText}`;
    }
  }
}

function renderMessagePreview() {
  const text = generateFormattedReport();
  elements.messagePreviewText.textContent = text;
}

// --- Quick Roll Input Parser ---
function handleQuickRollInput() {
  const input = elements.quickRollInput.value.trim();
  if (!input) return;

  // Clean common prefixes (e.g. "AB-", "AB:", "Absent:", "Absentees:", "Roll:")
  let cleanedInput = input.replace(/^(AB|Absent|Absentees|Roll|Rolls)[\s\-:]*/i, "");

  // Split by comma, space, semicolon, tab or newline
  const tokens = cleanedInput.split(/[\s,;]+/).filter(Boolean);

  let addedCount = 0;
  tokens.forEach((token) => {
    // Normalize roll query: strip leading '#'
    let clean = token.replace(/^#/, "").trim();
    if (!clean) return;

    // Detect concatenated typos like "3438" -> [34, 38]
    const subTokens = [];
    if (/^\d{4}$/.test(clean)) {
      const p1 = clean.slice(0, 2);
      const p2 = clean.slice(2);
      // If neither is a recognized single student, split into two 2-digit rolls
      const exactMatch = state.students.find((s) => s.roll === clean);
      if (!exactMatch) {
        subTokens.push(p1, p2);
      } else {
        subTokens.push(clean);
      }
    } else {
      subTokens.push(clean);
    }

    subTokens.forEach((tok) => {
      // Find matching student by exact roll or numeric equality (e.g. "1" matches "01")
      const match = state.students.find(
        (s) =>
          s.roll.toLowerCase() === tok.toLowerCase() ||
          parseInt(s.roll, 10) === parseInt(tok, 10)
      );

      if (match) {
        state.absentRolls.add(match.roll);
        addedCount++;
      } else {
        // Format padded roll if numeric under 100
        const num = parseInt(tok, 10);
        const formattedRoll = !isNaN(num) && num < 10 ? String(num).padStart(2, "0") : tok;
        state.absentRolls.add(formattedRoll);
        addedCount++;
      }
    });
  });

  elements.quickRollInput.value = "";
  saveState();
  updateAllViews();
}

// --- Action Handlers ---
function toggleAbsentee(roll) {
  if (state.absentRolls.has(roll)) {
    state.absentRolls.delete(roll);
  } else {
    state.absentRolls.add(roll);
  }
  saveState();
  updateAllViews();
}

function clearAllAbsentees() {
  state.absentRolls.clear();
  saveState();
  updateAllViews();
}

function updateAllViews() {
  renderStats();
  renderAbsenteeTags();
  renderStudentCards();
  renderMessagePreview();
}

// --- WhatsApp Sharing & Clipboard ---
function sendViaWhatsApp() {
  const message = generateFormattedReport();
  const encoded = encodeURIComponent(message);
  
  // Clean phone number: remove non-digits except leading '+'
  let phone = (state.settings.mentorPhone || "").trim().replace(/[^\d+]/g, "");
  if (phone.startsWith("+")) {
    phone = phone.substring(1);
  }

  let url = "";
  if (phone) {
    url = `https://wa.me/${phone}?text=${encoded}`;
  } else {
    url = `https://api.whatsapp.com/send?text=${encoded}`;
  }

  // Open WhatsApp in new tab / app
  window.open(url, "_blank");

  // Log to history automatically
  logCurrentSessionToHistory("Sent via WhatsApp");
}

// Async Clipboard implementation complying with modern-web-guidance
const copyTimers = new WeakMap();

async function copyReportToClipboard() {
  const text = elements.messagePreviewText.textContent;
  const button = elements.btnCopyReport;
  const tip = elements.copyBubble;

  if (!text) return;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      reportCopyFeedback(button, tip, true);
    } else {
      // Fallback
      fallbackCopyText(text);
      reportCopyFeedback(button, tip, true);
    }
    logCurrentSessionToHistory("Copied to Clipboard");
  } catch (err) {
    console.error("Clipboard write failed:", err);
    reportCopyFeedback(button, tip, false);
  }
}

function reportCopyFeedback(button, tip, ok) {
  clearTimeout(copyTimers.get(button));
  button.removeAttribute("data-copied");
  button.removeAttribute("data-failed");

  const labelSpan = button.querySelector("span");
  const originalText = labelSpan ? labelSpan.textContent : "Copy Report";

  const message = ok ? "Copied to Clipboard! ✨" : "Copy Failed";
  tip.textContent = "";
  void button.offsetWidth; // restart CSS transition

  button.setAttribute(ok ? "data-copied" : "data-failed", "");
  if (labelSpan && ok) {
    labelSpan.textContent = "✓ Copied to Clipboard!";
  }
  requestAnimationFrame(() => (tip.textContent = message));

  copyTimers.set(
    button,
    setTimeout(() => {
      button.removeAttribute("data-copied");
      button.removeAttribute("data-failed");
      tip.textContent = "";
      if (labelSpan) {
        labelSpan.textContent = originalText;
      }
    }, 2000)
  );
}

function fallbackCopyText(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

// --- Next Period Handler ---
function handleNextPeriod() {
  // 1. Log current session to history
  logCurrentSessionToHistory("Next Hour Transition");

  // 2. Find next period
  const currentIndex = PERIODS.indexOf(state.selectedPeriod);
  if (currentIndex !== -1 && currentIndex < PERIODS.length - 1) {
    state.selectedPeriod = PERIODS[currentIndex + 1];
  } else {
    state.selectedPeriod = PERIODS[0];
  }

  renderPeriodChips();
  saveState();
  updateAllViews();

  // Show quick toast on Next Period
  if (elements.copyBubble) {
    elements.copyBubble.textContent = `Advanced to ${state.selectedPeriod}! ⏩`;
    setTimeout(() => {
      if (elements.copyBubble) elements.copyBubble.textContent = "";
    }, 1600);
  }
}

// --- History Logging ---
function logCurrentSessionToHistory(trigger) {
  const entry = {
    id: Date.now().toString(),
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    date: state.currentDate,
    period: state.selectedPeriod,
    subject: state.subjectName || "N/A",
    total: state.students.length,
    present: state.students.length - state.absentRolls.size,
    absentCount: state.absentRolls.size,
    absentRolls: Array.from(state.absentRolls).sort(compareRolls),
    trigger: trigger
  };

  // Keep latest 50 entries
  state.history.unshift(entry);
  if (state.history.length > 50) state.history.pop();
  saveState();
}

function renderHistoryModal() {
  elements.historyListContainer.innerHTML = "";

  if (state.history.length === 0) {
    elements.historyListContainer.innerHTML = `<div class="empty-history-text">No attendance logs saved yet today.<br>Entries are saved when you copy or send reports!</div>`;
    return;
  }

  state.history.forEach((h) => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <div class="history-header">
        <span class="history-period">${escapeHtml(h.period)} (${escapeHtml(h.subject)})</span>
        <span class="history-time">${escapeHtml(h.date)} at ${escapeHtml(h.timestamp)}</span>
      </div>
      <div style="font-size: 0.85rem; color: var(--text-main);">
        Total: ${h.total} | Present: ${h.present} | <strong>Absent: ${h.absentCount}</strong>
      </div>
      <div class="history-absentees">
        ${h.absentCount > 0 ? "Absentees: " + escapeHtml(h.absentRolls.join(", ")) : "🎉 Full Attendance"}
      </div>
    `;
    elements.historyListContainer.appendChild(item);
  });
}

function exportHistoryToCsv() {
  if (state.history.length === 0) {
    alert("No history records to export!");
    return;
  }

  const rows = [
    ["Date", "Time", "Period", "Subject", "Total Strength", "Present", "Absent Count", "Absentee Roll Numbers"]
  ];

  state.history.forEach((h) => {
    rows.push([
      `"${h.date}"`,
      `"${h.timestamp}"`,
      `"${h.period}"`,
      `"${h.subject}"`,
      h.total,
      h.present,
      h.absentCount,
      `"${h.absentRolls.join(", ")}"`
    ]);
  });

  const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `attendance_report_${state.currentDate}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- Roster Management Modal Logic ---
function renderRosterTable() {
  elements.rosterTableBody.innerHTML = "";
  state.students.forEach((s, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-family: var(--font-mono); font-weight: 700;">#${escapeHtml(s.roll)}</td>
      <td>${escapeHtml(s.name)}</td>
      <td>
        <button type="button" class="btn-table-delete" data-index="${idx}" aria-label="Delete ${escapeHtml(s.name)}">🗑️</button>
      </td>
    `;
    elements.rosterTableBody.appendChild(tr);
  });
}

function handleBulkImport() {
  const raw = elements.bulkPasteInput.value.trim();
  if (!raw) {
    alert("Please paste your student list first!");
    return;
  }

  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const parsed = [];

  lines.forEach((line, index) => {
    let trimmed = line.trim();
    // Strip surrounding brackets: [01, Hanley David] -> 01, Hanley David
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      trimmed = trimmed.slice(1, -1).trim();
    }
    const match = trimmed.match(/^([0-9A-Za-z_-]+)[\s,.:\-]+(.*)$/);
    if (match) {
      parsed.push({
        roll: match[1].trim(),
        name: match[2].trim() || `Student ${match[1].trim()}`
      });
    } else {
      // Just name, auto assign roll number index
      const autoRoll = (index + 1).toString().padStart(2, "0");
      parsed.push({
        roll: autoRoll,
        name: trimmed
      });
    }
  });

  if (parsed.length > 0) {
    state.students = parsed;
    saveState();
    updateAllViews();
    renderRosterTable();
    elements.bulkPasteInput.value = "";
    alert(`Successfully imported ${parsed.length} students into class roster!`);
  }
}

function handleAddSingleStudent() {
  const roll = elements.newStudentRoll.value.trim();
  const name = elements.newStudentName.value.trim();

  if (!roll || !name) {
    alert("Please enter both Roll No and Student Name");
    return;
  }

  // Check if roll already exists
  const existingIdx = state.students.findIndex((s) => s.roll === roll);
  if (existingIdx !== -1) {
    state.students[existingIdx].name = name;
  } else {
    state.students.push({ roll, name });
    state.students.sort((a, b) => compareRolls(a.roll, b.roll));
  }

  elements.newStudentRoll.value = "";
  elements.newStudentName.value = "";
  saveState();
  updateAllViews();
  renderRosterTable();
}

// --- Dialog Helpers (Following modern-web-guidance) ---
function setupDialogBackdropLightDismiss(dialog) {
  // Test pointer position, not event.target, per modern-web-guidance
  const outside = (e, d) => {
    const r = d.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

  let pressedOutside = false;
  dialog.addEventListener("pointerdown", (e) => {
    pressedOutside = outside(e, dialog);
  });
  dialog.addEventListener("pointerup", (e) => {
    if (pressedOutside && outside(e, dialog)) {
      dialog.close();
    }
    pressedOutside = false;
  });
}

// --- Attach All Event Listeners ---
function attachEventListeners() {
  // Date and Subject
  elements.sessionDate.addEventListener("change", (e) => {
    state.currentDate = e.target.value;
    saveState();
    renderMessagePreview();
  });

  elements.sessionSubject.addEventListener("input", (e) => {
    state.subjectName = e.target.value;
    saveState();
    renderMessagePreview();
  });

  // Period Chips
  elements.periodChipsContainer.addEventListener("click", (e) => {
    const chip = e.target.closest(".period-chip");
    if (!chip) return;
    state.selectedPeriod = chip.dataset.period;
    renderPeriodChips();
    saveState();
    renderMessagePreview();
  });

  // Quick Roll Input
  elements.btnApplyQuickInput.addEventListener("click", handleQuickRollInput);
  elements.quickRollInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleQuickRollInput();
    }
  });

  // Clear Absentees
  elements.btnClearAbsentees.addEventListener("click", clearAllAbsentees);

  // Remove Tag chip
  elements.absenteeTagsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-remove-chip");
    if (!btn) return;
    const roll = btn.dataset.roll;
    if (roll) toggleAbsentee(roll);
  });

  // Student Cards Grid Toggle
  elements.studentCardsGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".student-card");
    if (!card) return;
    const roll = card.dataset.roll;
    if (roll) toggleAbsentee(roll);
  });

  // Roster Search
  elements.rosterSearch.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderStudentCards();
  });

  // Filter Pills (All / Absent / Present)
  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeFilter = pill.dataset.filter;
      renderStudentCards();
    });
  });

  // Format Select
  elements.formatSelect.addEventListener("change", (e) => {
    state.selectedFormat = e.target.value;
    renderMessagePreview();
  });

  // Toggle WhatsApp Preview
  const btnTogglePreview = document.getElementById("btn-toggle-preview");
  const previewCollapse = document.getElementById("preview-collapse");
  if (btnTogglePreview && previewCollapse) {
    btnTogglePreview.addEventListener("click", () => {
      const isOpen = previewCollapse.classList.toggle("is-open");
      btnTogglePreview.setAttribute("aria-expanded", isOpen ? "true" : "false");
      btnTogglePreview.querySelector("span").textContent = isOpen ? "Hide" : "View";
    });
  }

  // Don't redirect to WhatsApp; always copy directly to clipboard
  elements.btnSendWhatsapp.addEventListener("click", copyReportToClipboard);
  elements.btnCopyReport.addEventListener("click", copyReportToClipboard);
  elements.btnNextPeriod.addEventListener("click", handleNextPeriod);

  // Settings Modal
  elements.btnOpenSettings.addEventListener("click", () => {
    if (elements.settingCrName) elements.settingCrName.value = state.settings.crName || "";
    if (elements.settingDept) elements.settingDept.value = state.settings.dept || "CYBER SECURITY";
    if (elements.settingYear) elements.settingYear.value = state.settings.year || "3rd Year";
    if (elements.settingSem) elements.settingSem.value = state.settings.sem || "Sem 5";
    if (elements.settingSec) elements.settingSec.value = state.settings.sec || "A";
    if (elements.settingTotal) elements.settingTotal.value = state.settings.totalStudents || state.students.length;
    if (elements.settingFormatStyle) elements.settingFormatStyle.value = state.settings.formatStyle || "bracket";

    // Legacy fields
    if (elements.settingClassName) elements.settingClassName.value = state.settings.className || "";
    if (elements.settingMentorName) elements.settingMentorName.value = state.settings.mentorName || "";
    if (elements.settingMentorPhone) elements.settingMentorPhone.value = state.settings.mentorPhone || "";

    elements.settingsDialog.showModal();
  });

  elements.settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (elements.settingCrName && elements.settingCrName.value.trim()) {
      state.settings.crName = elements.settingCrName.value.trim();
    }
    if (elements.settingDept && elements.settingDept.value.trim()) {
      state.settings.dept = elements.settingDept.value.trim();
    }
    if (elements.settingYear) state.settings.year = elements.settingYear.value;
    if (elements.settingSem) state.settings.sem = elements.settingSem.value;
    if (elements.settingSec && elements.settingSec.value.trim()) {
      state.settings.sec = elements.settingSec.value.trim();
    }
    if (elements.settingTotal && elements.settingTotal.value) {
      state.settings.totalStudents = parseInt(elements.settingTotal.value, 10) || state.students.length;
    }
    if (elements.settingFormatStyle) {
      state.settings.formatStyle = elements.settingFormatStyle.value;
      state.selectedFormat = state.settings.formatStyle;
      if (elements.formatSelect) elements.formatSelect.value = state.selectedFormat;
    }

    // Set class name from structured fields (Dept + Sec)
    if (state.settings.dept && state.settings.sec) {
      state.settings.className = `${state.settings.dept.toUpperCase()} - '${state.settings.sec.toUpperCase()}'`;
    } else if (elements.settingClassName && elements.settingClassName.value.trim()) {
      state.settings.className = elements.settingClassName.value.trim();
    }

    // If total students changed and roster differs
    const newTotal = state.settings.totalStudents;
    if (newTotal && newTotal !== state.students.length) {
      if (newTotal > state.students.length) {
        const start = state.students.length + 1;
        for (let i = start; i <= newTotal; i++) {
          const roll = String(i).padStart(2, "0");
          state.students.push({ roll, name: `Student ${roll}` });
        }
      } else if (confirm(`Roster currently has ${state.students.length} students. Adjust to ${newTotal}?`)) {
        state.students = state.students.slice(0, newTotal);
      }
    }

    saveState();
    renderHeader();
    renderStats();
    renderStudentCards();
    renderMessagePreview();
    elements.settingsDialog.close();
  });

  // Roster Modal
  elements.btnOpenRoster.addEventListener("click", () => {
    renderRosterTable();
    elements.rosterDialog.showModal();
  });

  // Tab switching in Roster Modal
  document.querySelectorAll(".roster-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".roster-tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      elements.tabBulkImport.classList.toggle("active", tab === "bulk");
      elements.tabIndividualList.classList.toggle("active", tab === "list");
    });
  });

  elements.btnImportBulk.addEventListener("click", handleBulkImport);
  elements.btnGenerateDefault.addEventListener("click", () => {
    if (confirm("Reset roster back to the 60 standard sample students?")) {
      state.students = [...DEFAULT_STUDENTS];
      saveState();
      updateAllViews();
      renderRosterTable();
    }
  });

  elements.btnAddSingleStudent.addEventListener("click", handleAddSingleStudent);
  elements.rosterTableBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-table-delete");
    if (!btn) return;
    const idx = parseInt(btn.dataset.index, 10);
    if (!isNaN(idx)) {
      state.students.splice(idx, 1);
      saveState();
      updateAllViews();
      renderRosterTable();
    }
  });

  // History Modal
  elements.btnOpenHistory.addEventListener("click", () => {
    renderHistoryModal();
    elements.historyDialog.showModal();
  });

  elements.btnExportCsv.addEventListener("click", exportHistoryToCsv);
  elements.btnClearHistory.addEventListener("click", () => {
    if (confirm("Clear all recorded history for today?")) {
      state.history = [];
      saveState();
      renderHistoryModal();
    }
  });

  // Generic Dialog close buttons (`data-action="close-dialog"`)
  document.querySelectorAll('[data-action="close-dialog"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const dialog = e.target.closest("dialog");
      if (dialog) dialog.close();
    });
  });

  // Setup backdrop click-outside for modern dialogs
  setupDialogBackdropLightDismiss(elements.settingsDialog);
  setupDialogBackdropLightDismiss(elements.rosterDialog);
  setupDialogBackdropLightDismiss(elements.historyDialog);

  // Global Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    // Press '/' to quickly focus the roll input (unless already in an input)
    if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      elements.quickRollInput.focus();
    }
    // Ctrl + Enter to copy
    if (e.ctrlKey && e.key === "Enter") {
      copyReportToClipboard();
    }
  });
}

// --- Utility Functions ---
function compareRolls(a, b) {
  const numA = parseInt(a, 10);
  const numB = parseInt(b, 10);
  if (!isNaN(numA) && !isNaN(numB)) {
    return numA - numB;
  }
  return a.localeCompare(b);
}

function formatDateShort(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate + "T00:00:00");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = months[d.getMonth()];
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function formatDatePretty(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate + "T00:00:00");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[d.getDay()];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = months[d.getMonth()];
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy} (${dayName})`;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Start App
document.addEventListener("DOMContentLoaded", init);
