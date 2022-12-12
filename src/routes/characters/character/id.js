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
        const z = characters.find(e => e._id === id);
        if (z===undefined) {
            navigate("/characters")
        }
        setChar(z)

    }, [id, characters])

    const Tags = ({ state, update }) => {

        return (
            <div>
                <div ref={tagdispRef}>

                    {state.join(", ")}
                </div>
                <div style={{ display: "flex" }}>
                    <input style={{ width: "25%" }} ref={tagRef} placeholder="add a new tag" />

                    <button style={{ margin: "15px" }} onClick={e => {
                        console.log(state)
                        if (tagRef.current.value.trim() === "") {
                            return
                        }
                        update([...state, tagRef.current.value])
                    }}>add tag</button>
                </div>
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

    const getAllTags = (inventory) => {
        console.log(inventory)
    }


    const ItemBox = ({ item }) => {
        const { name, description, tags } = item
        return (
            <div style={{ background: "#00008b", margin: "15px", padding: "15px", color: "white" }}>

                <div>
                    {name} | {tags.join(", ")}
                </div>
                <div>
                    {description}
                </div>
            </div>
        )
    }

    return (
        <div>
            <h3>Welcome {char.name}, o' {char.class}</h3>

            <div style={{ width: "50%" }}>
                Create a new item:

                {(char?.items !== undefined ? [...char?.items].reverse() : []).map((e, i) => {
                    return (
                        <ItemBox item={e} key={i} />
                    )
                })}
            </div>


            <input type="text" placeholder="item name" ref={nameRef} onChange={(e) => { setiname(e.target.value) }} />
            <input type="text" placeholder="item description" ref={descRef} onChange={(e) => { setidesc(e.target.value) }} />
            <Tags style={{ width: "25%" }} state={itags} update={setitags} />
            <button style={{ marginTop: "15px", display: "inline" }} onClick={newItem}>create new item</button>

        </div>)
}

export default Character