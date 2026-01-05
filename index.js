const params = new URLSearchParams(window.location.search);

/**
 * Telegram WebView Detection (OFFICIAL METHOD)
 */
function isTelegramWebView() {
  return typeof window.TelegramWebview !== "undefined";
}

/**
 * Redirect Telegram users to external browser
 * Encoded URL stays encoded until redirect
 */
function redirectTelegram(encodedUrl) {
  const decodedUrl = atob(encodedUrl);

  // Android → Chrome
  if (/Android/i.test(navigator.userAgent)) {
    const intent =
      "intent://" +
      decodedUrl.replace(/^https?:\/\//, "") +
      "#Intent;scheme=https;package=com.android.chrome;end";
    window.location.href = intent;
    return;
  }

  // iOS → Safari
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = decodedUrl;
    return;
  }

  // Fallback
  window.location.href = decodedUrl;
}

/* ============================
   MAIN FLOW
============================ */

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
  const encodedUrl = params.get("r");

  // ✅ Telegram WebView detected
  if (isTelegramWebView()) {
    console.log("Found Telegram Webview");
    redirectTelegram(encodedUrl);
  } else {
    // Normal browser
    window.location.replace(atob(encodedUrl));
  }

} else if (params.get("t")) {
  document.body.innerHTML = `<p>${atob(params.get("t"))}</p>`;

  document.head.innerHTML += `
    <style>
      :root { color-scheme: dark; }
      * { margin: 0; padding: 0; color: #fff; }
      html {
        background: linear-gradient(to top, #171515, #242323);
        height: 100dvh;
      }
      p {
        padding: 0.9rem 1.2rem;
        font-size: 2rem;
        font-family: Arial, Helvetica, sans-serif;
        word-wrap: break-word;
      }
    </style>
  `;

} else {
  window.location.replace("https://urlmsk.onrender.com/create");
}
