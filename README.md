<p align="center"><img src="./urlmskr.svg"></p>

<p align="center"><a href="./README.md">English</a> — <a href="./README_zh.md">中文</a> — <a href="./README_bn.md">বাংলা</a> — <a href="./README_ar.md">عربي</a> — <a href="./README_es.md">español</a></p>

# ❓ About

urlmskr lets you mask links and send encoded messages by changing a link to one that can't be easily read but still redirects to the original. It runs entirely on the frontend, requires no backend server, and stores no data. You can host it anywhere. Support the project on [Patreon!](https://www.patreon.com/axorax) <3

# 🤔 Why?

Using a tool like urlmskr allows you to send a link without revealing the destination site. However, this could lead to receiving links to unwanted sites. To reveal the destination, simply add `+reveal` at the end of the URL. For example: `https://urlmsk.onrender.com/hello69+reveal`.

# 💻 Integrate with your project

urlmskr includes libraries for various programming languages in the root directory, named `lib` with the respective language extension. You can paste or import the code into your project. Here’s how to use the JavaScript library:

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Example</title>
  </head>
  <body>
    <script src="https://urlmsk.onrender.com/lib.js"></script>
    <script>
      document.write(urlmskr.mask("https://urlmsk.onrender.com")); // Mask URL
      document.write("<br>"); // Add empty line
      document.write(urlmskr.mask("Hello", "text")); // Mask text
    </script>
  </body>
</html>
```

---

<p align="center"><a href="https://www.patreon.com/axorax">Support me on Patreon</a> — <a href="https://github.com/axorax/socials">Check out my socials</a></p>
