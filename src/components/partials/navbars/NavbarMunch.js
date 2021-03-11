import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './NavbarMunch.css';
import { IconContext } from 'react-icons';

function NavbarMunch(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
    <div className='navbar'>
      <Link to='#' className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar} />
      </Link>
    </div>
    <div class="nav-icon">
      <div></div>
    </div>
    <nav className={sidebar ? 'nav-menu active tabindex=`1`' : 'nav-menu'}>
      <ul className='nav-menu-items' >
        <li className='navbar-toggle'>
          
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