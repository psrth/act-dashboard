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
      { props.isDomestic ? 
        <Line data={
          {
            labels: props.labels,
              datasets: [
                {
                  label: 'Amount in INR',
                  data: props.data,
                  fill: false,
                  backgroundColor: '#00ADEE',
                  borderColor: '#00ADEE',
                },
              ],
          }
        } options={options} />
      :
        <Line data={
          {
            labels: props.labels,
              datasets: [
                {
                  label: 'Amount in USD',
                  data: props.data,
                  fill: false,
                  backgroundColor: '#EC008C',
                  borderColor: '#EC008C',
                },
              ],
          }
        } options={options} />
      }
      
    </Box>
    
  </>
);

export default LineChart;