import { useState } from 'react'

function App() {
  const [user, setUser] = useState(null)

  async function login(formData) {
    const response = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password")
      })
    })
    const data = await response.json()
    console.log(data)
  }

  async function getLogin() {
    const response = await fetch('/api/login', { credentials: 'include' })
    const data = await response.json()
    if (response.ok) {
      setUser(data.username)
    } else {
      setUser(null)
      console.log("Error getting session data")
    }
  }

  async function logout() {
    const response = await fetch('/api/login', { method: 'DELETE', credentials: 'include' })
    const data = await response.json()
    console.log(data)
  }


  return (
    <>
      <div>
        <h1>This is a Login demo</h1>
        <form action={login}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <h1>Session Data</h1>
        <button onClick={getLogin}>Get User</button>
        <p>User: {user ? user : "No user"}</p>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  )
}


export default App
