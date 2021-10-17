import {Link} from 'react-router-dom'

function Navbarhome() {
    return(
        <nav >
            <Link to='/' className="links">
              Trolleo
            </Link>
              <ul className='nav-links'>
                  <li>
                      <Link className='links' to="/register">Register</Link>
                  </li>
                  <li>
                      <Link className='links' to="/signin">Sign In</Link>
                  </li>
              </ul>
        </nav>
          
    )
}

export default Navbarhome