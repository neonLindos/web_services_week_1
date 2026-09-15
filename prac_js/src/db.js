


function init_db(db){
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
    )`);
}

function create_user(db, name, email){
    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
}

module.exports = { init_db, create_user };