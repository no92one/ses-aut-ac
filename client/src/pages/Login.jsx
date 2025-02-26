import { useContext } from "react"
import { GlobalContext } from "../GlobalContext.jsx"

export default function Login() {
    const { getLogin } = useContext(GlobalContext)

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
        await getLogin()
    }

    return <div>
        <h1>Login</h1>
        <form action={login}>
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
}
