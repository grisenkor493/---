

export const vName=v=>!v.trim()?"Введите имя":!/^[A-Za-zА-Яа-яЁё\s'’-]{2,50}$/.test(v.trim())?"Имя: только буквы, от 2 до 50 символов":"";
export const vTel=v=>{const d=v.replace(/[\s()-]/g,"");return !d?"Введите телефон":!/^(\+7|8)\d{10}$/.test(d)?"Формат: +7 900 000-00-00":""};
export const vMail=v=>!v.trim()?"Введите email":!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?"Некорректный email":"";
export const vPass=v=>!v?"Введите пароль":v.length<8?"Пароль: минимум 8 символов":!/[A-Za-zА-Яа-яЁё]/.test(v)||!/\d/.test(v)?"Пароль должен содержать буквы и цифры":"";
export const vAddr=v=>v.trim().length<8?"Укажите адрес полностью: город, улица, дом":"";
export const rub=n=>n.toLocaleString("ru-RU")+" ₽",mail=v=>/^\S+@\S+\.\S+$/.test(v);
export const shipCost=(sub,m)=>m==="Самовывоз"||sub>=2500?0:250;
