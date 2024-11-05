import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faHotel } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const logoUrl = '/images/rep_prod_logo.jpg';

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
        <LogoText>RED PRODUCT</LogoText>
      </LogoContainer>
      
      <NavLink
        isActive={router.pathname === '/dashboard'}
        onClick={() => router.push('/dashboard')}
      >
        <FontAwesomeIcon icon={faTachometerAlt} size="lg" style={{ marginRight: '10px' }} />
        Dashboard
      </NavLink>
      
      <NavLink
        isActive={router.pathname === '/hotels'}
        onClick={() => router.push('/hotels')}
      >
        <FontAwesomeIcon icon={faHotel} size="lg" style={{ marginRight: '10px' }} />
        Liste des hôtels
      </NavLink>
      
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
  background-color: #494C4F;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  z-index: 10;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 30px;
  height: auto;
`;

const LogoText = styled.span`
  color: white;
  margin-left: 10px;
  font-size: 23px;
`;

const NavLink = styled.p`
  color: white;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 0px;
  transition: background-color 0.3s, border-color 0.3s;
  width: 300px;
  transform: translateX(-20px);

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #d3d3d3;
      color: black;
    `}

  &:hover {
    background-color: #d3d3d3;
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
