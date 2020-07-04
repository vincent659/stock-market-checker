import React from "react";

/* Date Search Function for the Stock History Page */
export const StockDataTimeSearch = (props) =>{
    const timeList = props.results.map(time => time.timestamp);

    // Handles the date filtering function of the stock history data 
    const handleTimeChange = e => {
        e.preventDefault();
        props.time(e.target.value)
    }
  
    return (
      <div>
        <button onClick={props.resetResult}>Reset</button>
        <select name="Time" onChange={handleTimeChange}>
          <option key="empty">-------------</option>
          {timeList.map(time => {
            if(time !== null){
              return <option value={time} key={time}>{time}</option>
            }
          })}
        </select>
      </div>
    );
}