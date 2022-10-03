import {FaBell, FaChevronCircleDown} from 'react-icons/fa';
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
function AccountInfo({accountBoxData}) 
{
  const navigate = useNavigate();
  return (
    
    <div id= "account-info">
      <div id="back-and-forth">                
          <MdNavigateBefore onClick={()=>{navigate(-1)}} id="back-arrow"/>
          <MdNavigateNext onClick={()=>{navigate(1)}} id="forward-arrow"/>
      </div>
        <button className='btn-icon' id='bell-icon'><FaBell/></button>  
        <a href="/user-profile" id="account-avatar">
            <img className="circle" src={accountBoxData.photo} />
            <p id="user-full-name">{accountBoxData.name}</p>
        </a> 

        <button className='btn-icon' ><FaChevronCircleDown/></button>
            
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