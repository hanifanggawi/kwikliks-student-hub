import logo from './kwikliks.svg'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <img src={logo} className="logo" alt="[]"/>
                <Link to="/" className="logotype"> KwiKliks </Link>
            </div>
            <ul className="nav-list">
                <li><Link to="/"> Links </Link></li>
                <li><Link to="/schedule"> Schedule </Link></li> 
            </ul>
        </nav>
    )
}

export default Navbar
