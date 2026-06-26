# 🌐 Universal Base Converter

<p>A small web app to convert strings between <b>arbitrary alphabets</b>.<br> 
It supports classic numeral systems (binary, octal, decimal, hex) and custom alphabets — including <b>letters, symbols, and even emoji</b>.<br>  
Built in pure JavaScript, no frameworks. Uses <b>BigInt</b> for large numbers.</p>

<img width="2263" height="1235" alt="image" src="https://github.com/user-attachments/assets/15da118a-6642-4e32-9112-e02dac8b3767" />


## ✨ Features

- 🔢 Convert between any symbols, words, digits, etc:
  - Binary, Octal, Decimal, Hex
  - Alphabetic (lowercase, uppercase, mixed)
  - Alphanumeric
  - Custom emoji-based alphabets
- ⚡ Works with large values (`BigInt`-based implementation)
- 🎨 Minimal UI with responsive design
- 📋 One-click copy to clipboard
- ⌨️ Press **Enter** to run conversion

---
Deploy: [Click me!](https://asya-space.github.io/symbol-converter/)
## 🚀 Demo

Paste any input, define **source alphabet** and **target alphabet**, then click **Convert**.

Example:
```js
// Binary -> Decimal
convert("101010", "01", "0123456789"); 
// → "42"

// Alphabet -> Hex
convert("hello", "abcdefghijklmnopqrstuvwxyz", "0123456789abcdef");
// → "320048"

// Emoji alphabet
const emoji = "🙂🙃😊😇😉😍😘😎😭😡";
<img width="750" height="722" alt="image" src="https://github.com/user-attachments/assets/5490f1dc-286f-4727-a70d-2a02e3728087" />

convert("😍😊", emoji, "0123456789");
// → "4405"
