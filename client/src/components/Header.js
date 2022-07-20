import { useContext } from 'react';
import { NavLink, Link } from "react-router-dom";
import { CoursesContext } from './Context';

const Header = () => {

  const { user } = useContext(CoursesContext);

  return(
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to='/'>Courses</Link>
        </h1>
        <nav>
          {user ? (
            <ul className="header--signedin">
              <li>Welcome, {user.firstName} {user.lastName}!</li>
              <li><NavLink to="/signout">Sign Out</NavLink></li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li><NavLink to="/signup">Sign Up</NavLink></li>
              <li><NavLink to="/signin">Sign In</NavLink></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;