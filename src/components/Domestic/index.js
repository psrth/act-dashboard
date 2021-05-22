import React, { Fragment } from 'react'

import {
    Heading,
    Button,
  } from "@chakra-ui/react"

import PaymentsTable from '../PaymentsTable'
import UserCards from '../UserCards'
import LineChart from '../Chart'

const Domestic = (props) => {
    return(
        <Fragment>

            <Button     
                colorScheme="blue" 
                onClick={props.toggleDomestic}
                marginTop="20px"
            >View International Donations</Button>

            <Heading
                color="grey.300"
                pt="40px"
                pb="0px"
                fontSize="28px"
                textAlign="center"
            >DONATIONS OVERVIEW</Heading>
            <UserCards 
                paymentStatistics={props.paymentStatistics.domestic} 
                userDetails={props.userDetails} 
                isDomestic={props.isDomestic}
            />

            <Heading
                color="grey.300"
                pt="20px"
                pb="20px"
                fontSize="28px"
                textAlign="center"
            >DONATIONS IN LAST 7 DAYS</Heading>
            <LineChart 
                labels={props.paymentStatistics.domestic.daily.day}
                data={props.paymentStatistics.domestic.daily.values}
                isDomestic={props.isDomestic}
            />
            <Heading
                color="grey.300"
                pt="20px"
                pb="30px"
                fontSize="28px"
                textAlign="center"
            >ALL PAYMENTS</Heading>
            <PaymentsTable 
                payment={props.domesticPayments.results} 
                userDetails={props.userDetails} 
                isDomestic={props.isDomestic}
            />
        </Fragment>
    )
}

export default Domestic;