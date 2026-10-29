import {Link} from "react-router-dom";
import {html} from "../html.js";

export function Empty({icon="🧺",text,to,btn}){return html`<div class="empty"><div class="big">${icon}</div><p>${text}</p>${to&&html`<${Link} class="btn" to=${to}>${btn}<//>`}</div>`}
