import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink, withRouter } from "react-router-dom";
import VideoContext from "../../context/video-context";
import AuthService from "../../services/auth.service";

const NavBar = ({ location }) => {
  const context = useContext(VideoContext);
  const uname = context.user.username;
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <div className="group">
          <img src="https://pngimage.net/wp-content/uploads/2018/05/cool-png-tumblr-7.png" alt="logo"></img>

          <NavLink to="/search" exact>
            <li className={location.pathname === "/search" ? "active" : "default"}>
              Поиск
            </li>
          </NavLink>

          <NavLink to="/queries" exact activeClassName="active">
            <li className={location.pathname === "/queries" ? "active" : "default"}>
              Избранное
            </li>
          </NavLink>

          <h2 className="link logged-text">
            You are logged as : {uname}
          </h2>

          <NavLink to="/" exact>
            <li onClick={AuthService.logOut} className="link3 link">
              Logout
            </li>
          </NavLink>

        </div>
      </ul>
    </nav>
  );
};
export default withRouter(NavBar);
