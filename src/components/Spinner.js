import React from 'react'
import spinner from './Spinner.gif'

const Spinner = () => {

    return (
        <div className='container text-center my-3'>
            <img src={spinner} alt={spinner} />
        </div>
    )
}

export default Spinner
