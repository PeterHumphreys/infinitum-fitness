import { Link, matchPath, useLocation } from 'react-router-dom';


function NavLink({navItem}) {
  let location = useLocation();
  return (
    <li className = "vertical-nav-list-item ">
        <Link 
          id ={navItem.id==='company-logo-link' ? navItem.id : `nav-link-${navItem.id}`}
          to={navItem.link} 
          title={navItem.text}
          className={
              matchPath(
                {
                  path : location.pathname,
                  exact: false,
                  strict : false
                }, navItem.link) ?
              'active' :
              ''}>
            {navItem.icon}
            {navItem.text && <p>{navItem.text}</p>}
        </Link>
    </li>
  )
}

export default NavLink