import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Hotels = () => {
  const router = useRouter();
  const [hotels, setHotels] = useState([]);
  // const [loading, setLoading] = useState(true); // Ajouter un état de chargement
  // // const [error, setError] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      console.log("Token récupéré :", token); 
      if (!token) {
        router.push('/login');
        return;
      }
  
      try {
        const response = await axiosInstance.get('/hotels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHotels(response.data);
      } catch (err) {
        console.error("Erreur Axios:", err);
        router.push('/login'); // Redirection si le token est invalide
      }
    };
  
    fetchHotels();
  }, [router]);
  
  return (
    <Container>
      <Sidebar />
      <Content>
        <NavbarContainer>
          <Navbar pageTitle="Liste des Hôtels" />
        </NavbarContainer>
        <HotelsHeader>
          <HotelsCount>
            Hôtels <span style={{ marginLeft: '20px', color: 'grey', opacity: 0.5}}>{hotels.length}</span>
          </HotelsCount>
          <CreateHotelButton onClick={() => router.push('/hotels/create')}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} /> {/* Ajoutez l'icône ici */}
            Créer un nouvel hôtel
          </CreateHotelButton>
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


// Styles
const Container = styled.div`
  display: flex;
  height: 100vh; 
  background-color: #E9E6E6FF;
`;

const HotelsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #ffffff;
  height: 80px;
  margin-top: -20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 0px;
  background-color: #E9E6E6FF;
  overflow-y: auto; 
  margin-left: 234px; 
  padding-top: 72px; 
`;


const HotelsCount = styled.h2`
  display: flex; 
  margin: 0;
  font-size: 22px;
  font-family: 'Roboto', sans-serif; 
  font-weight: 100; 
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  opacity: 0.7;
`;
const NavbarContainer = styled.div`
  margin-left: 250px; /* 
`;

const CreateHotelButton = styled.button`
  background-color: white;
  color: #000000;
  border: 1.5px solid #ddd;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  margin-right: 25px; /* Ajoute un espace à droite */

  &:hover {
    background-color: #f9f9f9;
    border-color: #ccc;
  }
`;


const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-left: 20px;
  margin-right: 20px; 
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
  height: 200px;
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
    font-family: 'Roboto', sans-serif; 
    font-weight: 400;
`;

const HotelName = styled.h2`
  margin: 5px 0;
  font-size: 22px;
    font-family: 'Roboto', sans-serif; 
    font-weight: 500; 
`;

const HotelPrice = styled.p`
  margin: 10px 0;
  font-size: 11px;
  color: #000;
    font-family: 'Roboto', sans-serif; 
    font-weight: 200; 
`;

export default Hotels;
