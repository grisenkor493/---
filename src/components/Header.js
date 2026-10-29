import {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {html} from "../html.js";
import {rub} from "../utils/format.js";
import {useAuth, useCart} from "../context/StoreContext.js";
import {Qty} from "./Qty.js";

export function Header(){const c=useCart(),a=useAuth(),[menu,setM]=useState(false),[mini,setMini]=useState(false),close=()=>{setM(false);setMini(false)};
 return html`<header><div class="wrap bar"><button class="ib burger" onClick=${()=>setM(!menu)} aria-label="Меню">☰</button>
 <${Link} class="logo" to="/" onClick=${close}>🌿 ЭкоФерма<//>
 <nav class=${menu?"open":""} onClick=${close}><${NavLink} to="/" end>Главная<//><${NavLink} to="/catalog">Каталог<//>${a.user&&a.user.role==="admin"&&html`<${NavLink} to="/admin/products">Админ: товары<//><${NavLink} to="/admin/orders">Админ: заказы<//>`}${a.user&&html`<a href="#" onClick=${e=>{e.preventDefault();a.logout()}}>Выйти</a>`}</nav>
 <span class="sp"></span>
 <${Link} class="ib" to="/favorites" aria-label="Избранное" onClick=${close}>♥${c.favs.length>0&&html`<span class="badge">${c.favs.length}</span>`}<//>
 <button class="ib" onClick=${()=>setMini(!mini)} aria-label="Корзина">🛒${c.count>0&&html`<span class="badge">${c.count}</span>`}</button>
 <${Link} class="ib" to=${a.user?"/profile":"/login"} aria-label="Личный кабинет" onClick=${close}>👤<//>
 ${mini&&html`<div class="mini">${c.items.length?html`${c.items.map(i=>html`<div class="row" key=${i.id}><span class="e">${i.e}</span><div class="n">${i.n}<br/><span class="meta">${rub(i.p)}</span></div><${Qty} q=${i.q} set=${q=>c.setQ(i.id,q)} /></div>`)}
 <p><b>Итого: ${rub(c.sub-c.disc)}</b></p><div class="two"><${Link} class="btn ghost" to="/cart" onClick=${close}>Корзина<//><${Link} class="btn" to="/checkout" onClick=${close}>Оформить<//></div>`:html`<p class="empty">Корзина пуста</p>`}</div>`}
 </div></header>`}
