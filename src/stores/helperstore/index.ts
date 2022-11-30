import  { createStore }  from 'redux'; 
import { HelperAppState } from '../../types';



//Initial State 
const initialState: HelperAppState = 
{
    step: 0,
}

//reducer & actions
const reducer =  (state = initialState , action: any) => {
    const {type, payload} = action
    console.log(type)
    if(type==="GO_FORWARD")
    {
    
        return {
            ...state,
            
            step:state.step+1,
        }
    }
    
    
    return state;
}

export const store = createStore(reducer);