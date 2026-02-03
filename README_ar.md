<p align="center"><img src="./urlmskr.svg"></p>

<p align="center"><a href="./README.md">English</a> — <a href="./README_zh.md">中文</a> — <a href="./README_bn.md">বাংলা</a> — <a href="./README_bn.md">عربي</a> — <a href="./README_es.md">español</a></p>

> [!IMPORTANT]  
> هذه ترجمة تقريبية وقد لا تكون دقيقة.

# ❓ نبذة عن

يتيح لك urlmskr إخفاء الروابط وإرسال رسائل مشفرة عن طريق تغيير الرابط إلى رابط لا يمكن قراءته بسهولة ولكن مع ذلك يعيد التوجيه إلى الرابط الأصلي. يعمل بالكامل على الواجهة الأمامية، ولا يتطلب خادمًا خلفيًا، ولا يخزن أي بيانات. يمكنك استضافته في أي مكان. ادعم المشروع على [Patreon!](https://www.patreon.com/axorax) <3

# 🤔 لماذا؟

يسمح لك استخدام أداة مثل urlmskr بإرسال رابط دون الكشف عن الموقع الوجهة. ومع ذلك، قد يؤدي ذلك إلى تلقي روابط لمواقع غير مرغوب فيها. وللكشف عن الوجهة، ما عليك سوى إضافة `+reveal` في نهاية عنوان URL. على سبيل المثال: `https://urlmsk.onrender.com/hello69+reveal`.

# 💻 التكامل مع مشروعك

يتضمن urlmskr مكتبات للغات البرمجة المختلفة في الدليل الجذر، باسم `lib` مع امتداد اللغة المعنية. يمكنك لصق أو استيراد التعليمات البرمجية في مشروعك. إليك كيفية استخدام مكتبة JavaScript:

```html
<!doctype html>
<html lang="en">
  <head>
    <title>مثال على ذلك</title>
  </head>
  <body>
    <script src="https://urlmsk.onrender.com/lib.js"></script>
    <script>
      document.write(urlmskr.mask("https://axorax.github.io")); // عنوان URL للقناع
      document.write("<br>"); // إضافة سطر فارغ
      document.write(urlmskr.mask("Hello", "text")); // نص القناع
    </script>
  </body>
</html>
```

---

<p align="center"><a href="https://www.patreon.com/axorax">ادعمني على Patreon</a> — <a href="https://github.com/axorax/socials">تحقق من حساباتي الاجتماعية</a></p>
