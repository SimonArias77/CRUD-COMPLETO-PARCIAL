import { alerta } from "./alerts";
import { getUrlUsers } from "./urlData";

const form = document.querySelector("form")
const email = document.querySelector("#email-user")
const password = document.querySelector("#password-user")
const register = document.querySelector(".btn-success")
const URL = getUrlUsers()



register.addEventListener("click", ()=> {
    window.location.href = "/src/pages/register.html"
})

form.addEventListener("submit", async(e)=> {

    e.preventDefault()
    const verifyEmail = await checkEmail(email)
    if (verifyEmail === false) {
        alert("No se encontró el email.")
    }else{
        if (verifyEmail.password === password.value) {
            localStorage.setItem("userOnline",JSON.stringify(verifyEmail))
            window.location.href = "/src/pages/dashboard.html"
        }else{
            alert("Contraseña incorrecta")
        }
    }
})

async function checkEmail(email) {
    const response = await fetch(`${URL}?email=${email.value}`)
    const data = await response.json()

    if (data.length === 1) {
        return data[0]
    }else {
        return false
    }
}