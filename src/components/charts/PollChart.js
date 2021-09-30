import axios from 'axios'
import React, {useContext, useState} from 'react'
import { HorizontalBar, Bar } from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2'
import {UserContext} from "../../contexts/UserContext"
export default function PollChart(props) {
    const [results, setResults] = useState({})

    React.useEffect(_ => {
      axios.get("https://be.zecpages.com/poll/" + props.poll_id)
        .then(r => {
          delete r.data.results.q
          console.log(r.data.results)
          setResults(r.data.results)
          
        })
        .catch(err => console.log(err))

    },[])

    const {darkMode} = useContext(UserContext)
    defaults.global.defaultFontColor = 'white'
    const data = {
        labels: Object.keys(results),

        datasets: [
          {
            borderColor: "white",
            label: "",
            data: Object.values(results),
            backgroundColor: [
              'dodgerblue',
              'green',
              'magenta',
              "cyan"
            ],
            borderColor: [
              'goldenrod',
              'papayawhip',
              'cyan',
              "lime"
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
          display: false,
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
                  maxTicksLimit: 6,
                  scaleSteps: 1,
                  max: Object.values(results).reduce((a, v) => a+v, 0) || 1,
                  beginAtZero: true,
                  fontColor: darkMode ? '#ccc' : 'black',
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
                  max: Object.values(results).reduce((a, v) => a+v, 0) || 1,

                  scaleSteps: 1,
                  padding: 0,
                  fontColor: darkMode ? 'white' : 'black',
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: false,

                },
              },
            ],
          },
      }
      
      
      
    return (
      <>
        <h2 style={{textAlign: 'center'}}>{props.pollTitle}</h2>
        {/* <Bar data={data} options={options} /> */}
        <div style={{margin: '0 auto', maxWidth: "1200px"}}>
          {Object.keys(results).length !== 0 && <HorizontalBar data={data} options={options} />}
        </div>
      </>
    )
}


