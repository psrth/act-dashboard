import React, {
    Fragment,
    useContext,
    useState,
    useEffect
} from 'react'

import {
    Heading,
    Flex,
    Spinner,
  } from "@chakra-ui/react"

import AuthContext from '../../store/auth'
import PaymentsTable from '../../components/PaymentsTable'
import UserCards from '../../components/UserCards'
import LineChart from '../../components/Chart'


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
                <Heading
                    color="grey.300"
                    pt="40px"
                    pb="0px"
                    fontSize="28px"
                    textAlign="center"
                >DONATIONS OVERVIEW</Heading>
                <UserCards paymentStatistics={paymentStatistics} userDetails={userDetails} />
                <Heading
                    color="grey.300"
                    pt="20px"
                    pb="20px"
                    fontSize="28px"
                    textAlign="center"
                >DONATIONS IN LAST 7 DAYS</Heading>
                <LineChart 
                    labels={paymentStatistics.daily.day}
                    data={paymentStatistics.daily.values}
                />
                <Heading
                    color="grey.300"
                    pt="20px"
                    pb="30px"
                    fontSize="28px"
                    textAlign="center"
                >ALL PAYMENTS</Heading>
                <PaymentsTable payment={allPayments} userDetails={userDetails} /> 
            </Fragment> : 
            <Spinner /> }
        </Flex>
    )
}

export default Dashboard;