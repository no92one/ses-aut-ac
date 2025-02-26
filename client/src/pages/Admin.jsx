import { useContext } from "react"
import { GlobalContext } from "../GlobalContext.jsx"

export default function Admin() {
    const { user, count, setCount } = useContext(GlobalContext)
    return user?.role != "ADMIN" ?
        <h1>You need to be admin to access these tools!</h1>
        :
        <div>
            <h1>You have access to Admin tools!</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(n => n + 1)}>Add to count</button>
        </div>
}
