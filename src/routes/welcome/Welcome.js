import "./Welcome.css"
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <div className="logo">
        Reliquary
      </div>
      <div>
        <Link to="/login">Login with Google</Link>
      </div>
    </div>
  );
}

export default Welcome;
