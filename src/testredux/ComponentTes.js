import React from 'react'
import { Provider } from 'react-redux'
import store from './Cakestore'



function ComponentTes() {
    return (
        <Provider store={store}>
        <div>
            <h1>Buy Cake</h1>
            <button>Buy Now</button>
        </div>
        </Provider>
    )
}

export default ComponentTes
