import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import "../styles/App.css"
import Nav from "./Nav"

const page = {
    margin: "0px",
    padding: "75px",
}

const Page = () => {
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://www.google.com/recaptcha/api.js?render=6LfAwBAjAAAAAALoD-IU1Qt_qeUNXMxFmjSosm2k"
        document.body.appendChild(script)
        console.log("appended it")

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
