import {  GET_DATA} from '../types'

const initialState = {
    data: [],
    loading: true
  
}

export default function(state = initialState, action) {


    switch (action.type) {

        case GET_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false

            }
  
        default:
            return state
    }

}