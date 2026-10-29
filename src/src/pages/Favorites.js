import {html} from "../html.js";
import {api} from "../api/api.js";
import {useData} from "../hooks/useData.js";
import {useCart} from "../context/StoreContext.js";
import {Crumbs} from "../components/Crumbs.js";
import {Loader} from "../components/Loader.js";
import {Empty} from "../components/Empty.js";
import {ProductCard} from "../components/ProductCard.js";

export function Favorites(){const c=useCart(),{l,d}=useData(()=>api.list({}),[]);const list=(d||[]).filter(p=>c.favs.includes(p.id));
 return html`<div><${Crumbs} items=${[["Избранное"]]}/><h1>Избранное</h1>${l?html`<${Loader}/>`:list.length?html`<div class="grid">${list.map(p=>html`<${ProductCard} p=${p} key=${p.id}/>`)}</div>`:html`<${Empty} icon="♡" text="В избранном пока пусто" to="/catalog" btn="В каталог" />`}</div>`}
