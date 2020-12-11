import * as actionType from './actionType.js'

const initialState = {
    channelId:'',
    channelName:'',
    channels :[],
    messages:[]
}

const dataReducer = (state=initialState, action)=>{
    switch(action.type){
        case actionType.CHANNELS : return {
            ...state,
            channels : action.channels
        }
        case actionType.CHANNELID : return {
            ...state,
            channelId : action.channelId,
            channelName: action.channelName
        }
        case actionType.MESSAGES : return {
            ...state,
            messages:action.messages
        }
        default : return state
    }
}

export default dataReducer