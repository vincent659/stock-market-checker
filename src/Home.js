import React from 'react'

/* Home Page */
export const Home = () => {
    return (
        <div className="text-center">
            <h2 className="pb-4">Stock Market Statistics Page</h2>
            <p>Welcome to the Stock Market Page. You may click on stocks to view all the stocks or search to
                view the latest 100 days of activity.
            </p>
            <p>To start press <a href="/stock">Search</a></p>
            
        </div>
    )
}