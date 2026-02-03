require 'base64'
require 'erb'

module Urlmskr
    def self.encode(text)
        return Base64.strict_encode64(text)
    end

    def self.decode(text)
        return Base64.decode64(text)
    end

    def self.mask(text, type)
        base_url = "https://urlmsk.onrender.com/"
        encoded_payload = self.encode(text)
        if type == "text"
            return "#{base_url}?t=#{ERB::Util.url_encode(encoded_payload)}"
        else
            return "#{base_url}?r=#{ERB::Util.url_encode(encoded_payload)}"
        end
    end
end
