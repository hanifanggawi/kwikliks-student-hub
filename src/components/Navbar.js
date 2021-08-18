import logo from '../static/img/kwikliks.svg'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <img src={logo} className="logo" alt="[]"/>
                <a href='#' className="logotype"> KwiKliks </a>
            </div>
        </nav>
    )
}

export default Navbar
