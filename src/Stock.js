import React from 'react';
import StocksTable from './components/stocks/StocksTable'

/* Stock Page */
export const Stock = () => {
    return (
        <div>
            <a href="/" className="bg-primary text-white text-sm border border-primary rounded rounded-xl px-2">BACK</a>
            <h2 className="mt-4">Stock Search Table</h2>
            <p>Welcome to the Stock Search Table. You may search stock symbols and industry by using the search boxes below</p>
            <br/>
            <StocksTable />
        </div>
    )
}