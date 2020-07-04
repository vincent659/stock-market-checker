import React, { useState, useEffect } from "react";
import {Line} from 'react-chartjs-2';

/* React ChartJS */
export const Chart = (props) =>{
    const[chartTime, setChartTime] = useState([]);
    const[chartData, setChartData] = useState([]);
    
    let timeRange = [];
    let closePriceRange = [];

    // Handles the chart data change made in the stock history table's date filter function
    useEffect(() =>{
      props.data.map(data => {
        timeRange.unshift(data.timestamp)
        closePriceRange.unshift(data.close)
      });

      setChartTime(timeRange);
      setChartData(closePriceRange);
    }, [props.data])
    
    Chart.defaultProps = {
      displayTitle:true,
      displayLegend: true,
      legendPosition:'right',
      title: props.name
    }

    // ChartJS
    const data = {
        labels: chartTime,
        datasets: [
          {
            label: 'Closing Price',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: "rgba(255, 0, 0, 0.3)",
            borderWidth: 5,
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: chartData         
          }
        ]
      };
      
    return(
        <div className="chart">
            <Line
              data={data}
              options={{
                title:{
                  display: props.displayTitle,
                  text:'Closing Price: ' + props.title,
                  fontSize:25
                },
                legend:{
                  display: props.displayLegend,
                  position: props.legendPosition
                },
                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        display: false
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Date (Day/Month/Year)'
                    }
                    }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Closing Price ($)'
                    }
                  }]
                }
              }}
            />
        </div>
    );
}
