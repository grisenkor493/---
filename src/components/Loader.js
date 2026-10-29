import {html} from "../html.js";

export function Loader({n=4}){return html`<div class="grid">${Array.from({length:n},(_,i)=>html`<div class="skel" key=${i}></div>`)}</div>`}
