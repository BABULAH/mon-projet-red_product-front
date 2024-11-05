import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import axiosInstance from '../utils/axiosInstance';

const Navbar = ({ pageTitle }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      localStorage.removeItem('token');
      sessionStorage.removeItem('token'); // Supprime le token de sessionStorage
      router.push('/login');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };


  return (
    <NavbarContainer>
      <Title>{pageTitle}</Title>
      <RightContainer>
        <SearchContainer>
          <SearchIcon icon={faSearch} size="lg" />
          <SearchInput type="text" placeholder="Rechercher..." />
        </SearchContainer>
        <IconsContainer>
          <NotificationIconWrapper>
            <NotificationBadge>3</NotificationBadge>
            <FontAwesomeIcon icon={faBell} size="lg" />
          </NotificationIconWrapper>
          <ProfileWrapper>
            <ProfileImage src="/images/client4.png" alt="User Profile" />
            <OnlineIndicator />
          </ProfileWrapper>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="lg"
            style={{ marginLeft: '20px', cursor: 'pointer' }}
            onClick={handleLogout}
          />
        </IconsContainer>
      </RightContainer>
    </NavbarContainer>
  );
};

// Styles
const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 240px;
  width: calc(98% - 250px);
  height: 60px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  margin: 0 20px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
`;

const SearchInput = styled.input`
  padding: 10px 10px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 50px;
  outline: none;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NotificationIconWrapper = styled.div`
  position: relative;
  margin-right: 20px;
  cursor: pointer;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -10px; /* Ajoutez plus d'espace au-dessus */
  right: -13px; /* Ajoutez plus d'espace à droite */
  background-color: #FCC100;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 10%;
  padding: 5px;
  height: 5px; /* Ajusté pour mieux contenir le texte */
  width: 5px; /* Ajusté pour mieux contenir le texte */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;


const ProfileWrapper = styled.div`
  position: relative;
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  background-color: #28a745;
  border: 2px solid #ffffff;
  border-radius: 50%;
  width: 10px;
  height: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default Navbar;
