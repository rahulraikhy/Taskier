import { Link } from "react-router-dom"
import './NavBar.css'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/tasks" className="nav-link">
                    All Tasks
                </Link>
                <span className="separator">|</span>
                <Link to="/task/new" className="nav-link">
                    New Task
                </Link>
                <span className="separator">|</span>
                <p className="nav-greeting">Signed in as, {user.name}</p>
                <span className="separator">|</span>
                <Link to="" onClick={handleLogOut} className="nav-link logout">
                    Log Out
                </Link>
            </div>
        </nav>

    )
}