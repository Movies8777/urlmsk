const params = new URLSearchParams(window.location.search);

/**
 * detectInAppBrowser (StackOverflow-style heuristic)
 * Returns { isInApp, isTelegram, isAndroid }
 */
function detectInAppBrowser() {
  const ua = (navigator.userAgent || "").toString();

  const isTelegram = /Telegram/i.test(ua) || typeof window.TelegramWebApp !== "undefined";
  const knownInApp = /FBAN|FBAV|Instagram|Twitter|Snapchat|Messenger|WhatsApp|WeChat|MicroMessenger|Pinterest|LinkedIn|Viber|KAKAO|NAVER|FB_IAB|FB4A|FBAN|Telegram/i.test(ua);

  const isAndroid = /\bAndroid\b/i.test(ua);

  // Android WebView indicator 'wv' or Version/X without Chrome token
  const isAndroidWebView = /\bwv\b/i.test(ua) || (isAndroid && /Version\/\d+\.\d+/i.test(ua) && !/Chrome\/\d+/i.test(ua));

  const isInApp = isTelegram || knownInApp || isAndroidWebView;
  return { isInApp, isTelegram, isAndroid };
}

function toChromeIntent(url) {
  const noScheme = url.replace(/^https?:\/\//, "");
  return `intent://${noScheme}#Intent;scheme=https;package=com.android.chrome;end`;
}

/**
 * Android-only behavior:
 * If we're on Android AND in an in-app browser, attempt to open the SAME encoded URL externally (intent://).
 * Fallback after delay: redirect to decoded destination inside the in-app browser.
 */
function openSameEncodedUrlOnAndroidOrFallback(decodedDestination) {
  const det = detectInAppBrowser();
  const encodedUrl = window.location.href;

  if (!(det.isAndroid && det.isInApp)) {
    // Not Android in-app -> normal immediate redirect to decoded destination
    window.location.replace(decodedDestination);
    return;
  }

  // Android in-app detected -> attempt external open via intent
  const intentUrl = toChromeIntent(encodedUrl);
  window.location.replace(intentUrl);

  // Fallback: after short delay, do a normal in-app redirect to decoded destination
  setTimeout(() => {
    window.location.replace(decodedDestination);
  }, 1500);
}

/* --- existing behaviour below --- */

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
    Object.assign(document.createElement("script"), { src: "./script.js" }),
  );
} else if (params.get("r")) {
  const dest = window.atob(params.get("r"));
  // Use Android-only open-or-fallback, otherwise immediate redirect
  openSameEncodedUrlOnAndroidOrFallback(dest);
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
  window.location.replace("https://urlmsk.onrender.com/create");
                  }
