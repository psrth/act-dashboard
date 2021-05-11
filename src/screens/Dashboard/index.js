import React, {
    Fragment,
    useContext,
    useState,
    useEffect
} from 'react'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Text,
    Box, 
    Flex,
    Spinner
  } from "@chakra-ui/react"

import AuthContext from '../../store/auth'
import PaymentsTable from '../../components/PaymentsTable'
import UserCards from '../../components/UserCards'


const Dashboard = () => {

    const authCtx = useContext(AuthContext);
    const authToken = 'Token ' + authCtx.token;
    
    const [userDetails, setUserDetails] = useState(null);
    const [paymentStatistics, setPaymentStatistics] = useState(null);
    const [allPayments, setAllPayments] = useState(null);

    useEffect(() => {
        userDetailsApiRequest();
        getStatisticsApiRequest();
        getAllPaymentsApiRequest();
    }, []); 

    const userDetailsApiRequest = () => {
        fetch('https://act-grants-crm.herokuapp.com/rest-auth/user/',
                {   
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authToken
                    }
                }
            ).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                if(res.data){
                    setUserDetails(res.data);
                } else {
                    alert("ERROR RETRIEVING CONTENT.");
                }
            }))
    }

    const getStatisticsApiRequest = () => {
        fetch('https://act-grants-crm.herokuapp.com/donation/get_statistics/',
                {   
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authToken
                    }
                }
            ).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                if(res.data){
                    setPaymentStatistics(res.data);
                } else {
                    alert("ERROR RETRIEVING CONTENT.");
                }
            }))
    }

    const getAllPaymentsApiRequest = () => {
        fetch('https://act-grants-crm.herokuapp.com/donation/get_all_donations/',
                {   
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authToken
                    }
                }
            ).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                if(res.data){
                    setAllPayments(res.data);
                } else {
                    alert("ERROR RETRIEVING CONTENT.");
                }
            }))
    }

    return(
        <Flex direction="column" margin="auto" alignItems="center" justifyContent="center">
            {((userDetails && paymentStatistics && allPayments)) ?
            <Fragment>
                <UserCards paymentStatistics={paymentStatistics} userDetails={userDetails} />
                <PaymentsTable payment={allPayments} userDetails={userDetails} /> 
            </Fragment> : 
            <Spinner /> }
            <Text>{JSON.stringify(userDetails)}</Text><br></br>
            <Text>{JSON.stringify(paymentStatistics)}</Text><br></br>
            {/* <Text>{JSON.stringify(allPayments)}</Text> */}
        </Flex>
    )
}

export default Dashboard;