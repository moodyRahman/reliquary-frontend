import { logout } from "../../features/auth/authUpdate"
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import {useEffect} from "react"

const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        dispatch(logout())
        navigate("/")

    })

    return <>loggin out...</>
}

export default Logout