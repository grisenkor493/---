import {Link} from "react-router-dom";
import {html} from "../html.js";
import {rub} from "../utils/format.js";
import {useCart} from "../context/StoreContext.js";

export function ProductCard({p}){const c=useCart(),on=c.favs.includes(p.id);
 return html`<div class="card"><${Link} to=${"/product/"+p.id} class="pic">${p.t&&html`<span class="tag">${p.t}</span>`}${p.e}<//>
 <button class=${"fv "+(on?"on":"")} onClick=${()=>c.fav(p.id)} aria-label="В избранное">${on?"♥":"♡"}</button>
 <div class="info"><${Link} to=${"/product/"+p.id} class="nm">${p.n}<//><span class="meta">${p.u} · ${p.r>0?"★ "+p.r:"нет оценок"}</span>
 <div class="price">${rub(p.p)}${p.old?html`<s>${rub(p.old)}</s>`:""}</div>
 <button class="btn" disabled=${p.st<1} onClick=${()=>c.add(p)}>${p.st<1?"Нет в наличии":"В корзину"}</button></div></div>`}
