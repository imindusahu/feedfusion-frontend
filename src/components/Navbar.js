import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getProfile } from "../api/auth";
import { useEffect, useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = isAuthenticated();
    const [user, setUser] = useState(null);
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getProfile();
                setUser(data);
            } catch (err) {
                console.error(err);
            }
        };

        if (isLoggedIn) {
            fetchUser();
        }
    }, [isLoggedIn]);
    return (
        <nav style={{
            background: "#281616",
            color: "white",
            padding: "15px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                {/* LOGO */}
                <h3 style={{ margin: 0 }}>SMART AGGREGATOR</h3>

                {/* LINKS */}
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    {isLoggedIn ? (
                        <>
                            <Link to="/" style={linkStyle}>News</Link>

                            {/* ✅ THIS IS YOUR ARTICLES PAGE LINK */}
                            <Link to="/articles" style={linkStyle}>  Articles </Link>
                            <Link to="/create-article" style={linkStyle}>Create Article</Link>
                            {/* ✅ USER NAME */}
                            <span style={{ color: "#f4a742" }}>
                                👤 {user?.username || "User"}
                            </span>

                            <button onClick={handleLogout} style={btnStyle}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={linkStyle}>Login</Link>
                            <Link to="/register" style={linkStyle}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

// ✅ Reusable link styling
const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
};

// ✅ Reusable button styling
const btnStyle = {
    background: "#f4a742",
    border: "none",
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
};
export default Navbar;