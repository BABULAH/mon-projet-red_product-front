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
          Entrez votre adresse e-mail ci-dessous et nous vous enverrons des instructions pour modifier votre mot de passe.
        </Description>
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Entrez votre adresse e-mail"
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
  border-radius: 8px;
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
  text-align: center;
  margin-bottom: 10px;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
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

const BackToLogin = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: white;
  a {
    color: #D3AD03FF;
    cursor: pointer;
    text-decoration: underline;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export default ForgotPassword;
