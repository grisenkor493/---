import {html} from "../html.js";

export function Field({label,err,children}){return html`<label>${label}${children}${err&&html`<span class="err" role="alert">${err}</span>`}</label>`}
