const itemArrayTitulo = localStorage.getItem("titulos")
    ? JSON.parse(localStorage.getItem("titulos")) : []

const itemArrayPrazo = localStorage.getItem("prazos")
    ? JSON.parse(localStorage.getItem("prazos")) : []

function exibirData() {
    let date = new Date()
    date = date.toString().split(" ")
    date = date[1] + " " + date[2] + " " + date[3]
    document.querySelector("#date").innerHTML = date
}



// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInputTitulo = document.querySelector("#todo-input-titulo");
const todoInputPrazo = document.querySelector("#todo-input-prazo");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");

const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValueTitulo;
let oldInputValuePrazo;

// Funções


const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};


document.querySelector("#enter").addEventListener("click", () => {
    createItemTitulo(todoInputTitulo)
    createItemPrazo(todoInputPrazo)
})

document.querySelector("#todo-input-titulo").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        createItemTitulo(todoInputTitulo)
        createItemPrazo(todoInputPrazo)
    }
})

function exibirItem() {
    let items = ""
    for (let i = 0; i < itemArrayTitulo.length; i++) {
        items += `<div class="todo">
                  <div class="input-controller">
                    <h3>${itemArrayTitulo[i].tituloItem}</h3>
                    <h4>${itemArrayPrazo[i].prazoItem}</h4>
                    <div class="edit-controller">
                        <button class="finish-todo">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button class="edit-todo">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="remove-todo">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                  </div>
                </div>`
    }
    document.querySelector("#todo-list").innerHTML = items;
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
    activateConcluirListeners()
}

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".remove-todo")
    deleteBtn.forEach((dB, i) => {
        dB.addEventListener("click", () => {
            deleteItemTitulo(i)
            deleteItemPrazo(i)
        })
    })
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll(".edit-todo")
    const editInputTitulo = document.querySelector("#edit-input-titulo");
    const editInputPrazo = document.querySelector("#edit-input-prazo");
    editBtn.forEach((eB, i) => {
        eB.addEventListener("click", () => {
            toggleForms();

            editInputTitulo.value = itemArrayTitulo[i].tituloItem;
            editInputPrazo.value = itemArrayPrazo[i].prazoItem;
        })
    })
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn")
    const editInputTitulo = document.querySelector("#edit-input-titulo");
    const editInputPrazo = document.querySelector("#edit-input-prazo");
    saveBtn.forEach((sB, i) => {
        sB.addEventListener("click", () => {
            updateItemTitulo(editInputTitulo.value, i)
            updateItemPrazo(editInputPrazo.value, i)

        })
    })
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    cancelBtn.forEach((cB) => {
        cB.addEventListener("click", () => {
            toggleForms();
        })
    })
}

function activateConcluirListeners() {
    const concluirBtn = document.querySelectorAll(".finish-todo");
    concluirBtn.forEach((cB) => {
        cB.addEventListener("click", (e) => {
            const targetEl = e.target;
            const parentEl = targetEl.closest(".todo")
            let todoTitle;

            if (parentEl && parentEl.querySelector("h3")) {
                todoTitle = parentEl.querySelector("h3").innerText || "";
            }

            if (targetEl.classList.contains("finish-todo")) {
                parentEl.classList.toggle("done")

                updateTodoStatusLocalStorage(todoTitle);
            }
        })
    })
}

function deleteItemTitulo(i) {
    itemArrayTitulo.splice(i, 1)
    localStorage.setItem("titulos", JSON.stringify(itemArrayTitulo))
    location.reload()
}

function deleteItemPrazo(i) {
    itemArrayPrazo.splice(i, 1)
    localStorage.setItem("prazos", JSON.stringify(itemArrayPrazo))
    location.reload()
}

function updateItemTitulo(text, i) {
    itemArrayTitulo[i].tituloItem = text
    localStorage.setItem('titulos', JSON.stringify(itemArrayTitulo))
    location.reload()
}

function updateItemPrazo(text, i) {
    itemArrayPrazo[i].prazoItem = text
    localStorage.setItem('prazos', JSON.stringify(itemArrayPrazo))
    location.reload()
}


function createItemTitulo(titulo) {
    const tituloItem = titulo.value
    itemArrayTitulo.push({ tituloItem, done: 0 })
    localStorage.setItem("titulos", JSON.stringify(itemArrayTitulo))
    location.reload()
}

function createItemPrazo(prazo) {
    const prazoItem = prazo.value
    itemArrayPrazo.push({ prazoItem, done: 0 })
    localStorage.setItem("prazos", JSON.stringify(itemArrayPrazo))
    location.reload()
}

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = JSON.parse(localStorage.getItem("titulos")) || [];
    console.log(todos)
    todos.map((itemArrayTitulo) =>
        itemArrayTitulo.tituloItem === todoText ? (itemArrayTitulo.done = !itemArrayTitulo.done) : null
    );

    localStorage.setItem("titulos", JSON.stringify(todos));
};

function saveStatus() {
    let todo = document.querySelector(".todo")
    itemArrayTitulo.forEach(element => {
        if (element.done) {
            todo.style.background = "#395169"
            todo.style.color = "#fff";
        }
    });
}


window.onload = function () {
    exibirData();
    exibirItem();
    saveStatus();
}