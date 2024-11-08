import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoMdNotificationsOutline } from "react-icons/io";
import { faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FiLogOut } from "react-icons/fi";

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
            <IoMdNotificationsOutline style={{ fontSize: '16px' }} /> {/* Taille personnalisée */}

          </NotificationIconWrapper>
          <ProfileWrapper>
            <ProfileImage src="/images/client4.png" alt="User Profile" />
            <OnlineIndicator />
          </ProfileWrapper>
          <FiLogOut
            icon={faSignOutAlt}
            style={{ fontSize: '16px', marginLeft: '20px', cursor: 'pointer' }} // Réduire la taille
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
  height: 40px;
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
  font-weight: 500;
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
  width: 15px;
  opacity: 0.3;
`;

const SearchInput = styled.input`
  padding: 5px 5px 5px 40px;
  border: 1px solid #ccc;
  border-radius: 50px;
  outline: none;
  opacity: 0.3; /* Diminue l'opacité à 80% */
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
  top: -7px; /* Ajoutez plus d'espace au-dessus */
  right: -11px; /* Ajoutez plus d'espace à droite */
  background-color: #FCC100;
  color: #ffffff;
  font-family: roboto;
  font-size: 10px;
  border-radius: 20%;
  padding: 5px;
  height: 3px; /* Ajusté pour mieux contenir le texte */
  width: 3px; /* Ajusté pour mieux contenir le texte */
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
  right: 0px;
  background-color: #00FF92;
  border: 2px solid #ffffff;
  border-radius: 50%;
  width: 5px;
  height: 5px;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export default Navbar;
