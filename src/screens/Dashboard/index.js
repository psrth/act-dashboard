import React, {
    Fragment,
    useContext,
    useState,
    useEffect
} from 'react'

import {
    Button,
    Text
} from '@chakra-ui/react'
import AuthContext from '../../store/auth'

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
        <Fragment>
            <h1>DASHBOARD PAGE AFTER LOGIN</h1>
            <Text>{JSON.stringify(userDetails)}</Text>
            <Text>{JSON.stringify(paymentStatistics)}</Text>
            <Text>{JSON.stringify(allPayments)}</Text>
        </Fragment>
    )
}

export default Dashboard;