import logo from '../static/img/kwikliks.svg'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <img src={logo} className="logo" alt="[]"/>
                <Link to="/" className="logotype"> KwiKliks </Link>
            </div>
        </nav>
    )
}

export default Navbar
