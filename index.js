/* =====================================================
   INIT & DEBUG (MUST BE FIRST)
===================================================== */

const params = new URLSearchParams(window.location.search);
const DEBUG = params.get("debug") === "1";

function isTelegramWebView() {
  return typeof window.TelegramWebview !== "undefined";
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

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
    </body>
  `;
}

function collectDebugInfo(extra = "") {
  return `
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

${extra}
`;
}

/* =====================================================
   HARD STOP ALL REDIRECTS IN DEBUG
===================================================== */
if (DEBUG) {
  const encodedPath = location.pathname.replace("/", "");
  let extra = "";

  if (params.get("r")) {
    extra += `Mode: Query (?r=)\nEncoded:\n${params.get("r")}\n`;
    try { extra += `Decoded:\n${atob(params.get("r"))}\n`; } catch {}
  } else if (encodedPath.length > 10) {
    extra += `Mode: Path\nEncoded:\n${encodedPath}\n`;
    try { extra += `Decoded:\n${atob(encodedPath)}\n`; } catch {}
  } else {
    extra += `Mode: Fallback\n`;
  }

  showDebug(collectDebugInfo(extra));
  throw new Error("DEBUG MODE STOP");
}

/* =====================================================
   EXTERNAL OPEN (TELEGRAM ONLY)
===================================================== */

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
   ORIGINAL LOGIC (EXTENDED, NOT REMOVED)
===================================================== */

if (params.get("r") && params.get("r").toLowerCase().endsWith(" reveal")) {
  const url = params.get("r").slice(0, -7);

  document.head.innerHTML += '<link rel="stylesheet" href="./style.css">';
  document.body.innerHTML = `
    <div id="electric-surge"></div>
    <div class="reveal center">
      <div>
        <div class="top">This URL redirects to:</div>
        <div class="destination">${atob(url)}</div>
      </div>
    </div>
  `;

  document.body.appendChild(
    Object.assign(document.createElement("script"), { src: "./script.js" })
  );

} else if (params.get("r")) {
  const encoded = params.get("r");

  if (isTelegramWebView()) {
    openSameUrlExternally();
  } else {
    location.replace(atob(encoded));
  }

} else {
  /* -------- PATH BASED -------- */
  const encodedPath = location.pathname.replace("/", "");

  if (encodedPath.length > 10) {
    if (isTelegramWebView()) {
      openSameUrlExternally();
    } else {
      try {
        location.replace(atob(encodedPath));
      } catch {
        location.replace("https://urlmsk.onrender.com/create");
      }
    }
  } else {
    location.replace("https://urlmsk.onrender.com/create");
  }
}
