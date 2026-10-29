import {Navigate, useLocation} from "react-router-dom";
import {html} from "../html.js";
import {useAuth} from "../context/StoreContext.js";
import {NotFound} from "./NotFound.js";

export function Guard({role,children}){const{user}=useAuth(),loc=useLocation();
 if(!user)return html`<${Navigate} to="/login" state=${{from:loc.pathname}} replace />`;
 if(role&&user.role!==role)return html`<${NotFound} text="Доступ запрещён" />`;return children}
