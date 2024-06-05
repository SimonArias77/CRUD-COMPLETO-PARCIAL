let URL = ``;

// Function to search
async function find(id) {

    const response = await fetch(`${URL}/${id}`)
    const data = await response.json()
    return data;

}

// Function to create
async function create(str) {

    const values = {
        str: str.value
    }

    await fetch(`${URL}`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

// Function to update
async function update(str, idCache) {

    const dates = {
        str: str.value
    }

    await fetch(`${URL}/${idCache}`, {
        method: 'PUT',
        body: JSON.stringify(dates),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    idCache = undefined;

}

// Function to delete
async function deleteItem(id) {

    await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Function to show
async function index() {

    const response = await fetch(`${URL}`)
    const data = await response.json()

    element.innerHTML = ""
    data.forEach(object => {
        element.innerHTML += `

        `
    })

}

// Function to update using PATCH
// in this example we modify the user's last name
async function updatePatch(lastName, userId) {

    const userData = {
        lastName: lastName
    };

    await fetch(`${URL}/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}