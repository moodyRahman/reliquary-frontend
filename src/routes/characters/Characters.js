
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { setCharacters } from "../../features/UserDataUpdate"
import { Link } from "react-router-dom"
import "./Characters.css"
const Characters = () => {

    const [name, setName] = useState("");
    const [description, setDescription,] = useState("")
    const [classtext, setClasstext] = useState("")
    const [loading, setLoading] = useState(false)
    const token = useSelector((state) => state.auth.accessToken)
    const characters = useSelector((state) => state.characters.characters)

    const dispatch = useDispatch()

    const nameRef = useRef(null)
    const classRef = useRef(null)
    const descriptionRef = useRef(null)


    const addCharacter = async (e) => {
        setLoading(true)
        console.log(nameRef)
        console.log(classRef)
        console.log(descriptionRef)

        nameRef.current.value = ""
        classRef.current.value = ""
        descriptionRef.current.value = ""


        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/resources/character/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                class: classtext,
                description: description,
                token: token
            }),
        })

        const body = await res.json()
        console.log(body)
        dispatch(setCharacters([...characters]))

        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    const CharacterBox = ({ name, class: Cname, id }) => {
        return (
            <Link to={`/characters/${id}`}>
                <div className="characters">
                    {name} {Cname}
                </div>
            </Link>
        )
    }

    return loading ?
        <div>loading...</div> :
        (
            <>
                <div className="characters-container">
                    {characters.map((c, i) =>
                        <CharacterBox name={c.name} class={c.class} id={c._id} key={i} />
                    )}
                </div>
                <div>
                    <input type="text" ref={nameRef} placeholder="name" name="name" onChange={(e) => { setName(e.target.value) }} />
                    <input type="text" ref={classRef} placeholder="class" name="class" onChange={(e) => setClasstext(e.target.value)} />
                    <input type="text" ref={descriptionRef} placeholder="description" name="description" onChange={(e) => setDescription(e.target.value)} />
                    <button onClick={addCharacter}>create new character</button>
                    <div style={{ width: "50%", wordWrap: "break-word" }}>
                        {token}
                    </div>
                </div>
            </>
        )
}

export default Characters