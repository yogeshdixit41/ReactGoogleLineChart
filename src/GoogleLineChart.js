import React from 'react';
//import ReactDOM from 'react-dom';

class GoogleLineChart extends React.Component {
    //var google;
    style = {};
    constructor(props) {
        super(props);
        this.google = window.google;
        this.style={
            width: '800px',
            height: '500px'
        }
        this.state = {data:null};
    }

  render() {
    return (<div id={this.props.graphName} style={this.style}/>);
  }

  componentDidMount() {
    var repData = this.getData();
    this.setState({data:repData}, function () {
        this.draw();
    });
  }

  draw() {
    var data = this.state.data;
    var options = {
        legend: { position: 'none', labeledValueText: 'none'},
        chart: {
            title: 'Inbound reports',
            subtitle: 'inbound call data'
        },
        width: 900,
        height: 500,
        vAxis: {
            title: 'Number of Calls',
            viewWindow: {
                min: 0
          }
        },
        colors: ['#0086CD', '#3AB676', '#D9B412']
    };

    if (this.props.graphType === 'hourly') {
        options['hAxis'] =  {
            title: 'Time of day',
            format: 'hh:mm a'
        }
    } else if (this.props.graphType === 'daily') {
        options['hAxis'] =  {
            title: 'Day of week',
        }
    }
    console.log(options);
    var element = document.getElementById(this.props.graphName);
    var chart = new this.google.charts.Line(element);
    chart.draw(data, this.google.charts.Line.convertOptions(options));
  }

  getData() {
      var data = new this.google.visualization.DataTable();
      if (this.props.graphType === 'hourly') {
          data.addColumn('datetime', 'Hour');
          data.addColumn('number', 'Answered');
          data.addColumn('number', 'Hangup');
          data.addColumn('number', 'Failover');

          data.addRows([
            [new Date('2014-07-02T10:00:00-0600'),  10, 3, 2],
            [new Date('2014-07-02T11:00:00-0600'),  25, 5, 8],
            [new Date('2014-07-02T12:00:00-0600'),  9, 1, 3],
            [new Date('2014-07-02T13:00:00-0600'),  20, 4, 8],
            [new Date('2014-07-02T14:00:00-0600'),  39, 10, 2],
            [new Date('2014-07-02T15:00:00-0600'),  6,   0, 1]

          ]);
      } else if (this.props.graphType === 'daily') {
          data.addColumn('string', 'Day');
          data.addColumn('number', 'Answered');
          data.addColumn('number', 'Hangup');
          data.addColumn('number', 'Failover');

          data.addRows([
            ['Sun',  10, 3, 2],
            ['Mon',  25, 5, 8],
            ['Tue', 0, 0, 0],
            ['Wed',  9, 1, 3],
            ['Thu',  20, 4, 8],
            ['Fri',  39, 10, 2],
            ['Sat',  6,   0, 1]

          ]);
      }


      //var chartDataView = new this.google.visualization.DataView(data);

      var totalCol1 = 0, totalCol2 = 0, totalCol3 = 0, totalCalls = 0;
      for (var row=0; row<data.getNumberOfRows(); row++) {
          totalCol1 = totalCol1 + data.getValue(row, 1); //answered
          totalCol2 = totalCol2 + data.getValue(row, 2); //Hangup
          totalCol3 = totalCol3 + data.getValue(row, 3); //failover
      }
      totalCalls = totalCol1 + totalCol2 + totalCol3;
      return data;
  }
}

export default GoogleLineChart;
