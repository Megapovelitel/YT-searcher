import React from "react";
import "./Navbar.css";
import { NavLink, withRouter } from "react-router-dom";


const  NavBar = ({ location }) => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <div className="group">
          <img
            style={{ height: "45px" }}
            src="https://pngimage.net/wp-content/uploads/2018/05/cool-png-tumblr-7.png"
          ></img>
          <NavLink
            to="/search"
            exact
            
         >
            <li className={location.pathname === '/search' ? 'active' : 'default'}>Поиск</li>
          </NavLink>

          <NavLink to="/queries" exact activeClassName="active">
            <li className={location.pathname === '/queries' ? 'active' : 'default'}>Избранное</li>
          </NavLink>
        </div>
        <li className="link3 link">Logout</li>
      </ul>
    </nav>
  );
}
export default withRouter(NavBar);
