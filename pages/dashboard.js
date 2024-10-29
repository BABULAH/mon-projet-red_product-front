// pages/dashboard.js

import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faEnvelope, faUsers, faHotel, faBuilding, faComments } from '@fortawesome/free-solid-svg-icons'; // Importation des icônes

const Dashboard = () => {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Navbar pageTitle="Dashboard" />

        <WelcomeSection>
          <h2>Bienvenue sur RED Product</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </WelcomeSection>

        {/* Sections avec icônes entourées de cercles et textes */}
        <SectionGrid>
          <Section>
            <IconText>
              <IconCircle color="#ff6f61"> {/* Cercle rouge clair pour l'icône */}
                <FontAwesomeIcon icon={faFileAlt} size="lg" />
              </IconCircle>
              <TextContainer>
                <h3>125 Formulaires</h3>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>

          <Section>
            <IconText>
              <IconCircle color="#6fcf97"> {/* Cercle vert clair */}
                <FontAwesomeIcon icon={faComments} size="lg" />
              </IconCircle>
              <TextContainer>
                <h3>40 Messages</h3>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>

          <Section>
            <IconText>
              <IconCircle color="#56ccf2"> {/* Cercle bleu clair */}
                <FontAwesomeIcon icon={faUsers} size="lg" />
              </IconCircle>
              <TextContainer>
                <h3>600 Utilisateurs</h3>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>

          <Section>
            <IconText>
              <IconCircle color="#f2c94c"> {/* Cercle jaune */}
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </IconCircle>
              <TextContainer>
                <h3>25 E-mails</h3>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>

          <Section>
            <IconText>
              <IconCircle color="#bb6bd9"> {/* Cercle violet */}
                <FontAwesomeIcon icon={faHotel} size="lg" />
              </IconCircle>
              <TextContainer>
                <h3>40 Hôtels</h3>
                <p>Je ne sais pas quoi mettre</p>
              </TextContainer>
            </IconText>
          </Section>

          <Section>
            <IconText>
              <IconCircle color="#f2994a"> {/* Cercle orange */}
                <FontAwesomeIcon icon={faBuilding} size="lg" />
              </IconCircle>
              <TextContainer>
                <h3>02 Entités</h3>
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
  background-color: #999898FF; /* Gris clair pour le fond du tableau de bord */
  padding-top: 72px; /* Laisse de l'espace en haut pour le navbar */
`;

const MainContent = styled.div`
  flex: 1;
  padding: 0 0px 0px 230px; /* Supprime la marge supérieure et ajuste les autres */
  background-color: #E9E6E6FF;
  padding-top:40ps;
`;

const WelcomeSection = styled.div`
  margin: 0; /* Enlève la marge supérieure */
  padding: 10px;
  background-color: #fff;

  h2 {
    margin: 0 0 10px 0;
    font-size: 24px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #555;
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
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Légère ombre pour les sections */
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
  h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 5px 0 0 0;
    font-size: 14px;
    color: #666;
  }
`;

export default Dashboard;
