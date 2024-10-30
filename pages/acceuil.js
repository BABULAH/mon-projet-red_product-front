import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Hotels = () => {
  const router = useRouter();
  const [hotels, setHotels] = useState([]); // État pour stocker les hôtels
  const [error, setError] = useState(''); // État pour gérer les erreurs

  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      console.log("Token récupéré :", token);
  
      if (!token) {
        router.push('/login');
        return;
      }
  
      try {
        const response = await axiosInstance.get('/hotels');
        setHotels(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des hôtels');
        console.error("Erreur Axios:", err);
      }
    };
  
    fetchHotels();
  }, [router]);
  
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Navbar />
      <Content>
        <HotelsHeader>
          <HotelsCount>Hôtels {hotels.length}</HotelsCount>
        </HotelsHeader>

        <HotelsGrid>
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id}>
              <HotelImage src={hotel.image || '/default-image.jpg'} alt={hotel.name} />
              <HotelInfo>
                <HotelAddress>{hotel.address}</HotelAddress>
                <HotelName>{hotel.name}</HotelName>
                <HotelPrice>{hotel.pricePerNight} {hotel.currency?.name} par nuit</HotelPrice>
              </HotelInfo>
            </HotelCard>
          ))}
        </HotelsGrid>
      </Content>
    </Container>
  );
};

// Composant Navbar
const Navbar = () => {
    return (
      <NavbarContainer>
        <SearchBar placeholder="Rechercher un hôtel..." />
        <ProfileContainer>
          <ProfileImage src="/path-to-profile-image.jpg" alt="Profile" />
          <LogoutIcon onClick={() => alert("Déconnexion")}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </LogoutIcon>
        </ProfileContainer>
      </NavbarContainer>
    );
  };


// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column; /* Modifié pour permettre au contenu de s'empiler verticalement */
  height: 100vh; /* Prend toute la hauteur de la vue */
  background-color: #E9E6E6FF;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #ffffff;
  height: 60px;
  width: 100%; /* Prend toute la largeur de l'écran */
  position: fixed; /* Fixe la navbar en haut de la page */
  top: 0; /* Positionne la navbar en haut */
  left: 0; /* Assure que la navbar commence à gauche */
  z-index: 1000; /* Assure que la navbar soit au-dessus d'autres éléments */
`;

const SearchBar = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const LogoutIcon = styled.span`
  cursor: pointer;
  font-size: 24px;
  margin: 40px;
`;

const Content = styled.div`
  flex: 1; /* Prend l'espace restant */
  padding: 0px;
  background-color: #E9E6E6FF;
  overflow-y: auto; /* Ajoute un défilement si le contenu dépasse la hauteur */
  margin-top: 60px; /* Laisse de l'espace pour la navbar fixe en haut */
`;

const HotelsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #ffffff;
  height: 80px;
`;

const HotelsCount = styled.h2`
  margin: 0;
  font-size: 24px;
`;

// const CreateHotelButton = styled.button`
//   background-color: white;
//   color: #000000;
//   border: 2px solid #ddd;
//   padding: 10px 20px;
//   border-radius: 10px;
//   cursor: pointer;
//   font-size: 16px;

//   &:hover {
//     background-color: #f9f9f9;
//     border-color: #ccc;
//   }
// `;

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px; /* Marge autour de la grille des hôtels */
`;

const HotelCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  text-align: center;
`;

const HotelImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const HotelInfo = styled.div`
  padding: 10px;
  text-align: left; 
`;

const HotelAddress = styled.p`
  margin: 5px 0;
  font-size: 12px;
  color: #555;
`;

const HotelName = styled.h2`
  margin: 5px 0;
  font-size: 18px;
`;

const HotelPrice = styled.p`
  margin: 5px 0;
  font-size: 12px;
  color: #000;
`;

export default Hotels;
