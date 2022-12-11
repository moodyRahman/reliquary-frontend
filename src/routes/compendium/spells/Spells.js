import { useEffect, useState } from "react"


const Spells = () => {

    const [spells, setSpells] = useState([])
    const [levelQuery, setLevelQuery] = useState("")
    const [schoolQuery, setSchoolQuery] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("https://open5e.reliquary.moodyrahman.com/spells/?format=json&limit=10")
                const body = await res.json()
                setSpells(body.results)
            } catch (error) {
                console.log("error")
            }
        })()
    }, [])

    const Item = ({ item }) => {
        const [display, setDisplay] = useState(false)

        const {name, desc, level} = item

        return (
            <div onClick={(e) => {setDisplay(display?false:true)}}>
                <div style={{ background: "#ADD8E6", padding: "10px", marginTop: "5px" }} >{name} | {level}</div>
                <div style={{ background: "#ADD8E6", padding: "10px", display:display?"":"none" }}> {desc}</div>
            </div>
            )
    }

    return (
        <div>
            <input placeholder="search by level" type="text" />
            <input placeholder="search by school" type="text" />
            <input placeholder="search by name" type="text" />
            <button>search</button>


            <div style={{ width: "50%" }}>
                {spells.map((e, i) => {
                    return <Item item={e} key={i} />
                }
                )}
            </div>
        </div>
    )
}

export default Spells
