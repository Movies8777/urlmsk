/* =====================================================
   INIT
===================================================== */

const params = new URLSearchParams(location.search);
const DEBUG = params.get("debug") === "1";

/* =====================================================
   HELPERS
===================================================== */

function isTelegramWebView() {
  return typeof window.TelegramWebview !== "undefined";
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function openSameUrlExternally() {
  const url = location.href;

  if (isAndroid()) {
    location.href =
      "intent://" +
      url.replace(/^https?:\/\//, "") +
      "#Intent;scheme=https;package=com.android.chrome;end";
    return;
  }

  if (isIOS()) {
    location.href = url;
    return;
  }

  location.href = url;
}

/* =====================================================
   DEBUG MODE (HARD STOP)
===================================================== */

function showDebug(text) {
  document.documentElement.innerHTML = `
  <body style="
    margin:0;
    background:#020617;
    color:#22d3ee;
    font-family:monospace;
    padding:16px;
    white-space:pre-wrap;
    word-break:break-word;
    min-height:100vh;
  ">
${text}
  </body>`;
}

if (DEBUG) {
  const encodedPath = location.pathname.replace("/", "");
  let mode = "Fallback";
  let encoded = "";
  let decoded = "";

  if (params.get("r")) {
    mode = "Query (?r=)";
    encoded = params.get("r");
  } else if (encodedPath.length > 10) {
    mode = "Path";
    encoded = encodedPath;
  }

  if (encoded) {
    try {
      decoded = atob(encoded);
    } catch {
      decoded = "Invalid Base64";
    }
  }

  showDebug(`
DEBUG MODE: ENABLED

Domain:
${location.origin}

Full URL:
${location.href}

Path:
${location.pathname}

Query:
${location.search}

User Agent:
${navigator.userAgent}

TelegramWebView:
${isTelegramWebView()}

Android:
${isAndroid()}

iOS:
${isIOS()}

Mode: ${mode}
Encoded:
${encoded || "none"}

Decoded:
${decoded || "none"}
  `);

  throw new Error("DEBUG MODE STOP");
}

/* =====================================================
   MAIN LOGIC
===================================================== */

/* ---- QUERY MODE ---- */
if (params.get("r")) {
  const encoded = params.get("r");

  if (isTelegramWebView()) {
    openSameUrlExternally();
  } else {
    location.replace(atob(encoded));
  }

/* ---- PATH MODE ---- */
} else {
  const encodedPath = location.pathname.replace("/", "");

  if (encodedPath.length > 10) {
    if (isTelegramWebView()) {
      openSameUrlExternally();
    } else {
      try {
        location.replace(atob(encodedPath));
      } catch {
        location.replace("https://urlmsk.onrender.com/contact");
      }
    }
  } else {
    location.replace("https://urlmsk.onrender.com/contact");
  }
}
