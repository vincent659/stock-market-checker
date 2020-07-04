import React, { useState, useEffect } from "react";
import{useHistory} from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import {StocksTableSearchBar} from "./StocksTableSearch";
import spinner from '../../assets/spinner.gif';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

// Stock API provided by QUT
const STOCK_API_URL = "http://131.181.190.87:3001/all";

/* Stocks Table */
export default function StocksTable() {
    const [loading, setLoading] = useState(true);
    const [rowData, setRowData] = useState([]);   
    const [error, setError] = useState(null);                   
    const [searchResults, setSearchResults] = useState([]);
    const [gridApi, setGridApi] = useState('');
    const [gridColumnApi, setgridColumnApi] = useState('');
    let history = useHistory();

    // Ag-grid all stocks column definitions
    const columnDefs = [
                {headerName: 'Symbol', field: 'symbol', width: 365, sortable: true, filter: true},
                {headerName: 'Name', field: 'name', width: 365, sortable: true, filter: true},
                {headerName: 'Industry', field: 'industry', width: 365, sortable: true, filter: true},
            ]

    // grid API and column API - Ag-grid
    const onGridReady = p => {
        setGridApi(p.api);
        setgridColumnApi(p.columnApi);
    }
    // Row Selection - Ag-grid
    const onSelectionChanged = () => {
        var selectedRows = gridApi.getSelectedRows();
        history.push(`stockpage/${selectedRows[0].symbol}`)
    }
    
    // Initial fetch of the all stock data which comprise data loading and error prevention
    useEffect(() => {
          fetch(STOCK_API_URL)
          .then(res => res.json())
          .then(stocks =>
              stocks.map(stockData => {
                  return {
                      name: stockData.name,
                      symbol: stockData.symbol,
                      industry: stockData.industry,
                  };
              })
          )
          .then(stocks => {
            setRowData(stocks);
            setSearchResults(stocks);
            setLoading(false);
          })
          .catch(e => {
              setError(e);
              setLoading(false);
          })
          ;
    }, []);
    
    // If statement when API cannot be fetched
    if (loading) return <div><img src={spinner} alt="Loading..." style={{width: '200px', margin: '40px auto', display: 'block'}}/></div>
    if (error){
        return (
            <div className="px-6 py-4 bg-red-100 min-h-screen text-center">
                <h1 className="text-3xl font-bold mb-4">Oops...There was an error. Please try again later.</h1>
                <a href="/stock" className="bg-primary text-white text-sm border border-primary rounded rounded-xl px-2">Try Again</a>
            </div>
        )
    } 

    // Handles stocks Symbol/Code search function
    const handleSearch = searchTerm => {
        if(searchTerm === ''){
            let stockResult = [...rowData]
            setSearchResults(stockResult);
        }else{
            let stockResult = [...searchResults]
            stockResult = stockResult.filter( i => {
            const matchFlter = i.symbol.match(new RegExp(searchTerm, 'gi'));
            return !!matchFlter;
            })
            setSearchResults(stockResult);
        }}

    // Handles stocks Industry filter dropdown function
    const handleIndustry = industry => {
        if(industry === '' || industry == 'Select industry...'){
            let stockResult = [...rowData]
            setSearchResults(stockResult);
        }else{
            let stockResult = [...searchResults]
            stockResult = stockResult.filter( i => {
            const matchFlter = i.industry.match(new RegExp(industry, 'gi'));
            return !!matchFlter;
            })
            setSearchResults(stockResult);
    }}

    // Handles reset function
    const handleResetSearch = (e) =>{
        e.preventDefault();
        setSearchResults([...rowData])
    }

    return(
        <div className="ag-theme-balham" style={{
            width: 1100,
            height: 365
        }}>
            <StocksTableSearchBar search={handleSearch} resetResult={handleResetSearch} result={searchResults} industry={handleIndustry} />
            <AgGridReact rowModelType="clientSide"
                reactNext = {true}
                columnDefs={columnDefs}
                enableColResize={true}
                rowData={searchResults}
                rowSelection="multiple" 
                pagination={true}
                onGridReady={onGridReady}
                paginationPageSize={10}
                onSelectionChanged={onSelectionChanged}
                />
        </div>
    )
}
