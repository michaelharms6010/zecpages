import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2'
export default function PollChart({pollData, pollTitle}) {
    defaults.global.defaultFontColor = 'white'
    const data = {
        labels: Object.keys(pollData),

        datasets: [
          {
            borderColor: "black",
            label: pollTitle,
            data: Object.values(pollData),
            backgroundColor: [
              'rgba(54, 162, 235, .1)',
              'rgba(54, 162, 235, .3)',
              'rgba(54, 162, 235, .5)',
              'rgba(54, 162, 235, .7)',
              'rgba(94, 202, 255, 1)',
              'rgba(164, 232, 255, 1)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(164, 232, 255, 1)',
              'rgba(164, 232, 255, 1)',
            ],
            borderWidth: 2,
          },
        ],
      }
      
      const options = {
          
        responsive: true,
        legend: {
            display: false,
            position: "top",
          },
        scales: {
            
            xAxes: [
              {
                ticks: {
                  fontColor: "black",
                  fontSize: 18,
                  stepSize: 1,
                  beginAtZero: true
              },
                display: false,
                gridLines: {
                  display: false,
                },
                scaleLabel: {
                  display: false,
                  labelString: "Percent",
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "black",
                  fontSize: 18,
                  stepSize: 1,
                  beginAtZero: true
              },
                  
                display: true,
                
                gridLines: {
                  display: false,
                },
                scaleLabel: {
                  display: false,
                  labelString: "Household income",
                  ticks: {
                      
                    beginAtZero: true,
                  },
                },
              },
            ],
          },
      }
      
      
      
    return (
        <HorizontalBar data={data} options={options} />
    )
}


