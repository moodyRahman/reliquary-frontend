import { Link } from "react-router-dom"

const Compendium = () => {

    return (
        <div>
            <Link to={`./spells`}>
                <div className="characters">
                    search spells
                </div>
            </Link>
            <div>
                search monsters (TBA)
            </div>
        </div>
    )
}

export default Compendium