
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Characters = () => {

    const [name, setName] = useState("");
    const [description, setDescription,] = useState("")
    const [classtext, setClasstext] = useState("")
    const [loading, setLoading] = useState(true)
    const token = useSelector((state) => state.auth.accessToken)

    useEffect(() => {
        (async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/resources/character/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                }),
            })

            const body = await res.json()

            console.log(body)
        })()
    }, [loading, token])

    const addCharacter = async (e) => {
        console.log(e)
        console.log("adding it now")

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

    }

    return loading ?
        <div onClick={(e) => setLoading(false)}>loading...</div> :
        (
            <div>
                <input type="text" placeholder="name" name="name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="description" name="description" onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="class" name="class" onChange={(e) => setClasstext(e.target.value)} />
                <button onClick={addCharacter}>create new character</button>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                    {token}
                </pre>
            </div>
        )
}

export default Characters