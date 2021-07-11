import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Graph from './components/Graph';
import './App.css';

// Highcharts
import Highcharts from 'highcharts/highstock';

// Redux
import requestDataAction from './actions';
import getRequest from './reducers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Load Highcharts modules
require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/map')(Highcharts)


function App(props) {

  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const { fetchRequest } = props;
    fetchRequest();
  }, [])

  //Display graph and export pdf button
  const showGraphHandler = () => {
    const { request } = props;
    setGraphData(request.request);
    setShowGraph(true);
  };

  
  //export pdf 
  const exportPdf = () => {
    const req_option = {
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    }

    fetch('http://127.0.0.1:5000/export_to_pdf', req_option)
      .then(res => res.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "sample.pdf";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();    
        a.remove();  //afterwards we remove the element again         
    });
  }

  //Chart config data
  const chartOptions = {
    title: {
      text: ''
    },
    series: [{
      data: graphData,
    }]
  }

  return (
    <div className="App">
      <div className="buttonContainer">
        <Button title="RUN ANALYSIS" textColor="white" color="#031854" clickHandler={showGraphHandler} showGraph={showGraph} />
        {showGraph && <Button title="EXPORT TO PDF" textColor="white" color="#031854" downloadHandler={exportPdf} showGraph={showGraph} />}
      </div>
      <p className="simulation">Simulation Results</p>
      {showGraph &&
        <div className="graphContainer" id="graphContainer">
          <Graph options={chartOptions} highcharts={Highcharts} />
          <Graph options={chartOptions} highcharts={Highcharts} />
        </div>
      }
    </div>
  );
} 

const mapStateToProps = state => ({
  request: getRequest(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRequest: requestDataAction
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);









