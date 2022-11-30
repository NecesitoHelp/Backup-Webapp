import React, { FC, useState } from 'react';
import { Alert, Button, FormControl, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { HelperAppState, Helper } from '../../../../types';
import {InputUnstyledProps}  from '@mui/base/InputUnstyled';
import InputUnstyled from '@mui/base/InputUnstyled';
import axios from 'axios';
import { connect } from 'react-redux';

type HelperOnboardingDataProps = 
{
    goForward: any
   
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

  const HelperOnboardingStart: FC<HelperOnboardingDataProps> = (props) =>{
    
    const [sendingMessage, setSendingMessage] = useState("");
    const [helperData, sethelperData] = useState({ id: '', name: '', lastName: '', phone: '', ID: '', photo: '' } as unknown as Helper);
    const [errorMesage, setErrorMessage] = useState("")
    const {goForward} = props

    const regexPhone = /^[1-9]\d{9}$/g;
    
    const updateName = (event:any)=>{
        setErrorMessage('')
        const newName = event.target.value;
        const newUsuario = {...helperData, 
                name:newName}
                sethelperData(newUsuario);
    }

    const updateLastName = (event:any)=>{
        setErrorMessage('')
        const newLastName = event.target.value;
        const newUsuario = {...helperData, 
                lastName:newLastName}
                sethelperData(newUsuario);
    }

    const updatePhone = (event:any)=>{
      setErrorMessage('')
      const newPhone = event.target.value;
      const newUsuario = {...helperData, 
              phone:newPhone}
              sethelperData(newUsuario);
  }

    const updatePhoto = (event:any)=>{
        setErrorMessage('')
        const newLastPhoto = event.target.value;
        const newUsuario = {...helperData, 
                photo:newLastPhoto}
                sethelperData(newUsuario);
    }

    const updateID = (event:any)=>{
        setErrorMessage('')
        const newID = event.target.value;
        const newUsuario = {...helperData, 
          ID:newID}
          sethelperData(newUsuario);
    }

    const validatePhone = (event:any) =>{
        const newPhone = event.target.value;
        if(!newPhone.match(regexPhone))
        {
            setErrorMessage("Por favor, ingresa un teléfono válido (10 dígitos)")
            const newUsuario = {...helperData, 
                phone:''}
                sethelperData(newUsuario);
        }
    }
  
    const goNext = () =>
    {
        if(helperData.name==='' || helperData.lastname==='' || helperData.phone==='' || helperData.ID==='')
        {
            setErrorMessage("Debes completar tus datos de contacto")
        }
        else 
        {
          
        setErrorMessage('')
        setSendingMessage('...Enviando')
        const newUser = {
            ...helperData,
            id: Date.now().toString()
            }
            console.log(newUser)
          //axios.post('https://sheet.best/api/sheets/a94271fc-908e-462e-b839-6b09e7f7cbad', 
          //newUser).then((response)=>{})
        goForward({newUserData:newUser})
        }
        
    }

    return (
        <>
        {errorMesage && <Alert severity="error">{errorMesage}</Alert>}
        <h1> ¿Quieres prestar tus servicios? </h1>
        <p>Inicia con el registro</p>
        <FormControl >
        <CustomInput  placeholder="Tu nombre *" onChange={updateName} name="name"/>
        <CustomInput  placeholder="Tu apellido *" onChange={updateLastName} name="lastName"/>
        <CustomInput  placeholder="Telefono *" onChange={updatePhone} onBlur={validatePhone} name="phone"/>
        <CustomInput  placeholder="Tu identifiación *" onChange={updateID} name="ID"/>
        <CustomInput  placeholder="Foto (Opcional)" onChange={updatePhoto} name="Photo"/>
        <BootstrapButton onClick={goNext}>{sendingMessage!=='' ? sendingMessage : 'REGISTRARME'}</BootstrapButton>
        </FormControl>
        </>
    )

}

const dispatchStateToProps = (dispatch: any)=>{
    return { goForward: (value:{newUser: Helper})=>dispatch ({type:"GO_FORWARD", payload: value}),
    }
}

const mapStateToProps = (state: HelperAppState)=>{
    return state
}

export default connect( mapStateToProps, dispatchStateToProps)(HelperOnboardingStart);
