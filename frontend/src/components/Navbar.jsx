import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Textile Waste Management AI</h2>
            </div>

            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/upload">Fabric Classification</Link>
                <Link to="/defect">Defect Detection</Link>
                <Link to="/analytics">Analytics</Link>
                <Link to="/history">History</Link>
                <Link to="/inventory">Inventory</Link>
            </div>

            <button className="logout-btn" onClick={logout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;