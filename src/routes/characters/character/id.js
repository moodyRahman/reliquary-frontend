import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

const Character = () => {
    const { id } = useParams()
    const characters = useSelector((state) => state.characters.characters)
    const [iname, setiname] = useState("")
    const [idesc, setidesc] = useState("")


    const Tags = () => {
        return (
            <div>
                here is the tag section
            </div>
        )
    }

    const newItem = (e) => {
        console.log(iname, idesc)

    }


    return (
        <div>
            here is one char,
            <pre style={{ width: "50%", wordWrap: "break-word" }}>
                {JSON.stringify((characters.find(e => e._id === id))?.name, null, 4)}
            </pre>
            <input type="text" placeholder="item name" name="iname" onChange={(e) => { setiname(e.target.value) }} />
            <input type="text" placeholder="item description" name="idesc" onChange={(e) => { setidesc(e.target.value) }} />
            <button onClick={newItem}>create new item</button>
            <Tags />

        </div>)
}

export default Character