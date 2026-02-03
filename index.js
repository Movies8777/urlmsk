// index.js

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function getPathPayload() {
  const path = window.location.pathname;
  if (path.length > 1) {
    // Remove leading slash and handle +reveal suffix
    let payload = path.substring(1);
    let reveal = false;
    if (payload.endsWith("+reveal")) {
      payload = payload.replace("+reveal", "");
      reveal = true;
    }
    return { payload, reveal };
  }
  return { payload: null, reveal: false };
}

function isTelegram() {
  return /Telegram/i.test(navigator.userAgent);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
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
  location.href = url;
}

function showUI(content) {
  document.body.innerHTML = `
  <div class="reveal center">
    ${content}
  </div>`;
}

function safeSetHref(elementId, url) {
  const el = document.getElementById(elementId);
  if (!el) return;
  // Basic XSS protection for href
  if (url.trim().toLowerCase().startsWith("javascript:")) {
    el.href = "#";
    el.textContent = "Invalid/Unsafe Link";
  } else {
    el.href = url;
  }
}

function showReveal(decoded) {
  showUI(`
    <div>
      <div class="top">DESTINATION REVEALED</div>
      <div class="destination" id="destination-text"></div>
      <div style="padding: 1rem; background: #00000040;">
        <a id="destination-link" style="
          display: block;
          text-align: center;
          padding: 0.8rem;
          background: #537fe7;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 500;
        ">Go to Destination</a>
      </div>
    </div>
  `);
  document.getElementById("destination-text").textContent = decoded;
  safeSetHref("destination-link", decoded);
}

function showText(decoded) {
  showUI(`
    <div>
      <div class="top">MESSAGE</div>
      <div class="destination" id="message-text"></div>
    </div>
  `);
  document.getElementById("message-text").textContent = decoded;
}

function showRedirecting(destination) {
  showUI(`
    <div style="text-align: center; border: none; background: transparent;">
      <h1 style="color: #fff; font-size: 2rem; margin-bottom: 1rem;">Please Wait..</h1>
      <p style="color: #537fe7; font-size: 1.2rem; font-weight: bold;">Opening Link</p>
      <a id="redirect-link" style="color: #a5beff; text-decoration: underline; margin-top: 1rem; display: inline-block;">click here</a>
    </div>
  `);
  safeSetHref("redirect-link", destination);
}

function decodeBase64(str) {
  try {
    // URLSearchParams might convert + to space, but since we are getting it
    // from window.location.search or pathname, we should handle it.
    // Replace space back to + if it's coming from URLSearchParams
    return atob(str.replace(/ /g, "+"));
  } catch (e) {
    console.error("Failed to decode base64", e);
    return null;
  }
}

window.onload = function () {
  // If in Telegram Webview, try to open in external browser
  if (isTelegram()) {
    openSameUrlExternally();
  }

  // Try to get payload from query params first (?r= or ?t=)
  let r = getQueryParam("r");
  let t = getQueryParam("t");
  let reveal = false;

  // If not in query params, try path
  if (!r && !t) {
    const pathData = getPathPayload();
    if (pathData.payload) {
      r = pathData.payload;
      reveal = pathData.reveal;
    }
  }

  if (r) {
    const decoded = decodeBase64(r);
    if (decoded) {
      if (reveal) {
        showReveal(decoded);
      } else {
        showRedirecting(decoded);
        setTimeout(() => {
          window.location.replace(decoded);
        }, 1500);
      }
    } else {
      console.log("Invalid masked URL");
    }
  } else if (t) {
    const decoded = decodeBase64(t);
    if (decoded) {
      showText(decoded);
    }
  } else {
    // No payload, redirect to create page if at root
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        window.location.href = "create.html";
    }
  }
};
