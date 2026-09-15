const listElement = document.getElementById("students");
const emptyElement = document.getElementById("empty");
const countElement = document.getElementById("count");
const form = document.getElementById("studentForm");
const searchInput = document.getElementById("search");

let allStudents = [];

function getInitials(fullName) {
    return fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase() ?? "")
        .join("");
}

function buildStudentCard(student) {
    const card = document.createElement("li");
    card.className = "student-card";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = getInitials(student.name);

    const info = document.createElement("div");
    info.className = "student-info";

    const name = document.createElement("div");
    name.className = "student-name";
    name.textContent = student.name;

    const group = document.createElement("span");
    group.className = "student-group";
    group.textContent = student.group;

    info.append(name, group);

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.title = "Удалить";
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", () => removeStudent(student.id));

    card.append(avatar, info, removeBtn);

    return card;
}

function renderStudents(students) {
    listElement.innerHTML = "";

    students.forEach(student => {
        listElement.appendChild(buildStudentCard(student));
    });

    emptyElement.hidden = students.length > 0;
    countElement.textContent = String(students.length);
}

function applyFilter() {
    const query = searchInput.value.trim().toLowerCase();

    const filtered = query
        ? allStudents.filter(student =>
            student.name.toLowerCase().includes(query) ||
            student.group.toLowerCase().includes(query))
        : allStudents;

    renderStudents(filtered);
}

async function loadStudents() {
    const response = await fetch("/api/students");
    allStudents = await response.json();

    applyFilter();
}

async function removeStudent(id) {
    await fetch(`/api/students/${id}`, {
        method: "DELETE"
    });

    await loadStudents();
}

form.addEventListener("submit", async event => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const groupInput = document.getElementById("group");

    await fetch("/api/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameInput.value.trim(),
            group: groupInput.value.trim()
        })
    });

    form.reset();
    await loadStudents();
});

searchInput.addEventListener("input", applyFilter);

loadStudents();
