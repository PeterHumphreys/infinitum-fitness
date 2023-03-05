import React from 'react'
import { useState } from 'react'
import CustomChartContainer from './CustomChartContainer'
import {CategoryScale} from "chart.js"
import Chart from "chart.js/auto"

function Dashboard() {

  const CHART_COLOR_RED = "#ee4b2b";
  const CHART_COLOR_BLUE = "#0096ff";

  //Data received from API
/*  const jsonData = [
    {
      historical_date: "2022-11-28",
      movingAvg: 651.29,
      weight: 181.7
    },
    {
      historical_date: "2022-11-29",
      movingAvg: 487.29,
      weight: 182.7
    },
    {
      historical_date: "2022-11-30",
      movingAvg: 186.29,
      weight: 587.7
    },
    {
      historical_date: "2022-11-31",
      movingAvg: 385.29,
      weight: 283.7
    }
  ]

  function buildDataSets(jsonData) 
  {
  }

  const initChartOptions =
  {
    plugins: {
      title: {
        display: true,
        text: "Users Gained between 2016-2020"
      },
      legend: {
        display: true
      }
    }
  }

  const initChartData = 
  {
    labels: jsonData.map((data) => data.historical_date), 
    datasets: [
      {
        label: "Weight",
        data: jsonData.map((data) => data.movingAvg),
        backgroundColor: [
          CHART_COLOR_RED,
        ],
        borderColor: "black",
        borderWidth: 5
      },
      {
        label: "Moving Average",
        data: jsonData.map((data) => data.weight),
        backgroundColor: [
          CHART_COLOR_BLUE,
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  }*/
  
  
  /*const [chartData, setChartData] = useState(initChartData)
  const [chartOptions, setChartOptions]  = useState(initChartOptions)*/

  const [chartsList, setChartsList] = useState(
    [
      {
        title : "Weight"
      },
      {
        title : "Body Fat Percentage"
      },
      {
        title : "Plates Lifted"
      },
      {
        title : "Dates Lifted"
      }
    ])
  return (
    <main className='dashboard content-container'>
      <h2>Dashboard</h2>
      <section className="content-grid">
      {
        chartsList.map((chart) => <CustomChartContainer key={chart.title} title={chart.title}></CustomChartContainer>)
      }
      </section>
    </main>
  )
}

export default Dashboard