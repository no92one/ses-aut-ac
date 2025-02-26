import { useContext } from 'react'
import { GlobalContext } from '../GlobalContext.jsx'

export default function Home() {
    const { user } = useContext(GlobalContext)

    return <div>
        <h1>{user ? `Welcome ${user.username}!` : "You need to login."}</h1>
    </div>
}
