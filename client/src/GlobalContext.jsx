import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const [user, setUser] = useState(null)
    const [count, setCount] = useState(0)

    async function getLogin() {
        const response = await fetch('/api/login', { credentials: 'include' })
        const data = await response.json()
        console.log(data)
        if (response.ok) {
            setUser(data)
        } else {
            setUser(null)
            console.log("Error getting session data")
        }
    }

    useEffect(() => {
        getLogin()
    }, [])

    return <GlobalContext.Provider value={{
        user,
        getLogin,
        count,
        setCount
    }}>
        {children}
    </GlobalContext.Provider>
}

export { GlobalContext, GlobalProvider }