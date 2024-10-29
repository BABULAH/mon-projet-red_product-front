// pages/hotels/create.js

import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar'; // Assurez-vous que le chemin est correct
import { useState } from 'react';

const CreateHotel = () => {
  // État pour gérer les champs de formulaire
  const [hotel, setHotel] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    price: '',
    currency: '',
    image: null,
  });

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  // Gérer le téléchargement de l'image
  const handleImageUpload = (e) => {
    setHotel({ ...hotel, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données de l'hôtel à l'API ou les traiter ici
    console.log(hotel);
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Navbar pageTitle="Créer un nouveau hôtel" />
        <FormContainer onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="name">Nom de l hôtel</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={hotel.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="address">Adresse</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={hotel.address}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={hotel.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={hotel.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="price">Prix par nuit</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={hotel.price}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="currency">Devise</Label>
              <Input
                type="text"
                id="currency"
                name="currency"
                value={hotel.currency}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="image">Ajouter une photo</Label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">Créer l hôtel</SubmitButton>
        </FormContainer>
      </Content>
    </Container>
  );
};

// Styles
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f7f7f7; /* Couleur de fond */
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f7f7f7;
`;

const FormContainer = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  flex: 1;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default CreateHotel;
