import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faEnvelope, faUsers, faHotel, faBuilding, faComments } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Indiquer que nous sommes côté client
    
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log("Token récupéré :", token);
    
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  if (!isClient) {
    return null; // Ne pas rendre côté serveur
  }

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Navbar pageTitle="Dashboard" />

        <WelcomeSection>
          <h2>Bienvenue sur RED Product</h2>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </WelcomeSection>

        <SectionGrid>
          <Section>
            <IconText>
              <IconCircle color="#A88ADD">
                <FontAwesomeIcon icon={faFileAlt} size="lg" style={{ color: 'white' }}/>
              </IconCircle>
              <TextContainer>
                <div className="header">
                  <h2>125</h2>
                  <h3>Formulaires</h3>
                </div>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>

          <Section>
            <IconText>
              <IconCircle color="#0CC2AA">
                <FontAwesomeIcon icon={faComments} size="lg" style={{ color: 'white' }}/>
              </IconCircle>
              <TextContainer>
                <div className="header">
                  <h2>40</h2>
                  <h3>Massages</h3>
                </div>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>

          <Section>
            <IconText>
              <IconCircle color="#FCC100">
              <FontAwesomeIcon icon={faUsers} size="lg" style={{ color: 'white' }} />

              </IconCircle>
              <TextContainer>
                <div className="header">
                  <h2>600</h2>
                  <h3>Utilisateurs</h3>
                </div>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>

          <Section>
            <IconText>
              <IconCircle color="#F90000">
                <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ color: 'white' }}/>
              </IconCircle>
              <TextContainer>
                <div className="header">
                  <h2>25</h2>
                  <h3>E-mails</h3>
                </div>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>

          <Section>
            <IconText>
              <IconCircle color="#9C27B0">
                <FontAwesomeIcon icon={faHotel} size="lg" style={{ color: 'white' }}/>
              </IconCircle>
              <TextContainer>
                <div className="header">
                  <h2>40</h2>
                  <h3>Hôtels</h3>
                </div>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>

          <Section>
            <IconText>
              <IconCircle color="#1565C0">
                <FontAwesomeIcon icon={faBuilding} size="lg" style={{ color: 'white' }}/>
              </IconCircle>
              <TextContainer>
                <div className="header">
                  <h2>02</h2>
                  <h3>Entités</h3>
                </div>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>
        </SectionGrid>
      </MainContent>
    </Container>
  );
};



// Styles
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #F0F0F0; /* Gris clair pour le fond du tableau de bord */
  padding-top: 53px; /* Laisse de l'espace en haut pour le navbar */
`;

const MainContent = styled.div`
  flex: 1;
  padding: 0 0px 0px 230px; /* Supprime la marge supérieure et ajuste les autres */
  background-color: #E9E6E6FF;
  padding-top:40ps;
`;

const WelcomeSection = styled.div`
  margin: 0; /* Enlève la marge supérieure */
  padding: 8px;
  background-color: #fff;

h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #252525DE;
  font-family: 'Open Sans', sans-serif; /* Police légère */
  font-weight: 100; /* Poids très léger */
  padding-left: 10px; /* Espace à gauche */
  opacity: 0.9;
}


  p {
    margin: 0;
    font-size: 12px;
    color: #252525DE;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 100; /* Appliquer un poids très léger */
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Ajoute un flou léger */
    padding-left: 10px; /* Augmente l'espace à gauche */
  }
`;







// Style pour les sections avec icônes et textes
const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colonnes */
  gap: 20px; /* Espacement entre les sections */
  margin-top: 10px;
  padding: 20px;
`;

const Section = styled.div`
  background-color: #fff; /* Fond blanc pour les sections */
  padding: 10px;
  border-radius: 14px;
  display: flex;
  align-items: center;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
`;

// Style pour le cercle autour des icônes
const IconCircle = styled.div`
  background-color: ${(props) => props.color}; /* Couleur du cercle basée sur la prop */
  border-radius: 50%; /* Cercle parfait */
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

const TextContainer = styled.div`
  display: flex; /* Utiliser Flexbox pour aligner h2 et h3 */
  flex-direction: column; /* Disposer les éléments en colonne */
  
  .header {
    display: flex; /* Flex pour aligner h2 et h3 sur la même ligne */
    align-items: center; /* Centrer verticalement h2 et h3 */
  }

  h2 {
    margin: 0; /* Enlève la marge par défaut */
    font-size: 24px; /* Ajustez la taille de police si nécessaire */
    color: #2E2E2EDE; /* Couleur du texte */
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 100; /* Appliquer un poids très léger */
    margin-right: 10px; /* Espace entre h2 et h3 */
  }

  h3 {
    margin: 0; /* Enlève la marge par défaut */
    font-size: 13px; /* Ajustez la taille de police si nécessaire */
    color: #504E4EDE; /* Couleur du texte */
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 100; /* Appliquer un poids très léger */
  }

  p {
    margin-top: 5px; /* Espace au-dessus du paragraphe */
    font-size: 12px; /* Ajustez la taille de police si nécessaire */
    color: #504E4EDE; /* Couleur du texte */
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 100; /* Appliquer un poids très léger */
    margin-left: 0; /* Assurez-vous qu'il n'y a pas d'espace à gauche */
  }
`;





export default Dashboard;
