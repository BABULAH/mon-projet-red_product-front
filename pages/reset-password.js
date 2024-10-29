import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query; // Récupérer le token des paramètres de l'URL
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/auth/reset-password`, { token, newPassword });
            setSuccess(response.data.message);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.");
            setSuccess(null);
        }
    };

    return (
        <Container>
            <Title>Réinitialiser votre mot de passe</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Button type="submit">Réinitialiser</Button>
            </Form>
            {error && <Message error>{error}</Message>}
            {success && <Message>{success}</Message>}
            <BackToLogin onClick={() => router.push('/login')}>Retour à la connexion</BackToLogin>
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
    background-color: #f4f4f4; /* Couleur de fond */
`;

const Title = styled.h1`
    margin-bottom: 20px;
    font-size: 24px;
    color: #474646FF; /* Couleur de texte */
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    background-color: white; /* Fond blanc pour le formulaire */
    padding: 20px;
    border-radius: 8px; /* Coins arrondis */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    margin: 10px 0; /* Espace entre les champs */
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc; /* Bordure légère */
    border-radius: 4px; /* Coins arrondis */
    outline: none; /* Supprime le contour par défaut */
    
    &:focus {
        border-color: #474646FF; /* Couleur de la bordure lors de la sélection */
    }
`;

const Button = styled.button`
    padding: 10px;
    background-color: #474646FF; /* Couleur du bouton */
    color: white;
    border: none;
    border-radius: 4px; /* Coins arrondis */
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #383838FF; /* Couleur au survol */
    }
`;


const Message = styled.p`
    margin-top: 10px;
    color: ${({ error }) => (error ? 'red' : 'green')}; /* Rouge pour l'erreur, vert pour le succès */
`;

const BackToLogin = styled.button`
    margin-top: 20px;
    background: none;
    border: none;
    color: #D3AD03FF;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
        text-decoration: none; /* Enlève le soulignement au survol */
    }
`;

export default ResetPassword;
