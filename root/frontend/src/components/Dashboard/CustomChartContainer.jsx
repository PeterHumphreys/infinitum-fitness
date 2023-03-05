import {Line} from 'react-chartjs-2'
import {IoOptionsSharp} from 'react-icons/io5'
import './CustomChart.scss'

// function CustomChart({chartData, chartOptions}) {
//   return (
//     <div className="chart-container">
//       <Line
//         data={chartData}
//         options={chartOptions}
//       />
//     </div>
//   )
// }

function CustomChartContainer({title}) {
  return (
    <div className="custom-chart-wrapper">
      <div className="custom-chart-options">
        <h3>{title}</h3>
        <button className='btn-icon btn-transparent' title={`${title} Chart Options`}><IoOptionsSharp/></button>
      </div>
      <div className="chart-container">
        <h3>Chart goes here</h3>
      </div>
    </div>
  )
}

export default CustomChartContainer