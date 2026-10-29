import {useParams} from "react-router-dom";
import {html} from "../html.js";
import {Empty} from "../components/Empty.js";

export function OrderDone(){const{no}=useParams();return html`<${Empty} icon="✅" text=${"Заказ №"+no+" принят! Статус: «В обработке». Подтверждение отправлено на email."} to="/profile" btn="Мои заказы" />`}
