import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './NavbarMunch.css';
import { IconContext } from 'react-icons';

function NavbarMunch(props) {
  const [currentUser, setCurrentUser] = useState(props.currentUser)
  const [isAuthenticated, setIsAuthenticated] = useState(props.isAuthenticated)
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar); // setting state to opposite of current sidebar state

  return (
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
    <div className='navbar'>
      <Link to='#' className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar} />
      </Link>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
      <ul className='nav-menu-items' onClick={showSidebar}>
        <li className='navbar-toggle'>
          <Link to='#' className='menu-bars'>
            <AiIcons.AiOutlineClose />
          </Link>
        </li>
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  </IconContext.Provider>
</>
  );
}

export default NavbarMunch;
