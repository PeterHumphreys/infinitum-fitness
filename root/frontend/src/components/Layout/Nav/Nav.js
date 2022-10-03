import NavLink from './NavLink';
import {navData} from '../../../lib/NavData';
import {useState} from 'react';
import {FaChevronCircleLeft} from 'react-icons/fa';

function Nav() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  //let location = useLocation();
  return (
    <nav 
      id='nav' 
      className=
      {
        isNavCollapsed ? 'nav-closed' : ''
      }
    >

      {
        <FaChevronCircleLeft 
        id="expand-icon"
        className=
        {
          isNavCollapsed ?
          'open-icon':
          ''
        }
        onClick={()=>{
          setIsNavCollapsed(!isNavCollapsed)
          }}/>
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