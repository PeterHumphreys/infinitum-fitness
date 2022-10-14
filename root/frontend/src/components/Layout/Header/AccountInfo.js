import {FaBell, FaChevronDown} from 'react-icons/fa';
function AccountInfo({accountBoxData}) 
{
  return (
    
    <div id= "account-info">
        <button className='btn-icon' id='bell-icon'><FaBell/></button>  
        <a href="/user-profile" id="account-avatar">
            <img className="circle" src={accountBoxData.photo} />
            <p id="user-full-name">{accountBoxData.name}</p>
        </a> 

        <button className='btn-icon' id='account-options-btn'><FaChevronDown/></button>
            
        <div id="account-options-dropdown">
            <ul>
                <li><a href="/user-profile">Options</a></li>
                <li><a id = "logout-btn">Sign Out</a></li>
            </ul>
        </div>
    </div>
  )
}

export default AccountInfo