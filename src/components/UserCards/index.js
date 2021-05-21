import React, { Fragment } from 'react'
import {
    Flex,
    Box, 
    Image,
    Text,
  } from "@chakra-ui/react"


  const UserCards = (props) => {
  return(
    <Box width="75%" bg="grey.50" pb="50px">
      <Flex direction={["column", "column", "column", "row", "row"]} justifyContent="space-between">
        <Box width={["100%", "100%", "100%", "30%", "30%"]} mt="20px" boxShadow="base" p="6" rounded="lg" bg="white" justifyContent="center">
            <Flex direction="column" margin="auto" alignItems="center" justifyContent="center">
                <Text
                    fontSize="18px"
                    fontWeight="medium"
                    color="grey.300"
                    textAlign="center"
                >Welcome, {props.userDetails.company.name}</Text>
                <Image boxSize="150px" src={props.userDetails.company.logo}/>
            </Flex>
        </Box>
        <Box width={["100%", "100%", "100%", "30%", "30%"]} mt="20px" boxShadow="base" p="6" rounded="lg" bg="white" justifyContent="center">
            <Flex direction="column" margin="auto" alignItems="center" justifyContent="center">
                { props.isDomestic ? 
                <Fragment>
                    <Text
                        fontSize="18px"
                        fontWeight="medium"
                        color="grey.300"
                        textAlign="center"
                    >TOTAL AMOUNT RAISED</Text>
                    <Text
                        fontSize="40px"
                        fontWeight="bold"
                        color="grey.700"
                        pt="30px"
                        textAlign="center"
                    >INR {props.paymentStatistics.total.amount__sum}</Text>
                </Fragment>
                : 
                <Fragment>
                    <Text
                        fontSize="18px"
                        fontWeight="medium"
                        color="grey.300"
                        textAlign="center"
                    >TOTAL AMOUNT RAISED</Text>
                    <Text
                        fontSize="40px"
                        fontWeight="bold"
                        color="grey.700"
                        pt="30px"
                        textAlign="center"
                    >USD {props.paymentStatistics.total.amount__sum}</Text>
                </Fragment>
                }
                <Text
                    fontSize="20px"
                    fontWeight="medium"
                    color="grey.300"
                    textAlign="center"
                >RAISED</Text>
            </Flex>
        </Box>
        <Box width={["100%", "100%", "100%", "30%", "30%"]} mt="20px" boxShadow="base" p="6" rounded="lg" bg="white" justifyContent="center">
            <Flex direction="column" margin="auto" alignItems="center" justifyContent="center">
                <Text
                    fontSize="20px"
                    fontWeight="medium"
                    color="grey.300"
                    textAlign="center"
                >TOTAL PAYMENT COUNTER</Text>
                <Text
                    fontSize="40px"
                    fontWeight="bold"
                    color="grey.700"
                    pt="30px"
                    textAlign="center"
                >{props.paymentStatistics.count.amount__count}</Text>
                <Text
                    fontSize="20px"
                    fontWeight="medium"
                    color="grey.300"
                    textAlign="center"
                >PAYMENTS</Text>
            </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default UserCards;