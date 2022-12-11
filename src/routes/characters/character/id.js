import { useEffect, useState, useRef } from "react"
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
    const [itags, setitags] = useState([])


    useEffect(()=>{
        console.log("checked the url lol")
        if (characters.find(e => e._id === id) === undefined) {
            navigate("/characters")
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const Tags = ({state, update}) => {

        const inRef = useRef(null)


        return (
            <div>
                {state.map((e, i) => {
                    return (
                        <span key={i}>{e}, </span>
                    )
                })}
                <input ref={inRef} placeholder="add a new tag" />
                <button onClick={e => {
                    console.log(state)
                    if (inRef.current.value.trim() === "") {
                        return
                    }
                    update([...state, inRef.current.value ])
                }}>add tag</button>
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
                tags:itags
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
            <Tags state={itags} update={setitags} />
            <button style={{marginTop:"15px"}} onClick={newItem}>create new item</button>

        </div>)
}

export default Character