const urlmskr = {
  encode: function(text) {
    return window.btoa(text);
  },
  decode: function(text) {
    return window.atob(text);
  },
  mask: function(text, type) {
    const baseUrl = "https://urlmsk.onrender.com/";
    const encodedPayload = this.encode(text);
    if (type == "text") {
      return `${baseUrl}?t=${encodeURIComponent(encodedPayload)}`;
    } else {
      return `${baseUrl}?r=${encodeURIComponent(encodedPayload)}`;
    }
  }
};
