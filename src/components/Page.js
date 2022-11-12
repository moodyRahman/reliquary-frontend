import "../styles/App.css"

const page = {
    margin: "0px",
    padding: "75px",
  }

const Page = ({children}) => {
    return (
        <div style={page}>
            {children}
        </div>
    )
}

export default Page
