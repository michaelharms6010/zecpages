import React, {useContext} from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2'
import {UserContext} from "../../contexts/UserContext"
export default function PollChart(props) {
    const {darkMode} = useContext(UserContext)
    defaults.global.defaultFontColor = 'white'
    const data = {
        labels: Object.keys(props.pollData),

        datasets: [
          {
            borderColor: "white",
            label: "",
            data: Object.values(props.pollData),
            backgroundColor: [
              'dodgerblue',
              'green',
              'magenta'
            ],
            borderColor: [
              'goldenrod',
              'papayawhip',
              'cyan'
            ],
            borderWidth: 1,
          },
        ],
      }
      
      const options = {
          
        responsive: true,
        legend: {
            display: false,
            position: "top",
          },

        title: {
          fontColor: darkMode ? 'white' : 'black',
          fontSize: 16,
          display: true,
          text: props.pollTitle,
        },
        
        scales: {
            
            xAxes: [
              {
                
                display: true,
                gridLines: {
                  display: true,
                },
                scaleLabel: {
                  display: false,
                  labelString: "Percent",

                },
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            yAxes: [
              {
                
                  
                display: true,
                
                gridLines: {
                  display: false,
                },
                ticks: {
                  padding: 0,
                  fontColor: darkMode ? 'white' : 'black',
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: false,
                  labelString: "Household income",

                },
              },
            ],
          },
      }
      
      
      
    return (
        <HorizontalBar data={data} options={options} />

    )
}


