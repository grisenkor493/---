import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {html} from "../html.js";
import {api} from "../api/api.js";
import {rub, shipCost, vAddr, vMail, vName, vTel} from "../utils/format.js";
import {useAuth, useCart} from "../context/StoreContext.js";
import {Crumbs} from "../components/Crumbs.js";
import {Empty} from "../components/Empty.js";
import {Field} from "../components/Field.js";

export function Checkout(){const c=useCart(),{user}=useAuth(),nav=useNavigate(),[st,setSt]=useState(1),[busy,setBusy]=useState(false),[srv,setSrv]=useState(""),[er,setEr]=useState({}),[agree,setAgree]=useState(false),
 [f,setF]=useState({name:user?user.name:"",tel:"",email:user?user.email:"",addr:"",ship:"Курьер",pay:"Картой онлайн"});
 if(!c.items.length)return html`<${Empty} text="Корзина пуста" to="/catalog" btn="В каталог" />`;
 const set=k=>e=>{setF({...f,[k]:e.target.value});setEr(x=>{const y={...x};delete y[k];return y})},ship=shipCost(c.sub-c.disc,f.ship),total=c.sub-c.disc+ship;
 const val=s=>{const e={};if(s===1){const n=vName(f.name),t=vTel(f.tel),m=vMail(f.email);if(n)e.name=n;if(t)e.tel=t;if(m)e.email=m}
  if(s===2&&f.ship!=="Самовывоз"){const a=vAddr(f.addr);if(a)e.addr=a}if(s===3&&!agree)e.agree="Необходимо согласие на обработку данных";return e};
 const blur=k=>()=>{const m={name:vName,tel:vTel,email:vMail,addr:vAddr}[k](f[k]);setEr(x=>({...x,[k]:m}))};
 const next=()=>{const e=val(st);setEr(e);if(!Object.keys(e).length)setSt(st+1)};
 const send=()=>{const e={...val(1),...val(2),...val(3)};setEr(e);if(Object.keys(e).length){if(e.name||e.tel||e.email)setSt(1);else if(e.addr)setSt(2);return}
  setBusy(true);setSrv("");api.order({uid:user?user.id:0,...f,name:f.name.trim(),email:f.email.trim(),addr:f.addr.trim(),items:c.items,total,st:"new",date:new Date().toLocaleString("ru-RU")}).then(o=>{c.clear();nav("/order/"+o.no,{replace:true})},()=>{setBusy(false);setSrv("Не удалось оформить заказ. Повторите попытку.")})};
 return html`<div style="max-width:560px;margin:0 auto"><${Crumbs} items=${[["Корзина","/cart"],["Оформление"]]}/><h1>Оформление заказа</h1><div class="steps">${[1,2,3].map(i=>html`<i class=${st>=i?"on":""} key=${i}></i>`)}</div>
 <div class="box">${st===1&&html`<h3>1. Контакты ${user?"":html`<span class="meta">(гостевое оформление)</span>`}</h3>
 <${Field} label="Имя *" err=${er.name}><input value=${f.name} onInput=${set("name")} autocomplete="name" maxlength="50" onBlur=${blur("name")} aria-invalid=${!!er.name}/><//>
 <${Field} label="Телефон *" err=${er.tel}><input type="tel" inputmode="tel" value=${f.tel} onInput=${set("tel")} placeholder="+7 900 000-00-00" autocomplete="tel" maxlength="18" onBlur=${blur("tel")} aria-invalid=${!!er.tel}/><//>
 <${Field} label="Email *" err=${er.email}><input type="email" inputmode="email" value=${f.email} onInput=${set("email")} autocomplete="email" maxlength="80" onBlur=${blur("email")} aria-invalid=${!!er.email}/><//>`}
 ${st===2&&html`<h3>2. Доставка и оплата</h3><label>Способ доставки<select value=${f.ship} onChange=${set("ship")}><option>Курьер</option><option>Пункт выдачи</option><option>Самовывоз</option></select></label>
 ${f.ship!=="Самовывоз"&&html`<${Field} label="Адрес *" err=${er.addr}><input value=${f.addr} onInput=${set("addr")} autocomplete="street-address" maxlength="150" onBlur=${blur("addr")} aria-invalid=${!!er.addr}/><//>`}
 <label>Оплата<select value=${f.pay} onChange=${set("pay")}><option>Картой онлайн</option><option>СБП</option><option>При получении</option></select></label>`}
 ${st===3&&html`<h3>3. Подтверждение</h3>${c.items.map(i=>html`<div class="row" key=${i.id}><span class="e">${i.e}</span><span class="n">${i.n} × ${i.q}</span><b>${rub(i.p*i.q)}</b></div>`)}<p class="meta">${f.name}, ${f.tel}<br/>${f.ship}${f.ship!=="Самовывоз"?": "+f.addr:""} · ${f.pay}</p><h3>К оплате: ${rub(total)}</h3>
 <label class="ck"><input type="checkbox" checked=${agree} onChange=${e=>{setAgree(e.target.checked);setEr(x=>({...x,agree:""}))}}/> Согласен на обработку персональных данных</label>${er.agree&&html`<span class="err" role="alert">${er.agree}</span>`}`}
 <div class="err" role="alert">${srv||(Object.values(er).some(Boolean)?"Исправьте ошибки в выделенных полях":"")}</div><div class="two">${st>1?html`<button class="btn ghost" onClick=${()=>{setEr({});setSt(st-1)}}>Назад</button>`:html`<span></span>`}${st<3?html`<button class="btn" onClick=${next}>Далее</button>`:html`<button class="btn" disabled=${busy} onClick=${send}>${busy?"Отправка…":"Подтвердить заказ"}</button>`}</div></div></div>`}
