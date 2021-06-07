import React, { useState } from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    domestic: true,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')

    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const [domestic, setDomestic]=useState(true);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    const domesticToggle = () => {
        domestic ? setDomestic(false) : setDomestic(true)
    }
    
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token', token);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        domesticToggle: domesticToggle,
        domestic: domestic
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;