import * as actionType from './actionType'

const initialState = {
    user:''
}


const userReducer = (state=initialState,action) =>{
    switch(action.type){
        case actionType.USER : return {
            user:action.user
        }
        default: return state
    }
}

export default userReducer
