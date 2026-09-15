# CSE5032 · Модуль 01 — Введение в ASP.NET Core

Первая тема курса **«Разработка веб-сервисов»**: первая конечная точка Web API, HTTP-методы GET/POST, тестирование через Swagger. Задания выдавались в двух вариантах — на ASP.NET Core и (позже) на Node.js/Express — оба решения включены.

| Работа | Проект | Ресурс | Стек | Endpoint'ы |
|--------|--------|--------|------|-----------|
| [homework/](homework/) | `WebApiLab1` | Student | ASP.NET Core, .NET 8 | `GET /api/students`, `GET /api/students/{id}`, `POST /api/students` |
| [lab/](lab/) | `CoursesApi` | Course | ASP.NET Core, .NET 8 | полный CRUD `/api/courses` |
| [lab_js/](lab_js/) | `web-service-lab` | Student | Node.js, Express | полный CRUD `/api/students` + веб-интерфейс |
| [prac_js/](prac_js/) | `web-server` | User | Node.js, Express, SQLite3 | `GET /`, `GET /users`, `POST /users` |

## Как запустить

**ASP.NET Core** (`homework/`, `lab/`) — нужен [.NET 8 SDK](https://dotnet.microsoft.com/download):

```bash
cd homework   # или lab
dotnet run
```

**Node.js** (`lab_js/`, `prac_js/`) — нужен [Node.js](https://nodejs.org) (LTS):

```bash
cd lab_js     # или prac_js
npm install
npm start
```

## Структура

Каждая подпапка — самостоятельный проект:

- `.docx` — методичка от преподавателя, как выдана;
- `Модуль_XX_*.md` — та же методичка в Markdown;
- `README.md` — решение: что реализовано, ответы на контрольные вопросы, итоговая таблица endpoint'ов.

Данные во всех решениях, кроме `prac_js`, — in-memory; `prac_js` хранит данные в SQLite (`database.db`, создаётся автоматически при первом запуске).
