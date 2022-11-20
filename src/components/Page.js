import { Outlet } from "react-router-dom"
import "../styles/App.css"
import { Helmet } from "react-helmet";
import Nav from "./Nav"

const page = {
    margin: "0px",
    padding: "75px",
}

const Page = () => {
    return (
        <div>
            <Helmet>
                <script src="https://www.google.com/recaptcha/api.js?render=6LfAwBAjAAAAAALoD-IU1Qt_qeUNXMxFmjSosm2k"></script>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Nav />
            <div style={page}>
                <Outlet />
            </div>
        </div>
    )
}

export default Page
