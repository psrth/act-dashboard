import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Box, 
  } from "@chakra-ui/react"

const PaymentsTable = (props) => {
  return(
    <Box id="table" margin="80px">
      <Table variant="simple" size="md">
        <TableCaption>ACT Donations from the {props.userDetails.company.name}</TableCaption>
        <Thead>
            <Tr>
            <Th>NAME</Th>
            <Th>EMAIL ADDRESS</Th>
            <Th>PHONE NUMBER</Th>
            <Th>COUNTRY</Th>
            <Th isNumeric>AMOUNT</Th>
            </Tr>
        </Thead>
        <Tbody>
            {props.payment.map((payment, key) => (
                <Tr>
                <Td fontWeight="medium" color="grey.700">{payment.donor_name}</Td>
                <Td>{payment.donor_email}</Td>
                <Td>{payment.donor_phone}</Td>
                <Td>{payment.donor_country}</Td>
                <Td fontWeight="medium" color="grey.700" isNumeric>INR {payment.amount}</Td>
                </Tr>
            ))}
        </Tbody>
        <Tfoot>
            <Tr>
            <Th>NAME</Th>
            <Th>EMAIL ADDRESS</Th>
            <Th>PHONE NUMBER</Th>
            {/* <Th>PAN CARD</Th> */}
            <Th>COUNTRY</Th>
            <Th isNumeric>AMOUNT (INR)</Th>
            </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}

export default PaymentsTable;