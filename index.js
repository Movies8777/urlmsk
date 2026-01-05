const params = new URLSearchParams(window.location.search);
const DEBUG = params.get("debug") === "1";

/* ============================
   Telegram WebView Detection
============================ */
function isTelegramWebView() {
  return typeof window.TelegramWebview !== "undefined";
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/* ============================
   DEBUG SCREEN
============================ */
function showDebug(info) {
  document.body.innerHTML = `
    <pre style="
      background:#0f172a;
      color:#38bdf8;
      padding:16px;
      font-size:14px;
      white-space:pre-wrap;
      word-break:break-word;
      min-height:100vh;
      font-family:monospace;
    ">${info}</pre>
  `;
}

/* ============================
   External Open (NO REDIRECT IN DEBUG)
============================ */
function openSameUrlExternally() {
  const currentUrl = window.location.href;

  if (DEBUG) return;

  if (isAndroid()) {
    window.location.href =
      "intent://" +
      currentUrl.replace(/^https?:\/\//, "") +
      "#Intent;scheme=https;package=com.android.chrome;end";
    return;
  }

  if (isIOS()) {
    window.location.href = currentUrl;
    return;
  }

  window.location.href = currentUrl;
}

/* ============================
   ORIGINAL CODE (EXTENDED)
============================ */

let debugLog = "";
debugLog += `DEBUG MODE: ON\n\n`;
debugLog += `UserAgent:\n${navigator.userAgent}\n\n`;
debugLog += `TelegramWebView: ${isTelegramWebView()}\n`;
debugLog += `Android: ${isAndroid()}\n`;
debugLog += `iOS: ${isIOS()}\n\n`;
debugLog += `Current URL:\n${window.location.href}\n\n`;

/* ---------- ?r= MODE ---------- */
if (params.get("r")) {
  const encoded = params.get("r");
  debugLog += `Mode: Query (?r=)\n`;
  debugLog += `Encoded Value:\n${encoded}\n\n`;

  if (isTelegramWebView()) {
    debugLog += `ACTION: Telegram detected\n`;
    debugLog += `RESULT: Reopen SAME encoded URL externally\n`;
    if (DEBUG) return showDebug(debugLog);
    openSameUrlExternally();
  } else {
    debugLog += `ACTION: Normal browser\n`;
    try {
      debugLog += `Decoded URL:\n${atob(encoded)}\n`;
      debugLog += `RESULT: Redirect to decoded URL\n`;
    } catch {
      debugLog += `ERROR: Invalid Base64\n`;
    }
    if (DEBUG) return showDebug(debugLog);
    window.location.replace(atob(encoded));
  }
}

/* ---------- PATH MODE ---------- */
const encodedPath = window.location.pathname.replace("/", "");
if (encodedPath.length > 10) {
  debugLog += `Mode: Path-based\n`;
  debugLog += `Encoded Path:\n${encodedPath}\n\n`;

  if (isTelegramWebView()) {
    debugLog += `ACTION: Telegram detected\n`;
    debugLog += `RESULT: Reopen SAME encoded URL externally\n`;
    if (DEBUG) return showDebug(debugLog);
    openSameUrlExternally();
  } else {
    try {
      debugLog += `Decoded URL:\n${atob(encodedPath)}\n`;
      debugLog += `RESULT: Redirect to decoded URL\n`;
      if (DEBUG) return showDebug(debugLog);
      window.location.replace(atob(encodedPath));
    } catch {
      debugLog += `ERROR: Invalid Base64\n`;
      if (DEBUG) return showDebug(debugLog);
    }
  }
}

/* ---------- FALLBACK ---------- */
debugLog += `Mode: Fallback\n`;
debugLog += `RESULT: Redirect to create page\n`;

if (DEBUG) return showDebug(debugLog);
window.location.replace("https://urlmsk.onrender.com/create");
  /* ============================
     PATH-BASED ENCODED URL SUPPORT
     Example:
     /aHR0cHM6Ly9zb2Z0dXJsLmluL3RzYkx4Ng==
  ============================ */

  const encodedPath = window.location.pathname.replace("/", "");

  if (encodedPath && encodedPath.length > 10) {
    if (isTelegramWebView()) {
      console.log("Found Telegram Webview");
      openSameUrlExternally();
    } else {
      try {
        window.location.replace(window.atob(encodedPath));
      } catch (e) {
        window.location.replace("https://urlmsk.onrender.com/create");
      }
    }
  } else {
    window.location.replace("https://urlmsk.onrender.com/create");
  }
}
