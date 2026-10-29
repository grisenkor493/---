import {html} from "../html.js";

export function Qty({q,set}){return html`<span class="qty"><button onClick=${()=>set(q-1)} aria-label="Меньше">−</button><b>${q}</b><button onClick=${()=>set(q+1)} aria-label="Больше">+</button></span>`}
