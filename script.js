
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelect = document.getElementById("priority-select");
const darkModeToggle = document.getElementById("dark-mode-toggle");

function addTask() {
    if (inputBox.value === '') {
        alert("Enter a task!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // Add priority tag
        const priority = prioritySelect.value;
        const spanPriority = document.createElement("span");
        spanPriority.classList.add("priority", priority);
        spanPriority.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
        li.appendChild(spanPriority);

        // Add delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN" && !e.target.classList.contains("priority")) {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

function showTasksWhenRefreshed() {
    listContainer.innerHTML = localStorage.getItem("data");
    const darkPref = localStorage.getItem("darkMode") === "true";
    if (darkPref) {
        document.body.classList.add("dark");
    }
}

darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    saveData();
});

showTasksWhenRefreshed();


function updateProgress() {
    const tasks = document.querySelectorAll("#list-container li");
    const completedTasks = document.querySelectorAll("#list-container li.checked");
    const percent = tasks.length === 0 ? 0 : (completedTasks.length / tasks.length) * 100;
    document.getElementById("progress-bar").style.width = percent + "%";
}

listContainer.addEventListener("click", function () {
    updateProgress();
});

function showTasksWhenRefreshed() {
    listContainer.innerHTML = localStorage.getItem("data");
    const darkPref = localStorage.getItem("darkMode") === "true";
    if (darkPref) {
        document.body.classList.add("dark");
    }
    updateProgress();
}
