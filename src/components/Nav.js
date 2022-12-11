import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./Nav.css"

const Nav = () => {

    const booltostr = (x) => {
        return x?"true":"false"
    }

    const allNavs = {
        false: [
            {
                name: "welcome",
                to: "/"
            },
            {
                name: "login",
                to: "/login"
            },
            {
                name: "register",
                to: "/register"
            }
        ],
        true:[
            {
                name: "characters",
                to: "/characters"
            },
            {
                name: "campaigns",
                to: "/campaigns"
            },
            {
                name: "waluigi",
                to: "/waluigi"
            },
            {
                name: "logout",
                to: "/logout"
            },
            {
                name: "compendium",
                to: "/compendium"
            },
        ]
    }



    const NavEntry = ({name, to}) => {
        return (
            <Link to={to}>{name}</Link>
        )
    }

    const loggedin = useSelector((state) => state.auth.isLoggedIn);

    return (
        <nav style={styles}>
            {allNavs[booltostr(loggedin)].map((e, i) => <NavEntry key={i} name={e.name} to={e.to} />)}
        </nav>
    )
}

export default Nav
