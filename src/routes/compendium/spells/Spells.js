import { useEffect, useState } from "react"


const Spells = () => {

    const [spells, setSpells] = useState([])
    const [page, setPage] = useState(1)
    const [totalSpells, setTotalSpells] = useState()
    const [levelQuery, setLevelQuery] = useState("")
    const [schoolQuery, setSchoolQuery] = useState("")
    const [nameQuery, setNameQuery] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        (async () => {
            search()
        })()
    },[page])

    const search = async () => {
        console.log(`https://open5e.reliquary.moodyrahman.com/spells/?format=json&limit=10&${nameQuery.trim() === "" ?
        `level_int=${levelQuery}&school=${schoolQuery === "any" ? "" : schoolQuery}` :
        `search=${nameQuery}`}&page=${page}`)

        const res = await fetch(
            `https://open5e.reliquary.moodyrahman.com/spells/?format=json&limit=10&${nameQuery.trim() === "" ?
                `level_int=${levelQuery}&school=${schoolQuery === "any" ? "" : schoolQuery}` :
                `search=${nameQuery}`}&page=${page}`
        )
        if (res.status !== 200) {
            setError(true)
            return
        }
        const body = await res.json()
        if (body.count === 0) {
            setError(true)
            return
        }
        setError(false)
        setSpells(body.results)
        setTotalSpells(body.count)
    }

    const Item = ({ item }) => {
        const [display, setDisplay] = useState(false)

        const { name, desc, level } = item

        return (
            <div onClick={(e) => { setDisplay(display ? false : true) }}>
                <div style={{ background: "#ADD8E6", padding: "10px", marginTop: "5px" }} >{name} | {level}</div>
                <div style={{ background: "#ADD8E6", padding: "10px", display: display ? "" : "none" }}> {desc}</div>
            </div>
        )
    }

    const Paginate = () => {
        const style = {
            margin: "5px",
            flexbasis:"10%" /* explanation below */
        }

        const container = {
            display:"flex",
            flexWrap:"wrap",
            width:"50%"
        }
        return (
            <div style={container}>
                {[...Array((totalSpells / 10) | 0).keys()].map((e, i) => { return <span onClick={(evt) => {setPage(i + 1); }} style={style}>{i+1}</span> })}
            </div>
        )
    }

    const schools = ["any", "conjuration", "necromancy", "evocation", "abjuration", "transmutation", "divination", "enchantment", "illusion"]

    return (
        <div>
            <input placeholder="search by level" type="text" onChange={(e) => setLevelQuery(e.target.value)} />

            <div style={{ width: "50%", marginLeft: "15px" }}>search by school</div>
            <select style={{ width: "50%", marginLeft: "15px", padding: "15px" }} onChange={(e) => setSchoolQuery(e.target.value)} >
                {schools.map((e, i) => <option key={i} value={e}>{e}</option>)}
            </select>

            <input placeholder="search by name" type="text" onChange={(e) => setNameQuery(e.target.value)} />
            <button onClick={() => {setPage(1);search()}}>search</button>


            {error ? (<div style={{ marginTop: "25px" }}>sorry! no results for that query</div>) :
                <div style={{ width: "50%" }}>
                    {spells.map((e, i) => {
                        return <Item item={e} key={i} />
                    }
                    )}
                </div>
            }

            <Paginate />

        </div>
    )
}

export default Spells
