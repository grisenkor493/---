import {useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {html} from "../html.js";
import {api} from "../api/api.js";
import {vMail, vName, vPass} from "../utils/format.js";
import {useAuth} from "../context/StoreContext.js";
import {Field} from "../components/Field.js";

export function Login(){const a=useAuth(),loc=useLocation(),[reg,setReg]=useState(false),[f,setF]=useState({name:"",email:"",pass:"",pass2:""}),[er,setEr]=useState({}),[srv,setSrv]=useState(""),[busy,setBusy]=useState(false);
 const from=(loc.state&&loc.state.from)||"/profile";if(a.user)return html`<${Navigate} to=${a.user.role==="admin"&&from==="/profile"?"/admin/orders":from} replace />`;
 const val=(f,r)=>{const e={};if(r){const n=vName(f.name);if(n)e.name=n}const m=vMail(f.email);if(m)e.email=m;const p=r?vPass(f.pass):(f.pass?"":"Введите пароль");if(p)e.pass=p;if(r&&!e.pass&&f.pass2!==f.pass)e.pass2="Пароли не совпадают";return e};
 const set=k=>e=>{const nf={...f,[k]:e.target.value};setF(nf);if(Object.keys(er).length)setEr(val(nf,reg))};
 const go=e=>{e.preventDefault();if(busy)return;const v=val(f,reg);setEr(v);setSrv("");if(Object.keys(v).length)return;setBusy(true);
  (reg?api.register(f.name.trim(),f.email.trim().toLowerCase(),f.pass):api.login(f.email.trim(),f.pass)).then(a.set,x=>{setSrv(x.message);setBusy(false)})};
 return html`<form class="box" style="max-width:400px;margin:20px auto" onSubmit=${go} noValidate><h2>${reg?"Регистрация":"Вход"}</h2>
 ${reg&&html`<${Field} label="Имя" err=${er.name}><input value=${f.name} onInput=${set("name")} autocomplete="name" maxlength="50" aria-invalid=${!!er.name}/><//>`}
 <${Field} label="Email" err=${er.email}><input type="email" inputmode="email" value=${f.email} onInput=${set("email")} autocomplete="email" maxlength="80" aria-invalid=${!!er.email}/><//>
 <${Field} label="Пароль" err=${er.pass}><input type="password" value=${f.pass} onInput=${set("pass")} autocomplete=${reg?"new-password":"current-password"} maxlength="64" aria-invalid=${!!er.pass}/><//>
 ${reg&&html`<${Field} label="Повторите пароль" err=${er.pass2}><input type="password" value=${f.pass2} onInput=${set("pass2")} autocomplete="new-password" maxlength="64" aria-invalid=${!!er.pass2}/><//><p class="meta">Пароль: от 8 символов, буквы и цифры</p>`}
 <div class="err" role="alert">${srv}</div><button class="btn" style="width:100%" disabled=${busy}>${busy?"Подождите…":reg?"Зарегистрироваться":"Войти"}</button>
 <p class="meta" style="text-align:center"><a href="#" onClick=${e=>{e.preventDefault();setReg(!reg);setEr({});setSrv("")}} style="color:var(--green)">${reg?"Уже есть аккаунт? Войти":"Нет аккаунта? Зарегистрироваться"}</a></p><p class="meta">Админ: admin@eco.ru / admin123</p></form>`}
