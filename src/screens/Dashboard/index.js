import React, {
    Fragment,
    useContext,
    useState,
    useEffect
} from 'react'

import {
    Heading,
    Flex,
    Spinner
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
    const [data, setData] = useState(
        {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [
              {
                label: 'Amount in INR',
                data: [12, 19, 3, 5, 2, 3, 20],
                fill: false,
                backgroundColor: '#00ADEE',
                borderColor: '#00ADEE',
              },
            ],
        }
    )

    useEffect(() => {
        userDetailsApiRequest();
        getStatisticsApiRequest();
        getAllPaymentsApiRequest();
        setChartData();
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
    
    const setChartData = () => {
        if (paymentStatistics) {
        setData(
            {
                labels: paymentStatistics.daily.day[0],
                datasets: [
                  {
                    label: 'Amount in INR',
                    data: paymentStatistics.daily.values[0],
                    fill: false,
                    backgroundColor: '#00ADEE',
                    borderColor: '#00ADEE',
                  },
                ],
            }
        )}
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
                <LineChart data={data}/>
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