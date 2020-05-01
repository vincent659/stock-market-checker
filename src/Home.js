import React from 'react'

export const Home = () => {
    return (
        <div>
            <h2>Stock Market Page</h2>
            <p>Welcome to the Stock Market Page. You may click on stocks to view all the stocks or search to
                view the latest 100 days of activity.
            </p>

            <br/>

            <p>To start press here</p>
            <a href="/stock">SEARCH</a>
        </div>
    )
}