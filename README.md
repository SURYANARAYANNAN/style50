# 🧩 style50

[![style50 on VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/surisurya19.style50?label=style50)](https://marketplace.visualstudio.com/items?itemName=surisurya19.style50)

Format Python and C files using a CS50-inspired clean style.

## ✨ Features

- Format `.py` and `.c` files
- Format on Save support
- Context menu + Command Palette integration
- Skips formatting if syntax errors exist

## 🛠 Usage

- Right-click → **Style50: Format File**
- Press `Ctrl+Shift+P` → Type **Style50**
- Enable "Format on Save" in settings

```json
"[python]": {
  "editor.defaultFormatter": "surisurya19.style50",
  "editor.formatOnSave": true
},
"[c]": {
  "editor.defaultFormatter": "surisurya19.style50",
  "editor.formatOnSave": true
}
