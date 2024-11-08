import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const logoUrl = '/images/logo.jpg';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nouvel état pour gérer le chargement

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Démarre le chargement

    try {
      const response = await axiosInstance.post('/auth/login', 
        { email, password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, username } = response.data;

      if (token) {
        if (rememberMe) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
        } else {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('username', username);
        }
        router.push('/dashboard');
      } else {
        setError('Erreur lors de la récupération du token');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Identifiants incorrects');
      } else {
        setError('Erreur réseau');
      }
    } finally {
      setIsLoading(false); // Arrête le chargement
    }
  };

  return (
    <Container>
      <Logo src={logoUrl} alt="Logo" />
      <Form onSubmit={handleSubmit}>
        <Title>Connectez-vous en tant que Admin</Title>
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
            checked={rememberMe} 
            onChange={() => setRememberMe(!rememberMe)} 
          />
          <Label>Garder moi connecté</Label>
        </CheckboxContainer>
        {isLoading ? (
          <LoadingMessage>Connexion en cours...</LoadingMessage> // Message de chargement
        ) : (
          <Button type="submit">Se connecter</Button>
        )}
        {error && <Error>{error}</Error>}
      </Form>
      <LinksContainer>
        <ForgotPassword onClick={() => router.push('/ForgotPassword')}>
          Mot de passe oublié ?
        </ForgotPassword>
        <SignUpLink>
          Vous n avez pas de compte ? <a onClick={() => router.push('/register')}>S inscrire</a>
        </SignUpLink>
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
  background-image: url('/images/imagedefond.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin:-10px;
`;


const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 290.25px;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 200; /* Appliquer un poids très léger */
    font-size: 12.07px;
    margin-left: 10px;
    color: rgba(0, 0, 0, 0.87); /* Noir avec 87% d'opacité */
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 12.67px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 200; /* Appliquer un poids très léger */
  border: none;
  border-bottom: 1px solid #ECE3E3FF;
  outline: none;
  &:focus {
    border-bottom: 1px solid #ECE3E3FF;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #474646FF;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 200; /* Appliquer un poids très léger */
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16.33px;
  border-radius: 5.33px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  width: 16px;
  Height: 16px;
`;

const Label = styled.label`
  font-size: 13.33px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
`;

const LinksContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ForgotPassword = styled.p`
  margin: 5px 0;
  font-size: 12.67px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
  color: #FFD964;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpLink = styled.p`
  margin-top: 10px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 100; /* Appliquer un poids très léger */
  font-size: 13.67px;
  color: white;

  a {
    color: #FFD964;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
`;

const LoadingMessage = styled.p`
  color: #333;
  font-size: 14px;
  text-align: center;
`;

export default Login;
