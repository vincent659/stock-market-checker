import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import {StockDataTimeSearch} from './StockPageSearch';
import {Chart} from './Chart';
import spinner from '../../assets/spinner.gif';

/* Stock History Page */
export default function StockPage(){
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null); 
    const[stockTimeData, setStockTimeData] = useState([]);  
    const[stockTimeSearchResultData, setStockTimeSearchResultData] = useState([]);  
    const[dataName, setDataName] = useState('');  
    let location = useLocation();

    // Ag-grid stock history column definitions
    const columnDefs = [
        {headerName: 'Timestamp', field: 'timestamp', width: 110, sortable: true, filter: true},
        {headerName: 'Symbol', field: 'symbol', width: 90, sortable: true, filter: true},
        {headerName: 'Name', field: 'name', width: 200, sortable: true, filter: true},
        {headerName: 'Industry', field: 'industry', width: 200, sortable: true, filter: true},
        {headerName: 'Open', field: 'open', width: 80, sortable: true, filter: true},
        {headerName: 'High', field: 'high', width: 80, sortable: true, filter: true},
        {headerName: 'Low', field: 'low', width: 80, sortable: true, filter: true},
        {headerName: 'Close', field: 'close', width: 80, sortable: true, filter: true},
        {headerName: 'Volumes', field: 'volumes', width: 170, sortable: true, filter: true}
    ]

    // API fetch of a particular stock's history data which comprise data loading and error prevention
    useEffect(() => {
        const STOCK_API_URL = `http://131.181.190.87:3001/history?symbol=${location.pathname.slice(11)}`;
        fetch(STOCK_API_URL)
        .then(res => res.json())
        .then(stock => {
            stock.map(i=>
                i['timestamp'] = `${i['timestamp'].slice(8,10)}/${i['timestamp'].slice(5,7)}/${i['timestamp'].slice(0,4)}`
                
                )
                return stock;
        })
        .then(data => {
            setStockTimeData(data);
            setStockTimeSearchResultData(data);
            setDataName(data[0]['name']);
            setLoading(false);
        })
        .catch(e => {
        setError(e);
        setLoading(false);
        });
    }, []);

    // If statement when API cannot be fetched
    if (loading) return <div><img src={spinner} alt="Loading..." style={{width: '200px', margin: '40px auto', display: 'block'}}/></div>
    if (error){
        return (
            <div className="px-6 py-4 bg-red-100 min-h-screen text-center">
                <h1 className="text-3xl font-bold mb-4">Oops...There was an error. Please try again later.</h1>
                <a href="/" className="bg-primary text-white text-sm border border-primary rounded rounded-xl px-2">Go back</a>
            </div>
        )
    } 

    // Handles the date filtering function of the stock history data 
    const handleTimeSearch = value => {
        if(value === ''){
            let stockResult = [...stockTimeData]
            setStockTimeSearchResultData(stockResult);
        }
        else{
            let stockResult = [...stockTimeData]
            let array = stockResult.map(i => i.timestamp) //map through the timestamps from the data
            let selectedDate = array.indexOf(value); //get the index of the date selected
            let displayData = stockResult.slice(0, selectedDate + 1);
            setStockTimeSearchResultData(displayData);
        }
    }

    // Handles reset function
    const handleResetSearch = (e) =>{
        e.preventDefault();
        setStockTimeSearchResultData([...stockTimeData])
    }

    return (
        <div>
            <a href="/stock" className="bg-primary text-white text-sm border border-primary rounded rounded-xl px-2">BACK</a>
            <div className="ag-theme-balham" style={{
            width: 1100,
            height: 365
            }}>
                <h2 className="mt-4">Showing stocks for the : {dataName}</h2>
                <p>Use the below dropdown box to search date from</p>
                <StockDataTimeSearch resetResult={handleResetSearch} results={stockTimeData} time={handleTimeSearch}/>
                <AgGridReact rowModelType="clientSide"
                            reactNext = {true}
                            columnDefs={columnDefs}
                            enableColResize={true}
                            rowData={stockTimeSearchResultData}
                            rowSelection="multiple" 
                            pagination={true}
                            paginationPageSize={10}
                />
                <hr/>
                <h2 className="mt-4">Close Price for : {dataName}</h2>
                <Chart data={stockTimeSearchResultData} name={dataName}/>
                <hr/>
            </div>
        </div>
        )
}