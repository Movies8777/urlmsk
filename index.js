const params = new URLSearchParams(window.location.search);

/**
 * detectInAppBrowser with explicit Telegram Web App checks
 * - Uses UA check, window.Telegram / window.TelegramWebApp presence,
 *   document.referrer 'tg://' check and legacy Telegram webview proxies.
 * Returns { isInApp, isTelegram, isAndroid }
 */
function detectInAppBrowser() {
  const ua = (navigator.userAgent || "").toString();
  const ref = (document.referrer || "").toString();

  // Telegram-specific checks (UA, WebApp objects, referrer, proxy)
  const uaHasTelegram = /Telegram/i.test(ua);
  const hasTelegramWebAppObject = typeof window.TelegramWebApp !== "undefined";
  const hasTelegramWebAppNested = !!(window.Telegram && window.Telegram.WebApp);
  const hasTelegramWebviewProxy = typeof window.TelegramWebviewProxy !== "undefined";
  const referrerIsTg = ref.startsWith("tg://") || ref.startsWith("tg:"); // tg:// or tg:

  const isTelegram = uaHasTelegram || hasTelegramWebAppObject || hasTelegramWebAppNested || hasTelegramWebviewProxy || referrerIsTg;

  // Generic known in-app browsers (kept for broader detection if needed)
  const knownInApp = /FBAN|FBAV|Instagram|Twitter|Snapchat|Messenger|WhatsApp|WeChat|MicroMessenger|Pinterest|LinkedIn|Viber|KAKAO|NAVER|FB_IAB|FB4A|FBAN/i.test(ua);

  const isAndroid = /\bAndroid\b/i.test(ua);

  // Android WebView heuristic (kept but we will only use Telegram flag for Android-only branch)
  const isAndroidWebView = /\bwv\b/i.test(ua) || (isAndroid && /Version\/\d+\.\d+/i.test(ua) && !/Chrome\/\d+/i.test(ua));

  const isInApp = isTelegram || knownInApp || isAndroidWebView;
  return { isInApp, isTelegram, isAndroid };
}

function toChromeIntent(url) {
  const noScheme = url.replace(/^https?:\/\//, "");
  return `intent://${noScheme}#Intent;scheme=https;package=com.android.chrome;end`;
}

/**
 * Android-only behaviour: only when Telegram detected
 * Attempt to open the SAME encoded URL externally via intent:// (Chrome).
 * If that fails, fall back after a short delay to in-app redirect to decoded destination.
 */
function openSameEncodedUrlOnAndroidIfTelegramOrFallback(decodedDestination) {
  const det = detectInAppBrowser();
  const encodedUrl = window.location.href;

  // Only run special behaviour when both Android and Telegram are detected
  if (!(det.isAndroid && det.isTelegram)) {
    window.location.replace(decodedDestination);
    return;
  }

  // Android + Telegram -> attempt to open encoded URL externally via Chrome intent
  const intentUrl = toChromeIntent(encodedUrl);
  window.location.replace(intentUrl);

  // Fallback: after short delay, redirect to decoded destination in-app
  setTimeout(() => {
    window.location.replace(decodedDestination);
  }, 1500);
}

/* --- main logic (unchanged except Android+Telegram branch above) --- */

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
  // Only Android+Telegram will open the same encoded URL externally; otherwise normal redirect
  openSameEncodedUrlOnAndroidIfTelegramOrFallback(dest);
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
