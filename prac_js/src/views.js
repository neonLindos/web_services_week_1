function createViews(db) {

    // GET /users — получение пользователей из базы данных
    function getUsers(req, res) {
        db.all("SELECT * FROM users", [], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: "Ошибка базы данных" });
            }

            res.json(rows);
        });
    }

    // POST /users — добавление нового пользователя
    function createUser(req, res) {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Необходимо указать имя и email" });
        }

        db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
            if (err) {
                return res.status(500).json({ message: "Ошибка базы данных" });
            }

            res.status(201).json({ id: this.lastID, name, email });
        });
    }

    return { getUsers, createUser };
}

module.exports = createViews;
