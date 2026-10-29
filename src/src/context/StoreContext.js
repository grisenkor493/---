import {useState, useEffect, useContext, createContext} from "react";
import {html} from "../html.js";
import {L} from "../api/storage.js";

export const Cart=createContext(),Auth=createContext(),UI=createContext();
export const useCart=()=>useContext(Cart),useAuth=()=>useContext(Auth),useUI=()=>useContext(UI);
export function Providers({children}){
 const uid0=()=>{const u=L.g("ef2s",null);return u?u.id:"guest"};
 const[owner,setOwner]=useState(uid0),[items,setItems]=useState(()=>L.g("ef2c:"+uid0(),[])),[favs,setFavs]=useState(()=>L.g("ef2f:"+uid0(),[])),[user,setUser]=useState(()=>L.g("ef2s",null)),[promo,setPromo]=useState(""),[toast,setToast]=useState("");
 useEffect(()=>{L.s("ef2c:"+owner,items)},[items,owner]);useEffect(()=>{L.s("ef2f:"+owner,favs)},[favs,owner]);
 useEffect(()=>{L.s("ef2s",user);const k=user?user.id:"guest";if(k===owner)return;
  const next=L.g("ef2c:"+k,[]).map(i=>({...i}));
  if(owner==="guest"){items.forEach(i=>{const x=next.find(y=>y.id===i.id);x?x.q=Math.min(x.q+i.q,x.st||99):next.push({...i})});L.s("ef2c:guest",[])}
  setItems(next);setFavs(L.g("ef2f:"+k,[]));setPromo("");setOwner(k)},[user]);
 const say=t=>{setToast(t);setTimeout(()=>setToast(""),1800)};
 const sub=items.reduce((a,i)=>a+i.p*i.q,0),disc=promo?Math.round(sub*.1):0;
 const cart={items,promo,setPromo,sub,disc,count:items.reduce((a,i)=>a+i.q,0),favs,
  add(p,q=1){const x=items.find(i=>i.id===p.id),q2=Math.min(q,p.st-(x?x.q:0));if(q2<1){say("В наличии всего "+p.st+" шт.");return}
  setItems(l=>l.find(i=>i.id===p.id)?l.map(i=>i.id===p.id?{...i,q:i.q+q2,st:p.st}:i):[...l,{id:p.id,n:p.n,e:p.e,p:p.p,u:p.u,st:p.st,q:q2}]);say(q2<q?"Добавлено "+q2+" шт. (максимум на складе)":"Добавлено в корзину")},
  setQ:(id,q)=>setItems(l=>q<1?l.filter(i=>i.id!==id):l.map(i=>i.id===id?{...i,q:Math.min(q,i.st||99)}:i)),
  clear(){setItems([]);setPromo("")},fav:id=>setFavs(l=>l.includes(id)?l.filter(x=>x!==id):[...l,id])};
 const auth={user,set:setUser,logout(){setUser(null);say("Вы вышли из аккаунта")}};
 return html`<${Auth.Provider} value=${auth}><${Cart.Provider} value=${cart}><${UI.Provider} value=${say}>${children}${toast&&html`<div class="toast" role="status">${toast}</div>`}<//><//><//>`}
