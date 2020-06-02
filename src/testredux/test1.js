import React from 'react'
const redux = require('redux')

const reduxstore = redux.createStore;

function Reduce(){



    console.log('hello brother');


const checkreduce = 'checkreduce';


function reduce(){
    return{
        type: checkreduce,
        info:'reduce it'
    }
}

const states = {
    data:10
}



const reducer = (state= states,action) => {
switch(action.type){
    case checkreduce:return{
        ...state,
        data :state.data - 1
    }
    default:return state
}
}

const store = reduxstore(reducer);

console.log(store.getState());
const  unsubscribe = store.subscribe(() => {
    
    //alert();
    console.log(store.getState());

}
);
console.log(store.getState());
store.dispatch(reduce());
store.dispatch(reduce());
store.dispatch(reduce());
console.log(store.getState());
unsubscribe()
console.log(store.getState());





    return( <div><h1>sfdsf</h1>
    <h2>test</h2></div>)
}









export default Reduce
