import {useState} from "react";
import {Link} from "react-router-dom";
import {html} from "../html.js";
import {rub, shipCost} from "../utils/format.js";
import {useCart, useUI} from "../context/StoreContext.js";
import {Crumbs} from "../components/Crumbs.js";
import {Empty} from "../components/Empty.js";
import {Qty} from "../components/Qty.js";

export function CartPage(){const c=useCart(),say=useUI(),[code,setCode]=useState(""),[er,setEr]=useState("");
 if(!c.items.length)return html`<${Empty} text="Корзина пуста" to="/catalog" btn="Перейти в каталог" />`;
 const ship=shipCost(c.sub-c.disc);
 return html`<div><${Crumbs} items=${[["Корзина"]]}/><h1>Корзина</h1><div class="cols"><div class="box">${c.items.map(i=>html`<div class="row" key=${i.id}><span class="e">${i.e}</span><div class="n"><b>${i.n}</b><br/><span class="meta">${rub(i.p)} · ${i.u}</span></div><${Qty} q=${i.q} set=${q=>c.setQ(i.id,q)}/><b>${rub(i.p*i.q)}</b><button class="ib" onClick=${()=>c.setQ(i.id,0)} aria-label="Удалить">✕</button></div>`)}
 <${Link} class="btn ghost" style="margin-top:12px" to="/catalog">Продолжить покупки<//></div>
 <div class="box"><h3>Итого</h3><label>Промокод<input value=${code} onInput=${e=>setCode(e.target.value)} placeholder="ECO10" /></label>
 <button class="btn ghost sm" style="margin-top:8px" onClick=${()=>{if(!code.trim()){setEr("Введите промокод");return}if(code.trim().toUpperCase()==="ECO10"){c.setPromo("ECO10");setEr("");say("Скидка 10% применена")}else setEr("Промокод не найден")}}>Применить</button><div class="err">${er}</div>
 <p>Товары: ${rub(c.sub)}</p>${c.disc>0&&html`<p>Скидка: −${rub(c.disc)}</p>`}<p>Доставка: ${ship?rub(ship):"бесплатно"}</p><h3>К оплате: ${rub(c.sub-c.disc+ship)}</h3>
 <${Link} class="btn" style="width:100%" to="/checkout">Оформить заказ<//></div></div></div>`}
