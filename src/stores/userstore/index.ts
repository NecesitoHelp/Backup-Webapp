import  { createStore }  from 'redux'; 
import { AppState,  UserRequeriment } from '../../types';



//Initial State 
const initialState: AppState = 
{
    step: 0,
    userRequeriment: {} as UserRequeriment,
}


//reducer & actions
const reducer =  (state = initialState , action: any) => {
    const {type, payload} = action
    if(type==="UPDATE_USER_REQUERIMENT")
    {
        const {newRequeriment } = payload;
        const {id, user, category, description} = newRequeriment
        return {
            ...state,
            userRequeriment: {id: id,
            user: user,
            category: category,
            description: description, 
            },
            step:1,
        }
    }
    else if(type==="UPDATE_USER_DATA")
    {
        const {newUserData } = payload;
        const {id, name, lastname, phone} = newUserData
        return {
            ...state,
            userRequeriment: {...state.userRequeriment,
                user:{
                    id: id,
                    name: name, 
                    lastname: lastname, 
                    phone: phone
                } 
            },
            step:2,
        }
    }
       
    return state;
}

export const store = createStore(reducer);
