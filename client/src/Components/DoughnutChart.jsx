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

      const style = [{
        backgroundColor: '#B098FF',
        width: '1.1rem',
        height: '1.1rem',
        display: 'inline-block',
        borderRadius: '100%',
      },
      {
        backgroundColor: '#FCFF6F',
        width: '1.1rem',
        height: '1.1rem',
        display: 'inline-block',
        borderRadius: '100%',
      },
      {
        backgroundColor: '#F16D6D',
        width: '1.1rem',
        height: '1.1rem',
        display: 'inline-block',
        borderRadius: '100%',
      },
    ];

      return labels.map((label, index) => (<li key={label}> {label}  <span style={style[index]}></span> </li>));
  };

  return (
      <div className='settings-graph-main'>
          <Doughnut className='settings-graph-item' data={chartData} options={options} />
          <ul>{showLabels()}</ul>
      </div>
  );
};

export default DoughnutChart;
