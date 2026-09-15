const express = require("express");
const createViews = require("./views.js");

function createRouter(db) {
    const router = express.Router();
    const views = createViews(db);

    router.get("/users", views.getUsers);
    router.post("/users", views.createUser);

    return router;
}

module.exports = createRouter;
