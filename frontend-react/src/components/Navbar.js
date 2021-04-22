import logo from './kwikliks.svg'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-item">
                <div className="nav-brand">
                    <img src={logo} className="logo" alt="[]"/>
                    <a href="#">KwiKliks</a>
                    {/* <span></span> */}
                </div>
                <ul className="nav-list">
                    <li><a href="#">Links</a></li>
                    <li><a href="#">Schedule</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
