import { BUY_CAKE } from "./CakeConstant";

const states = {
    data:10
}



const reducer = (state= states,action) => {
switch(action.type){
    case BUY_CAKE:return{
        ...state,
        data :state.data - 1
    }
    default:return state
}
}

export default reducer