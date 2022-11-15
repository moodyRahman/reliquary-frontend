import { Outlet } from "react-router-dom"
import "../styles/App.css"
import Nav from "./Nav"

const page = {
    margin: "0px",
    padding: "75px",
}

const Page = () => {
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
