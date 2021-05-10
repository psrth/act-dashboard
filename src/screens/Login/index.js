import React, { Fragment, useState, useRef, useContext } from 'react'
import { 
    Button, 
    Flex, 
    Box,
    FormControl,
    FormLabel,
    Input,
    Text,
    FormHelperText,
    Select,
    Option,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import AuthContext from '../../store/auth';


const Login = () => {

    const authCtx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLogin, setIsLogin] = useState(true);


    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        fetch('https://act-grants-crm.herokuapp.com/rest-auth/login/',
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        username: enteredEmail,
                        password: enteredPassword
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if(res.ok) {
                const data = res.json();
                authCtx.login("9611e98cb7f2740ab40cf267611c40f705b2cebd");
            } else {
                alert("Authentication failed. Please try again.");
            }
        })
    }

    return(
        <Fragment>
            <Flex 
                margin="auto" 
                marginTop="50px" 
                justifyContent="center" 
                alignItems="center">
            
                <Box 
                    width="550px"
                    padding="50px"
                    borderRadius="5px"
                    border="5"
                    borderColor="grey.20">

                        <FormControl id="email">
                            <FormLabel fontWeight="medium" fontSize="24px" color="grey.700">Email address</FormLabel>
                            <Input type="email" ref={emailInputRef} />
                            <FormHelperText fontSize="18px" >Enter the email to login to ACT Corporate Dashboard.</FormHelperText>
                        </FormControl>
            
                        <Text marginTop="25px" fontWeight="medium" fontSize="24px" color="grey.700" mb="8px">Enter your password:</Text>

                        <InputGroup size="lg">
                            <Input
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                                ref={passwordInputRef}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <Button
                            color="grey.700"
                            onClick={submitHandler}
                            marginTop="30px"
                            padding="24px"
                            fontSize="22px"
                        >Login</Button>

                </Box>
            </Flex>
        </Fragment>
    )
}

export default Login;