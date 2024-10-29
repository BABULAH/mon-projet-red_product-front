import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); // Rediriger si aucun token n'est trouvé
      }
    }, []);
    
    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
