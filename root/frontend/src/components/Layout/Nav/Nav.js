import NavLink from './NavLink';
import {navData} from '../../../lib/NavData';
import {useState} from 'react';
import {FaChevronLeft} from 'react-icons/fa';
import {useContext} from 'react';
import LayoutContext from '../../../context/LayoutContext';

function Nav() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const {isNavExpanded, toggleNav} = useContext(LayoutContext);
  return (
    <nav 
      id='nav' 
      className=
      {
        isNavExpanded ? 'nav-expanded' : ''
      }
    >

      {
        //Desktop only
        <button 
          id="expand-icon"
          className=
          {
            isNavCollapsed ?
            'open-icon btn-icon':
            'btn-icon'
          }
          onClick={toggleNav}
          >
            <FaChevronLeft />
          </button>
      }
      
      
      <ul id="vertical-nav-list">

                {
                  navData.map((navItem) =>
                  {
                    if (true)
                    return <NavLink key={`nav-link-${navItem.id}`} navItem = {navItem}/>
                  })
                }
      </ul>
    </nav>
  )
}

export default Nav