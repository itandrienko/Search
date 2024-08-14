const listUsers = document.querySelector('.app__list')
const filterInput = document.querySelector('.app__field-input')

let USERS = []

filterInput.addEventListener('input', (event) => {
  const value = event.target.value.toLowerCase()
  const filteredUsers = USERS.filter((user)=>user.name.toLowerCase().includes(value))
  render(filteredUsers)
})

async function start() {
  listUsers.innerHTML = 'Loading...'
  listUsers.style.textAlign = 'center'
  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await resp.json()
    setTimeout(()=>{
      USERS = data
      render(data)
    }, 2000)
  } catch (err) {
    listUsers.innerHTML = err.message
    listUsers.style.color = 'red'
  }
}

function render(users = []) {
  if (users.length === 0) {
    listUsers.innerHTML = 'No matched users'
  } else {
    const html = users.map(toHTML).join('')
    listUsers.innerHTML = html
  }
}

function toHTML(user) {
  return `
    <li class="app__item">${user.name}</li>
  `
}

start()