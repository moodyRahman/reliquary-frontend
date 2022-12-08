import { Outlet } from "react-router-dom"
import "../styles/App.css"
import { useEffect } from "react"
import Nav from "./Nav"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../features/auth/authUpdate"

const page = {
    margin: "50px",
    padding: "30px",
}

const Page = () => {

    const token = useSelector((state) => state.auth.accessToken)
    const dispatch = useDispatch()

    /**
     * check to see if the current token is valid, log out if so
     */
    useEffect(() => {
        (async () => {
            console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/verify_token`)
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verify_token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                }),
            })

            const body = await res.json()

            if (body.status !== 200) {
                dispatch(logout())
            }
        })()

        console.log("once")
    }, [])

    return (
        <div>
            <Nav />
            <div style={page}>
                <Outlet />
            </div>
        </div>
    )
}

export default Page
