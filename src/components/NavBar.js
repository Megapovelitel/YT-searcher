import React, {useContext} from "react";
import "./Navbar.css";
import { NavLink, withRouter } from "react-router-dom";
import VideoContext from '../context/video-context'

const  NavBar = ({ location }) => {
  const context = useContext(VideoContext)
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
  <h2 className='link' style={{marginRight: 'auto', fontSize:'16px', marginTop: '10px'}}>You are logged as: {context.user} </h2>
          <NavLink to='/' exact><li onClick={context.logOut} className="link3 link">Logout</li></NavLink>
        </div>
        
      </ul>
    </nav>
  );
}
export default withRouter(NavBar);
