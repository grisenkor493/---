import {Routes, Route, BrowserRouter} from "react-router-dom";
import {html} from "./html.js";
import {Providers} from "./context/StoreContext.js";
import {Layout} from "./components/Layout.js";
import {Guard} from "./components/Guard.js";
import {NotFound} from "./components/NotFound.js";
import {Home} from "./pages/Home.js";
import {Catalog} from "./pages/Catalog.js";
import {Product} from "./pages/Product.js";
import {CartPage} from "./pages/CartPage.js";
import {Checkout} from "./pages/Checkout.js";
import {OrderDone} from "./pages/OrderDone.js";
import {Login} from "./pages/Login.js";
import {Profile} from "./pages/Profile.js";
import {Favorites} from "./pages/Favorites.js";
import {AdminProducts} from "./pages/AdminProducts.js";
import {AdminOrders} from "./pages/AdminOrders.js";

export function App(){
 return html`<${Providers}><${BrowserRouter}><${Routes}><${Route} element=${html`<${Layout}/>`}>
 <${Route} index element=${html`<${Home}/>`}/><${Route} path="catalog" element=${html`<${Catalog}/>`}/><${Route} path="catalog/:category" element=${html`<${Catalog}/>`}/>
 <${Route} path="product/:id" element=${html`<${Product}/>`}/><${Route} path="cart" element=${html`<${CartPage}/>`}/><${Route} path="checkout" element=${html`<${Checkout}/>`}/><${Route} path="order/:no" element=${html`<${OrderDone}/>`}/>
 <${Route} path="login" element=${html`<${Login}/>`}/><${Route} path="register" element=${html`<${Login}/>`}/>
 <${Route} path="profile" element=${html`<${Guard}><${Profile}/><//>`}/><${Route} path="favorites" element=${html`<${Guard}><${Favorites}/><//>`}/>
 <${Route} path="admin/products" element=${html`<${Guard} role="admin"><${AdminProducts}/><//>`}/><${Route} path="admin/orders" element=${html`<${Guard} role="admin"><${AdminOrders}/><//>`}/>
 <${Route} path="*" element=${html`<${NotFound}/>`}/><//><//><//><//>`}
