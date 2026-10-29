import {useState} from "react";
import {html} from "../html.js";
import {CATS} from "../data/seed.js";
import {api} from "../api/api.js";
import {rub} from "../utils/format.js";
import {useData} from "../hooks/useData.js";
import {useUI} from "../context/StoreContext.js";
import {Crumbs} from "../components/Crumbs.js";
import {Field} from "../components/Field.js";

export function AdminProducts(){const say=useUI(),[k,setK]=useState(0),[q,setQ]=useState(""),[ed,setEd]=useState(null),[del,setDel]=useState(null),[io,setIo]=useState(null),[er,setEr]=useState({}),{l,d}=useData(()=>api.list({all:1,q}),[k,q]);
 const val=p=>{const e={},n=p.n.trim(),pr=+p.p,st=+p.st;
  if(n.length<2||n.length>80)e.n="Название: от 2 до 80 символов";
  if(String(p.p).trim()===""||!Number.isFinite(pr)||pr<=0||pr>1000000)e.p="Цена: число от 1 до 1 000 000";
  if(+p.old>0&&+p.old<=pr)e.old="Старая цена должна быть больше текущей";
  if(String(p.st).trim()===""||!Number.isInteger(st)||st<0||st>100000)e.st="Остаток: целое число от 0 до 100 000";
  if(!p.u.trim())e.u="Укажите фасовку";if(!p.e.trim())e.e="Укажите иконку";if(p.d.length>300)e.d="Не более 300 символов";return e};
 const save=()=>{const e=val(ed);setEr(e);if(Object.keys(e).length)return;
  api.list({all:1}).then(all=>{if(all.some(x=>x.id!==ed.id&&x.n.toLowerCase()===ed.n.trim().toLowerCase())){setEr({n:"Товар с таким названием уже существует"});return}
   return api.save({...ed,n:ed.n.trim(),p:+ed.p,old:+ed.old||0,st:+ed.st,u:ed.u.trim(),d:ed.d.trim()}).then(()=>{setEd(null);setK(k+1);say("Товар сохранён")})})};
 const doExp=()=>api.list({all:1}).then(l=>setIo({mode:"exp",text:JSON.stringify(l,null,1),err:""}));
 const doImp=()=>{const bad=m=>setIo({...io,err:m});let a;try{a=JSON.parse(io.text)}catch(x){return bad("Некорректный JSON: "+x.message)}
  if(!Array.isArray(a)||!a.length)return bad("Нужен непустой массив товаров");const names=CATS.map(c=>c[0]),out=[];
  for(let i=0;i<a.length;i++){const x=a[i],n="Товар №"+(i+1)+": ";
   if(!x||typeof x.n!=="string"||x.n.trim().length<2)return bad(n+"нет названия");if(!(+x.p>0))return bad(n+"некорректная цена");
   if(!names.includes(x.c))return bad(n+"неизвестная категория «"+x.c+"»");if(!Number.isInteger(+x.st)||+x.st<0)return bad(n+"некорректный остаток");
   out.push({id:0,_id:x.id,n:x.n.trim(),c:x.c,e:x.e||"📦",p:+x.p,old:+x.old||0,u:x.u||"шт.",o:x.o||"",d:x.d||"",r:+x.r||0,t:x.t||"",st:+x.st,pub:x.pub!==false})}
  const used=new Set();out.forEach(o=>{const id=+o._id;if(Number.isInteger(id)&&id>0&&!used.has(id)){o.id=id;used.add(id)}});let nx=1;out.forEach(o=>{if(!o.id){while(used.has(nx))nx++;o.id=nx;used.add(nx)}delete o._id});
  api.importAll(out).then(c=>{setIo(null);setK(k+1);say("Загружено товаров: "+c)})};
 const set=key=>e=>{setEd({...ed,[key]:e.target.type==="checkbox"?e.target.checked:e.target.value});setEr(x=>{const y={...x};delete y[key];return y})};
 return html`<div><${Crumbs} items=${[["Админ-панель: товары"]]}/><h1>Товары</h1><div class="two" style="margin-bottom:12px"><input type="search" placeholder="Поиск…" value=${q} onInput=${e=>setQ(e.target.value)}/><button class="btn" onClick=${()=>{setEr({});setEd({n:"",c:CATS[0][0],e:"🥬",p:"",old:"",u:"1 кг",o:"Ферма",d:"",r:0,t:"",st:10,pub:true})}}>+ Добавить</button></div>
 <div class="two" style="margin-bottom:12px"><button class="btn ghost" onClick=${doExp}>Экспорт товаров (JSON)</button><button class="btn ghost" onClick=${()=>setIo({mode:"imp",text:"",err:""})}>Импорт товаров</button></div>
 <div class="box tw">${l?"Загрузка…":html`<table><thead><tr><th>Товар</th><th>Категория</th><th>Цена</th><th>Остаток</th><th>Статус</th><th></th></tr></thead><tbody>${d.map(p=>html`<tr key=${p.id}><td>${p.e} ${p.n}</td><td>${p.c}</td><td>${rub(p.p)}</td><td>${p.st}</td><td>${p.pub?"Опубликован":"Скрыт"}</td>
 <td style="white-space:nowrap"><button class="btn sm ghost" onClick=${()=>{setEr({});setEd(p)}}>Изм.</button> <button class="btn sm ghost" onClick=${()=>api.save({...p,pub:!p.pub}).then(()=>setK(k+1))}>${p.pub?"Скрыть":"Показать"}</button> <button class="btn sm red" onClick=${()=>setDel(p)}>Удал.</button></td></tr>`)}</tbody></table>`}</div>
 ${ed&&html`<div class="ov"><div class="mb"><h3>${ed.id?"Редактирование":"Новый товар"}</h3>
 <${Field} label="Название" err=${er.n}><input value=${ed.n} onInput=${set("n")} maxlength="80" aria-invalid=${!!er.n}/><//>
 <label>Категория<select value=${ed.c} onChange=${set("c")}>${CATS.map(([n])=>html`<option key=${n}>${n}</option>`)}</select></label>
 <div class="two"><${Field} label="Цена, ₽" err=${er.p}><input type="number" inputmode="numeric" min="1" step="1" value=${ed.p} onInput=${set("p")} aria-invalid=${!!er.p}/><//><${Field} label="Старая цена" err=${er.old}><input type="number" inputmode="numeric" min="0" step="1" value=${ed.old} onInput=${set("old")} aria-invalid=${!!er.old}/><//>
 <${Field} label="Остаток" err=${er.st}><input type="number" inputmode="numeric" min="0" step="1" value=${ed.st} onInput=${set("st")} aria-invalid=${!!er.st}/><//><${Field} label="Фасовка" err=${er.u}><input value=${ed.u} onInput=${set("u")} maxlength="20" aria-invalid=${!!er.u}/><//></div>
 <${Field} label="Эмодзи-иконка" err=${er.e}><input value=${ed.e} onInput=${set("e")} maxlength="4" aria-invalid=${!!er.e}/><//><${Field} label="Описание (до 300 символов)" err=${er.d}><textarea rows="3" value=${ed.d} onInput=${set("d")} maxlength="320" aria-invalid=${!!er.d}></textarea><//>
 <label class="ck"><input type="checkbox" checked=${ed.pub} onChange=${set("pub")}/> Опубликован</label>
 <div class="two" style="margin-top:12px"><button class="btn ghost" onClick=${()=>setEd(null)}>Отмена</button><button class="btn" onClick=${save}>Сохранить</button></div></div></div>`}
 ${io&&html`<div class="ov"><div class="mb"><h3>${io.mode==="imp"?"Импорт товаров":"Экспорт товаров"}</h3><p class="meta">${io.mode==="imp"?"Вставьте JSON из экспорта. Текущий каталог будет заменён.":"Скопируйте текст и сохраните в файл products.json."}</p>
 <textarea rows="12" readOnly=${io.mode!=="imp"} value=${io.text} onFocus=${e=>io.mode!=="imp"&&e.target.select()} onInput=${e=>setIo({...io,text:e.target.value,err:""})} aria-invalid=${!!io.err} style="font:12px monospace"></textarea>
 <div class="err" role="alert">${io.err}</div><div class="two"><button class="btn ghost" onClick=${()=>setIo(null)}>Закрыть</button>${io.mode==="imp"?html`<button class="btn" onClick=${doImp}>Загрузить</button>`:html`<button class="btn" onClick=${()=>{try{navigator.clipboard.writeText(io.text).then(()=>say("Скопировано"),()=>say("Выделите текст и скопируйте вручную"))}catch(x){say("Выделите текст и скопируйте вручную")}}}>Копировать</button>`}</div></div></div>`}
 ${del&&html`<div class="ov"><div class="mb"><h3>Удалить «${del.n}»?</h3><p>Действие нельзя отменить.</p><div class="two"><button class="btn ghost" onClick=${()=>setDel(null)}>Отмена</button><button class="btn red" onClick=${()=>api.del(del.id).then(()=>{setDel(null);setK(k+1);say("Товар удалён")})}>Удалить</button></div></div></div>`}</div>`}
