import {SEED} from "../data/seed.js";
import {L} from "./storage.js";

export const W=v=>new Promise(r=>setTimeout(()=>r(JSON.parse(JSON.stringify(v===undefined?null:v))),300));
export const prods=()=>{let l=L.g("ef2p",SEED);if(!L.g("ef2m1",0)){l=l.map(p=>p.id>14&&p.r===4.5&&!p.rc?{...p,r:0}:p);L.s("ef2p",l);L.s("ef2m1",1)}return l},users=()=>L.g("ef2u",[{id:1,name:"Администратор",email:"admin@eco.ru",pass:"admin123",role:"admin"}]);
export const api={
 list(f){let l=prods().filter(p=>f.all||p.pub);const q=(f.q||"").toLowerCase();
  if(f.cat)l=l.filter(p=>p.c===f.cat);if(q)l=l.filter(p=>(p.n+p.o+p.c).toLowerCase().includes(q));
  if(f.min)l=l.filter(p=>p.p>=+f.min);if(f.max)l=l.filter(p=>p.p<=+f.max);if(f.stock)l=l.filter(p=>p.st>0);
  const s=f.sort;if(s==="pa")l.sort((a,b)=>a.p-b.p);if(s==="pd")l.sort((a,b)=>b.p-a.p);if(s==="r")l.sort((a,b)=>b.r-a.r);if(s==="n")l.sort((a,b)=>a.n.localeCompare(b.n,"ru"));
  return W(l)},
 get:id=>W(prods().find(p=>p.id==id)),
 save(p){const l=prods();if(p.id)l[l.findIndex(x=>x.id===p.id)]=p;else{p.id=Math.max(0,...l.map(x=>x.id))+1;l.push(p)}L.s("ef2p",l);return W(p)},
 del(id){L.s("ef2p",prods().filter(p=>p.id!==id));return W(1)},
 reviews:pid=>W(L.g("ef2r",{})[pid]||[]),
 addReview(pid,rv){const all=L.g("ef2r",{}),l=all[pid]||[];if(l.some(r=>r.uid===rv.uid))return Promise.reject(new Error("Вы уже оставили отзыв на этот товар"));l.push(rv);all[pid]=l;L.s("ef2r",all);
  const ps=prods(),p=ps.find(x=>x.id==pid);if(p){p.r=Math.round(l.reduce((a,r)=>a+r.stars,0)/l.length*10)/10;p.rc=l.length;L.s("ef2p",ps)}return W(1)},
 importAll(l){L.s("ef2p",l);return W(l.length)},
 login(e,p){const u=users().find(x=>x.email===e.toLowerCase()&&x.pass===p);return u?W(u):Promise.reject(new Error("Неверный email или пароль"))},
 register(name,e,p){const l=users();if(l.some(x=>x.email===e))return Promise.reject(new Error("Этот email уже занят"));const u={id:Date.now(),name,email:e,pass:p,role:"user"};l.push(u);L.s("ef2u",l);return W(u)},
 order(o){const l=L.g("ef2o",[]);o.no=1001+l.length;l.push(o);L.s("ef2o",l);return W(o)},
 orders:uid=>W(L.g("ef2o",[]).filter(o=>!uid||o.uid===uid).reverse()),
 status(no,s){const l=L.g("ef2o",[]);l.find(o=>o.no===no).st=s;L.s("ef2o",l);return W(1)}
};
