import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
    Flex,
    Spacer,
    Image,
    Text,
    Button,
    Heading
} from "@chakra-ui/react"

import actlogo from '../../resources/img/actlogo1.png'
import AuthContext from '../../store/auth';

const Navbar = () => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    
    const logoutHandler = () => {
        if (isLoggedIn) authCtx.logout();
    }

    return(
        <div>
            <Flex 
                paddingTop="2vw"
                paddingLeft="2.5vw"
                paddingRight="2.5vw"
                alignItems="center"
            >
            
                <Image 
                    boxSize="50px"
                    src={actlogo}
                    alt="Segun Adebayo"
                />
            <Link to="/">
                <Heading
                    fontSize="32px"
                    paddingLeft="1vw"
                    color="grey.700"
                >ACT Dashboard</Heading>
            </Link>
                <Spacer />
                { isLoggedIn ? 
                <Link to="/dashboard">
                    <Text
                        fontSize="24px"
                        paddingRight="3vw"
                        fontWeight="medium"
                        color="grey.700"
                    >Dashboard</Text>
                </Link> : null }
            <Link to="/login">
                <Button
                    fontSize="24px"
                    padding="24px"
                    marginRight="1.5vw"
                    color="grey.700"
                    onClick={logoutHandler}
                >
                    {isLoggedIn ? 'Logout' : 'Login'}
                </Button>
            </Link>
            </Flex>
        </div>
    )
};

export default Navbar;