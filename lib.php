<?php
class urlmskr {
    public static function encode($text) {
        return base64_encode($text);
    }

    public static function decode($text) {
        return base64_decode($text);
    }

    public static function mask($text, $type) {
        $baseUrl = "https://urlmsk.onrender.com/";
        $encodedPayload = self::encode($text);
        if ($type == "text") {
            return $baseUrl . "?t=" . urlencode($encodedPayload);
        } else {
            return $baseUrl . "?r=" . urlencode($encodedPayload);
        }
    }
}
?>
