import {useState} from "react";
import {html} from "../html.js";
import {ST} from "../data/seed.js";
import {api} from "../api/api.js";
import {rub} from "../utils/format.js";
import {useData} from "../hooks/useData.js";
import {useUI} from "../context/StoreContext.js";
import {Crumbs} from "../components/Crumbs.js";
import {Empty} from "../components/Empty.js";

export function AdminOrders(){const say=useUI(),[k,setK]=useState(0),[f,setF]=useState(""),[open,setOpen]=useState(null),{l,d}=useData(()=>api.orders(),[k]),list=(d||[]).filter(o=>!f||o.st===f);
 return html`<div><${Crumbs} items=${[["Админ-панель: заказы"]]}/><h1>Заказы <span class="meta">(новых: ${(d||[]).filter(o=>o.st==="new").length})</span></h1>
 <select style="max-width:260px;margin-bottom:12px" value=${f} onChange=${e=>setF(e.target.value)}><option value="">Все статусы</option>${Object.entries(ST).map(([k2,v])=>html`<option value=${k2} key=${k2}>${v}</option>`)}</select>
 ${l?"Загрузка…":list.length?list.map(o=>html`<div class="box" key=${o.no}><div class="row" style="border:0;cursor:pointer" onClick=${()=>setOpen(open===o.no?null:o.no)}><b>№${o.no}</b><span class="n meta">${o.date}</span><span class=${"st "+o.st}>${ST[o.st]}</span><b>${rub(o.total)}</b></div>
 ${open===o.no&&html`<div><p>${o.name} · ${o.tel} · ${o.email}<br/>${o.ship}${o.addr?": "+o.addr:""} · ${o.pay}</p><p class="meta">${o.items.map(i=>i.e+" "+i.n+" × "+i.q).join(", ")}</p>
 <label>Изменить статус<select value=${o.st} onChange=${e=>api.status(o.no,e.target.value).then(()=>{setK(k+1);say("Статус обновлён, клиент уведомлён")})}>${Object.entries(ST).map(([k2,v])=>html`<option value=${k2} key=${k2}>${v}</option>`)}</select></label></div>`}</div>`):html`<${Empty} icon="📭" text="Заказов пока нет. Оформите заказ на сайте — он появится здесь." />`}</div>`}
