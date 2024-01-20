import './component.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import home_s from '../assets/images/home_s.png';
import home from '../assets/images/home.png';
import group_s from '../assets/images/group_s.png';
import group from '../assets/images/group.png';
import wallet_s from '../assets/images/wallet_s.png';
import wallet from '../assets/images/wallet.png';
import my_s from '../assets/images/my_s.png';
import my from '../assets/images/my.png';

const navItems = [
  { path: '/', label: 'Home', image: home, activeImage: home_s },
  { path: '/invite', label: 'Invite', image: group, activeImage: group_s },
  { path: '/recharge', label: 'Recharge', image: wallet, activeImage: wallet_s },
  { path: '/my', label: 'My', image: my, activeImage: my_s },
];

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  const isActive = (path) => currentPath === path.toLowerCase();

  return (
    <div className="navbar">
      {navItems.map(({ path, label, image, activeImage }) => (
        <div key={path} className="navItem">
          <Link to={path} className="link" style={{ color: isActive(path) ? '#0093FF' : '#89CDFF' }}>
            <span className="nav__icon" style={{ backgroundImage: `url(${isActive(path) ? activeImage : image})` }}></span>
            <span className="nav__name">{label}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
