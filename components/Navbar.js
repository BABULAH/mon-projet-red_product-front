import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../utils/axiosInstance';

const Navbar = ({ pageTitle }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Appel à l'API de déconnexion
      await axiosInstance.post('/auth/logout');
      
      // Supprimer le token côté client (si stocké dans localStorage)
      localStorage.removeItem('token');

      // Redirection vers la page de connexion
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
          <FontAwesomeIcon icon={faBell} size="lg" style={{ marginRight: '20px', cursor: 'pointer' }} />
          <ProfileImage src="/images/client4.png" alt="User Profile" />
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
  left: 240px; /* Laisse de l'espace pour le sidebar */
  width: calc(98% - 250px); /* Prend toute la largeur restante */
  height: 60px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  z-index: 10; /* Assure que le navbar reste au-dessus du contenu */
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative; /* Nécessaire pour positionner l'icône à l'intérieur */
  margin: 0 20px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute; /* Positionne l'icône à l'intérieur du champ de recherche */
  left: 10px; /* Ajustez la position à gauche de l'icône */
  top: 50%; /* Centrer verticalement */
  transform: translateY(-50%); /* Ajuste pour centrer parfaitement */
  color: #888; /* Couleur de l'icône, ajustez selon vos préférences */
  pointer-events: none; /* Évite que l'icône interfère avec l'interaction de l'utilisateur */
`;

const SearchInput = styled.input`
  padding: 10px 10px 10px 40px; /* Ajoutez de l'espace à gauche pour l'icône */
  border: 1px solid #ccc;
  border-radius: 50px;
  outline: none;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default Navbar;
