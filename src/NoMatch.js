import React from 'react'
import Image from 'react-bootstrap/Image'
import sorry from './assets/sorry.jpg';

/* Page Not Found Page */
export const NoMatch = () => {
    return (
        <div className="text-center">
            <Image src={sorry} alt="sorry" roundedCircle className="pb-4"/>
            <h1>Oh, Snap! We can't find the page</h1>
            <p>Sorry matey, the page you are looking for is not here. Press the below button to go back home.</p>
            <a href="/" className="bg-primary text-white text-sm border border-primary rounded rounded-xl px-2">Go back</a>
        </div>
    )
}

