
import {useSelector} from "react-redux"
import authSlice from "../../features/auth/authUpdate"
import { useEffect, useState } from "react";

const Characters = () => {

    const [name, setName] = useState("");
    const [description, setDescription, ] = useState("")
    const [classtext,setClasstext] = useState("")
    const [loading, setLoading] = useState(true)
    const m = useSelector((state) => state.auth.accessToken)
    
    useEffect(() => {
        console.log(m)
    }, [m])



    
    return loading?
        <div onClick={(e) => setLoading(false)}>loading...</div>:
    (
        <div>
            <input type="text" placeholder="name" name="name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="description" name="description" onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="class" name="class" onChange={(e) => setClasstext(e.target.value)} />
            <button onClick={(e) => { console.log(e) }}>login</button>
            <pre style={{whiteSpace: 'pre-wrap'}}>
                {m}
            </pre>
        </div>
    )
}

export default Characters