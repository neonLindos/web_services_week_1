const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const students = [
    { id: 1, name: "Иван Иванов", group: "ИС-21" },
    { id: 2, name: "Петр Петров", group: "ИС-21" }
];

function generateId() {
    return students.reduce((maxId, s) => Math.max(maxId, s.id), 0) + 1;
}

function findStudentOr404(req, res) {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        res.status(404).json({ message: "Студент не найден" });
        return null;
    }

    return student;
}

// список всех студентов
app.get("/api/students", (req, res) => {
    res.json(students);
});

// один студент по id
app.get("/api/students/:id", (req, res) => {
    const student = findStudentOr404(req, res);

    if (student) {
        res.json(student);
    }
});

// добавление нового студента
app.post("/api/students", (req, res) => {
    const name = req.body.name?.trim();
    const group = req.body.group?.trim();

    if (!name || !group) {
        return res.status(400).json({
            message: "Необходимо указать имя и группу"
        });
    }

    const student = { id: generateId(), name, group };
    students.push(student);

    res.status(201).json(student);
});

// изменение данных студента
app.put("/api/students/:id", (req, res) => {
    const student = findStudentOr404(req, res);

    if (!student) {
        return;
    }

    const name = req.body.name?.trim();
    const group = req.body.group?.trim();

    if (name) {
        student.name = name;
    }

    if (group) {
        student.group = group;
    }

    res.json(student);
});

// удаление студента
app.delete("/api/students/:id", (req, res) => {
    const index = students.findIndex(s => s.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Студент не найден" });
    }

    const [deletedStudent] = students.splice(index, 1);

    res.json({ message: "Студент удалён", student: deletedStudent });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
