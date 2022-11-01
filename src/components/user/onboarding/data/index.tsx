import { Alert, Button, FormControl, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { AppState, User, UserRequeriment } from '../../../../types';
import InputUnstyled from '@mui/base/InputUnstyled';
import {InputUnstyledProps}  from '@mui/base/InputUnstyled';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';



type UserOnboardingDataProps = 
{
    goForward: any,
    userRequirement: UserRequeriment,
}
export const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#fd5f03',
    borderColor: '#fd5f03',
    marginTop: '20px',
    color: 'white',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#f0884b',
      borderColor: '#f0884b',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fd5f03',
      borderColor: '#fd5f03',
    },
   
  });



export  const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 20rem;
    height: 30px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border: 2px solid #fd5f03;
    border-radius: 20px;
    padding-left: 5%;
    margin-left:auto;
    margin-right:auto;
    margin-top:20px;

  `,
  );

  export const CustomInput = React.forwardRef(function CustomInput(
    props: InputUnstyledProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    return (
      <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
    );
  });

const UserOnboardingData: FC<UserOnboardingDataProps> = (props) =>{
    
    const [sendingMessage, setSendingMessage] = useState("");
    const [userData, setUserData] = useState({ id: '', name: '', lastName: '', phone: '' } as unknown as User);
    const [errorMesage, setErrorMessage] = useState("")
    const {goForward, userRequirement} = props

    const regexPhone = /^[1-9]\d{9}$/g;

    const updateName = (event:any)=>{
        setErrorMessage('')
        const newName = event.target.value;
        const newUsuario = {...userData, 
                name:newName}
                setUserData(newUsuario);
    }

    const updateLastName = (event:any)=>{
        setErrorMessage('')
        const newLastName = event.target.value;
        const newUsuario = {...userData, 
                lastName:newLastName}
                setUserData(newUsuario);
    }

    const updatePhone = (event:any)=>{
        setErrorMessage('')
        const newPhone = event.target.value;
        const newUsuario = {...userData, 
                phone:newPhone}
                setUserData(newUsuario);
    }

    const validatePhone = (event:any) =>{
        const newPhone = event.target.value;
        if(!newPhone.match(regexPhone))
        {
            setErrorMessage("Por favor, ingresa un teléfono válido (10 dígitos)")
            const newUsuario = {...userData, 
                phone:''}
                setUserData(newUsuario);
        }
    }
  
    
    
    const goNext = () =>
    {
        if(userData.name==='' || userData.lastname==='' || userData.phone==='')
        {
            setErrorMessage("Debes completar tus datos de contacto")
        }
        else 
        {
          axios.post('https://sheet.best/api/sheets/50a46321-f6e7-4bdf-b986-6ca9bfba6b5b', userData).then((response)=>{
      
      })
        setErrorMessage('')
        setSendingMessage('...Enviando')
        const newUser = {
            ...userData,
            id: Date.now().toString()
            }
        goForward({newUserData:newUser})
        }
        
    }

    
    
    
    return (
        <>
        {errorMesage && <Alert severity="error">{errorMesage}</Alert>}
        <h1>Vamos a buscar a un profesional {userRequirement.category!=='algo' ? `en ${userRequirement.category}` : '' } para ayudarte: </h1>
        <p>¿Cómo podemos contactarte cuando tengamos al mejor profesional disponible: </p>
        <FormControl >
        <CustomInput  placeholder="Tu nombre *" onChange={updateName} name="name"/>
        <CustomInput  placeholder="Tu apellido *" onChange={updateLastName} name="name"/>
        <CustomInput  placeholder="Tu teléfono *" onChange={updatePhone} onBlur={validatePhone} name="phone"/>
        <BootstrapButton onClick={goNext}>{sendingMessage!=='' ? sendingMessage : 'ENVIAR'}</BootstrapButton>
        </FormControl>
        </>
    )

}

const dispatchStateToProps = (dispatch: any)=>{
    return { goForward: (value:{newUser: User})=>dispatch ({type:"UPDATE_USER_DATA", payload: value}),
    }
}

const mapStateToProps = (state: AppState)=>{
    return { userRequirement: state.userRequeriment }
}


export default connect( mapStateToProps, dispatchStateToProps)(UserOnboardingData);


