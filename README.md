# ЭкоФерма — клиентская часть интернет-магазина экопродуктов и фермерской продукции

Курсовая работа, МДК 04.03. Стек: **React 18**, **React Router 6**, **Vite**, чистый CSS (mobile-first).

## Запуск
Нужен [Node.js](https://nodejs.org) 18+.

```bash
npm install     # установка зависимостей (React, React Router, htm, Vite)
npm run dev     # режим разработки: http://localhost:5173
npm run build   # сборка в папку dist
npm run preview # просмотр собранной версии
```

## Вход
- Администратор: `admin@eco.ru` / `admin123` (после входа открываются `/admin/products` и `/admin/orders`)
- Покупатель: зарегистрируйтесь на странице `/login`
- Промокод в корзине: `ECO10` (скидка 10%)

## Структура проекта
```
index.html              точка входа Vite
src/
  main.js               запуск React, границы ошибок
  App.js                маршруты (React Router), защищённые и несуществующие адреса
  html.js               шаблонный синтаксис htm для разметки (вместо JSX)
  index.css             стили (mobile-first, светлая и тёмная тема)
  components/           Header, Footer, Layout, Guard, ProductCard, Qty, Crumbs, Loader, Empty, NotFound
  pages/                Home, Catalog, Product, CartPage, Checkout, OrderDone, Login, Profile, Favorites, AdminProducts, AdminOrders
  context/              CartContext, AuthContext, UIContext (StoreContext.js)
  api/                  storage.js (localStorage), api.js (запросы к API)
  hooks/                useData — загрузка данных с состояниями
  data/seed.js          начальный каталог товаров
  utils/format.js       форматирование цены, проверка email, доставка
```

## Маршруты
`/` · `/catalog` · `/product/:id` · `/cart` · `/checkout` · `/order/:no` · `/login` · `/register` ·
`/profile` и `/favorites` (только для вошедших) · `/admin/products`, `/admin/orders` (только для администратора) · `*` — страница 404.

## Подключение настоящего API (DummyJSON)
Сейчас `src/api/api.js` имитирует сервер: данные лежат в localStorage, задержка 300 мс.
Чтобы перейти на DummyJSON, замените тела функций на `fetch`, например:

```js
list: (f) => fetch("https://dummyjson.com/products?limit=100").then((r) => r.json()).then((d) => d.products)
```
Названия полей придётся сопоставить (у DummyJSON `title`, `price`, `category`, `stock`, `rating`).
