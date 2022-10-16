import { Alert,  FormControl, TextareaAutosize } from '@mui/material';
import React, { FC, useState } from 'react';
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { User, UserRequeriment } from '../../../../types';
import { BootstrapButton } from '../data';



type UserOnboardingStartProps = 
{
    goForward: any,
}

  
const UserOnboardingStart: FC<UserOnboardingStartProps> = ({goForward}) =>{
    const { search } = useLocation();
    const requeriment = search.substring(search.indexOf('param=')).split('=')[1] || 'algo'
    const [sendingMessage, setSendingMessage] = useState("");
    const [reqDescription, setReqDescription] = useState("");
    const [errorMesage, setErrorMessage] = useState("")

    const changeReqDescription = (event:any) =>
    {
        setReqDescription(event.target.value)
    }
    
    const goNext = () =>
    {
        if(reqDescription==='')
        {
            setErrorMessage("Debes ingresar la descripción de tu requerimiento")
        }
        else 
        {
        setErrorMessage('')
        setSendingMessage('...Enviando')

        const userRequriment = 
        {
            id: Date.now().toString(),
            user: {} as User,
            category: requeriment,
            description: reqDescription,

        } as UserRequeriment

        goForward({newRequeriment:userRequriment})
        }
    }
    
    return (
        <>
        {errorMesage && <Alert severity="error">{errorMesage}</Alert>}
        <h2>¿Necesitas ayuda con {requeriment!=='algo' ? 'tu '+ requeriment : requeriment }?</h2>
        <p>Describe brevemente tu necesidad: </p>
        <FormControl >
        <TextareaAutosize
            aria-label="empty textarea"
            placeholder="¿Cómo podemos ayudarte? (Max. 200 caracteres)"
            minRows={10}
            maxLength={200}
            className="App-textArea"
            onChange={changeReqDescription}
        />
        <BootstrapButton onClick={goNext} className='App-primary-btn' variant="contained" >{sendingMessage!=='' ? sendingMessage : 'SOLICITAR SERVICIO A HELP'}</BootstrapButton>
        </FormControl>
        </>
    )

}

const dispatchStateToProps = (dispatch: any)=>{
    return { goForward: (value:{newRequeriment: UserRequeriment})=>dispatch ({type:"UPDATE_USER_REQUERIMENT", payload: value}),
    }
}

export default connect( null, dispatchStateToProps)(UserOnboardingStart);


