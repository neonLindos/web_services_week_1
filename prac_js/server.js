const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { init_db, create_user } = require("./src/db.js");
const createRouter = require("./src/router.js");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("./database.db");

db.serialize(() => {

    init_db(db);
    create_user(db, "kokos", "kokos@mail.ru");
    create_user(db, "tester", "tester@anime.com");

});

app.use(createRouter(db));

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
