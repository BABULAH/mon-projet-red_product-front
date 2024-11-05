import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const logoUrl = '/images/logo.jpg';

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); // Nouvel état pour gérer le chargement

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess(''); 

    if (!acceptTerms) {
      setError('Veuillez accepter les termes et conditions.');
      return;
    }

    toast.loading("Inscription en cours..."); // Affiche le toast de chargement
    setIsLoading(true); // Démarre le chargement

    try {
      const response = await axiosInstance.post('/auth/register', {
        username: name,
        email,
        password,
      });

      if (response.status === 200) {
        setSuccess('Compte créé avec succès !');
        setError('');
        toast.dismiss(); // Supprime le toast de chargement
        router.push('/login');
      }
    } catch (error) {
      toast.dismiss(); // Supprime le toast de chargement
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Erreur lors de l\'inscription, veuillez réessayer.');
      } else {
        setError('Erreur lors de l\'inscription, veuillez réessayer.');
      }
    } finally {
      setIsLoading(false); // Arrête le chargement
    }
  };

  return (
    <Container>
      <ToastContainer /> {/* Ajoute le conteneur de toasts */}
      <Logo src={logoUrl} alt="Logo" />
      <Form onSubmit={handleSubmit}>
        <Title>Inscrivez-vous en tant que Admin</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}  
        {success && <SuccessMessage>{success}</SuccessMessage>}  
        <Input 
          type="text" 
          placeholder="Nom" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <Input 
          type="password" 
          placeholder="Mot de passe" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <CheckboxContainer>
          <Checkbox 
            type="checkbox" 
            checked={acceptTerms} 
            onChange={() => setAcceptTerms(!acceptTerms)} 
            required 
          />
          <Label>Accepter les termes et la politique</Label>
        </CheckboxContainer>
        {isLoading ? (
          <LoadingMessage>Inscription en cours...</LoadingMessage> // Message de chargement
        ) : (
          <Button type="submit">S'inscrire</Button>
        )}
      </Form>
      <LinksContainer>
        <LoginLink>
          Déjà un compte ? <a onClick={() => router.push('/login')}>Se connecter</a>
        </LoginLink>
      </LinksContainer>
    </Container>
  );
};


// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #474646FF;
`;

const Logo = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 384px;
  height: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
    font-size: 17.07px;
`;

const Input = styled.input`
  margin: 20px 0;
  padding: 10px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
  font-size: 15.87px;
  border: none;
  border-bottom: 1px solid #DBD8D8FF;
  outline: none;

  &:focus {
    border-bottom: 1px solid #DBD8D8FF;
  }
`;

const Button = styled.button`
  padding: 10px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 500; /* Appliquer un poids très léger */
  background-color: #474646FF;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 21.33px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  width: 24px;
  height: 24px; /* Corrigé ici */
`;

const Label = styled.label`
  font-size: 18.67px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
`;

const LinksContainer = styled.div`
  margin-top: 10px;
  text-align: center;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
`;

const LoginLink = styled.p`
  font-size: 18.67px;
  color: white;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */

  a {
    color: #FFD964;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
`;


// Styles pour le message de chargement
const LoadingMessage = styled.p`
  color: #333;
  font-size: 14px;
  text-align: center;
`;

export default Register;
