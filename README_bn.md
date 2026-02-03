<p align="center"><img src="./urlmskr.svg"></p>

<p align="center"><a href="./README.md">English</a> — <a href="./README_zh.md">中文</a> — <a href="./README_bn.md">বাংলা</a> — <a href="./README_bn.md">عربي</a> — <a href="./README_es.md">español</a></p>

> [!IMPORTANT]  
> এটি একটি মোটামুটি অনুবাদ এবং সঠিক নাও হতে পারে। আমি বাংলা জানি কিন্তু প্রুফরিড করার সময় পাইনি।

# ❓ সম্পর্কিত

urlmskr আপনাকে লিঙ্ক মাস্ক করতে দেয় এবং একটি লিঙ্ক পরিবর্তন করে এনকোড করা বার্তা পাঠাতে দেয় যা সহজে পড়া যায় না, তবুও মূলে পুনঃনির্দেশিত হয়। এটি সম্পূর্ণরূপে ফ্রন্টএন্ডে চলে, কোন ব্যাকএন্ড সার্ভারের প্রয়োজন হয় না এবং কোন ডেটা সঞ্চয় করে না। আপনি যে কোন জায়গায় এটি হোস্ট করতে পারেন. [Patreon!](https://www.patreon.com/axorax) <3 এ প্রকল্পকে সমর্থন করুন

# 🤔 কেন?

urlmskr এর মতো একটি টুল ব্যবহার করে আপনি গন্তব্য সাইটটি প্রকাশ না করে একটি লিঙ্ক পাঠাতে পারবেন। যাইহোক, এর ফলে অবাঞ্ছিত সাইটের লিঙ্ক পাওয়া যেতে পারে। গন্তব্য প্রকাশ করতে, URL-এর শেষে শুধু `+reveal` যোগ করুন। যেমন: `https://urlmsk.onrender.com/hello69+reveal`।

# 💻 আপনার প্রকল্পের সাথে সংহত করুন

urlmskr রুট ডিরেক্টরিতে বিভিন্ন প্রোগ্রামিং ভাষার জন্য লাইব্রেরি অন্তর্ভুক্ত করে, যার নাম `lib` সংশ্লিষ্ট ভাষা এক্সটেনশন সহ। আপনি আপনার প্রকল্পে কোড পেস্ট বা আমদানি করতে পারেন। জাভাস্ক্রিপ্ট লাইব্রেরি কীভাবে ব্যবহার করবেন তা এখানে:

```html
<!doctype html>
<html lang="en">
  <head>
    <title>উদাহরণ</title>
  </head>
  <body>
    <script src="https://urlmsk.onrender.com/lib.js"></script>
    <script>
      document.write(urlmskr.mask("https://axorax.github.io")); // মাস্ক URL
      document.write("<br>"); // খালি লাইন যোগ করুন
      document.write(urlmskr.mask("Hello", "text")); // মাস্ক পাঠ্য
    </script>
  </body>
</html>
```

---

<p align="center"><a href="https://www.patreon.com/axorax">Patreon এ আমাকে সমর্থন করুন</a> — <a href="https://github.com/axorax/socials">আমার সামাজিক চেক আউট করুন</a></p>
