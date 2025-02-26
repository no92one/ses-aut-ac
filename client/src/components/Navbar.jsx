import { useContext } from "react";
import { NavLink } from "react-router";
import { GlobalContext } from "../GlobalContext.jsx";

export default function Navbar() {
    const { user, getLogin } = useContext(GlobalContext)

    async function logout() {
        const response = await fetch('/api/login', { method: 'DELETE', credentials: 'include' })
        const data = await response.json()
        console.log(data)
        await getLogin()
    }

    return <>
        <NavLink to="/">Home</NavLink>
        {
            user?.role == "ADMIN" ?
                <NavLink to="/admin">Admin</NavLink>
                :
                null
        }
        {
            user ?
                <button onClick={logout}>Logout</button>
                :
                <NavLink to="/login">Login</NavLink>
        }

    </>
}
