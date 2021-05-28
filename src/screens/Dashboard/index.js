import React, {
    Fragment,
    useContext,
    useState,
    useEffect
} from 'react'

import {
    Flex,
    Spinner,
  } from "@chakra-ui/react"

import AuthContext from '../../store/auth'
import Domestic from '../../components/Domestic'
import International from '../../components/International'

const Dashboard = () => {

    const authCtx = useContext(AuthContext);
    const authToken = 'Token ' + authCtx.token;
    
    const [userDetails, setUserDetails] = useState(null);
    const [paymentStatistics, setPaymentStatistics] = useState(null);
    const [domesticPayments, setDomesticPayments] = useState(null);
    const [internationalPayments, setInternationalPayments] = useState(null);
    const [isDomestic, setIsDomestic] = useState(true);

    useEffect(() => {
        userDetailsApiRequest();
        getStatisticsApiRequest();
        getAllDomesticPaymentsApi();
        getAllInternationalPaymentsApi();
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

    const getAllDomesticPaymentsApi = () => {
        fetch('https://act-grants-crm.herokuapp.com/donation/get_all_donations/?limit=100&domestic=true&offset=0&international=false',
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
                    setDomesticPayments(res.data);
                } else {
                    alert("ERROR RETRIEVING CONTENT.");
                }
            }))
    }
    
    const getAllInternationalPaymentsApi = () => {
        fetch('https://act-grants-crm.herokuapp.com/donation/get_all_donations/?limit=100&domestic=false&offset=0&international=true',
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
                    setInternationalPayments(res.data);
                } else {
                    alert("ERROR RETRIEVING CONTENT.");
                }
            }))
    }
    
    const toggleDomestic = () => {
        setIsDomestic(!isDomestic);
    }

    return(
        <Flex direction="column" margin="auto" alignItems="center" justifyContent="center">
            {((userDetails && paymentStatistics && domesticPayments)) ?
            <Fragment>
                {isDomestic ?
                    <Domestic 
                        toggleDomestic={toggleDomestic}
                        paymentStatistics={paymentStatistics}
                        userDetails={userDetails}
                        domesticPayments={domesticPayments}
                        isDomestic={isDomestic}
                    /> :
                    <International 
                        toggleDomestic={toggleDomestic}
                        paymentStatistics={paymentStatistics}
                        userDetails={userDetails}
                        internationalPayments={internationalPayments}
                        isDomestic={isDomestic}
                    /> }
            </Fragment> : 
            <Spinner /> }
        </Flex>
    )
}

export default Dashboard;


