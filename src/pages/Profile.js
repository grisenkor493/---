import {useState} from "react";
import {Link} from "react-router-dom";
import {html} from "../html.js";
import {ST} from "../data/seed.js";
import {api} from "../api/api.js";
import {rub} from "../utils/format.js";
import {useData} from "../hooks/useData.js";
import {useAuth} from "../context/StoreContext.js";
import {Crumbs} from "../components/Crumbs.js";
import {Loader} from "../components/Loader.js";
import {Empty} from "../components/Empty.js";

export function Profile(){const{user,logout}=useAuth(),[tab,setTab]=useState("o"),[fs,setFs]=useState(""),{l,d}=useData(()=>api.orders(user.id),[]);const list=(d||[]).filter(o=>!fs||o.st===fs);
 return html`<div><${Crumbs} items=${[["Личный кабинет"]]}/><h1>Здравствуйте, ${user.name}!</h1><div class="tabs"><button class=${tab==="o"?"on":""} onClick=${()=>setTab("o")}>Мои заказы</button><button class=${tab==="d"?"on":""} onClick=${()=>setTab("d")}>Данные</button><${Link} class="btn ghost" to="/favorites">Избранное<//><button class="btn ghost" onClick=${logout}>Выйти</button></div>
 ${tab==="o"?html`<select style="max-width:240px;margin-bottom:12px" value=${fs} onChange=${e=>setFs(e.target.value)}><option value="">Все статусы</option>${Object.entries(ST).map(([k,v])=>html`<option value=${k} key=${k}>${v}</option>`)}</select>
 ${l?html`<${Loader} n=${2}/>`:list.length?list.map(o=>html`<div class="box" key=${o.no}><b>№${o.no}</b> <span class=${"st "+o.st}>${ST[o.st]}</span><p class="meta">${o.date}<br/>${o.items.map(i=>i.e+" "+i.n+" × "+i.q).join(", ")}</p><b>${rub(o.total)}</b></div>`):html`<${Empty} icon="📦" text="Заказов нет" to="/catalog" btn="В каталог" />`}`
 :html`<div class="box"><p>Имя: <b>${user.name}</b></p><p>Email: <b>${user.email}</b></p><p>Роль: <b>${user.role==="admin"?"администратор":"покупатель"}</b></p></div>`}</div>`}
