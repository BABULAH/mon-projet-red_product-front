// components/Sidebar.js

import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faHotel } from '@fortawesome/free-solid-svg-icons';

const logoUrl = '/images/rep_prod_logo.jpg'; 

const Sidebar = () => {
  const router = useRouter();

  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo src={logoUrl} alt="Logo" />
        <LogoText>RED PRODUCT</LogoText>
      </LogoContainer>
      <NavLink onClick={() => router.push('/dashboard')}>
        <FontAwesomeIcon icon={faTachometerAlt} size="lg" style={{ marginRight: '10px' }} />
        Dashboard
      </NavLink>
      <NavLink onClick={() => router.push('/hotels')}>
        <FontAwesomeIcon icon={faHotel} size="lg" style={{ marginRight: '10px' }} />
        Liste des hôtels
      </NavLink>
      <ProfileContainer>
        <ProfileImage src="/images/client4.png" alt="User Profile" />
        <ProfileName>Mor Talla Kebe</ProfileName>
      </ProfileContainer>
    </SidebarContainer>
  );
};

// Styles
const SidebarContainer = styled.div`
  position: fixed; /* Rend le sidebar fixe */
  top: 0; /* Positionne le sidebar en haut */
  left: 0; /* Positionne le sidebar à gauche */
  width: 200px; /* Largeur fixe du sidebar */
  height: 100%; /* Prendre toute la hauteur disponible */
  background-color: #4a4a4a; /* Fond gris foncé pour le sidebar */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Espace entre le contenu et le bas */
  overflow-y: auto; /* Ajoute un défilement si le contenu dépasse la hauteur */
  z-index: 10; /* Positionne le sidebar au-dessus des autres éléments */
`;


const LogoContainer = styled.div`
  display: flex;
  align-items: center; /* Centre le logo et le texte verticalement */
  margin-bottom: 20px; /* Espace entre le logo et les liens */
`;

const Logo = styled.img`
  width: 30px; /* Ajustez selon la taille de votre logo */
  height: auto;
`;

const LogoText = styled.span`
  color: white; /* Couleur du texte */
  margin-left: 10px; /* Espace entre le logo et le texte */
  font-size: 23px; /* Taille de la police */
`;

const NavLink = styled.p`
  color: white; /* Couleur du texte des liens */
  cursor: pointer;
  display: flex; /* Pour aligner l'icône et le texte horizontalement */
  align-items: center; /* Aligne l'icône avec le texte */
  margin: 10px 0;
  padding: 10px; /* Ajoute de l'espace intérieur */
  border: 2px solid transparent; /* Contour transparent par défaut */
  border-radius: 5px; /* Coins arrondis */
  transition: background-color 0.3s, border-color 0.3s;
  width: 200px;

  &:hover {
    background-color: #d3d3d3; /* Couleur de fond au survol */
    border-color: #E9E6E6FF; /* Couleur du contour au survol */
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  color: white; /* Couleur du texte du profil */
  margin-top: auto; /* Pousse le profil vers le bas du sidebar */
  margin-bottom: 20px; /* Ajustez selon vos besoins */
`;

const ProfileImage = styled.img`
  width: 40px; /* Ajustez la taille de l'image du profil */
  height: 40px;
  border-radius: 50%; /* Arrondi pour donner un effet circulaire */
  margin-right: 10px; /* Espace entre l'image et le nom */
`;

const ProfileName = styled.span`
  font-size: 16px;
`;

export default Sidebar;
