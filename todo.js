const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDos(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const filteredToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = filteredToDos;
    saveToDos();
    toDoInput.classList.remove("toDoInput_hide");
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDos(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const objectId = toDos.length + 1;
    delBtn.innerHTML = "❌"
    delBtn.addEventListener("click", deleteToDos);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = objectId;
    toDoList.appendChild(li);
    const toDoObject = {
        text: text,
        id: objectId
    };
    toDos.push(toDoObject);
    saveToDos();
    toDoInput.classList.add("toDoInput_hide");
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDos(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDos(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();