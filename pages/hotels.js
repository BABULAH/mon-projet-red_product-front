// pages/hotels.js

import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; 

const Hotels = () => {
  const router = useRouter();
  const [hotels, setHotels] = useState([]); // État pour stocker les hôtels
  const [error, setError] = useState(''); // État pour gérer les erreurs

  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      console.log("Token récupéré :", token); // Vérifiez si le token est bien récupéré ici
  
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
      <Sidebar />
      <Content>
        <NavbarContainer>
          <Navbar pageTitle="Liste des Hôtels" />
        </NavbarContainer>
        
        {/* Section Hôtels et Bouton */}
        <HotelsHeader>
        <HotelsCount>
          Hôtels <span style={{ marginLeft: '20px', color: 'grey' }}>{hotels.length}</span>
        </HotelsCount>



          <CreateHotelButton onClick={() => router.push('/hotels/create')}>
            + Créer un nouvel hôtel
          </CreateHotelButton>
        </HotelsHeader>

        <HotelsGrid>
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id}> {/* Utilisez l'identifiant unique de l'hôtel */}
              <HotelImage src={hotel.image || '/default-image.jpg'} alt={hotel.name} /> {/* Assurez-vous d'avoir une image par défaut */}
              <HotelInfo>
                <HotelAddress>{hotel.address}</HotelAddress>
                <HotelName>{hotel.name}</HotelName>
                <HotelPrice>{hotel.pricePerNight} {hotel.currency?.name} par nuit</HotelPrice> {/* Afficher la devise si elle est disponible */}
              </HotelInfo>
            </HotelCard>
          ))}
        </HotelsGrid>
      </Content>
    </Container>
  );
};

// Styles
const Container = styled.div`
  display: flex;
  height: 100vh; /* Prend toute la hauteur de la vue */
  background-color: #E9E6E6FF;
`;

const HotelsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #ffffff;
  height: 80px;
`;

const Content = styled.div`
  flex: 1; /* Prend l'espace restant après la sidebar */
  padding: 0px;
  background-color: #E9E6E6FF;
  overflow-y: auto; /* Ajoute un défilement si le contenu dépasse la hauteur */
  margin-left: 234px; /* Ajustez pour laisser de l'espace pour le sidebar */
  padding-top: 72px; /* Laisse de l'espace en haut pour le navbar */
`;


const HotelsCount = styled.h2`
  display: flex; /* Utiliser Flexbox pour aligner le contenu */
  margin: 0;
  font-size: 24px;
  font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
  font-weight: 300; /* Appliquer un poids très léger */
  font-family: 'Roboto', sans-serif;
  padding: 20px;
`;
const NavbarContainer = styled.div`
  margin-left: 250px; /* 
`;

const CreateHotelButton = styled.button`
  background-color: white;
  color: #000000;
  border: 2px solid #ddd;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f9f9f9;
    border-color: #ccc;
  }
`;

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-left: 20px; /* Diminuer la marge à gauche (ajustez selon vos besoins) */
  margin-right: 20px; /* Augmenter la marge à droite (ajustez selon vos besoins) */
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
  color: #8D4B38;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
`;

const HotelName = styled.h2`
  margin: 5px 0;
  font-size: 22px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 500; /* Appliquer un poids très léger */
`;

const HotelPrice = styled.p`
  margin: 5px 0;
  font-size: 12px;
  color: #000;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
`;

export default Hotels;
