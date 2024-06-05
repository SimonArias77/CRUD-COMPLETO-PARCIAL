// autoejecutable function
(function () {
    const userOnline = localStorage.getItem("userOnline")

if (userOnline == null) {
    window.location.href = "/"
}
})()

const btnLogout = document.querySelector("#btn-logout")
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userOnline")
    window.location.href = "/"
}) 

import { getUrlUsers } from "./urlData";

const form = document.querySelector("form")
const name = document.querySelector("#complete_name-user")
const email = document.querySelector("#email-user")
const password = document.querySelector("#password-user")
const confirmPassword = document.querySelector("#confirm_password-user")
const table = document.querySelector("#table")
const URL = getUrlUsers()
let idCache

await index()

form.addEventListener("submit", async(event) => {
    event.preventDefault()

    if (idCache === undefined) {

        if (password.value === confirmPassword.value) {
            await create(name,email,password)
            await index()
            form.reset()
        }

    }else{
        await update(name,email,password, idCache)
        await index()
        form.reset()
    }
})

table.addEventListener("click", async(event) => {

    event.preventDefault()

    if (event.target.classList.contains("btn-danger")) {
        const id = event.target.getAttribute("data-id")
        await deleteUser(id)
        await index()
    }else if (event.target.classList.contains("btn-warning")) {
        idCache = event.target.getAttribute("data-id")
        const data = await find(idCache)
        name.value = data.name
        password.value = data.password
        email.value = data.email
    }
})

// Function to create
async function create(name,email,password) {
    const values = {
        name: name.value,
        email: email.value,
        password: password.value
    }

    await fetch(`${URL}`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Function to show users
async function index() {
    
    table.innerHTML = ``
    const response = await fetch(`${URL}`)
    const data = await response.json()

    data.forEach((user,i) => {
        table.innerHTML += `
            <tr>
                <th scope="row">${i+1}</th>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>
                    <button type="button" data-id="${user.id}" class="btn btn-warning">Editar</button>
                    <button type="button" data-id="${user.id}" class="btn btn-danger">Eliminar</button>
                </td>
            </tr>
        `
    });
}

// Function to delete
async function deleteUser(id) {

    await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Function to search
async function find(id) {

    const response = await fetch(`${URL}/${id}`)
    const data = await response.json()
    return data;

}

// Function to update
async function update(name,email,password, idCache) {

    const values = {
        name: name.value,
        email: email.value,
        password: password.value
    }

    await fetch(`${URL}/${idCache}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    idCache = undefined;

}