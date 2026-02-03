<p align="center"><img src="./urlmskr.svg"></p>

<p align="center"><a href="./README.md">English</a> — <a href="./README_zh.md">中文</a> — <a href="./README_bn.md">বাংলা</a> — <a href="./README_bn.md">عربي</a> — <a href="./README_es.md">español</a></p>

> [!IMPORTANT]  
> Esta es una traducción aproximada y puede no ser exacta.

# ❓ Acerca de

urlmskr permite enmascarar enlaces y enviar mensajes codificados cambiando un enlace por otro que no pueda leerse fácilmente pero que redirija al original. Se ejecuta completamente en el frontend, no requiere servidor backend y no almacena datos. Puedes alojarlo en cualquier sitio. Apoya el proyecto en [Patreon!](https://www.patreon.com/axorax) <3

# 🤔 ¿Por qué?

Utilizar una herramienta como urlmskr permite enviar un enlace sin revelar el sitio de destino. Sin embargo, esto podría llevar a recibir enlaces a sitios no deseados. Para revelar el destino, basta con añadir `+reveal` al final de la URL. Por ejemplo: `https://urlmsk.onrender.com/hello69+reveal`.

# 💻 Integración en su proyecto

urlmskr incluye librerías para varios lenguajes de programación en el directorio raíz, llamadas `lib` con la extensión del lenguaje respectivo. Puede pegar o importar el código en su proyecto. A continuación se explica cómo utilizar la biblioteca JavaScript:

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Ejemplo</title>
  </head>
  <body>
    <script src="https://urlmsk.onrender.com/lib.js"></script>
    <script>
      document.write(urlmskr.mask("https://axorax.github.io")); // Máscara URL
      document.write("<br>"); // Añadir línea vacía
      document.write(urlmskr.mask("Hello", "text")); // Texto de máscara
    </script>
  </body>
</html>
```

---

<p align="center"><a href="https://www.patreon.com/axorax">Apóyame en Patreon</a> — <a href="https://github.com/axorax/socials">Echa un vistazo a mis redes sociales</a></p>
