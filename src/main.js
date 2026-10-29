import React from "react";
import ReactDOM from "react-dom/client";
import { h, html } from "./html.js";
import { App } from "./App.js";
import "./index.css";

// Границы ошибок: вместо белого экрана показываем текст ошибки
class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { e: null }; }
  static getDerivedStateFromError(e) { return { e }; }
  render() {
    return this.state.e
      ? h("pre", { style: { padding: 16, whiteSpace: "pre-wrap", color: "#d9455a" } }, "Ошибка отображения: " + this.state.e.message)
      : this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${ErrorBoundary}><${App} /><//>`);
