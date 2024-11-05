import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const logoUrl = '/images/logo.jpg';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Requête pour envoyer l'email au backend
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      console.log(response.data);
      setSuccess('Un lien de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.');
      setError(null);

      // Redirection après 3 secondes vers la page de connexion
      setTimeout(() => router.push('/login'), 5000);
    } catch (error) {
      setError(error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.");
      setSuccess(null);
    }
  };

  return (
    <Container>
      <Logo src={logoUrl} alt="Logo" />
      <Form onSubmit={handleSubmit}>
        <Title>Mot de passe oublié</Title>
        <Description>
          Entrez votre adresse e-mail ci-dessous et nous vous envoyons des instructions sur la façon de modifier votre mot de passe.
        </Description>
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Label htmlFor="email">Votre e-mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Envoyer</Button>
      </Form>
      <BackToLogin>
        Revenir à la <a onClick={() => router.push('/login')}>connexion</a>
      </BackToLogin>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 20px;
  display: block;
  align-self: center;
`;

const Title = styled.h1`
  margin-bottom: 10px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
    font-size: 18.67px;
`;

const Description = styled.p`
  margin-bottom: 20px;
  font-size: 15px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
  color: #333;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 15.87px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: #948F8FFF;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
  margin-bottom: 8px;
  display: block;
`;


const Input = styled.input`
  margin: 30px 0;
  padding: 0px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #E9E7E7FF;
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
  border-radius: 5.33px;
`;

const BackToLogin = styled.p`
  margin-top: 10px;
  font-size: 18.67px;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 400; /* Appliquer un poids très léger */
  color: white;
  a {
    color: #FFD964;
    cursor: pointer;
    text-decoration: underline;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export default ForgotPassword;
