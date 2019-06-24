import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLineChart from './GoogleLineChart';

if (window.google) {
    var google = window.google;
    google.charts.load('current', {
        'packages': ['line']
    });
    google.setOnLoadCallback(init);
    function init() {
        const graphType = 'hourly'; //hourly or daily
        ReactDOM.render(<GoogleLineChart graphName="line" graphType={graphType}/>, document.querySelector('#root'));
    }
}
