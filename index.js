const params = new URLSearchParams(window.location.search);

/* ============================
   Telegram WebView Detection
============================ */
function isTelegramWebView() {
  return typeof window.TelegramWebview !== "undefined";
}

/**
 * Open SAME URL externally (encoded, not decoded)
 */
function openSameUrlExternally() {
  const currentUrl = window.location.href;

  // Android → Chrome
  if (/Android/i.test(navigator.userAgent)) {
    const intent =
      "intent://" +
      currentUrl.replace(/^https?:\/\//, "") +
      "#Intent;scheme=https;package=com.android.chrome;end";
    window.location.href = intent;
    return;
  }

  // iOS → Safari
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = currentUrl;
    return;
  }

  // Fallback
  window.location.href = currentUrl;
}

/* ============================
   ORIGINAL CODE (NOT REMOVED)
============================ */

if (params.get("r") && params.get("r").toLowerCase().endsWith(" reveal")) {
  const url = params.get("r").slice(0, -7);

  document.head.innerHTML += '<link rel="stylesheet" href="./style.css">';
  document.body.innerHTML = `
    <div id="electric-surge"></div>

    <div class="reveal center">
        <div>
            <div class="top">This URL redirects to:</div>
            <div class="destination">${window.atob(url)}</div>
        </div>
    </div>  
  `;

  document.body.appendChild(
    Object.assign(document.createElement("script"), { src: "./script.js" })
  );

} else if (params.get("r")) {
  const encoded = params.get("r");

  // 🟥 Telegram WebView → reopen SAME URL externally
  if (isTelegramWebView()) {
    console.log("Found Telegram Webview");
    openSameUrlExternally();
  } 
  // 🟩 Normal browser → original behavior
  else {
    window.location.replace(window.atob(encoded));
  }

} else if (params.get("t")) {
  document.body.innerHTML = `
    <p>${window.atob(params.get("t"))}</p>
  `;

  document.head.innerHTML += `
    <style>
      :root {
        color-scheme: dark;
      }

      * {
        margin: 0;
        padding: 0;
        color: #fff;
      }

      html {
        background: linear-gradient(to top, #171515, #242323) no-repeat center center / cover;
        height: 100dvh;
        overflow-x: hidden;
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
