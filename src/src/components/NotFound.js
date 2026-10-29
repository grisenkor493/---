import {html} from "../html.js";
import {Empty} from "./Empty.js";

export function NotFound({text="Страница не найдена (404)"}){return html`<${Empty} icon="🌾" text=${text} to="/" btn="На главную" />`}
