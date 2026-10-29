import {Link} from "react-router-dom";
import {html} from "../html.js";
import {CATS} from "../data/seed.js";
import {api} from "../api/api.js";
import {useData} from "../hooks/useData.js";
import {Loader} from "../components/Loader.js";
import {ProductCard} from "../components/ProductCard.js";

export function Home(){const{l,d}=useData(()=>api.list({sort:"r"}),[]);
 return html`<div><div class="hero"><h1>Свежее с фермы — прямо к вашему столу</h1><p>Сезонные овощи, молочные продукты, мёд и хлеб от местных фермеров. Без ГМО и химии.</p><${Link} class="btn" to="/catalog">Перейти в каталог<//></div>
 <h2>Категории</h2><div class="cats">${CATS.map(([n,e])=>html`<${Link} class="cat" to=${"/catalog?cat="+encodeURIComponent(n)} key=${n}><b>${e}</b>${n}<//>`)}</div>
 <h2>Популярные товары</h2>${l?html`<${Loader}/>`:html`<div class="grid">${d.slice(0,4).map(p=>html`<${ProductCard} p=${p} key=${p.id}/>`)}</div>`}
 <h2 style="margin-top:24px">Почему мы</h2><div class="cats"><div class="cat"><b>🌱</b>100% натурально</div><div class="cat"><b>🚜</b>От фермеров</div><div class="cat"><b>❄️</b>Свежесть</div><div class="cat"><b>♻️</b>Эко-упаковка</div></div></div>`}
