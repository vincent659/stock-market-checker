import React, { Component } from 'react'

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class StockTable extends Component {

    // state ={
    //     searchValue: ""
    // };

    // onChange = e =>{
    //     this.setState(
    //         {
    //             searchValue: e.target.value
    //         },
    //         () => {
    //             this.gridApi.setQuickFilter(this.state.searchValue);
    //             console.log("123 ", this.state.columnDefs);
    //         }
    //     );
    // };


    constructor(props){
        super(props);
        this.state = {
            columnDefs: [
                {headerName: 'Symbol', field: 'symbol', width: 100, sortable: true, filter: true},
                {headerName: 'Name', field: 'name', sortable: true, filter: true},
                {headerName: 'Industry', field: 'industry', sortable: true, filter: true},
            ],
            rowData:null,
        };
    };

    componentDidMount(){
        fetch('http://131.181.190.87:3001/all')
            .then(res => res.json())
            .then(rowData => this.setState({rowData}))
            .catch(err => console.log(err));
    }

    // fetchData(cb){
    //     const httpRequest = new XMLHttpRequest();
    //     const updateData = data => {
    //         // this.setState({ rowData: data });
    //         cb(data);
    //     };

    //     httpRequest.open(
    //         "GET",
    //         "http://131.181.190.87:3001/all");

    //     httpRequest.send();
    //     httpRequest.onreadystatechange = () => {
    //         if (httpRequest.readyState === 4 && httpRequest.status === 200) {
    //             updateData(JSON.parse(httpRequest.responseText));
    //         }
    //     };
    // }

    // onGridReady(params){
    //     console.log(params);
    //     this.gridApi= params.api;
    //     this.gridColumnApi = params.gridColumnApi;
    //     var that = this;
    //     that.fetchData(data => {
    //         that.setState(
    //             {
    //                 rowData: data
    //             }
    //         );
    //     });
    // }

    render(){
        // var colSymbol = this.gridColumnApi && this.gridColumnApi.getColumn("symbol");
        // var colDef = colSymbol && colSymbol.getColDef();
        return(
            <div className="ag-theme-balham" style={{
                width: 501,
                height: 365
            }}>
                <input type="text" value={this.state.value} onChange={this.onChange}/>
                <AgGridReact rowModelType="clientSide"
                    columnDefs={this.state.columnDefs}
                    enableColResize={true}
                    rowData={this.state.rowData}
                    rowSelection="multiple" 
                    pagination={true}
                    paginationPageSize={10}/>
                
            </div>
        )
    }

}

export default StockTable;