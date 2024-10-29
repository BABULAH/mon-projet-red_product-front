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

  useEffect(() => {
    // Si un token existe déjà dans le localStorage, redirige l'utilisateur vers le dashboard
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/auth/login', 
        { email, password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      const { token } = response.data;

      if (token) {
        if (rememberMe) {
          localStorage.setItem('token', token); // Stocker le token si "Garder moi connecté" est coché
        } else {
          sessionStorage.setItem('token', token); // Stocker temporairement le token pour la session active
        }
        router.push('/dashboard'); // Rediriger vers le tableau de bord en cas de succès
      } else {
        setError('Erreur lors de la récupération du token');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data); // Affiche la réponse d'erreur de l'API
        setError(err.response.data.message || 'Identifiants incorrects');
      } else {
        setError('Erreur réseau');
      }
    }
  };

  return (
    <Container>
      <Logo src={logoUrl} alt="Logo" />
      <Form onSubmit={handleSubmit}>
        <Title>Connexion</Title>
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
        {error && <Error>{error}</Error>} {/* Afficher l'erreur en cas de problème */}
        <Button type="submit">Connexion</Button>
      </Form>
      <LinksContainer>
        <ForgotPassword onClick={() => router.push('/ForgotPassword')}>
          Mot de passe oublié ?
        </ForgotPassword>
        <SignUpLink>
          Vous n'avez pas de compte ? <a onClick={() => router.push('/register')}>S'inscrire</a>
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
  background-color: #474646FF;
`;

const Logo = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  margin: 20px 0;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #474646FF;
  outline: none;
  &:focus {
    border-bottom: 1px solid #474646FF;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #474646FF;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const LinksContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ForgotPassword = styled.p`
  margin: 10px 0;
  font-size: 14px;
  color: #D3AD03FF;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpLink = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: white;

  a {
    color: #D3AD03FF;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
`;

export default Login;
