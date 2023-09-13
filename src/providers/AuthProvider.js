// import React, { useState, useEffect, useMemo } from 'react';

// export const AuthContext = React.createContext({ isAuth: false });

// export const AuthProvider = ({ children }) => {
//   const [isAuth, setIsAuth] = useState(false);

//   const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth]);

//   let storageListener = window.addEventListener('storage', () => {
//     //что-то делаем когда меняется local storage
//   });

//   console.log(isAuth);
//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       setIsAuth(true);
//       localStorage.setItem('isAuth', 'true');
//     } else {
//       setIsAuth(false);
//       localStorage.removeItem('isAuth');
//     }
//   }, [storageListener]);

//   useEffect(() => {}, []);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
