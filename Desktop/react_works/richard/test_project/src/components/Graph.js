import React from 'react';
import HighchartsReact from 'highcharts-react-official';

const Graph = ({ options, highcharts }) => <HighchartsReact
  highcharts={highcharts}
  constructorType={'chart'}
  options={options}
/>

export default Graph

