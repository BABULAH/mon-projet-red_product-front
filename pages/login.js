import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify'; // Importez ToastContainer et toast
import 'react-toastify/dist/ReactToastify.css'; // Importez les styles de Toastify

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
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Affiche un toast pour indiquer que la connexion est en cours
    const loadingToastId = toast.loading('Connexion en cours...');

    try {
      const response = await axiosInstance.post('/auth/login', 
        { email, password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, username } = response.data; // Assurez-vous que l'API renvoie le nom d'utilisateur

      if (token) {
        if (rememberMe) {
          localStorage.setItem('token', token); // Stocker le token si "Garder moi connecté" est coché
          localStorage.setItem('username', username); // Stocker le nom d'utilisateur
        } else {
          sessionStorage.setItem('token', token); // Stocker temporairement le token pour la session active
          sessionStorage.setItem('username', username); // Stocker temporairement le nom d'utilisateur
        }
        toast.dismiss(loadingToastId); // Dismiss le toast de chargement
        router.push('/dashboard'); // Rediriger vers le tableau de bord en cas de succès
      } else {
        setError('Erreur lors de la récupération du token');
      }
    } catch (err) {
      toast.dismiss(loadingToastId); // Dismiss le toast de chargement

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
        {error && <Error>{error}</Error>} {/* Afficher l'erreur en cas de problème */}
        <Button type="submit">Se connecter</Button>
      </Form>
      <LinksContainer>
        <ForgotPassword onClick={() => router.push('/ForgotPassword')}>
          Mot de passe oublié ?
        </ForgotPassword>
        <SignUpLink>
          Vous n avez pas de compte ? <a onClick={() => router.push('/register')}>S inscrire</a>
        </SignUpLink>
      </LinksContainer>
      <ToastContainer /> {/* Ajoutez le conteneur Toast ici */}
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
  height: 424.25px;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  font-size: 18.67px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
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
    font-weight: 500; /* Appliquer un poids très léger */
  color: white;
  border: none;
  cursor: pointer;
  font-size: 21.33px;
  border-radius: 5.33px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  width: 24px;
  Height: 24px;
`;

const Label = styled.label`
  font-size: 21.33px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
`;

const LinksContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ForgotPassword = styled.p`
  margin: 10px 0;
  font-size: 18.67px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 500; /* Appliquer un poids très léger */
  color: #FFD964;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpLink = styled.p`
  margin-top: 10px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 700; /* Appliquer un poids très léger */
  font-size: 18.67px;
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

export default Login;
