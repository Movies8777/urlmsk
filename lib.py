import base64
import urllib.parse

class urlmskr:
    @staticmethod
    def encode(text):
        return base64.b64encode(text.encode()).decode()

    @staticmethod
    def decode(text):
        return base64.b64decode(text.encode()).decode()

    @staticmethod
    def mask(text, type):
        baseUrl = "https://urlmsk.onrender.com/"
        encodedPayload = urlmskr.encode(text)
        if type == "text":
            return f"{baseUrl}?t={urllib.parse.quote(encodedPayload)}"
        else:
            return f"{baseUrl}?r={urllib.parse.quote(encodedPayload)}"
