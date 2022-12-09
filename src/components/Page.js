import { Outlet } from "react-router-dom"
import "../styles/App.css"
import { useEffect } from "react"
import Nav from "./Nav"
import { logout } from "../features/authUpdate"
import { useSelector, useDispatch } from "react-redux"
import { setCharacters } from "../features/UserDataUpdate"

const page = {
    margin: "50px",
    padding: "30px",
}

const Page = () => {

    const token = useSelector((state) => state.auth.accessToken)
    const characters = useSelector((state) => state.characters.characters)
    const dispatch = useDispatch()

    /**
     * check to see if the current token is valid, log out if so
     */
    console.log("in da page")
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/resources/character/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            }),
        })
        .then(res => {
            if (res.status !== 200) {
                throw new Error("bad token")
            }
            return res.json()
        })
        .then(body => {
            if (body.length !== characters.length) {
                dispatch(setCharacters(body))
            }
        })
        .catch(e => {
            dispatch(logout())
            console.log("bad token")
        })
    }, [characters])


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
