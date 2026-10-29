import {useState} from "react";
import {Link} from "react-router-dom";
import {html} from "../html.js";
import {api} from "../api/api.js";
import {useData} from "../hooks/useData.js";
import {useAuth, useUI} from "../context/StoreContext.js";
import {Field} from "./Field.js";

export function Reviews({p,onSaved}){const{user}=useAuth(),say=useUI(),[k,setK]=useState(0),[f,setF]=useState({stars:"5",text:""}),[er,setEr]=useState(""),[busy,setBusy]=useState(false),{l,d}=useData(()=>api.reviews(p.id),[p.id,k]);
 const list=d||[],mine=user&&list.some(r=>r.uid===user.id);
 const send=e=>{e.preventDefault();const t=f.text.trim(),m=t.length<10?"Отзыв: минимум 10 символов":t.length>500?"Отзыв: не более 500 символов":"";setEr(m);if(m)return;setBusy(true);
  api.addReview(p.id,{uid:user.id,name:user.name,stars:+f.stars,text:t,date:new Date().toLocaleDateString("ru-RU")}).then(()=>{setBusy(false);setF({stars:"5",text:""});setK(k+1);onSaved();say("Спасибо за отзыв!")},x=>{setBusy(false);setEr(x.message)})};
 return html`<div class="box" style="margin-top:24px"><h2>Отзывы ${list.length>0&&html`<span class="meta">(${list.length})</span>`}</h2>
 ${l?"Загрузка…":list.length?list.map((r,i)=>html`<div class="rv" key=${i}><b>${r.name}</b> <span class="meta">${r.date}</span><div>${"★".repeat(r.stars)}${"☆".repeat(5-r.stars)}</div><p style="margin:4px 0">${r.text}</p></div>`):html`<p class="meta">Отзывов пока нет. Станьте первым!</p>`}
 ${!user?html`<p><${Link} to="/login" state=${{from:"/product/"+p.id}} style="color:var(--green)">Войдите<//>, чтобы оставить отзыв.</p>`:mine?html`<p class="meta">Вы уже оставили отзыв на этот товар.</p>`:html`<form onSubmit=${send} noValidate><label>Оценка<select value=${f.stars} onChange=${e=>setF({...f,stars:e.target.value})}>${[5,4,3,2,1].map(n=>html`<option value=${n} key=${n}>${n} ★</option>`)}</select></label>
 <${Field} label="Ваш отзыв (10–500 символов)" err=${er}><textarea rows="3" maxlength="520" value=${f.text} onInput=${e=>{setF({...f,text:e.target.value});setEr("")}} aria-invalid=${!!er}></textarea><//><button class="btn" style="margin-top:10px" disabled=${busy}>Отправить отзыв</button></form>`}</div>`}
