import {Link} from "react-router-dom";
import {html} from "../html.js";

export function Crumbs({items}){return html`<div class="crumbs"><${Link} to="/">Главная<//>${items.map(([t,to])=>html` / ${to?html`<${Link} to=${to}>${t}<//>`:t}`)}</div>`}
