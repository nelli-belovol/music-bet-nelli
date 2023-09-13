import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAuthContext = () => {
  const value = useContext(AuthContext);
  return value;
};

export default useAuthContext;
