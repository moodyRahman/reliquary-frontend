import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setCharacters } from "../../../features/UserDataUpdate"
import { useNavigate } from "react-router-dom";

const Character = () => {
    const { id } = useParams()
    const characters = useSelector((state) => state.characters.characters)
    const token = useSelector((state) => state.auth.accessToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [iname, setiname] = useState("")
    const [idesc, setidesc] = useState("")

    useEffect(()=>{
        console.log("checked the url lol")
        if (characters.find(e => e._id === id) === undefined) {
            // navigate("../")
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const Tags = () => {
        return (
            <div>
                here is the tag section
            </div>
        )
    }

    const newItem = async (e) => {
        console.log(iname, idesc)
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/resources/${id}/items/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                name:iname,
                description:idesc,
                tags:[]
            }),
        })
        if (res.status !== 200) {
            console.log(res)
            return
        }

        console.log("updating items rn")
        // const c = {...characters.find(e => e._id === id)}
        
        // c.items.push()

        dispatch(setCharacters([...characters]))


    }


    return (
        <div>
            here is one char,
            <pre style={{ width: "50%", wordWrap: "break-word" }}>
                {JSON.stringify((characters.find(e => e._id === id)), null, 4)}
            </pre>
            <input type="text" placeholder="item name" name="iname" onChange={(e) => { setiname(e.target.value) }} />
            <input type="text" placeholder="item description" name="idesc" onChange={(e) => { setidesc(e.target.value) }} />
            <button onClick={newItem}>create new item</button>
            <Tags />

        </div>)
}

export default Character