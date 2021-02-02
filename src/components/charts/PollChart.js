import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2'
export default function PollChart(props) {
    defaults.global.defaultFontColor = 'white'
    const data = {
        labels: Object.keys(props.pollData),

        datasets: [
          {
            borderColor: "white",
            label: "",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
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
        scales: {
            
            xAxes: [
              {
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


