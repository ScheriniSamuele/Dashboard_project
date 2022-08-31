import React from 'react';
import { Doughnut } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS, Legend } from 'chart.js/auto';

const DoughnutChart = (props) => {
    const { chartData } = props;
    
    
    const options = {
      plugins: {
          legend: {
              display: false,
          },
      },
      events: [],
      elements: {
          arc: {
              borderWidth: 0,
          },
      },
  };

  const showLabels = () => {
      const labels = chartData.labels;

      return labels.map((label) => <li key={label}> {label} </li>);
  };

  return (
      <div className='settings-graph-main'>
          <Doughnut className='settings-graph-item' data={chartData} options={options} />
          <ul>{showLabels()}</ul>
      </div>
  );
};

export default DoughnutChart;
