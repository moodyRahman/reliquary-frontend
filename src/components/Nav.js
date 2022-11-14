import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styles from "./Nav.css"

const Nav = () => {

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
                to: "/moody"
            }
        ],
        true:[
            {
                name: "characters",
                to: "/"
            },
            {
                name: "campaigns",
                to: "/"
            },
            {
                name: "waluigi",
                to: "/"
            },
        ]
    }

    const loggedin = useSelector(state => state.auth.isLoggedIn);

    const NavEntry = ({name, link}) => {
        return (
            <li>{name}</li>
        )
    }

    return (
        <nav style={styles}>
            {loggedin?allNavs.true.map((e, i) => <NavEntry key={i} name={e.name} />):allNavs.false.map((e, i) => <NavEntry key={i} name={e.name} />) }
        </nav>
    )
}

export default Nav
