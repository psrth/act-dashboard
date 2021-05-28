import React, { Fragment } from 'react'

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Box, 
    Text,
  } from "@chakra-ui/react"

const sanitizeHeading = (text) => {
  var textReturn = text.replaceAll("_", " ");
  textReturn = textReturn.substr(0,25);
  return textReturn;
}

const PaymentsTable = (props) => {
  return(
    <Box id="table" width="80%" mb="60px" overflowX="scroll">
      <Table variant="simple" size="md">
        <TableCaption>ACT Donations from the {props.userDetails.company.name}</TableCaption>
        <Thead>
          <Tr>
          <Th>NAME</Th>
          <Th>EMAIL ADDRESS</Th>
          <Th>PHONE NUMBER</Th>
          <Th>COUNTRY</Th>
          <Th isNumeric>AMOUNT</Th>
          
          { props.payment[0] ? 
            <Fragment>
              { ((props.payment[0].meta)) ? 
                <Fragment>
                  { Object.entries(props.payment[0].meta).map((meta, index) => (
                    <Th>{sanitizeHeading(meta[0])}</Th>
                  ))}
                </Fragment> : 
                null 
              }
            </Fragment> : 
            null
          }
          </Tr>
        </Thead>

        <Tbody>
          {props.payment.map((payment, key) => (
            <Tr>
              <Td fontWeight="bold" color="grey.700">{payment.donor_name}</Td>
              <Td fontWeight="medium" color="grey.500">{payment.donor_email}</Td>
              <Td fontWeight="medium" color="grey.500">{payment.donor_phone}</Td>
              <Td fontWeight="medium" color="grey.500">{payment.donor_country}</Td>
              
              { props.isDomestic ? 
                <Td fontWeight="bold" color="grey.700" isNumeric>INR {payment.amount}</Td> :
                <Td fontWeight="bold" color="grey.700" isNumeric>USD {payment.amount}</Td> }
              
              { ((payment.meta)) ? 
                <Fragment>
                  { Object.entries(payment.meta).map((meta, index) => (
                    <Td>{meta[1]}</Td>
                  ))}
                </Fragment> : 
                null 
              }
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default PaymentsTable;