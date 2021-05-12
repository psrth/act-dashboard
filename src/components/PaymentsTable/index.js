import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Box, 
  } from "@chakra-ui/react"

const PaymentsTable = (props) => {
  return(
    <Box id="table" width="80%" pb="60px" overflowX="scroll">
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
                <Td fontWeight="bold" color="grey.700">{payment.donor_name}</Td>
                <Td fontWeight="medium" color="grey.500">{payment.donor_email}</Td>
                <Td fontWeight="medium" color="grey.500">{payment.donor_phone}</Td>
                <Td fontWeight="medium" color="grey.500">{payment.donor_country}</Td>
                <Td fontWeight="bold" color="grey.700" isNumeric>INR {payment.amount}</Td>
                </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default PaymentsTable;