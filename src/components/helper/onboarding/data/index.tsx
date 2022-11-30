import React, { useState } from 'react'
import { listservice } from '../../../../types'
import Select from "react-select"
import { Alert, Autocomplete, Button, FormControl, MenuList, styled } from '@mui/material';
import { InputUnstyledProps }  from '@mui/base/InputUnstyled';
import InputUnstyled from '@mui/base/InputUnstyled';
import { grey } from '@mui/material/colors';
import { TextField } from '@mui/material';
import { service } from '../../../../types'


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

export  const CustomSelect = styled('select')(
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

const defaultService = {price:0, name:''}

const HelperOnboardingData = () => {

  const [service, setService] = useState(defaultService)
  
  const updatePrices = ( event:any) => {
    const newPrice = event.target.value;
    setService({...service, price:newPrice});
  };

  const updateService = ( event:any) => {
    const newName = event.target.value;
    setService({...service, name:newName});
    console.log(event.target.value)
  };

  return(
      
    <div className='list-container'>
      
      <div>
        <h4>{`servicio: ${service.name}`}</h4>
        <h4>{`Cobras: ${service.price}`}</h4>          
      </div>

      <br />

      <h2>¿Cuentanos que servicios ofreces y cuanto cobras por ellos?</h2>
      <br />

      <FormControl>
        <div>
          <Autocomplete
            value={service.name}
            disablePortal id='service-list'
            options={listservice} 
            sx={{ width:300}} 
            onChange={updateService} 
            renderInput={(params) => <TextField {...params} label="Servicios" />}/>

          <CustomInput 
            placeholder="Cuanto cobras por el servicio (MXN)" 
            onChange={updatePrices} 
            name="precio" 
            autoComplete='off'/>
        </div>

        <BootstrapButton>{'GUARDAR SERVICIO'}</BootstrapButton>
        <BootstrapButton>{'FINALIZAR'}</BootstrapButton>
        </FormControl>   
    </div>
  )
}

export default (HelperOnboardingData)