import "./navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

const Navbar = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        // Navigate to the "/login" route
        navigate("/login");
    };
    const handleRegisterClick = () => {
        // Navigate to the "/login" route
        navigate("#");
    };
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
                    <span className="logo">AST Booking</span>
                </Link>
                {user ? user.username : (
                    <div className="navItems">
                        <button className="navButton" onClick={handleRegisterClick}>Register</button>
                        <button className="navButton" onClick={handleLoginClick}>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
