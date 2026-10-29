import {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {html} from "../html.js";
import {CATS} from "../data/seed.js";
import {api} from "../api/api.js";
import {useData} from "../hooks/useData.js";
import {Crumbs} from "../components/Crumbs.js";
import {Loader} from "../components/Loader.js";
import {Empty} from "../components/Empty.js";
import {ProductCard} from "../components/ProductCard.js";

export function Catalog(){const[sp,setSp]=useSearchParams(),g=k=>sp.get(k)||"",[q,setQ]=useState(g("q")),[fo,setFo]=useState(false);
 const upd=(k,v)=>{const n=new URLSearchParams(sp);v?n.set(k,v):n.delete(k);if(k!=="page")n.delete("page");setSp(n,{replace:true})};
 useEffect(()=>{const t=setTimeout(()=>q!==g("q")&&upd("q",q),350);return()=>clearTimeout(t)},[q]);
 const f={cat:g("cat"),q:g("q"),min:g("min"),max:g("max"),sort:g("sort"),stock:g("stock")};
 const{l,d}=useData(()=>api.list(f),[sp.toString()]),page=+g("page")||1,per=6,list=d||[],pages=Math.ceil(list.length/per);
 return html`<div><${Crumbs} items=${[["Каталог"]]}/><h1>Каталог</h1>
 <button class="btn ghost fbtn" style="margin-bottom:10px" onClick=${()=>setFo(!fo)}>Фильтры</button>
 <div class="pgrid"><aside class=${"box filters "+(fo?"open":"")}>
 <label>Поиск<input type="search" placeholder="Название, ферма…" value=${q} onInput=${e=>setQ(e.target.value)} /></label>
 <label>Категория<select value=${f.cat} onChange=${e=>upd("cat",e.target.value)}><option value="">Все</option>${CATS.map(([n])=>html`<option key=${n}>${n}</option>`)}</select></label>
 <div class="two"><label>Цена от<input type="number" min="0" value=${f.min} onChange=${e=>upd("min",e.target.value)} /></label><label>до<input type="number" min="0" value=${f.max} onChange=${e=>upd("max",e.target.value)} /></label></div>
 <label>Сортировка<select value=${f.sort} onChange=${e=>upd("sort",e.target.value)}><option value="">По умолчанию</option><option value="pa">Дешевле</option><option value="pd">Дороже</option><option value="r">По рейтингу</option><option value="n">По названию</option></select></label>
 <label class="ck"><input type="checkbox" checked=${!!f.stock} onChange=${e=>upd("stock",e.target.checked?"1":"")} /> Только в наличии</label>
 <button class="btn ghost" style="margin-top:12px;width:100%" onClick=${()=>{setQ("");setSp({})}}>Сбросить</button></aside>
 <div>${l?html`<${Loader} n=${6}/>`:list.length?html`<div class="grid">${list.slice((page-1)*per,page*per).map(p=>html`<${ProductCard} p=${p} key=${p.id}/>`)}</div>
 ${pages>1&&html`<div class="pg">${Array.from({length:pages},(_,i)=>html`<button key=${i} class=${page===i+1?"on":""} onClick=${()=>upd("page",i+1)}>${i+1}</button>`)}</div>`}`:html`<${Empty} icon="🔍" text="Товары не найдены. Попробуйте сбросить фильтры." />`}</div></div></div>`}
