import { Form } from "react-router-dom"
import { useState } from "react";

const Characters = () => {

    const [setName, name] = useState("");
    const [setDescription, description] = useState("")

    return (
        <div>
            <input type="text" placeholder="name" name="name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="description" name="description" onChange={(e) => setDescription(e.target.value)} />
            <button onClick={(e) => { console.log(e) }}>login</button>
        </div>
    )
}

export default Characters