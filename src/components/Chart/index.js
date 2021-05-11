import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from "@chakra-ui/react"


const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = (props) => (
  <>
    <Box width={["75%","75%","75%","55%","55%"]}  bg="grey.50" pb="100px">
      <Line data={props.data} options={options} />
    </Box>
    
  </>
);

export default LineChart;