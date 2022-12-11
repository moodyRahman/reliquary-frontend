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

    const nameRef = useRef(null)
    const descRef = useRef(null)
    const tagdispRef = useRef(null)
    const tagRef = useRef(null)

    const [iname, setiname] = useState("")
    const [idesc, setidesc] = useState("")
    const [itags, setitags] = useState([])
    const [char, setChar] = useState({})


    useEffect(() => {
        console.log("checked the url lol")
        console.log(characters)
        // if (characters.find(e => e._id === id) === undefined) {
        //     navigate("/characters")
        // }

        setChar(characters.find(e => e._id === id))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, characters])

    const Tags = ({ state, update }) => {

        const inRef = useRef(null)


        return (
            <div>
                <div ref={tagdispRef}>

                    {state.map((e, i) => {
                        return (
                            <span key={i}>{e}, </span>
                        )
                    })}
                </div>
                <input ref={tagRef} placeholder="add a new tag" />
                <button onClick={e => {
                    console.log(state)
                    if (tagRef.current.value.trim() === "") {
                        return
                    }
                    update([...state, tagRef.current.value])
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
                name: iname,
                description: idesc,
                tags: itags
            }),
        })
        if (res.status !== 200) {
            console.log(res)
            return
        }

        console.log("updating items rn")

        nameRef.current.value = ""
        descRef.current.value = ""
        tagRef.current.value = ""
        setitags([])

        dispatch(setCharacters([...characters]))


    }


    const ItemBox = ({ item }) => {
        const { name, description, tags } = item
        return (
            <div>
                {name}, {description}, {tags}
            </div>
        )
    }

    return (
        <div>
            <input type="text" placeholder="item name" ref={nameRef} onChange={(e) => { setiname(e.target.value) }} />
            <input type="text" placeholder="item description" ref={descRef} onChange={(e) => { setidesc(e.target.value) }} />
            <Tags state={itags} update={setitags} />
            <button style={{ marginTop: "15px" }} onClick={newItem}>create new item</button>

            <pre style={{ width: "50%", wordWrap: "break-word" }}>
                {JSON.stringify((char?.items!==undefined?[...char?.items].reverse():[]), null, 4)}
            </pre>

        </div>)
}

export default Character