import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
    Flex,
    Spacer,
    Image,
    Button,
    Heading
} from "@chakra-ui/react"
import { DownloadIcon } from '@chakra-ui/icons'

import actlogo from '../../resources/img/actlogo1.png'
import AuthContext from '../../store/auth';

const Navbar = () => {

    const authCtx = useContext(AuthContext);
    const authToken = 'Token ' + authCtx.token;
    const isLoggedIn = authCtx.isLoggedIn;
    
    const logoutHandler = () => {
        if (isLoggedIn) authCtx.logout();
    }

    // const exportToCSV = () => {
    //     fetch('https://act-grants-crm.herokuapp.com/donation/export_to_csv/false',
    //             {   
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': authToken
    //                 }
    //             }
    //         ).then(response => 
    //             response.json().then(data => ({
    //                 data: data,
    //                 status: response.status
    //             })
    //         ).then(res => {
    //             if(res.data){
    //                 console.log(res.data)
    //             } else {
    //                 alert("ERROR RETRIEVING CONTENT.");
    //             }
    //         }))
    // }

    return(
        <div>
            <Flex 
                paddingTop="25px"
                paddingLeft="2.5vw"
                paddingRight="2.5vw"
                alignItems="center"
            >
            
                <Image 
                    boxSize={["30px", "30px", "50px", "50px", "50px"]}
                    src={actlogo}
                />
            <Link to="/">
                <Heading
                    fontSize={["20px", "20px", "24px", "32px", "32px"]}
                    paddingLeft={["0.5vw", "0.5vw", "0.5vw", "1vw", "1vw"]}
                    color="grey.700"
                >ACT Dashboard</Heading>
            </Link>
                <Spacer />
                { isLoggedIn ? 
                <>
                    <DownloadIcon 
                        onClick={()=>window.print()} 
                        w={6} 
                        h={6} 
                        mr="25px"
                        color="grey.500"
                        cursor="pointer"
                    />
                    <Button
                        fontSize={["20px", "20px", "24px", "24px", "24px"]}
                        padding={["14px", "14px", "24px", "24px", "24px"]}
                        color="grey.700"
                        onClick={logoutHandler}
                    >
                        Logout
                    </Button> 
                </>: null }
            </Flex>
        </div>
    )
};

export default Navbar;