import {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {html} from "../html.js";
import {Header} from "./Header.js";
import {Footer} from "./Footer.js";

export function Layout(){const{pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0)},[pathname]);return html`<div><${Header}/><main class="wrap"><${Outlet}/></main><${Footer}/></div>`}
