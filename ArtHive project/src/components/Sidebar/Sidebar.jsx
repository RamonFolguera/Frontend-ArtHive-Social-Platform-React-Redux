import { Link } from 'react-router-dom';
import './Sidebar.scss';
import ArtHiveLogo from '../../assets/images/ArtHiveLogo.png'
import LogoSubtitle from '../../assets/images/logo_sub.png'


export const Sidebar = () => (
    <div className='nav-bar'>
        <Link className='ArtHiveLogo' to='/'>
            <img src={ArtHiveLogo} alt="ArtHiveLogo" />
            <img className='sub-logo' src={LogoSubtitle} alt='slobodan' />
        </Link>
    </div>
)