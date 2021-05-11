import React, { 
    Fragment, 
    useState, 
    useRef, 
    useContext 
} from 'react'

import { 
    Button, 
    Flex, 
    Box,
    FormControl,
    FormLabel,
    Input,
    Text,
    FormHelperText,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth';


const Login = () => {

    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (enteredEmail && enteredPassword) {
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
            ).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                if(res.data.key){
                    authCtx.login(res.data.key);
                    console.log(res.data.key);
                    history.replace('/dashboard');
                } else {
                    alert("Authentication failed. Please try again.");
                }
            }))
        }
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
                            <FormLabel fontWeight="medium" fontSize="24px" color="grey.700">Username</FormLabel>
                            <Input type="email" ref={emailInputRef} />
                            <FormHelperText fontSize="18px" >Enter your organisation's username.</FormHelperText>
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