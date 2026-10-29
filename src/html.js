import React from "react";
import htm from "htm";

// React принимает style только объектом, поэтому строки вида style="margin:0" превращаем в объект
const css = (s) =>
  s.split(";").filter((x) => x.trim()).reduce((o, x) => {
    const i = x.indexOf(":");
    o[x.slice(0, i).trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = x.slice(i + 1).trim();
    return o;
  }, {});

export const h = (t, p, ...c) =>
  React.createElement(t, p && typeof p.style === "string" ? { ...p, style: css(p.style) } : p, ...c);

// html`<div class="x">...</div>` — шаблонный синтаксис htm вместо JSX
export const html = htm.bind(h);
