import { getUrlUsers } from "./urlData";

const form = document.querySelector("form")
const name = document.querySelector("#complete_name-user")
const email = document.querySelector("#email-user")
const password = document.querySelector("#password-user")
const confirmPassword = document.querySelector("#confirm_password-user")
const URL = getUrlUsers()


form.addEventListener("submit", async(event) => {
        event.preventDefault()

        alert("Entra a la función")
        if (password.value === confirmPassword.value) {
            await create(name,email,password)
            window.location.href = "../../index.html"
        }
})


// Function to create
async function create(name,email,password) {
    alert("Entra a crear")
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