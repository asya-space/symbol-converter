# 🌐 Universal Base Converter

A small web app to convert strings between **arbitrary alphabets**.  
It supports classic numeral systems (binary, octal, decimal, hex) and custom alphabets — including **letters, symbols, and even emoji**.  
Built in pure JavaScript, no frameworks. Uses **BigInt** for large numbers.
---

<img width="750" height="722" alt="image" src="https://github.com/user-attachments/assets/b2052793-2ffa-4609-ae0d-3c18d475bf41" />


---

## ✨ Features

- 🔢 Convert between any alphabets:
  - Binary, Octal, Decimal, Hex
  - Alphabetic (lowercase, uppercase, mixed)
  - Alphanumeric
  - Custom emoji-based alphabets
- ⚡ Works with large values (`BigInt`-based implementation)
- 🎨 Minimal UI with responsive design
- 📋 One-click copy to clipboard
- ⌨️ Press **Enter** to run conversion

---

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
