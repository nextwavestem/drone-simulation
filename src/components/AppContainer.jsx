import '../css/appContainer.css'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {getBannerReference} from '../config/navigationConfig.js'

export const AppContainer = ({ children }) => {
    const navigate = useNavigate();

    const handleLogoClick = () => { navigate('/'); };
    
    return (
        <div className="application-container"> 
            <div className="header-container">
                <div className="nws-logo" onClick={handleLogoClick}>
                    <img src={getBannerReference()} alt="Logo" />
                </div>
            </div>
            <div className="application-content">
                { children }
            </div>
        </div>
    )
}

AppContainer.propTypes = {
    children: PropTypes.node,
};
