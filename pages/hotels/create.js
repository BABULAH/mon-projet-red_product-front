import styled from 'styled-components';
// import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import axiosInstance from '../../utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';


const CreateHotel = () => {
  const router = useRouter(); // Initialize useRouter
  const [hotel, setHotel] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    price: '',
    currency: 'EUR', // Default currency
    image: null,
  });

  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch currencies on page load
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axiosInstance.get(`/currency`);
        if (response.data) {
          setCurrencies(response.data);
        }
      } catch (err) {
        console.error('Error fetching currencies', err);
        setError('Unable to retrieve currencies.');
      }
    };
    fetchCurrencies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setHotel({ ...hotel, image: file });
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result); // Update state with the image preview
      };
      reader.readAsDataURL(file);
    }
  };

const [previewImage, setPreviewImage] = useState(null);

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
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        router.push('/hotels'); // Redirect to the hotel listing page
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg 
        ? err.response.data.msg 
        : 'An error occurred while adding the hotel.';
      setError(errorMessage);
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        {/* <Navbar pageTitle="Create a New Hotel" /> */}

        <FormContainer onSubmit={handleSubmit}>
          {/* Bouton pour revenir à la liste des hôtels */}
          <BackButton onClick={() => router.push('/hotels')}>
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
            Créer un nouveau hôtel  
          </BackButton>

          <StyledHr />

          <FormRow>
            <FormGroup>
              <Label htmlFor="name">Nom de l hôtel </Label>
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
              <Label htmlFor="phone">Numéro de téléphone </Label>
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
                {currencies.map((currency) => (
                  <option key={currency._id} value={currency.name}>
                    {currency.name}
                  </option>
                ))}
              </CurrencySelect>
            </FormGroup>
          </FormRow>
          
          <FormGroup center>
            <Label htmlFor="image">Ajouter une photo</Label>
            <ImageInputWrapper>
              <ImageInput
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {!previewImage ? (
                <ImageIcon>
                  <FontAwesomeIcon icon={faImage} size="4x" />
                  <p>Ajouter une photo</p>
                </ImageIcon>
              ) : (
                <PreviewImage src={previewImage} alt="Selected Image" />
              )}
            </ImageInputWrapper>
          </FormGroup>

          <ButtonContainer>
            <SubmitButton type="submit">Enregistrer </SubmitButton>
          </ButtonContainer>

          {error && <Error>{error}</Error>}
          {success && <SuccessMessage>Hotel added successfully!</SuccessMessage>}
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
  padding-top: -40px; /* Laisse de l'espace en haut pour le navbar */
  margin-left: 230px; /* Ajustez pour laisser de l'espace pour le sidebar */
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f7f7f7;
`;

const BackButton = styled.button`
  display: flex;
    font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
    font-weight: 700; /* Appliquer un poids très léger */
  align-items: center;
  background-color: #ffffff; /* Couleur du bouton */
  color: #000000;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 21.74px;
  cursor: pointer;
  margin-bottom: 20px; /* Espace sous le bouton */
  margin-left: 50px; 

  &:hover {
    background-color: #ffffff; /* Couleur au survol */
  }
`;

const StyledHr = styled.hr`
  border: none;
  border-top: 2px dashed #ddd;
  margin: 20px 20px; /* 20px en haut/bas et 20px à gauche/droite */
  width: calc(100% - 40px); /* Réduire la largeur de 40px pour respecter la marge gauche et droite */
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
  margin-bottom: 30px; /* Augmenter l'espace entre les lignes */
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
  margin-left: 60px;
  font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
  font-weight: 500; /* Appliquer un poids très léger */
  font-size: 14px;
  color: #464545FF
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 14px;
  font-size: 18.53px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`;



const CurrencySelect = styled.select`
  width: 320px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 14px;
  font-size: 16px;
  outline: none;
  margin-bottom: 8px;
  margin-left: 0px;
  font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
  font-weight: 500; /* Appliquer un poids très léger */
  font-size: 14px;
  color: #464545FF

  &:focus {
    border-color: #4caf50;
  }
`;

// const ImageInput = styled(Input)`
//   height: 150px; /* Augmenter la hauteur du champ d'image */
//   margin-left: 5px;
// `;

const ImageInputWrapper = styled.div`
  position: relative;
  width: 660px;
  height: 150px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  margin-left: 60px;

  &:hover {
    border-color: #4caf50;
  }
`;

const ImageInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ImageIcon = styled.div`
  display: flex;
  flex-direction: column; /* Aligne les éléments en colonne */
  align-items: center;    /* Centre les éléments horizontalement */
  justify-content: center; /* Centre les éléments verticalement */
  font-size: 14px;
  color: #555;
  
  p {
    margin-top: 8px; /* Espace entre l'icône et le texte */
    font-weight: bold;
    font-size: 16px; /* Ajuste la taille du texte */
  }
`;


const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Aligner le bouton à droite */
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #555555;
  color: white;
  font-family: 'Roboto', sans-serif; /* Appliquer la police Roboto */
  font-weight: 500; /* Appliquer un poids très léger */
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
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
