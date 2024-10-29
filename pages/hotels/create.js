import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Assure-toi que le chemin est correct



const CreateHotel = () => {
  const [hotel, setHotel] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    price: '',
    currency: 'EUR', // Valeur par défaut
    image: null,
  });

  const [currencies, setCurrencies] = useState([]); // Stocker les devises
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  
  // Utiliser useEffect pour récupérer les devises au chargement de la page
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axiosInstance.get(`/currency`);
        console.log(response.data); // Vérifier les données
        if (response.data) {
          setCurrencies(response.data); // Stocker les devises récupérées
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des devises', err);
        setError('Impossible de récupérer les devises.');
      }
    };
  
    fetchCurrencies();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleImageUpload = (e) => {
    setHotel({ ...hotel, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', hotel.name);
    formData.append('address', hotel.address);
    formData.append('email', hotel.email);
    formData.append('phone', hotel.phone);
    formData.append('pricePerNight', hotel.price);
    formData.append('currency', hotel.currency);
    formData.append('image', hotel.image);

    try {
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/hotels`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        setHotel({
          name: '',
          address: '',
          email: '',
          phone: '',
          price: '',
          currency: 'EUR',
          image: null,
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg 
        ? err.response.data.msg 
        : 'Une erreur est survenue lors de l\'ajout de l\'hôtel.';
        
        
      setError(errorMessage);
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Navbar pageTitle="Créer un nouvel hôtel" />
        <FormContainer onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="name">Nom de l\'hôtel</Label>
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
              <CurrencySelect
                id="currency"
                name="currency"
                value={hotel.currency}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Sélectionnez une devise</option>
                {currencies.length > 0 ? (
                  currencies.map((currency) => (
                    <option key={currency._id} value={currency.name}>
                      {currency.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Aucune devise disponible</option>
                )}
              </CurrencySelect>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup center>
              <Label htmlFor="image">Ajouter une photo</Label>
              <ImageInput
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
            </FormGroup>
          </FormRow>

          <ButtonContainer>
            <SubmitButton type="submit">Créer l\'hôtel</SubmitButton>
          </ButtonContainer>

          {error && <Error>{error}</Error>}
          {success && <SuccessMessage>Hôtel ajouté avec succès !</SuccessMessage>}
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
  padding-top: 30px; /* Laisse de l'espace en haut pour le navbar */
  margin-left: 230px; /* Ajustez pour laisser de l'espace pour le sidebar */
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
  margin: 40px auto; /* Augmenter l'espace entre la navbar et le formulaire */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
  display: flex;
  justify-content: center; /* Centrer les champs horizontalement */
  margin-bottom: 50px; /* Augmenter l'espace entre les lignes */
`;

const FormGroup = styled.div`
  flex: 1;
  max-width: 300px; /* Limiter la largeur de chaque groupe de formulaire */
  margin: 0 20px; /* Augmenter l'espace entre les champs */

  ${({ center }) => center && `
    max-width: 640px; /* Diminuer la largeur du champ d'image */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Centrer le champ d'image */
  `}
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

const CurrencySelect = styled.select`
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

const ImageInput = styled(Input)`
  height: 150px; /* Augmenter la hauteur du champ d'image */
  margin-left: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Aligner le bouton à droite */
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #474646FF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 55px; /* Augmenter l'espace à droite du bouton */

  &:hover {
    background-color: #474646FF;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 20px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 20px;
`;

export default CreateHotel;
