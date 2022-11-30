import React, { FC, } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { connect } from 'react-redux';
import { AppState, User, UserRequeriment } from '../../../../types';
import { ButtonUnstyled, ButtonUnstyledProps } from '@mui/base';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';

type UserOnboardingEndProps = 
{
    userRequirement: UserRequeriment,
}

const CustomButtonRoot = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 1rem;
  background-color: #fd5f03;
  padding: 12px 24px;
  border-radius: 20px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  display:block;
  margin-left:auto;
  margin-right: auto;

`;

function CustomButton(props: ButtonUnstyledProps) {
  return <CustomButtonRoot {...props}  />;
}

const UserOnboardingEnd: FC<UserOnboardingEndProps> = (props) =>{


    const {userRequirement} = props
    

    const handleWhatsApp = () => {
        const category = userRequirement.category!='algo' ? `%20con%20mi%20${userRequirement.category}` : ''
        window.location.href=`https://api.whatsapp.com/send?phone=+527291334990&text=Hola,%20necesito%20ayuda${category}`;
   
    }

    const goInit = () =>{
        window.location.href='http://localhost:3000/'
    }
    
    return (
        <>
        <h1>Estamos buscando un profesional para ti</h1>
        <p>Nos comunicaremos contigo pronto para ayudarte a resolver el problema {userRequirement.category!=='algo' ? `con tu ${userRequirement.category}` : ''}</p>
        <p>Si quieres que prioricemos tu solicitud, puedes contactarnos por whatsapp</p>
        <CustomButton onClick={handleWhatsApp}><WhatsAppIcon className="waIcon"/><span>¡HABLAR POR WHATSAPP!</span></CustomButton>
        <Button onClick={goInit}> Solicitar otro servicio</Button>
        </>
    )

}


const mapStateToProps = (state: AppState)=>{
    return { userRequirement: state.userRequeriment }
}


export default connect( mapStateToProps)(UserOnboardingEnd);