/**
 * Theme: Dastone - Responsive Bootstrap 4 Admin Dashboard
 * Author: Mannatthemes
 * Apexcharts Js
 */


  
 var options = {
  chart: {
      height: 180,
      type: 'radialBar',
  },
  plotOptions: {
      radialBar: {
          hollow: {
              size: '70px',
          },
          track: {
            background: '#b9c1d4',
            opacity: 0.5,
          },
          dataLabels: {
            name: {
                fontSize: '18px',
            },
            value: {
                fontSize: '16px',
                color: '#8997bd',
            },          
          }
      },
  },
  colors: ["#4a8af6"],
  series: [ai1Value],
  labels: ['AI1'],

}

var chartAi1 = new ApexCharts(
  document.querySelector("#apex_radialbar1"),
  options
);

chartAi1.render();

function reRenderChart(value){
  var newValue = JSON.parse('{"data": 30}');
  chartAi1.updateSeries([{
    data: newValue
  }]);
}
/////


var options = {
  chart: {
      height: 180,
      type: 'radialBar',
  },
  plotOptions: {
      radialBar: {
          hollow: {
              size: '70px',
          },
          track: {
            background: '#b9c1d4',
            opacity: 0.5,
          },
          dataLabels: {
            name: {
                fontSize: '18px',
            },
            value: {
                fontSize: '16px',
                color: '#8997bd',
            },          
          }
      },
  },
  colors: ["#4a8af6"],
  series: [ai2Value],
  labels: ['AI2'],

}

var chart = new ApexCharts(
  document.querySelector("#apex_radialbar2"),
  options
);

chart.render();
