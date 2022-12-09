
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { setCharacters } from "../../features/UserDataUpdate"
const Characters = () => {

    const [name, setName] = useState("");
    const [description, setDescription,] = useState("")
    const [classtext, setClasstext] = useState("")
    const [loading, setLoading] = useState(true)
    const token = useSelector((state) => state.auth.accessToken)
    const characters = useSelector((state) => state.characters.characters)

    const dispatch = useDispatch()

    const nameRef = useRef(null)
    const classRef = useRef(null)
    const descriptionRef = useRef(null)


    const addCharacter = async (e) => {
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
    }

    const CharacterBox = ({name, class:Cname}) => {
        return (
            <>{name} {Cname} <br /></>
        )
    }

    return loading ?
        <div onClick={(e) => setLoading(false)}>loading...</div> :
        (
            <>
                <pre>
                    {characters.map((c, i) => 
                        <CharacterBox name={c.name} class={c.class} key={i} />
                    )}
                </pre>
                <pre>
                    {JSON.stringify(characters, null, 4)}
                </pre>
                <div>
                    <input type="text" ref={nameRef} placeholder="name" name="name" onChange={(e) => {setName(e.target.value)}} />
                    <input type="text" ref={classRef} placeholder="class" name="class" onChange={(e) => setClasstext(e.target.value)} />
                    <input type="text" ref={descriptionRef} placeholder="description" name="description" onChange={(e) => setDescription(e.target.value)} />
                    <button onClick={addCharacter}>create new character</button>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                        {token}
                    </pre>
                </div>
            </>
        )
}

export default Characters