import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {html} from "../html.js";
import {W, api} from "../api/api.js";
import {rub} from "../utils/format.js";
import {useData} from "../hooks/useData.js";
import {useCart} from "../context/StoreContext.js";
import {Crumbs} from "../components/Crumbs.js";
import {Loader} from "../components/Loader.js";
import {Empty} from "../components/Empty.js";
import {Reviews} from "../components/Reviews.js";
import {ProductCard} from "../components/ProductCard.js";
import {Qty} from "../components/Qty.js";

export function Product(){const{id}=useParams(),nav=useNavigate(),c=useCart(),[q,setQ]=useState(1),[kk,setKk]=useState(0),{l,d:p}=useData(()=>api.get(id),[id,kk]),sim=useData(()=>p?api.list({cat:p.c}):W([]),[p&&p.id]);
 if(l)return html`<${Loader} n=${2}/>`;if(!p)return html`<${Empty} icon="🧺" text="Товар не найден" to="/catalog" btn="В каталог" />`;
 return html`<div><${Crumbs} items=${[["Каталог","/catalog"],[p.c,"/catalog?cat="+encodeURIComponent(p.c)],[p.n]]}/>
 <div class="pd"><div class="pic box" style="font-size:120px">${p.e}</div><div><h1>${p.n}</h1><p>${p.d}</p>
 <div class="price" style="font-size:28px">${rub(p.p)}${p.old?html`<s>${rub(p.old)}</s>`:""}</div>
 <ul class="meta"><li>Производитель: ${p.o}</li><li>Категория: ${p.c}</li><li>Фасовка: ${p.u}</li><li>Рейтинг: ${p.r>0?"★ "+p.r+(p.rc?" ("+p.rc+" отз.)":""):"нет оценок"}</li><li>${p.st>0?"В наличии: "+p.st:"Нет в наличии"}</li></ul>
 <p><${Qty} q=${q} set=${v=>setQ(Math.max(1,Math.min(p.st||1,v)))}/></p>
 <div class="two"><button class="btn" disabled=${p.st<1} onClick=${()=>c.add(p,q)}>В корзину</button><button class="btn ghost" disabled=${p.st<1} onClick=${()=>{c.add(p,q);nav("/checkout")}}>Купить сейчас</button></div>
 <button class="btn ghost" style="margin-top:8px" onClick=${()=>c.fav(p.id)}>${c.favs.includes(p.id)?"♥ В избранном":"♡ В избранное"}</button></div></div>
 <${Reviews} p=${p} onSaved=${()=>setKk(kk+1)}/>
 <h2 style="margin-top:28px">Похожие товары</h2>${sim.l?html`<${Loader} n=${3}/>`:html`<div class="grid">${sim.d.filter(x=>x.id!==p.id).slice(0,4).map(x=>html`<${ProductCard} p=${x} key=${x.id}/>`)}</div>`}</div>`}
