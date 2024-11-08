import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { MdDashboard } from "react-icons/md";
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Importation de Link


const logoUrl = '/images/logo.jpg';

const Sidebar = () => {
  const router = useRouter();
  const [username, setUsername] = useState('Utilisateur'); // État local pour le nom d'utilisateur

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Ce `useEffect` s'exécute seulement une fois au montage

  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo src={logoUrl} alt="Logo" />
      </LogoContainer>
      <TitleContainer>
        <p>Principal</p>
      </TitleContainer>
      
      <Link href="/dashboard" passHref>
        <NavLink isActive={router.pathname === '/dashboard'}>
          <MdDashboard style={{ fontSize: '20px', marginRight: '10px' }} />
          Dashboard
        </NavLink>
      </Link>
      
      <Link href="/hotels" passHref>
        <NavLink isActive={router.pathname === '/hotels'}>
          <FontAwesomeIcon icon={faHotel} size="lg" style={{ marginRight: '10px' }} />
          Liste des hôtels
        </NavLink>
      </Link>
      
      <ProfileContainer>
        <ProfileImage src="/images/client4.png" alt="User Profile" />
        <ProfileDetails>
          <ProfileName>{username}</ProfileName>
          <StatusContainer>
            <OnlineIndicator />
            <StatusText>En ligne</StatusText>
          </StatusContainer>
        </ProfileDetails>
      </ProfileContainer>
    </SidebarContainer>
  );
};

// Styles (inchangés)
const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-image: url('/images/imagedefond.jpg');
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto; /* Permet le défilement vertical si nécessaire */
  overflow-x: hidden; /* Empêche le défilement horizontal */
  z-index: 10;
`;


const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 160px;
  height: auto;
`;

const TitleContainer = styled.div`
  p {
    color: white; /* Texte en blanc */
    font-size: 13px;
    margin-bottom: 0px;
    font-family: "roboto";
    font-weight: 100;
    opacity: 0.8;
  }
`;


const NavLink = styled.a`
  color: white;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  text-decoration: none;  /* Supprime la ligne sous le lien */
  font-weight: 200;
  display: flex;
  align-items: center;
  margin: 5px 0;
  margin-left: 0px;
  padding: 5px;
  padding-left: 20px;
  border: 2px solid transparent;
  border-radius: 0px;
  transition: background-color 0.3s, border-color 0.3s;
  width: 115%;
  transform: translateX(-20px);

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #F0F0F0;
      color: black;
    `}

  &:hover {
    background-color: #F0F0F0;
    color: #000000;
  }

  &:focus {
    outline: none; /* Supprime l'effet de focus, mais si vous voulez un effet spécifique, vous pouvez personnaliser */
    color: white; /* Garantit que la couleur reste blanche lors du focus */
  }
`;


const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  margin-top: auto;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.span`
  font-size: 16px;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OnlineIndicator = styled.div`
  background-color: #28a745;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-right: 5px;
`;

const StatusText = styled.span`
  font-size: 12px;
`;

export default Sidebar;
