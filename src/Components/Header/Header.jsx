import Logo from '../../images/Logo.svg';
import './Header.css';
import ActiveLink from '../ActiveLink/ActiveLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';


const Header = () => {
  const [open, setOpen] = useState(false);
  const { user , logOut } = useContext(AuthContext);

  const handleLogOut = ()=> {
    logOut()
    .then(()=>{})
    .catch(error => console.error(error))
  }
  return (
    <nav className='header-container'>
      <img src={Logo} alt="" />
      <div className='nav-link-container'>
      <div onClick={ ()=> setOpen(!open) } className={open ? 'nav-bar-o' : 'nav-bar-c'}>
          <span>
            {
              open === true ?
              <FontAwesomeIcon icon={faBars} />
              : <FontAwesomeIcon icon={faX} />
            }
          </span>
        </div>
        <div className={open ? 'nav-open' : 'nav-close'}>
          <ActiveLink to="/">Shop</ActiveLink>
          <ActiveLink to="/orders">Orders</ActiveLink>
          <ActiveLink to="/inventory">Inventory</ActiveLink>
          <ActiveLink to="/login">Login</ActiveLink>
          <ActiveLink to='/sign-up'>Sign Up</ActiveLink>
          {
            user && <span className='text-white'>{user.email} <button onClick={handleLogOut}>LogOut</button></span>
          }
        </div>
       
      </div>
    </nav>
  );
};

export default Header;